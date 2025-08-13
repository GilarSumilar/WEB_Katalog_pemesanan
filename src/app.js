document.addEventListener("alpine:init", () => {
  Alpine.data("menu", () => ({
    items: [
      {
        id: 1,
        name: "Burger kill",
        img: "burger.jpg",
        price: 20000,
        description:
          "Burger daging premium dengan keju leleh dan saus spesial.",
      },
      {
        id: 2,
        name: "French fries",
        img: "kentang.jpg",
        price: 15000,
        description: "Kentang goreng renyah disajikan dengan saus tartar",
      },
      {
        id: 3,
        name: "Soda",
        img: "3.jpg",
        price: 10000,
        description:
          "Minuman soda segar dengan extra rumput laut untuk melepas dahaga.",
      },
    ],
    rupiah(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    },
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      // Ambil item yg mau di remove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // Jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // Jika bukan barang yg di click
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
    // Konversi angka ke format rupiah
    rupiah(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    },
  });
});

// Form validation
const checkoutButton = document.querySelector("#checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("input", function () {
  let isValid = true;
  // Cek semua input di dalam form
  form.querySelectorAll("input").forEach((input) => {
    if (input.value.trim() === "") {
      isValid = false;
    }
  });

  checkoutButton.disabled = !isValid;
  if (isValid) {
    checkoutButton.classList.remove("disabled");
  } else {
    checkoutButton.classList.add("disabled");
  }
});

// Kirim data ketika tombol checkout ditekan
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const fromData = new FormData(form);
  const data = new URLSearchParams(fromData);
  const objData = Object.fromEntries(data);
  const messsage = formatWhatsappMessage(objData);
  window.open(
    "http://wa.me/62085779310159?text=" + encodeURIComponent(messsage)
  );
});

// Format Pesan Whatsapp

const formatWhatsappMessage = (obj) => {
  // Helper function to format currency
  const rupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const items = JSON.parse(obj.cart_items)
    .map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})`)
    .join("\n    ");

  return `Data Customer
    Nama : ${obj.name}
    Email : ${obj.email}
    No HP : ${obj.phone}

Data Pesanan 
    ${items}
    TOTAL: ${rupiah(obj.total)}
    Terima kasih!`;
};
