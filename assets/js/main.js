
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})()

// Toggle Cart Popup
function toggleCartPopup() {
  const cartPopup = document.getElementById('cart-popup');
  cartPopup.style.display = (cartPopup.style.display === 'block') ? 'none' : 'block';
  displayCartItems(); // Show items in the cart
}

// Add Product to Cart and Save to Local Storage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  cart.push(product);
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  updateCartCount(); 
}

// Display Cart Items in the Popup
function displayCartItems() {
  let cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  let cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  cartItems.forEach((item, index) => {
    let li = document.createElement('li');
    li.innerHTML = `${item.name} - Qty: ${item.quantity} 
    <button onclick="removeFromCart(${index})">Remove</button>`;
    cartList.appendChild(li);
  });

  updateCartCount();
}

// Remove Item from Cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  displayCartItems(); 
}

// Update the Cart Count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  document.getElementById('cart-count').textContent = cart.length;
}

// WhatsApp Checkout
function checkout() {
  let cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  if (cartItems.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  let message = 'Order Details:\n';
  cartItems.forEach(item => {
    message += `${item.name} - Qty: ${item.quantity}\n`;
  });

  let encodedMessage = encodeURIComponent(message);
  window.open(`https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=${encodedMessage}`, '_blank');
}

// Load Cart on Every Page
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});


