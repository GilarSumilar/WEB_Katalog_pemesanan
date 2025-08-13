const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');
const menuIcon = document.querySelector('#menu-icon');

// Ketika hamburger menu diklik
hamburger.onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle('active');
  
  // Toggle ikon menu
  if (navbarNav.classList.contains('active')) {
    menuIcon.textContent = 'close'; // Ubah ikon menjadi "X"
    menuIcon.classList.add('rotate'); // Tambahkan animasi rotasi
  } else {
    menuIcon.textContent = 'menu'; // Kembalikan ke ikon "menu"
    menuIcon.classList.remove('rotate');
  }
};

// Klik di luar sidebar untuk menghilangkan nav
document.addEventListener('click', function(e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
    menuIcon.textContent = 'menu'; // Kembalikan ikon ke "menu"
    menuIcon.classList.remove('rotate');
  }
});
