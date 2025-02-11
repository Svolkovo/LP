gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  //mobile navbar 
  if (isMobileActive()) {
    const menuToggler = document.querySelector(".mobile-nav-toggler");
    const mobileMenu = document.querySelector(".mobile-menu");
    let mobileMenuCheck = false

    const animateButton = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
        duration: 0.6,
        overwrite: true,
      },
      paused: true,
    })

    animateButton
      .fromTo('.mobile-nav-toggler__line--1',
        { rotateZ: 0, },
        { rotateZ: 45, }
      )
      .fromTo('.mobile-nav-toggler__line--3',
        { y: "0rem", rotateZ: 0, },
        { y: "-0.7rem", rotateZ: -45, },
        "<"
      )
      .fromTo('.mobile-nav-toggler__line--2',
        { opacity: 1, },
        { opacity: 0, },
        "<"
      )

    menuToggler.addEventListener("click", () => {
      if (mobileMenuCheck == false) {
        scrollLock.disablePageScroll(mobileMenu);
        mobileMenu.classList.replace("mobile-menu--unvisible", "mobile-menu--visible");
        animateButton.play();
        mobileMenuCheck = true
      } else {
        scrollLock.enablePageScroll(mobileMenu);
        mobileMenu.classList.replace("mobile-menu--visible", "mobile-menu--unvisible");
        animateButton.reverse();
        mobileMenuCheck = false
      }
    });
    document.querySelector('.mobile-link--contact').addEventListener("click", () => {
      scrollLock.enablePageScroll(mobileMenu);
      mobileMenu.classList.replace("mobile-menu--visible", "mobile-menu--unvisible");
      animateButton.reverse();
      mobileMenuCheck = false
    });
    document.querySelector('.checkbox-wrapper--mobile').addEventListener("click", () => {
      scrollLock.enablePageScroll(mobileMenu);
      mobileMenu.classList.replace("mobile-menu--visible", "mobile-menu--unvisible");
      animateButton.reverse();
      mobileMenuCheck = false
    });

  }

  //desktop second level navbar 
  const dropdownTrigger = document.querySelector(".nav-list-link--trigger");
  const dropdown = document.querySelector(".nav-list--lower");
  dropdownTrigger.addEventListener("mouseenter", () => {
    dropdown.classList.add("active");
    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.remove("active");
    });
  });

  //desktop navbar behaviour
  const navbar = document.getElementById('navbar');
  const navTrigger = document.querySelector('.nav-mouse-trigger');
  let isMouseOutEnabled = false

  let hideNavbar = gsap.to(navbar, {
    ease: "power1.inOut",
    duration: 0.6,
    yPercent: -100,
    overwrite: true,
    paused: true,
  });

  const animateMenu = gsap.timeline({
    defaults: {
      ease: "power1.inOut",
      duration: 0.6,
      overwrite: true,
    },
    paused: true,
  })

  animateMenu
    .fromTo(navTrigger,
      { display: "none" },
      { duration: 0, display: "block", }
    )
    .fromTo(navbar,
      { backgroundColor: "transparent" },
      { backgroundColor: "var(--dark-grey)" }
    )
    .fromTo(navbar.querySelector('.nav-logo-wrapper'),
      { scale: 1, yPercent: 0 },
      { scale: 0.7, yPercent: 15 },
      "<"
    )
    .fromTo(navbar.querySelector('.nav-wrapper'),
      { height: "6rem" },
      { height: "3rem" },
      "<"
    )
    .fromTo(navbar.querySelector('.nav__under-wrapper'),
      { scaleY: 1, yPercent: 0 },
      { scaleY: 0, yPercent: -50 },
      "<"
    )
    .fromTo(navbar.querySelector('.nav__under-border'),
      { opacity: 0, scaleX: 1 },
      { opacity: 1, scaleX: 6.4 },
      "<"
    )
    .fromTo(navbar.querySelector('.nav-list-border__borders'),
      { scaleX: 1, xPercent: 0 },
      { scaleX: 1.1, xPercent: 5 },
      "<"
    )
    .fromTo(navbar.querySelector('.nav-left__space--left'),
      { scaleX: 1, xPercent: 0 },
      { scaleX: 2, xPercent: -50 },
      "<"
    );

  ScrollTrigger.create({
    start: 1,
    onEnter: () => {
      animateMenu.play()
      isMouseOutEnabled = true
    },
    onLeaveBack: () => {
      animateMenu.reverse()
      isMouseOutEnabled = false
    }
  });

  ScrollTrigger.create({
    start: 400,
    onUpdate: self => {
      if (self.direction === 1) {
        hideNavbar.play();
      } else {
        hideNavbar.reverse();
      }
    }
  });


  // Показываем navbar при наведении курсора на navTrigger
  navTrigger.addEventListener('mouseover', () => {
    hideNavbar.reverse();
  });

  // Скроем navbar при уводе курсора с navTrigger
  navTrigger.addEventListener('mouseout', () => {
    if (isMouseOutEnabled == true) {
      hideNavbar.play();
    }
  });

  // Скроем navbar при уводе курсора с него
  navbar.addEventListener('mouseout', () => {
    if (isMouseOutEnabled == true) {
      hideNavbar.play();
    }
  });

  // Остановим скрытие navbar, если курсор на нем
  navbar.addEventListener('mouseover', () => {
    if (isMouseOutEnabled == true) {
      hideNavbar.reverse();
    }
  });


});
