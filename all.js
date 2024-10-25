"use strict";

var isMobileActive = () => {
  var minWidth = 992;
  return window.innerWidth < minWidth || screen.width < minWidth;
};
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".date")) {
    var arrDate = document.querySelectorAll(".date");
    for (var a = 0; a < arrDate.length; a++) {
      var splitDateArray = arrDate[a].innerText.split(".");
      if (splitDateArray[0] < 10) {
        var day = "0" + splitDateArray[0];
        var currentDate = day + "." + splitDateArray[1] + "." + splitDateArray[2];
        arrDate[a].innerText = currentDate;
        splitDateArray = currentDate.split(".");
      }
      if (splitDateArray[1] < 10) {
        var month = "0" + splitDateArray[1];
        var _currentDate = splitDateArray[0] + "." + month + "." + splitDateArray[2];
        arrDate[a].innerText = _currentDate;
        splitDateArray = _currentDate.split(".");
      }
    }
  }
});
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  var filtersArr = document.querySelectorAll('.filters__directions, .filters__practices');
  if (filtersArr.length == 0) {
    return;
  }
  ;
  var activeFilterPart = 0;
  var radioArr = document.querySelectorAll('.filter-collection__checkbox-wrapper');
  var filtersNames = document.querySelectorAll('.filters__name');
  //let radioStatus = []
  var _loop = function _loop(a) {
    var finalHeight = filtersArr[a].querySelector('.filter-collection').offsetHeight;
    var animList = filtersArr[a].querySelector('.filters__animate');
    var plusPart = filtersArr[a].querySelector('.plus-img__wrapper-2');
    if (!isMobileActive()) {
      filtersArr[a].addEventListener('mouseenter', () => {
        animList.style.height = finalHeight + "px";
        gsap.to(plusPart, {
          duration: 0.2,
          rotate: "90deg"
        });
        activeFilterPart = a + 1;
      });
      filtersArr[a].addEventListener('mouseleave', () => {
        animList.style.height = "0px";
        filtersArr[a].querySelector('.plus-img__wrapper-2').style.transform = 'rotate(0deg)';
        gsap.to(plusPart, {
          duration: 0.2,
          rotate: "0deg"
        });
        activeFilterPart = 0;
      });
    } else {
      var clickAnim = 0;
      filtersArr[a].addEventListener('click', e => {
        if (clickAnim == 0 && e.target.tagName != "INPUT") {
          animList.style.height = finalHeight + "px";
          gsap.to(plusPart, {
            duration: 0.2,
            rotate: "90deg"
          });
          activeFilterPart = a + 1;
          clickAnim = 1;
          console.log('open', e.target);
        } else {
          animList.style.height = "0px";
          filtersArr[a].querySelector('.plus-img__wrapper-2').style.transform = 'rotate(0deg)';
          gsap.to(plusPart, {
            duration: 0.2,
            rotate: "0deg"
          });
          activeFilterPart = 0;
          clickAnim = 0;
        }
      });
    }
  };
  for (var a = 0; a < filtersArr.length; a++) {
    _loop(a);
  }
  var _loop2 = function _loop2(_a) {
    radioArr[_a].addEventListener('click', e => {
      if (activeFilterPart == 1) {
        filtersNames[0].textContent = radioArr[_a].querySelector('.filter-collection__checkbox-text').textContent;
        if (!isMobileActive()) {
          filtersArr[0].classList.add('filters--active');
          filtersArr[0].querySelector('.plus-img__line-2').style.backgroundColor = '#000000';
          filtersArr[0].querySelector('.plus-img__line').style.backgroundColor = '#000000';
        }
      } else if (activeFilterPart == 2) {
        filtersNames[1].textContent = radioArr[_a].querySelector('.filter-collection__checkbox-text').textContent;
        if (!isMobileActive()) {
          filtersArr[1].classList.add('filters--active');
          filtersArr[1].querySelector('.plus-img__line-2').style.backgroundColor = '#000000';
          filtersArr[1].querySelector('.plus-img__line').style.backgroundColor = '#000000';
        }
      }
    });
  };
  for (var _a = 0; _a < radioArr.length; _a++) {
    _loop2(_a);
  }
  document.querySelector('.filters__clear').addEventListener('click', e => {
    if (!isMobileActive()) {
      filtersArr[0].classList.remove('filters--active');
      filtersArr[1].classList.remove('filters--active');
    }
    filtersArr[0].querySelector('.plus-img__line-2').style.backgroundColor = 'var(--white)';
    filtersArr[1].querySelector('.plus-img__line-2').style.backgroundColor = 'var(--white)';
    filtersArr[0].querySelector('.plus-img__line').style.backgroundColor = 'var(--white)';
    filtersArr[1].querySelector('.plus-img__line').style.backgroundColor = 'var(--white)';
    filtersNames[0].textContent = "Отрасль";
    filtersNames[1].textContent = "Практика";
  });
});
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

  // adding glow-neon effects on blocks
  if (!isMobileActive()) {
    var glowBlocks = document.querySelectorAll("[glow-neon]");
    if (glowBlocks.length > 0) {
      var _loop = function _loop() {
        var glowTarget = glowBlocks[a].querySelector("[glow-target]") || glowBlocks[a];
        glowTarget.classList.add("glow-target");
        var glowNeon = document.querySelector(".glow-neon");
        var clone = glowNeon.cloneNode(true);
        if (glowBlocks[a].getAttribute("glow-neon-color") == "orange") {
          clone.querySelector(".glow-neon__image").src = "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14ef8b685545f491ca58_orange_dark-01.svg";
        } else if (glowBlocks[a].getAttribute("glow-neon-color") == "green") {
          clone.querySelector(".glow-neon__image").src = "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14f08a5ca7dec9275faf_green_dark-01.svg";
        }
        if (glowBlocks[a].hasAttribute("glow-neon-rotate")) {
          clone.style.transform = "rotateX(180deg)";
        }
        if (glowBlocks[a].hasAttribute("glow-neon-clipped")) {
          var scale = glowBlocks[a].getAttribute("glow-neon-clipped");
          //console.log(scale)
          clone.style.transform += "scaleY(".concat(scale * 0.1, ") translateY(").concat(-scale * 100, "%)");
        }
        glowBlocks[a].addEventListener("mouseenter", () => {
          var tlNeonEnter = gsap.timeline({
            defaults: {
              ease: "power2.Out",
              duration: 0.75,
              overwrite: true
            }
          });
          tlNeonEnter.to(clone.querySelector(".glow-neon__image"), {
            opacity: 1,
            scaleX: 1.65,
            filter: "saturate(100%)"
          }).to(clone, {
            opacity: 1
          }, "<").to(clone.querySelector(".glow-neon__gradient"), {
            yPercent: 80
          }, "<");
        });
        glowBlocks[a].addEventListener("mouseleave", () => {
          var tlNeonLeave = gsap.timeline({
            defaults: {
              ease: "power2.In",
              duration: 0.45,
              overwrite: true
            }
          });
          tlNeonLeave.to(clone.querySelector(".glow-neon__image"), {
            opacity: 0,
            scaleX: 1.55,
            filter: "saturate(80%)"
          }).to(clone, {
            opacity: 0
          }, "<").to(clone.querySelector(".glow-neon__gradient"), {
            yPercent: 0
          }, "<");
        });
        glowTarget.append(clone);
      };
      for (var a = 0; a < glowBlocks.length; a++) {
        _loop();
      }
    }
  }

  // splitting the text to start the scrolling trigger animation
  var typeSplit = new SplitText("[text-split]", {
    types: "words",
    wordsClass: "word",
    tag: "div"
  });
  gsap.set("[text-split]", {
    opacity: 1
  });

  // animation the appearance of text by words by scrolling
  var wordsSlideUp = document.querySelectorAll("[words-slide-up]");
  for (var _a = 0; _a < wordsSlideUp.length; _a++) {
    gsap.from(wordsSlideUp[_a].querySelectorAll(".word"), {
      scrollTrigger: {
        trigger: wordsSlideUp[_a],
        start: "top 90%"
      },
      opacity: 0,
      yPercent: 60,
      duration: 1,
      ease: "power2.out",
      stagger: {
        amount: 0.5
      }
    });
  }

  // animation the appearance of block by scrolling
  var blockSlideUp = document.querySelectorAll("[block-slide-up]");
  for (var _a2 = 0; _a2 < blockSlideUp.length; _a2++) {
    gsap.from(blockSlideUp[_a2], {
      scrollTrigger: {
        trigger: blockSlideUp[_a2],
        start: "top 90%"
      },
      opacity: 0,
      yPercent: 30,
      duration: 1,
      ease: "power2.out"
    });
  }

  // animation the stagger appearance of group of blocks by scrolling
  var blockSlideUpStagger = document.querySelectorAll("[block-slide-up-stagger]");
  for (var _a3 = 0; _a3 < blockSlideUpStagger.length; _a3++) {
    gsap.from(blockSlideUpStagger[_a3].querySelectorAll("[active-stagger]"), {
      scrollTrigger: {
        trigger: blockSlideUpStagger[_a3],
        start: "top 90%"
      },
      opacity: 0,
      yPercent: 30,
      duration: 1,
      ease: "power2.out",
      stagger: {
        amount: 0.5
      }
    });
  }

  // animation the appearance of horizontal line by scrolling
  var horizontalLine = document.querySelectorAll(".line-horizontal");
  for (var _a4 = 0; _a4 < horizontalLine.length; _a4++) {
    gsap.fromTo(horizontalLine[_a4], {
      width: "0%"
    }, {
      scrollTrigger: {
        trigger: horizontalLine[_a4],
        start: "top 90%"
      },
      duration: 1,
      ease: "power1.out",
      width: "100%"
    });
  }

  // animation the appearance of bottom horizontal line by scrolling
  var horizontalLineBottom = document.querySelectorAll(".line-horizontal--bottom-edge");
  for (var _a5 = 0; _a5 < horizontalLineBottom.length; _a5++) {
    gsap.fromTo(horizontalLineBottom[_a5], {
      width: "0%"
    }, {
      scrollTrigger: {
        trigger: horizontalLineBottom[_a5],
        start: "top 112%"
      },
      duration: 1,
      ease: "power1.out",
      width: "100%"
    });
  }

  // animation the appearance of large horizontal line by scrolling
  var horizontalLineLarge = document.querySelectorAll(".line-horizontal-large");
  for (var _a6 = 0; _a6 < horizontalLineLarge.length; _a6++) {
    gsap.fromTo(horizontalLineLarge[_a6], {
      width: "0%"
    }, {
      scrollTrigger: {
        trigger: horizontalLineLarge[_a6],
        start: "top 90%"
      },
      duration: 1.75,
      ease: "power1.out",
      width: "100%"
    });
  }

  // animation the appearance of vertical line by scrolling
  var verticallLine = document.querySelectorAll(".line-vertical");
  for (var _a7 = 0; _a7 < verticallLine.length; _a7++) {
    gsap.fromTo(verticallLine[_a7], {
      height: "0%"
    }, {
      scrollTrigger: {
        trigger: verticallLine[_a7],
        start: "top 90%"
      },
      duration: 1,
      ease: "power1.out",
      height: "100%"
    });
  }
});
"use strict";

gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
  //mobile navbar 
  if (isMobileActive()) {
    var menuToggler = document.querySelector(".mobile-nav-toggler");
    var mobileMenu = document.querySelector(".mobile-menu");
    var mobileMenuCheck = false;
    var animateButton = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
        duration: 0.6,
        overwrite: true
      },
      paused: true
    });
    animateButton.fromTo('.mobile-nav-toggler__line--1', {
      rotateZ: 0
    }, {
      rotateZ: 45
    }).fromTo('.mobile-nav-toggler__line--3', {
      y: "0rem",
      rotateZ: 0
    }, {
      y: "-0.7rem",
      rotateZ: -45
    }, "<").fromTo('.mobile-nav-toggler__line--2', {
      opacity: 1
    }, {
      opacity: 0
    }, "<");
    menuToggler.addEventListener("click", () => {
      if (mobileMenuCheck == false) {
        scrollLock.disablePageScroll(mobileMenu);
        mobileMenu.classList.replace("mobile-menu--unvisible", "mobile-menu--visible");
        animateButton.play();
        mobileMenuCheck = true;
      } else {
        scrollLock.enablePageScroll(mobileMenu);
        mobileMenu.classList.replace("mobile-menu--visible", "mobile-menu--unvisible");
        animateButton.reverse();
        mobileMenuCheck = false;
      }
    });
    document.querySelector('.mobile-link--contact').addEventListener("click", () => {
      scrollLock.enablePageScroll(mobileMenu);
      mobileMenu.classList.replace("mobile-menu--visible", "mobile-menu--unvisible");
      animateButton.reverse();
      mobileMenuCheck = false;
    });
    document.querySelector('.checkbox-wrapper--mobile').addEventListener("click", () => {
      scrollLock.enablePageScroll(mobileMenu);
      mobileMenu.classList.replace("mobile-menu--visible", "mobile-menu--unvisible");
      animateButton.reverse();
      mobileMenuCheck = false;
    });
  }

  //desktop second level navbar 
  var dropdownTrigger = document.querySelector(".nav-list-link--trigger");
  var dropdown = document.querySelector(".nav-list--lower");
  dropdownTrigger.addEventListener("mouseenter", () => {
    dropdown.classList.add("active");
    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.remove("active");
    });
  });

  //desktop navbar behaviour
  var navbar = document.getElementById('navbar');
  var navTrigger = document.querySelector('.nav-mouse-trigger');
  var isMouseOutEnabled = false;
  var hideNavbar = gsap.to(navbar, {
    ease: "power1.inOut",
    duration: 0.6,
    yPercent: -100,
    overwrite: true,
    paused: true
  });
  var animateMenu = gsap.timeline({
    defaults: {
      ease: "power1.inOut",
      duration: 0.6,
      overwrite: true
    },
    paused: true
  });
  animateMenu.fromTo(navTrigger, {
    display: "none"
  }, {
    duration: 0,
    display: "block"
  }).fromTo(navbar, {
    backgroundColor: "transparent"
  }, {
    backgroundColor: "var(--dark-grey)"
  }).fromTo(navbar.querySelector('.nav-logo-wrapper'), {
    scale: 1,
    yPercent: 0
  }, {
    scale: 0.7,
    yPercent: 15
  }, "<").fromTo(navbar.querySelector('.nav-wrapper'), {
    height: "6rem"
  }, {
    height: "3rem"
  }, "<").fromTo(navbar.querySelector('.nav__under-wrapper'), {
    scaleY: 1,
    yPercent: 0
  }, {
    scaleY: 0,
    yPercent: -50
  }, "<").fromTo(navbar.querySelector('.nav__under-border'), {
    opacity: 0,
    scaleX: 1
  }, {
    opacity: 1,
    scaleX: 6.4
  }, "<").fromTo(navbar.querySelector('.nav-list-border__borders'), {
    scaleX: 1,
    xPercent: 0
  }, {
    scaleX: 1.1,
    xPercent: 5
  }, "<").fromTo(navbar.querySelector('.nav-left__space--left'), {
    scaleX: 1,
    xPercent: 0
  }, {
    scaleX: 2,
    xPercent: -50
  }, "<");
  ScrollTrigger.create({
    start: 1,
    onEnter: () => {
      animateMenu.play();
      isMouseOutEnabled = true;
    },
    onLeaveBack: () => {
      animateMenu.reverse();
      isMouseOutEnabled = false;
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
"use strict";

/**
 * Object.assign() polyfill
 */
Object.assign || Object.defineProperty(Object, "assign", {
  enumerable: !1,
  configurable: !0,
  writable: !0,
  value: function value(a, b) {
    "use strict";

    if (void 0 === a || null === a) throw new TypeError("Cannot convert first argument to object");
    for (var c = Object(a), d = 1; d < arguments.length; d++) {
      var e = arguments[d];
      if (void 0 !== e && null !== e) for (var f = Object.keys(Object(e)), g = 0, h = f.length; g < h; g++) {
        var i = f[g],
          j = Object.getOwnPropertyDescriptor(e, i);
        void 0 !== j && j.enumerable && (c[i] = e[i]);
      }
    }
    return c;
  }
});

/**
 * CustomEvent() polyfill
 */
!function () {
  if ("function" == typeof window.CustomEvent) return;
  function t(t, e) {
    e = e || {
      bubbles: !1,
      cancelable: !1,
      detail: void 0
    };
    var n = document.createEvent("CustomEvent");
    return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n;
  }
  t.prototype = window.Event.prototype, window.CustomEvent = t;
}();

/*
 * Функция определения события swipe на элементе.
 * @param {Object} el - элемент DOM.
 * @param {Object} settings - объект с предварительными настройками.
 */
var swipe = function swipe(el, settings) {
  // настройки по умолчанию
  var settings = Object.assign({}, {
    minDist: 60,
    // минимальная дистанция, которую должен пройти указатель, чтобы жест считался как свайп (px)
    maxDist: 120,
    // максимальная дистанция, не превышая которую может пройти указатель, чтобы жест считался как свайп (px)
    maxTime: 700,
    // максимальное время, за которое должен быть совершен свайп (ms)
    minTime: 5 // минимальное время, за которое должен быть совершен свайп (ms)
  }, settings);

  // коррекция времени при ошибочных значениях
  if (settings.maxTime < settings.minTime) settings.maxTime = settings.minTime + 500;
  if (settings.maxTime < 100 || settings.minTime < 5) {
    settings.maxTime = 100;
    settings.minTime = 5;
  }
  var dir,
    // направление свайпа (horizontal, vertical)
    swipeType,
    // тип свайпа (up, down, left, right)
    dist,
    // дистанция, пройденная указателем
    isMouse = false,
    // поддержка мыши (не используется для тач-событий)
    isMouseDown = false,
    // указание на активное нажатие мыши (не используется для тач-событий)
    startX = 0,
    // начало координат по оси X (pageX)
    distX = 0,
    // дистанция, пройденная указателем по оси X
    startY = 0,
    // начало координат по оси Y (pageY)
    distY = 0,
    // дистанция, пройденная указателем по оси Y
    startTime = 0,
    // время начала касания
    swipeFired = false,
    // флаг для предотвращения повторного срабатывания события свайпа
    support = {
      // поддерживаемые браузером типы событий
      pointer: !!("PointerEvent" in window || "msPointerEnabled" in window.navigator),
      touch: !!('ontouchstart' in window || navigator.maxTouchPoints)
    };

  /*
   * Определение доступных в браузере событий: pointer, touch и mouse.
   * @returns {Object} - возвращает объект с доступными событиями.
   */
  var getSupportedEvents = function getSupportedEvents() {
    if (support.pointer) {
      return {
        type: "pointer",
        start: "pointerdown",
        move: "pointermove",
        end: "pointerup",
        cancel: "pointercancel",
        leave: "pointerleave"
      };
    } else if (support.touch) {
      return {
        type: "touch",
        start: "touchstart",
        move: "touchmove",
        end: "touchend",
        cancel: "touchcancel"
      };
    } else {
      return {
        type: "mouse",
        start: "mousedown",
        move: "mousemove",
        end: "mouseup",
        leave: "mouseleave"
      };
    }
  };

  /*
   * Объединение событий mouse/pointer и touch.
   * @param e {Event} - принимает в качестве аргумента событие.
   * @returns {TouchList|Event} - возвращает либо TouchList, либо оставляет событие без изменения.
   */
  var eventsUnify = function eventsUnify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  };

  /*
   * Обрабочик начала касания указателем.
   * @param e {Event} - получает событие.
   */
  var checkStart = function checkStart(e) {
    var event = eventsUnify(e);
    if (support.touch && typeof e.touches !== "undefined" && e.touches.length !== 1) return; // игнорирование касания несколькими пальцами
    dir = "none";
    swipeType = "none";
    dist = 0;
    startX = event.pageX;
    startY = event.pageY;
    startTime = new Date().getTime();
    swipeFired = false;
    if (isMouse) isMouseDown = true; // поддержка мыши
  };

  /*
   * Обработчик движения указателя.
   * @param e {Event} - получает событие.
   */
  var checkMove = function checkMove(e) {
    if (isMouse && !isMouseDown) return; // выход из функции, если мышь перестала быть активна во время движения
    var event = eventsUnify(e);
    distX = event.pageX - startX;
    distY = event.pageY - startY;
    if (Math.abs(distX) > Math.abs(distY)) dir = distX < 0 ? "left" : "right";else dir = distY < 0 ? "up" : "down";
  };

  /*
   * Обработчик окончания касания указателем.
   * @param e {Event} - получает событие.
   */
  var checkEnd = function checkEnd(e) {
    if (isMouse && !isMouseDown) {
      // выход из функции и сброс проверки нажатия мыши
      isMouseDown = false;
      return;
    }
    var endTime = new Date().getTime();
    var time = endTime - startTime;
    if (time >= settings.minTime && time <= settings.maxTime) {
      // проверка времени жеста
      if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
        swipeType = dir; // опредление типа свайпа как "left" или "right"
      } else if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
        swipeType = dir; // опредление типа свайпа как "top" или "down"
      }
    }
    dist = dir === "left" || dir === "right" ? Math.abs(distX) : Math.abs(distY); // опредление пройденной указателем дистанции

    // генерация кастомного события swipe
    if (!swipeFired && swipeType !== "none" && dist >= settings.minDist) {
      swipeFired = true; // предотвратить повторное срабатывание
      var swipeEvent = new CustomEvent("swipe", {
        bubbles: true,
        cancelable: true,
        detail: {
          full: e,
          // полное событие Event
          dir: swipeType,
          // направление свайпа
          dist: dist,
          // дистанция свайпа
          time: time // время, потраченное на свайп
        }
      });
      el.dispatchEvent(swipeEvent);
    }
  };

  // добавление поддерживаемых событий
  var events = getSupportedEvents();

  // проверка наличия мыши
  if (support.pointer && !support.touch || events.type === "mouse") isMouse = true;

  // добавление обработчиков на элемент
  el.addEventListener(events.start, checkStart);
  el.addEventListener(events.move, checkMove);
  el.addEventListener(events.end, checkEnd);
  if (support.pointer && support.touch) {
    el.addEventListener('lostpointercapture', checkEnd);
  }
};
"use strict";

// swiper function

var initialSwipe = variation => {
  if (isMobileActive()) {
    var swipeWrapper = variation == "start" ? document.querySelectorAll('[swipe="wait"]') : document.querySelectorAll('[swipe]:not([swipe="wait"])');
    if (swipeWrapper.length == 0) {
      return;
    }
    var _loop = function _loop() {
      var swipeParent = swipeWrapper[a].querySelector('[swipe-content-parent]');
      if (!swipeParent) {
        return 1; // continue
      }
      var swipeBlocks = swipeParent.childNodes;
      var swipeTarget = swipeParent.parentNode;
      var paginationWrapper = swipeWrapper[a].querySelector('.pagination');
      var paginationBlocks = swipeWrapper[a].querySelector('.pagination__block');
      var distance = -(swipeBlocks[0].offsetWidth + parseInt(getComputedStyle(swipeBlocks[0], true).marginRight));
      if (swipeBlocks.length <= 1) {
        gsap.set(paginationWrapper, {
          opacity: "0%"
        });
      } else {
        for (var b = 1; b < swipeBlocks.length; b++) {
          var copy = paginationBlocks.cloneNode(false);
          paginationWrapper.append(copy);
          gsap.set(swipeBlocks[b], {
            opacity: 0.4
          });
        }
        paginationBlocks.classList.add('pagination__block--active');
        paginationBlocks = paginationWrapper.querySelectorAll('.pagination__block');
      }
      var swipeWatcher = 0;
      var startSwiper = event => {
        console.log('сработала функция');
        var swipeAnimation = step => {
          swipeWatcher += step;
          gsap.to(swipeParent, {
            x: "".concat(swipeWatcher * distance)
          });
          gsap.to(swipeBlocks[swipeWatcher], {
            overwrite: true,
            ease: "power1.inOut",
            duration: 0.4,
            opacity: 1
          });
          gsap.to(swipeBlocks[swipeWatcher - step], {
            overwrite: true,
            ease: "power1.inOut",
            duration: 0.4,
            opacity: 0.4
          });
          paginationBlocks[swipeWatcher].classList.add('pagination__block--active');
          paginationBlocks[swipeWatcher - step].classList.remove('pagination__block--active');
        };
        if (event.detail.dir == "left" && swipeWatcher != swipeBlocks.length - 1) {
          swipeAnimation(1);
        } else if (event.detail.dir == "right" && swipeWatcher != 0) {
          swipeAnimation(-1);
        }
      };
      swipe(swipeTarget, {
        maxTime: 2000,
        minTime: 10,
        maxDist: 2000,
        minDist: 10
      });
      swipeTarget.addEventListener('swipe', e => {
        console.log('евент листенер сработал');
        startSwiper(e);
      });
    };
    for (var a = 0; a < swipeWrapper.length; a++) {
      if (_loop()) continue;
    }
  }
};
initialSwipe();
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  var themeCheckboxWrapper = !isMobileActive() ? document.querySelector(".checkbox-wrapper--desktop") : document.querySelector(".checkbox-wrapper--mobile");
  console.log(themeCheckboxWrapper);
  var themeCheckbox = themeCheckboxWrapper.querySelector(".theme-checkbox");
  var animateTab = themeCheckboxWrapper.querySelector(".slider__tab");

  // проверка на главную страницу
  var isHomePage = () => "/".includes(window.location.pathname);
  var darkTheme = {
    "--grey-dark": "#232323",
    "--white": "white",
    "--black": "#000",
    "--light-grey": "#f6f7f9",
    "--grey": "#c9c9c9",
    "--green": "#46d386",
    "--dark-grey": "#232323",
    "--medium-grey": "#545454",
    "--dark-grey-nav": "#232323",
    "--white-main": "white",
    "--black-main": "#000"
  };
  var lightTheme = {
    "--grey-dark": "#f6f7f9",
    "--white": "#000",
    "--black": "#fff",
    "--light-grey": "#232323",
    "--grey": "#545454",
    "--green": "#46d386",
    "--dark-grey": "#F6F7F9",
    "--medium-grey": "#C9C9C9",
    "--dark-grey-nav": "#F6F7F9",
    "--white-main": "#000",
    "--black-main": "white"

    // проверка на главную страницу - удалить если не понадобится
    //  "--white-main": isHomePage() ? "white" : "#000",
    //  "--black-main": isHomePage() ? "#000" : "white",
  };
  var applyTheme = isLight => {
    var theme = isLight ? lightTheme : darkTheme;
    for (var variable in theme) {
      document.documentElement.style.setProperty(variable, theme[variable]);
    }

    // Attribute neon
    document.querySelectorAll("[glow-neon]").forEach(element => {
      var glowNeonImage = element.querySelector(".glow-neon__image");
      if (glowNeonImage) {
        var neonColor = element.getAttribute("glow-neon-color");
        if (neonColor === "orange") {
          glowNeonImage.setAttribute("src", isLight ? "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14ef71740bd02b75a370_orange_light-01.svg" : "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14ef8b685545f491ca58_orange_dark-01.svg");
        } else if (neonColor === "green") {
          glowNeonImage.setAttribute("src", isLight ? "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14efb11dd329978f9001_green_light-01.svg" : "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14f08a5ca7dec9275faf_green_dark-01.svg");
        } else {
          glowNeonImage.setAttribute("src", isLight ? "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14efb11dd329978f9001_green_light-01.svg" : "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14f08a5ca7dec9275faf_green_dark-01.svg");
        }
      }
    });

    // Timeline neon
    document.querySelectorAll(".timeline-awards__item .glow-neon__image").forEach(image => {
      image.setAttribute("src", isLight ? "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14efb11dd329978f9001_green_light-01.svg" : "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14f08a5ca7dec9275faf_green_dark-01.svg");
    });

    // Gradient fix
    document.querySelectorAll(".glow-neon__gradient").forEach(element => {
      if (element) {
        element.style.backgroundImage = isLight ? "linear-gradient(rgba(255, 255, 255, 0), #F6F7F9 40%)" : "linear-gradient(rgba(255, 255, 255, 0), #232323 40%)";
      }
    });

    // Project tags fix
    document.querySelectorAll(".project-item__tag, .key-projects__header-tag").forEach(element => {
      if (element) {
        element.style.backgroundColor = isLight ? "#f6f7f9" : "rgba(38, 38, 38, .3)";
      }
    });

    // home page video
    if (isHomePage()) {
      var videoDay = !isMobileActive() ? document.querySelector(".screen-1__video-day") : document.querySelector(".screen-1__image-day");
      var videoNight = !isMobileActive() ? document.querySelector(".screen-1__video-night") : document.querySelector(".screen-1__image-night");
      if (isLight) {
        videoDay.style.display = "block";
        videoNight.style.display = "none";
      } else {
        videoDay.style.display = "none";
        videoNight.style.display = "block";
      }
    }
  };
  themeCheckboxWrapper.addEventListener("click", () => {
    if (themeCheckbox.checked) {
      animateTab.classList.remove("slider__tab--active");
    } else {
      animateTab.classList.add("slider__tab--active");
    }
    setTimeout(() => {
      if (themeCheckbox.checked) {
        localStorage.setItem("storageTheme", 0);
        themeCheckbox.checked = false;
        applyTheme(false);
      } else {
        localStorage.setItem("storageTheme", 1);
        themeCheckbox.checked = true;
        applyTheme(true);
      }
    }, 500);
  });

  // Initial theme application and specific styles restoration
  if (localStorage.getItem("storageTheme") != null && localStorage.getItem("storageTheme") != 0) {
    animateTab.classList.add("slider__tab--active");
    themeCheckbox.checked = true;
    applyTheme(true);
  }
});
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".tooltips")) {
    return;
  }

  // Get the paragraph element
  var paragraph = document.querySelector('.multy-text__p');

  // Function to replace content between << and >> with <span>
  function replaceWithSpan(text) {
    // Regular expression to match content between << and >>
    var regex = /<<(.*?)>>/g;
    // Replace matched content with <span> element
    if (!isMobileActive()) {
      return text.replace(regex, (match, p1) => "<span class=\"multy-text__span\">".concat(p1, "<span class=\"multy-text__cover\"></span></span>"));
    } else {
      return text.replace(regex, (match, p1) => "".concat(p1));
    }
  }

  // Get the current text content of the paragraph
  var originalText = paragraph.textContent;
  // Replace the content and update the paragraph's HTML
  var updatedText = replaceWithSpan(originalText);
  paragraph.innerHTML = updatedText;
  if (!isMobileActive()) {
    var tooltips = document.querySelectorAll('.tooltip');
    var spans = document.querySelectorAll('.multy-text__span');
    var multyCoverArr = document.querySelectorAll('.multy-text__cover');

    // GSAP animations
    gsap.to(multyCoverArr, {
      delay: 1,
      opacity: 1,
      duration: 0.5
    });
    gsap.to(multyCoverArr, {
      delay: 1,
      width: "104%",
      duration: 1.5
    });

    // Map tooltips to their corresponding spans based on data-active-text attribute
    for (var a = 0; a < tooltips.length; a++) {
      var activeText = tooltips[a].getAttribute('data-active-text');
      var activeColor = tooltips[a].getAttribute('data-active-color');
      console.log(activeColor, true, activeColor == true);
      for (var b = 0; b < spans.length; b++) {
        if (spans[b].textContent.trim() === activeText) {
          spans[b].appendChild(tooltips[a]);
          if (activeColor === "true") {
            spans[b].classList.add('multy-text__span--green');
          } else {
            spans[b].classList.add('multy-text__span--gray');
          }
          break; // Assuming each tooltip matches only one span
        }
      }
    }

    // Add event listeners for hover effects
    var _loop = function _loop(_a) {
      spans[_a].addEventListener('mouseenter', e => {
        if (e.target !== e.currentTarget) {
          return;
        }
        var tooltip = spans[_a].querySelector('.tooltip');
        if (tooltip) {
          gsap.fromTo(tooltip, {
            y: "5rem",
            opacity: 0
          }, {
            y: "0rem",
            opacity: 1,
            duration: 0.45,
            ease: "power2.In",
            overwrite: true
          });
        }
      });
      spans[_a].addEventListener('mouseleave', e => {
        if (e.target !== e.currentTarget) {
          return;
        }
        var tooltip = spans[_a].querySelector('.tooltip');
        if (tooltip) {
          gsap.to(tooltip, {
            y: "5rem",
            opacity: 0,
            duration: 0.2,
            ease: "power2.In",
            overwrite: true
          });
        }
      });
    };
    for (var _a = 0; _a < spans.length; _a++) {
      _loop(_a);
    }
  }
});
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  var indexes = document.querySelectorAll(".vacancy__index_p");
  if (indexes.length === 0) {
    return 0;
  }
  indexes.forEach((index, i) => index.style.opacity = 0);
  indexes.forEach((index, i) => index.innerHTML = i + 1);
  indexes.forEach((index, i) => index.style.opacity = 1);
});
"use strict";

document.addEventListener('DOMContentLoaded', event => {
  // Function to convert date format from YYYY-MM-DD to DD-MMMM-YYYY
  function convertDateFormat(dateString) {
    var months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    var dateParts = dateString.split("-");
    var year = dateParts[0];
    var month = months[parseInt(dateParts[1], 10) - 1];
    var day = dateParts[2];
    return "".concat(day, " ").concat(month, " ").concat(year);
  }

  // Get all elements with the class 'time_format'
  var timeFormatElements = document.querySelectorAll('.time_format');
  if (timeFormatElements.length <= 0) {
    return 0;
  }
  ;

  // Iterate over each element and replace the date format
  timeFormatElements.forEach(element => {
    var originalDate = element.textContent.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(originalDate)) {
      // Check if it matches the YYYY-MM-DD format
      var newDate = convertDateFormat(originalDate);
      element.textContent = newDate;
    }
  });
  gsap.to(".article-meta", {
    "opacity": "1"
  });
});
"use strict";

document.addEventListener("DOMContentLoaded", event => {
  var shareButton = document.querySelector(".share-btn");
  if (shareButton) {
    shareButton.addEventListener("click", () => {
      // Create a temporary textarea element
      var textarea = document.createElement("textarea");
      textarea.value = window.location.href;

      // Add the textarea to the document
      document.body.appendChild(textarea);

      // Select the text inside the textarea
      textarea.select();

      // Copy the selected text to the clipboard
      document.execCommand("copy");

      // Remove the textarea from the document
      document.body.removeChild(textarea);
      gsap.set(".creator__link-copy", {
        display: "flex",
        opacity: "0",
        y: "140%"
      });
      gsap.to(".creator__link-copy", {
        opacity: "1",
        y: "0%"
      });
    });
  }
});
"use strict";

var servicesArr = document.querySelectorAll('.services-practice-collection__item');
for (var a = 0; a < servicesArr.length; a++) {
  servicesArr[a].querySelector('.services-practice-card__counter').textContent = a + 1;
}
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelectorAll('.main-screen-news-item').length == 0) {
    return;
  }
  var newsItems = document.querySelectorAll('.main-screen-news-item');
  var totalLine = document.querySelector('.slider__total-line');
  var leftArrow = document.querySelector('.slider__arrow-wrapper_first');
  var rightArrow = document.querySelector('.slider__arrow-wrapper_last');
  var currentIndex = 0;
  var totalWidth = 100;
  var itemWidth = totalWidth / newsItems.length;
  totalLine.style.width = "".concat(itemWidth, "%");
  var updatePaginationLine = targetIndex => {
    gsap.to(totalLine, {
      duration: 0.4,
      ease: "power1.inOut",
      x: "".concat(targetIndex * 100, "%")
    });
  };
  var updateArrows = targetIndex => {
    leftArrow.classList.toggle('slider__arrow-wrapper--disabled', targetIndex === 0);
    rightArrow.classList.toggle('slider__arrow-wrapper--disabled', targetIndex === newsItems.length - 1);
  };
  var changeSlide = newIndex => {
    if (newIndex < 0 || newIndex >= newsItems.length || newIndex === currentIndex) return;
    gsap.to(newsItems[currentIndex], {
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.5
    });
    gsap.to(newsItems[currentIndex], {
      duration: 0.5,
      ease: "power1.in",
      x: "5rem",
      onStart: () => {
        updatePaginationLine(newIndex);
        updateArrows(newIndex);
      },
      onComplete: () => {
        newsItems[currentIndex].style.display = 'none';
        currentIndex = newIndex;
        newsItems[currentIndex].style.display = 'flex';
        gsap.fromTo(newsItems[currentIndex], {
          opacity: 0
        }, {
          duration: 0.5,
          ease: "power1.inOut",
          opacity: 1
        });
        gsap.fromTo(newsItems[currentIndex], {
          x: "-5rem"
        }, {
          duration: 0.5,
          ease: "power1.Out",
          x: "0rem"
        });
      }
    });
  };
  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) changeSlide(currentIndex - 1);
  });
  rightArrow.addEventListener('click', () => {
    if (currentIndex < newsItems.length - 1) changeSlide(currentIndex + 1);
  });

  // Initialize the slider
  newsItems[currentIndex].style.display = 'flex';
});
"use strict";

/* screen-6 */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".timeline-main-collection__wrapper")) {
    return;
  }

  // initial setup
  var activeBlock = document.querySelector(".screen-6");
  var arrTimeline = activeBlock.querySelectorAll(".timeline-main-collection__item");
  arrTimeline[0].querySelector(".timeline-main-collection__all-content").style.display = "flex";
  var arrYears = activeBlock.querySelectorAll(".timeline-collection__item");
  var leftTimelinelArrow = activeBlock.querySelector(".timeline__arrow-wrapper_left");
  var rightTimelinelArrow = activeBlock.querySelector(".timeline__arrow-wrapper_right");
  gsap.set(arrYears[0].querySelector(".timeline__line-years-item-p"), {
    fontWeight: "700",
    color: "var(--white)"
  });
  gsap.set(arrYears[0].querySelector(".timeline__line-years-decor-circle"), {
    scale: !isMobileActive() ? 2.2 : 1.8
  });
  var observerWatcher = null;
  var arrTlCardsWrapper = null;
  var arrTlCards = null;
  var arrTlAwards = null;
  var yearWrapperAnimate = null;
  var tlYearFirst = null;
  var tlYearSecond = null;
  if (!isMobileActive()) {
    yearWrapperAnimate = activeBlock.querySelector(".timeline__year-wrapper-animate");
    tlYearFirst = activeBlock.querySelector(".timeline__year--first");
    tlYearSecond = activeBlock.querySelector(".timeline__year--second");
    leftTimelinelArrow.style.opacity = "40%";
    leftTimelinelArrow.style.pointerEvents = "none";
    tlYearFirst.textContent = arrYears[0].textContent;
  }

  // setting up the inner card slider and awards when CMS finish load
  var startSortElements = () => {
    for (var a = 0; a < arrTimeline.length; a++) {
      var arrFirstCardsWrapper = arrTimeline[a].querySelector(".timeline-card__wrapper");
      if (!isMobileActive() && arrFirstCardsWrapper) {
        var arrFirstCards = arrFirstCardsWrapper.childNodes;
        var cardOffset = 3.75;

        // checking the amount of cards and start layout 
        if (arrFirstCards.length < 5 && arrFirstCards.length > 2) {
          arrFirstCardsWrapper.innerHTML += arrFirstCardsWrapper.innerHTML;
        } else if (arrFirstCards.length == 2) {
          arrFirstCardsWrapper.innerHTML += arrFirstCardsWrapper.innerHTML + arrFirstCardsWrapper.innerHTML;
        }
        arrTlCardsWrapper = arrTimeline[0].querySelector(".timeline-card__wrapper");
        arrTlCards = Array.from(arrTlCardsWrapper.childNodes);
        if (arrFirstCards.length == 1) {
          gsap.set(arrTimeline[a].querySelector(".timeline-main-collection__right-nav"), {
            opacity: "0%",
            pointerEvents: "none"
          });
          gsap.set(arrTimeline[a].querySelector(".timeline-main-collection__left-nav"), {
            opacity: "0%",
            pointerEvents: "none"
          });
        } else {
          for (var b = arrFirstCards.length - 1; b >= 0; b--) {
            // add an attribute to track the card position
            arrFirstCards[b].setAttribute("data-anim-stage", arrFirstCards.length - b);
            // start cards layout
            if (b > arrFirstCards.length - 5 && b != arrFirstCards.length - 1) {
              gsap.set(arrFirstCards[b].querySelector(".timeline-card__main"), {
                opacity: "80%"
              });
              gsap.set(arrFirstCards[b], {
                x: "".concat(cardOffset, "rem")
              });
              cardOffset += 3.75;
            } else if (b != arrFirstCards.length - 1) {
              gsap.set(arrFirstCards[b].querySelector(".timeline-card__main"), {
                opacity: "80%"
              });
              gsap.set(arrFirstCards[b], {
                display: "none",
                opacity: "0%"
              });
            }
          }
        }
      }

      // awards start first layout
      var awardFirstContent = arrTimeline[a].querySelector(".timeline-awards__content");
      var awardFirstContentStatic = arrTimeline[a].querySelector(".timeline-awards__content-static");
      if (awardFirstContent) {
        gsap.set(awardFirstContent, {
          opacity: "100%",
          y: "0rem"
        });
        gsap.set(awardFirstContentStatic, {
          borderTopColor: "var(--white)"
        });
        gsap.set(awardFirstContentStatic.querySelector(".glow-neon__image"), {
          opacity: 1,
          scaleX: 1.65,
          filter: "saturate(100%)"
        });
        gsap.set(awardFirstContentStatic.querySelector(".glow-neon"), {
          opacity: 1
        });
        gsap.set(awardFirstContentStatic.querySelector(".glow-neon__gradient"), {
          yPercent: 80,
          opacity: 1
        });
      }
    }
  };

  // animation of cards
  var avastCards = 0;

  // animation attribute control
  var attributeSwap = mode => {
    // Get current attribute values
    var currentStages = arrTlCards.map(el => parseInt(el.getAttribute("data-anim-stage"), 10));
    var newStages = null;
    if (mode == 1) {
      // Shift attribute values one position backward
      newStages = [...currentStages.slice(1), currentStages[0]];
    } else {
      // Shift attribute values one position forward
      newStages = [currentStages[arrTlCards.length - 1], ...currentStages.slice(0, arrTlCards.length - 1)];
    }
    // Apply new attribute values
    arrTlCards.forEach((el, index) => {
      el.setAttribute("data-anim-stage", newStages[index]);
      el.style.zIndex = -newStages[index];
    });
  };
  var startCardSlider = (mode, event) => {
    if (!isMobileActive()) {
      var tlCardSlider = gsap.timeline({
        autoRemoveChildren: true,
        defaults: {
          ease: "power1.inOut",
          duration: 0.5
        },
        onStart: () => {
          avastCards = 1;
        },
        onComplete: () => {
          avastCards = 0;
          attributeSwap(mode);
        }
      });
      if (mode == 1) {
        tlCardSlider.set(arrTlCardsWrapper.querySelector("[data-anim-stage=\"5\"]"), {
          x: "11.25rem"
        }).to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"1\"]"), {
          x: "-40%",
          opacity: 0
        }).to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"2\"]"), {
          x: "0rem"
        }, "<").to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"2\"] .timeline-card__main"), {
          opacity: 1
        }, "<").to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"3\"]"), {
          x: "3.75rem"
        }, ">-=0.4").to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"4\"]"), {
          x: "7.5rem"
        }, ">-=0.4").to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"5\"]"), {
          display: "block",
          opacity: 1
        }, "<").set(arrTlCardsWrapper.querySelector("[data-anim-stage=\"1\"]"), {
          display: "none"
        }).to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"1\"] .timeline-card__main"), {
          opacity: 0.8
        }, "<");
      } else {
        tlCardSlider.set(arrTlCardsWrapper.querySelector("[data-anim-stage=\"".concat(arrTlCards.length, "\"]")), {
          x: "-40%",
          zIndex: 1
        }).to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"".concat(arrTlCards.length, "\"]")), {
          display: "block",
          x: "0%",
          opacity: 1
        }).to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"".concat(arrTlCards.length, "\"] .timeline-card__main")), {
          opacity: 1
        }, "<").to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"1\"]"), {
          x: "3.75rem"
        }, "<").to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"1\"] .timeline-card__main"), {
          opacity: 0.8
        }, "<").to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"2\"]"), {
          x: "7.5rem"
        }, ">-=0.4").to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"3\"]"), {
          x: "11.25rem"
        }, ">-=0.4").to(arrTlCardsWrapper.querySelector("[data-anim-stage=\"4\"]"), {
          display: "none",
          opacity: 0
        }, ">-=0.4").set(arrTlCardsWrapper.querySelector("[data-anim-stage=\"4\"]"), {
          x: "0rem"
        });
      }
    }
  };
  // add cards event listener
  for (var a = 0; a < arrTimeline.length; a++) {
    if (!isMobileActive()) {
      arrTimeline[a].querySelector(".timeline-main-collection__left-nav").addEventListener("click", () => {
        if (avastCards == 0) {
          startCardSlider(2, null);
        }
      });
      arrTimeline[a].querySelector(".timeline-main-collection__right-nav").addEventListener("click", () => {
        if (avastCards == 0) {
          startCardSlider(1, null);
        }
      });
    }
  }

  // animation of awards
  var awardsTarget = 0;
  var lineAwardsTarget = 0;
  var avastAwardsAnim = 0;
  var gradientRight = null;
  var blockRight = null;
  var gradientLeft = null;
  var blockLeft = null;
  var slideLineAwards = step => {
    if (!isMobileActive() && arrTlAwards.length > 4) {
      // animation of awards line
      var animation = a => {
        gsap.to(arrTlAwards[0].parentNode, {
          ease: "power1.inOut",
          duration: 1,
          x: "-=".concat(14.53125 * a, "rem"),
          onStart: () => {
            avastAwardsAnim = 1;
          },
          onComplete: () => {
            avastAwardsAnim = 0;
          }
        });
      };
      var avaibleAwardsRightState = arrTlAwards.length - 4 - lineAwardsTarget;
      var avaibleAwardsLeftState = arrTlAwards.length - 4 - avaibleAwardsRightState;

      // animation of line conditions: first - forward direction steps, second - disable triggering at start position
      if (step > 0 && awardsTarget + step != 1) {
        // inner conditions: first - available space check, second - comparison of available space and step
        if (avaibleAwardsRightState > 0 && step < avaibleAwardsRightState) {
          // let count = step > 1 ? step - 1 : step (analogue)
          var count = awardsTarget + step - lineAwardsTarget - 1;
          animation(count);
          lineAwardsTarget += count;
        } else if (avaibleAwardsRightState > 0 && step >= avaibleAwardsRightState) {
          animation(avaibleAwardsRightState);
          lineAwardsTarget += avaibleAwardsRightState;
        }
        // animation of line conditions: first - backward direction steps, second - disable triggering at last position
      } else if (step < 0 && awardsTarget + step != arrTlAwards.length - 2) {
        // inner conditions: first - available space check, second - comparison of available space and step
        if (avaibleAwardsLeftState > 0 && -step < avaibleAwardsLeftState) {
          // let count = step < -1 ? step + 1 : step (analogue)
          var _count = awardsTarget + step - lineAwardsTarget - 2;
          animation(_count);
          lineAwardsTarget += _count;
        } else if (avaibleAwardsLeftState > 0 && -step >= avaibleAwardsLeftState) {
          animation(-avaibleAwardsLeftState);
          lineAwardsTarget += -avaibleAwardsLeftState;
        }
      }

      // animation of gradients conditions
      if (gradientRight == null) {
        gradientRight = arrTimeline[mainWatcher].querySelector(".timeline-awards__gradient");
        blockRight = arrTimeline[mainWatcher].querySelector(".time-line-awards__block");
      }
      if (lineAwardsTarget < arrTlAwards.length - 4) {
        gsap.set(blockRight, {
          overwrite: true,
          opacity: 1
        });
        gsap.to(gradientRight, {
          overwrite: true,
          ease: "power2.Out",
          duration: 0.6,
          opacity: 1
        });
      } else {
        gsap.to(gradientRight, {
          overwrite: true,
          ease: "power2.Out",
          duration: 0.6,
          opacity: 0
        });
        gsap.set(blockRight, {
          overwrite: true,
          delay: 1,
          opacity: 0
        });
      }
      if (gradientLeft == null) {
        gradientLeft = arrTimeline[mainWatcher].querySelector(".timeline-awards__gradient-2");
        blockLeft = arrTimeline[mainWatcher].querySelector(".time-line-awards__block-2");
      }
      if (lineAwardsTarget >= 1) {
        gsap.set(blockLeft, {
          overwrite: true,
          opacity: 1
        });
        gsap.to(gradientLeft, {
          overwrite: true,
          ease: "power2.Out",
          duration: 0.6,
          opacity: 1
        });
      } else {
        gsap.to(gradientLeft, {
          overwrite: true,
          ease: "power2.Out",
          duration: 0.6,
          opacity: 0
        });
        gsap.set(blockLeft, {
          overwrite: true,
          delay: 1,
          opacity: 0
        });
      }
    }
  };
  var startActiveAwards = mode => {
    var awardsContentWrapper = arrTlAwards[awardsTarget + mode].querySelector(".timeline-awards__content");
    var awardsContentWrapperPast = arrTlAwards[awardsTarget].querySelector(".timeline-awards__content");
    var awardsContentStaticWrapper = arrTlAwards[awardsTarget + mode].querySelector(".timeline-awards__content-static");
    var awardsContentStaticWrapperPast = arrTlAwards[awardsTarget].querySelector(".timeline-awards__content-static");
    var tlActiveAwards = gsap.timeline({
      autoRemoveChildren: true,
      defaults: {
        ease: "power2.Out",
        duration: 0.6
      },
      onStart: () => {
        avastAwardsAnim = 1;
      },
      onComplete: () => {
        avastAwardsAnim = 0;
      }
    })

    //animation of the content part 1
    .set(awardsContentWrapper, {
      yPercent: 30
    }).set(awardsContentStaticWrapper, {
      borderTopColor: "var(--white)"
    }).set(awardsContentStaticWrapperPast, {
      borderTopColor: "var(--grey)"
    }).to(awardsContentWrapperPast, {
      yPercent: 30
    }).to(awardsContentWrapperPast, {
      duration: 0.3,
      opacity: 0
    }, "<")

    //animation of the glow-neon past target
    .to(arrTlAwards[awardsTarget].querySelector(".glow-neon__image"), {
      ease: "power2.In",
      duration: 0.45,
      opacity: 0,
      scaleX: 1.55,
      filter: "saturate(80%)"
    }, "<").to(arrTlAwards[awardsTarget].querySelector(".glow-neon"), {
      ease: "power2.In",
      duration: 0.45,
      opacity: 0
    }, "<").to(arrTlAwards[awardsTarget].querySelector(".glow-neon__gradient"), {
      ease: "power2.In",
      duration: 0.45,
      yPercent: 0
    }, "<")

    //animation of the glow-neon current target
    .to(arrTlAwards[awardsTarget + mode].querySelector(".glow-neon__image"), {
      duration: 0.75,
      opacity: 1,
      scaleX: 1.65,
      filter: "saturate(100%)"
    }, "<").to(arrTlAwards[awardsTarget + mode].querySelector(".glow-neon"), {
      duration: 0.75,
      opacity: 1
    }, "<").to(arrTlAwards[awardsTarget + mode].querySelector(".glow-neon__gradient"), {
      duration: 0.75,
      yPercent: 80
    }, "<")

    //animation of the content part 2
    .to(awardsContentWrapper, {
      yPercent: 0
    }, "<").to(awardsContentWrapper, {
      duration: 0.3,
      opacity: 1
    }, "<");
  };

  // adding awards event listeners and setting up
  var eventlistenerAwards = () => {
    for (var _a = 0; _a < arrTimeline.length; _a++) {
      var _arrTlAwards = arrTimeline[_a].querySelectorAll(".timeline-awards__item");
      if (_arrTlAwards.length < 5 && !isMobileActive()) {
        arrTimeline[_a].querySelector(".timeline-awards__gradient").style.display = "none";
      }
      var _loop = function _loop(b) {
        _arrTlAwards[b].addEventListener("click", () => {
          if (awardsTarget != b && avastAwardsAnim != 1) {
            slideLineAwards(b - awardsTarget);
            startActiveAwards(b - awardsTarget);
            awardsTarget = b;
          }
        });
      };
      for (var b = 0; b < _arrTlAwards.length; b++) {
        _loop(b);
      }
    }
  };

  // timeline animation and reset functions
  var resetCards = () => {
    // select new tab cards elements
    arrTlCardsWrapper = arrTimeline[mainWatcher].querySelector(".timeline-card__wrapper");
    arrTlCards = Array.from(arrTlCardsWrapper.childNodes);
  };
  var resetAwards = () => {
    // reset for 4+ awards tabs
    if (awardsTarget != 0) {
      if (arrTlAwards.length > 4 && !isMobileActive()) {
        gsap.set(arrTlAwards[0].parentNode, {
          x: "0rem"
        });
        gsap.set([blockLeft, gradientLeft], {
          opacity: 0
        });
        gsap.set([blockRight, gradientRight], {
          opacity: 1
        });
      }
      // reset for active awards on tabs
      startActiveAwards(0 - awardsTarget);
    }
    arrTlAwards = arrTimeline[mainWatcher].querySelectorAll(".timeline-awards__item");
    gradientRight = null;
    blockRight = null;
    gradientLeft = null;
    blockLeft = null;
    lineAwardsTarget = 0;
    awardsTarget = 0;
  };
  var avastTimeline = 0;
  var mainWatcher = 0;
  var timelineWrapper = activeBlock.querySelector(".timeline-main-collection__wrapper");
  var startTimeline = mode => {
    var mainColectionLeftPast = arrTimeline[mainWatcher].querySelector(".timeline-main-collection__left");
    var mainColectionImagePast = arrTimeline[mainWatcher].querySelector(".timeline-main-collection__image");
    var mainColectionAllPast = arrTimeline[mainWatcher].querySelector(".timeline-main-collection__all-content");
    var mainColectionLeft = arrTimeline[mainWatcher - mode].querySelector(".timeline-main-collection__left");
    var mainColectionImage = arrTimeline[mainWatcher - mode].querySelector(".timeline-main-collection__image");
    var mainColectionAll = arrTimeline[mainWatcher - mode].querySelector(".timeline-main-collection__all-content");
    var tlTimelineSlider = gsap.timeline({
      autoRemoveChildren: true,
      defaults: {
        ease: "power2.Out",
        duration: 0.6
      },
      onStart: () => {
        avastTimeline = 1;
      },
      onComplete: () => {
        avastTimeline = 0;
        resetAwards();
        resetCards();
      }
    });
    var tlTimelineYears = gsap.timeline({
      autoRemoveChildren: true,
      defaults: {
        ease: "power2.out",
        duration: 0.6
      }
    });
    if (!isMobileActive()) {
      tlTimelineYears.set(tlYearSecond, {
        text: arrYears[mainWatcher - mode].textContent
      });
    }
    tlTimelineYears.set(arrYears[mainWatcher].querySelector(".timeline__line-years-item-p"), {
      fontWeight: !isMobileActive() ? 500 : 700,
      color: !isMobileActive() ? "var(--white)" : "var(--grey)"
    }).set(arrYears[mainWatcher - mode].querySelector(".timeline__line-years-item-p"), {
      fontWeight: 700,
      color: "var(--white)"
    }).to(arrYears[mainWatcher].querySelector(".timeline__line-years-decor-circle"), {
      scale: 1
    }).to(arrYears[mainWatcher - mode].querySelector(".timeline__line-years-decor-circle"), {
      scale: !isMobileActive() ? 2.4 : 1.8
    }, "<");
    if (!isMobileActive()) {
      tlTimelineYears.to(yearWrapperAnimate, {
        yPercent: -50
      }, "<").set(tlYearFirst, {
        text: arrYears[mainWatcher - mode].textContent
      }).set(yearWrapperAnimate, {
        yPercent: 0
      });
    }
    tlTimelineSlider.add(tlTimelineYears, "+=0").fromTo(mainColectionLeftPast, {
      x: "0rem",
      y: "0rem"
    }, {
      x: !isMobileActive() ? "-10rem" : "0rem",
      y: !isMobileActive() ? "0rem" : "4rem"
    }, "<").fromTo(mainColectionImagePast, {
      yPercent: 0
    }, {
      yPercent: 80
    }, "<").fromTo(mainColectionLeftPast, {
      opacity: 1
    }, {
      duration: 0.3,
      opacity: 0
    }, "<").fromTo(mainColectionImagePast, {
      opacity: 1
    }, {
      duration: 0.3,
      opacity: 0
    }, "<").set(mainColectionAll, {
      display: "flex"
    }).set(timelineWrapper, {
      x: "+=".concat(120 * mode, "%")
    }).set(mainColectionAllPast, {
      display: "none"
    }).fromTo(mainColectionLeft, {
      x: !isMobileActive() ? "-10rem" : "0rem",
      y: !isMobileActive() ? "0rem" : "4rem"
    }, {
      x: "0rem",
      y: "0rem"
    }, "<").fromTo(mainColectionImage, {
      yPercent: 80
    }, {
      yPercent: 0
    }, "<").fromTo(mainColectionLeft, {
      opacity: 0
    }, {
      duration: 0.3,
      opacity: 1
    }, "<").fromTo(mainColectionImage, {
      opacity: 0
    }, {
      duration: 0.3,
      opacity: 1
    }, "<");
  };

  // animation of main years line
  var lineMainWatcher = 0;
  var line = activeBlock.querySelector(".timeline-collection__wrapper");
  var slideLineYears = step => {
    if (!isMobileActive()) {
      var animation = a => {
        gsap.to(line, {
          ease: "power1.inOut",
          duration: 1,
          x: "-=".concat(7.65 * a, "rem")
        });
      };
      var avaibleMainRightState = arrTimeline.length - 15 - lineMainWatcher;
      var avaibleMainLeftState = arrTimeline.length - 15 - avaibleMainRightState;

      // animation of line conditions: first - forward direction steps, second - disable triggering at start position
      if (step > 0 && mainWatcher + step != 1) {
        // inner conditions: first - available space check, second - comparison of available space and step
        if (avaibleMainRightState > 0 && step < avaibleMainRightState) {
          var count = step > 1 ? step - 1 : step;
          animation(count);
          lineMainWatcher += count;
        } else if (avaibleMainRightState > 0 && step >= avaibleMainRightState) {
          animation(avaibleMainRightState);
          lineMainWatcher += avaibleMainRightState;
        }
        // animation of line conditions: first - backward direction steps, second - disable triggering at last position
      } else if (step < 0 && mainWatcher + step != arrTimeline.length - 2) {
        // inner conditions: first - available space check, second - comparison of available space and step
        if (avaibleMainLeftState > 0 && -step < avaibleMainLeftState) {
          var _count2 = step < -1 ? step + 1 : step;
          animation(_count2);
          lineMainWatcher += _count2;
        } else if (avaibleMainLeftState > 0 && -step >= avaibleMainLeftState) {
          animation(-avaibleMainLeftState);
          lineMainWatcher += -avaibleMainLeftState;
        }
      }
    }
  };

  // arrow update
  var arrowWatcherLeft = 1;
  var arrowWatcherRight = 0;
  var updateArrow = mode => {
    if (!isMobileActive()) {
      if (mode > 0) {
        if (arrowWatcherRight == 1 && mainWatcher < arrTimeline.length - 1) {
          arrowWatcherRight = 0;
          gsap.set(rightTimelinelArrow, {
            opacity: "100%",
            pointerEvents: "auto"
          });
        }
        if (mainWatcher == 0) {
          arrowWatcherLeft = 1;
          gsap.set(leftTimelinelArrow, {
            opacity: "40%",
            pointerEvents: "none"
          });
        }
      } else {
        if (arrowWatcherLeft == 1 && mainWatcher > 0) {
          arrowWatcherLeft = 0;
          gsap.set(leftTimelinelArrow, {
            opacity: "100%",
            pointerEvents: "auto"
          });
        }
        if (mainWatcher == arrTimeline.length - 1) {
          arrowWatcherRight = 1;
          gsap.set(rightTimelinelArrow, {
            opacity: "40%",
            pointerEvents: "none"
          });
        }
      }
    }
  };

  // timeline add years blocks addevent listener
  var _loop2 = function _loop2(_a2) {
    arrYears[_a2].addEventListener("click", () => {
      if (avastTimeline == 0 && _a2 != mainWatcher) {
        if (_a2 > mainWatcher) {
          startTimeline(-1 * (_a2 - mainWatcher));
          slideLineYears(_a2 - mainWatcher);
          mainWatcher += _a2 - mainWatcher;
          updateArrow(-1);
        } else {
          startTimeline(-1 * (_a2 - mainWatcher));
          slideLineYears(_a2 - mainWatcher);
          mainWatcher += _a2 - mainWatcher;
          updateArrow(1);
        }
      }
    });
  };
  for (var _a2 = 0; _a2 < arrTimeline.length; _a2++) {
    _loop2(_a2);
  }

  // timeline addevent add arrow listener
  activeBlock.querySelector(".timeline__arrow-wrapper_left").addEventListener("click", () => {
    if (avastTimeline == 0) {
      //console.log("step debug: ", -1)
      startTimeline(1);
      slideLineYears(-1);
      mainWatcher -= 1;
      if (!isMobileActive()) {
        updateArrow(1);
      }
    }
  });
  activeBlock.querySelector(".timeline__arrow-wrapper_right").addEventListener("click", () => {
    if (avastTimeline == 0) {
      //console.log("step debug: ", 1)
      startTimeline(-1);
      slideLineYears(1);
      mainWatcher += 1;
      if (!isMobileActive()) {
        updateArrow(-1);
      }
    }
  });

  // observer disconect and start setting up the inner card slider and awards
  var observer = new MutationObserver(mutations => {
    observerWatcher += 1;
    if (observerWatcher == arrTimeline.length) {
      arrTlCardsWrapper = activeBlock.querySelector(".timeline-card__wrapper");
      arrTlCards = Array.from(arrTlCardsWrapper.childNodes);
      arrTlAwards = activeBlock.querySelector(".timeline-awards__wrapper").childNodes;
      initialSwipe("start");
      eventlistenerAwards();
      startSortElements();
      observer.disconnect();
    }
  });
  observer.observe(activeBlock, {
    childList: true,
    subtree: true
  });
});
//# sourceMappingURL=all.js.map
