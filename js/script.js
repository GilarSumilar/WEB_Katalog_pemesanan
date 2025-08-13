// Ambil elemen-elemen
const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');
const shoppingCartButton = document.querySelector('#shopping-cart-button');
const shoppingCart = document.querySelector('.shopping-cart');
const menuIcon = hamburger.querySelector('.material-icons');
const itemDetailModal = document.querySelector('#item-detail-modal');

// Toggle navbar saat hamburger diklik
hamburger.addEventListener('click', function (e) {
  e.preventDefault();
  navbarNav.classList.toggle('active');

  // Ubah ikon menu menjadi close
  if (navbarNav.classList.contains('active')) {
    menuIcon.textContent = 'close';
  } else {
    menuIcon.textContent = 'menu';
  }

  // Tutup cart kalau sedang terbuka
  shoppingCart.classList.remove('active');
});

// Toggle cart saat ikon keranjang diklik
shoppingCartButton.addEventListener('click', function (e) {
  e.preventDefault();
  shoppingCart.classList.toggle('active');

  // Tutup navbar jika terbuka
  navbarNav.classList.remove('active');
  menuIcon.textContent = 'menu';
});

// Tutup semua saat klik di luar elemen
document.addEventListener('click', function (e) {
  // Cek klik di luar hamburger dan navbar
  if (!navbarNav.contains(e.target) && !hamburger.contains(e.target)) {
    navbarNav.classList.remove('active');
    menuIcon.textContent = 'menu';
  }

  // Cek klik di luar shopping cart dan tombolnya
  if (!shoppingCart.contains(e.target) && !shoppingCartButton.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box
document.addEventListener('click', function (e) {
  const button = e.target.closest('.item-detail-button');
  if (button) {
    e.preventDefault();
    itemDetailModal.style.display = 'flex';

    // Ambil data dari attribute, bukan dari DOM .product-desc
    const name = button.getAttribute('data-name');
    const price = button.getAttribute('data-price');
    const imgSrc = button.getAttribute('data-img');
    const description = button.getAttribute('data-desc');

    // Tampilkan data di modal
    document.querySelector('#modal-product-name').textContent = name;
    document.querySelector('#modal-product-price').textContent = price;
    document.querySelector('#modal-product-image').src = imgSrc;
    document.querySelector('#modal-product-desc').textContent = description;

    document.querySelector('#modal-product-original').textContent = '';
  }
});

// Close modal box
document.querySelector('.modal .x').onclick = (e) => {
   itemDetailModal.style.display = 'none';
   e.preventDefault();
}

// Close modal box jika klik di luar modal-container
window.onclick = function(e) {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};
