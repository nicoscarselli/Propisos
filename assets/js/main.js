(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bx-menu')
    this.classList.toggle('bx-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bx-menu')
        navbarToggle.classList.toggle('bx-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * servicios slider
   */
   new Swiper('.servicios-slider', {
    speed: 1000,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 5000,
    },
    cssMode: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },

    mousewheel: true,
    keyboard: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
      },

      1200: {
        slidesPerView: 2,
      }
    }

  });

  /**
   * Clientes slider
   */
  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
	  video:false,
    nav:false,
    lazyLoad:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
      responsive:{
          0:{
              items:2
          },
          480:{
              items:2
          },
          560:{
              items:2
          },
          760:{
              items:2
          },
          990:{
              items:4
          },
          1200:{
              items:4
          },
          1500:{
              items:4
          }
      }
  })

  /*
  * obras carousel indicators
  */
  let obrasCarouselIndicators = select("#obras-carousel-indicators")
  let obrasCarouselItems = select('#obrasCarousel .carousel-item', true)
 
  obrasCarouselItems.forEach((item, index) => {
    (index === 0) ?
    obrasCarouselIndicators.innerHTML += "<li data-bs-target='#obrasCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
    obrasCarouselIndicators.innerHTML += "<li data-bs-target='#obrasCarousel' data-bs-slide-to='" + index + "'></li>"
  });
  

  /**
  * Animation on scroll
  */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

})()