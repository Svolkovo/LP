/* screen-6 */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".timeline-main-collection__wrapper")) {
    return;
  }

  // initial setup
  const activeBlock = document.querySelector(".screen-6");

  const arrTimeline = activeBlock.querySelectorAll(
    ".timeline-main-collection__item"
  ); 
  arrTimeline[0].querySelector(
    ".timeline-main-collection__all-content"
  ).style.display = "flex";

  const arrYears = activeBlock.querySelectorAll(".timeline-collection__item");

  const leftTimelinelArrow = activeBlock.querySelector(
    ".timeline__arrow-wrapper_left"
  );
  const rightTimelinelArrow = activeBlock.querySelector(
    ".timeline__arrow-wrapper_right"
  );

  gsap.set(arrYears[0].querySelector(".timeline__line-years-item-p"), {
    fontWeight: "700",
    color: "var(--white)",
  });
  gsap.set(arrYears[0].querySelector(".timeline__line-years-decor-circle"), {
    scale: !isMobileActive() ? 2.2 : 1.8,
  });

  let observerWatcher = null;
  let arrTlCardsWrapper = null;
  let arrTlCards = null;
  let arrTlAwards = null;

  let yearWrapperAnimate = null;
  let tlYearFirst = null;
  let tlYearSecond = null;

  if (!isMobileActive()) {
    yearWrapperAnimate = activeBlock.querySelector(
      ".timeline__year-wrapper-animate"
    );
    tlYearFirst = activeBlock.querySelector(".timeline__year--first");
    tlYearSecond = activeBlock.querySelector(".timeline__year--second");

    leftTimelinelArrow.style.opacity = "40%";
    leftTimelinelArrow.style.pointerEvents = "none";
    tlYearFirst.textContent = arrYears[0].textContent;
  } 

  // setting up the inner card slider and awards when CMS finish load
  const startSortElements = () => {
    for (let a = 0; a < arrTimeline.length; a++) {  
      const arrFirstCardsWrapper = arrTimeline[a].querySelector(
        ".timeline-card__wrapper"
      ); 
      if (!isMobileActive() && arrFirstCardsWrapper) {
        const arrFirstCards = arrFirstCardsWrapper.childNodes;
        let cardOffset = 3.75;
 
        // checking the amount of cards and start layout 
        if (arrFirstCards.length < 5 && arrFirstCards.length > 2) {
          arrFirstCardsWrapper.innerHTML += arrFirstCardsWrapper.innerHTML;
        } else if (arrFirstCards.length == 2) {
          arrFirstCardsWrapper.innerHTML +=
            arrFirstCardsWrapper.innerHTML + arrFirstCardsWrapper.innerHTML;
        }

        arrTlCardsWrapper = arrTimeline[0].querySelector(
          ".timeline-card__wrapper"
        );
        arrTlCards = Array.from(arrTlCardsWrapper.childNodes);

        if (arrFirstCards.length == 1) {
          gsap.set(
            arrTimeline[a].querySelector(
              ".timeline-main-collection__right-nav"
            ),
            {
              opacity: "0%",
              pointerEvents: "none",
            }
          );
          gsap.set(
            arrTimeline[a].querySelector(".timeline-main-collection__left-nav"),
            {
              opacity: "0%",
              pointerEvents: "none",
            }
          );
        } else {
          for (let b = arrFirstCards.length - 1; b >= 0; b--) {
            // add an attribute to track the card position
            arrFirstCards[b].setAttribute(
              "data-anim-stage",
              arrFirstCards.length - b
            );
            // start cards layout
            if (b > arrFirstCards.length - 5 && b != arrFirstCards.length - 1) {
              gsap.set(arrFirstCards[b].querySelector(".timeline-card__main"), {
                opacity: "80%",
              });
              gsap.set(arrFirstCards[b], {
                x: `${cardOffset}rem`,
              });
              cardOffset += 3.75;
            } else if (b != arrFirstCards.length - 1) {
              gsap.set(arrFirstCards[b].querySelector(".timeline-card__main"), {
                opacity: "80%",
              });
              gsap.set(arrFirstCards[b], {
                display: `none`,
                opacity: `0%`,
              });
            }
          }
        }
      }

      // awards start first layout
      const awardFirstContent = arrTimeline[a].querySelector(
        ".timeline-awards__content"
      );
      const awardFirstContentStatic = arrTimeline[a].querySelector(
        ".timeline-awards__content-static"
      );
      if (awardFirstContent) {
        gsap.set(awardFirstContent, {
          opacity: "100%",
          y: "0rem",
        });
        gsap.set(awardFirstContentStatic, {
          borderTopColor: "var(--white)",
        });
        gsap.set(awardFirstContentStatic.querySelector(".glow-neon__image"), {
          opacity: 1,
          scaleX: 1.65,
          filter: "saturate(100%)",
        });
        gsap.set(awardFirstContentStatic.querySelector(".glow-neon"), {
          opacity: 1,
        });
        gsap.set(
          awardFirstContentStatic.querySelector(".glow-neon__gradient"),
          {
            yPercent: 80,
            opacity: 1,
          }
        );
      }
    }
  };

  // animation of cards
  let avastCards = 0;

  // animation attribute control
  const attributeSwap = (mode) => {
    // Get current attribute values
    const currentStages = arrTlCards.map((el) =>
      parseInt(el.getAttribute("data-anim-stage"), 10)
    );
    let newStages = null;
    if (mode == 1) {
      // Shift attribute values one position backward
      newStages = [...currentStages.slice(1), currentStages[0]];
    } else {
      // Shift attribute values one position forward
      newStages = [
        currentStages[arrTlCards.length - 1],
        ...currentStages.slice(0, arrTlCards.length - 1),
      ];
    }
    // Apply new attribute values
    arrTlCards.forEach((el, index) => {
      el.setAttribute("data-anim-stage", newStages[index]);
      el.style.zIndex = -newStages[index];
    });
  };

  const startCardSlider = (mode, event) => {
    if (!isMobileActive()) {
      const tlCardSlider = gsap.timeline({
        autoRemoveChildren: true,
        defaults: {
          ease: "power1.inOut",
          duration: 0.5,
        },
        onStart: () => {
          avastCards = 1;
        },
        onComplete: () => {
          avastCards = 0;
          attributeSwap(mode);
        },
      });
      if (mode == 1) {
        tlCardSlider
          .set(arrTlCardsWrapper.querySelector(`[data-anim-stage="5"]`), {
            x: `11.25rem`,
          })
          .to(arrTlCardsWrapper.querySelector(`[data-anim-stage="1"]`), {
            x: "-40%",
            opacity: 0,
          })
          .to(
            arrTlCardsWrapper.querySelector(`[data-anim-stage="2"]`),
            {
              x: `0rem`,
            },
            "<"
          )
          .to(
            arrTlCardsWrapper.querySelector(
              `[data-anim-stage="2"] .timeline-card__main`
            ),
            {
              opacity: 1,
            },
            "<"
          )
          .to(
            arrTlCardsWrapper.querySelector(`[data-anim-stage="3"]`),
            {
              x: `3.75rem`,
            },
            ">-=0.4"
          )
          .to(
            arrTlCardsWrapper.querySelector(`[data-anim-stage="4"]`),
            {
              x: `7.5rem`,
            },
            ">-=0.4"
          )
          .to(
            arrTlCardsWrapper.querySelector(`[data-anim-stage="5"]`),
            {
              display: "block",
              opacity: 1,
            },
            "<"
          )
          .set(arrTlCardsWrapper.querySelector(`[data-anim-stage="1"]`), {
            display: "none",
          })
          .to(
            arrTlCardsWrapper.querySelector(
              `[data-anim-stage="1"] .timeline-card__main`
            ),
            {
              opacity: 0.8,
            },
            "<"
          );
      } else {
        tlCardSlider
          .set(
            arrTlCardsWrapper.querySelector(
              `[data-anim-stage="${arrTlCards.length}"]`
            ),
            {
              x: "-40%",
              zIndex: 1,
            }
          )
          .to(
            arrTlCardsWrapper.querySelector(
              `[data-anim-stage="${arrTlCards.length}"]`
            ),
            {
              display: "block",
              x: "0%",
              opacity: 1,
            }
          )
          .to(
            arrTlCardsWrapper.querySelector(
              `[data-anim-stage="${arrTlCards.length}"] .timeline-card__main`
            ),
            {
              opacity: 1,
            },
            "<"
          )
          .to(
            arrTlCardsWrapper.querySelector(`[data-anim-stage="1"]`),
            {
              x: `3.75rem`,
            },
            "<"
          )
          .to(
            arrTlCardsWrapper.querySelector(
              `[data-anim-stage="1"] .timeline-card__main`
            ),
            {
              opacity: 0.8,
            },
            "<"
          )
          .to(
            arrTlCardsWrapper.querySelector(`[data-anim-stage="2"]`),
            {
              x: `7.5rem`,
            },
            ">-=0.4"
          )
          .to(
            arrTlCardsWrapper.querySelector(`[data-anim-stage="3"]`),
            {
              x: `11.25rem`,
            },
            ">-=0.4"
          )
          .to(
            arrTlCardsWrapper.querySelector(`[data-anim-stage="4"]`),
            {
              display: "none",
              opacity: 0,
            },
            ">-=0.4"
          )
          .set(arrTlCardsWrapper.querySelector(`[data-anim-stage="4"]`), {
            x: `0rem`,
          });
      }
    }
  };
  // add cards event listener
  for (let a = 0; a < arrTimeline.length; a++) {
    if (!isMobileActive()) {
      arrTimeline[a]
        .querySelector(".timeline-main-collection__left-nav")
        .addEventListener("click", () => {
          if (avastCards == 0) {
            startCardSlider(2, null);
          }
        });

      arrTimeline[a]
        .querySelector(".timeline-main-collection__right-nav")
        .addEventListener("click", () => {
          if (avastCards == 0) {
            startCardSlider(1, null);
          }
        });
    }
  }

  // animation of awards
  let awardsTarget = 0;
  let lineAwardsTarget = 0;
  let avastAwardsAnim = 0;

  let gradientRight = null;
  let blockRight = null;
  let gradientLeft = null;
  let blockLeft = null;

  const slideLineAwards = (step) => {
    if (!isMobileActive() && arrTlAwards.length > 4) {
      // animation of awards line
      const animation = (a) => {
        gsap.to(arrTlAwards[0].parentNode, {
          ease: "power1.inOut",
          duration: 1,
          x: `-=${14.53125 * a}rem`,
          onStart: () => {
            avastAwardsAnim = 1;
          },
          onComplete: () => {
            avastAwardsAnim = 0;
          },
        });
      };

      const avaibleAwardsRightState = arrTlAwards.length - 4 - lineAwardsTarget;
      const avaibleAwardsLeftState =
        arrTlAwards.length - 4 - avaibleAwardsRightState;

      // animation of line conditions: first - forward direction steps, second - disable triggering at start position
      if (step > 0 && awardsTarget + step != 1) {
        // inner conditions: first - available space check, second - comparison of available space and step
        if (avaibleAwardsRightState > 0 && step < avaibleAwardsRightState) {
          // let count = step > 1 ? step - 1 : step (analogue)
          let count = awardsTarget + step - lineAwardsTarget - 1;
          animation(count);
          lineAwardsTarget += count;
        } else if (
          avaibleAwardsRightState > 0 &&
          step >= avaibleAwardsRightState
        ) {
          animation(avaibleAwardsRightState);
          lineAwardsTarget += avaibleAwardsRightState;
        }
        // animation of line conditions: first - backward direction steps, second - disable triggering at last position
      } else if (step < 0 && awardsTarget + step != arrTlAwards.length - 2) {
        // inner conditions: first - available space check, second - comparison of available space and step
        if (avaibleAwardsLeftState > 0 && -step < avaibleAwardsLeftState) {
          // let count = step < -1 ? step + 1 : step (analogue)
          let count = awardsTarget + step - lineAwardsTarget - 2;
          animation(count);
          lineAwardsTarget += count;
        } else if (
          avaibleAwardsLeftState > 0 &&
          -step >= avaibleAwardsLeftState
        ) {
          animation(-avaibleAwardsLeftState);
          lineAwardsTarget += -avaibleAwardsLeftState;
        }
      }

      // animation of gradients conditions
      if (gradientRight == null) {
        gradientRight = arrTimeline[mainWatcher].querySelector(
          ".timeline-awards__gradient"
        );
        blockRight = arrTimeline[mainWatcher].querySelector(
          ".time-line-awards__block"
        );
      }
      if (lineAwardsTarget < arrTlAwards.length - 4) {
        gsap.set(blockRight, {
          overwrite: true,
          opacity: 1,
        });
        gsap.to(gradientRight, {
          overwrite: true,
          ease: "power2.Out",
          duration: 0.6,
          opacity: 1,
        });
      } else {
        gsap.to(gradientRight, {
          overwrite: true,
          ease: "power2.Out",
          duration: 0.6,
          opacity: 0,
        });
        gsap.set(blockRight, {
          overwrite: true,
          delay: 1,
          opacity: 0,
        });
      }

      if (gradientLeft == null) {
        gradientLeft = arrTimeline[mainWatcher].querySelector(
          ".timeline-awards__gradient-2"
        );
        blockLeft = arrTimeline[mainWatcher].querySelector(
          ".time-line-awards__block-2"
        );
      }
      if (lineAwardsTarget >= 1) {
        gsap.set(blockLeft, {
          overwrite: true,
          opacity: 1,
        });
        gsap.to(gradientLeft, {
          overwrite: true,
          ease: "power2.Out",
          duration: 0.6,
          opacity: 1,
        });
      } else {
        gsap.to(gradientLeft, {
          overwrite: true,
          ease: "power2.Out",
          duration: 0.6,
          opacity: 0,
        });
        gsap.set(blockLeft, {
          overwrite: true,
          delay: 1,
          opacity: 0,
        });
      }
    }
  };

  const startActiveAwards = (mode) => {
    const awardsContentWrapper = arrTlAwards[awardsTarget + mode].querySelector(
      ".timeline-awards__content"
    );
    const awardsContentWrapperPast = arrTlAwards[awardsTarget].querySelector(
      ".timeline-awards__content"
    );
    const awardsContentStaticWrapper = arrTlAwards[
      awardsTarget + mode
    ].querySelector(".timeline-awards__content-static");
    const awardsContentStaticWrapperPast = arrTlAwards[
      awardsTarget
    ].querySelector(".timeline-awards__content-static");

    const tlActiveAwards = gsap
      .timeline({
        autoRemoveChildren: true,
        defaults: {
          ease: "power2.Out",
          duration: 0.6,
        },
        onStart: () => {
          avastAwardsAnim = 1;
        },
        onComplete: () => {
          avastAwardsAnim = 0;
        },
      })

      //animation of the content part 1
      .set(awardsContentWrapper, {
        yPercent: 30,
      })
      .set(awardsContentStaticWrapper, {
        borderTopColor: "var(--white)",
      })
      .set(awardsContentStaticWrapperPast, {
        borderTopColor: "var(--grey)",
      })
      .to(awardsContentWrapperPast, {
        yPercent: 30,
      })
      .to(
        awardsContentWrapperPast,
        {
          duration: 0.3,
          opacity: 0,
        },
        "<"
      )

      //animation of the glow-neon past target
      .to(
        arrTlAwards[awardsTarget].querySelector(".glow-neon__image"),
        {
          ease: "power2.In",
          duration: 0.45,
          opacity: 0,
          scaleX: 1.55,
          filter: "saturate(80%)",
        },
        "<"
      )
      .to(
        arrTlAwards[awardsTarget].querySelector(".glow-neon"),
        {
          ease: "power2.In",
          duration: 0.45,
          opacity: 0,
        },
        "<"
      )
      .to(
        arrTlAwards[awardsTarget].querySelector(".glow-neon__gradient"),
        {
          ease: "power2.In",
          duration: 0.45,
          yPercent: 0,
        },
        "<"
      )

      //animation of the glow-neon current target
      .to(
        arrTlAwards[awardsTarget + mode].querySelector(".glow-neon__image"),
        {
          duration: 0.75,
          opacity: 1,
          scaleX: 1.65,
          filter: "saturate(100%)",
        },
        "<"
      )
      .to(
        arrTlAwards[awardsTarget + mode].querySelector(".glow-neon"),
        {
          duration: 0.75,
          opacity: 1,
        },
        "<"
      )
      .to(
        arrTlAwards[awardsTarget + mode].querySelector(".glow-neon__gradient"),
        {
          duration: 0.75,
          yPercent: 80,
        },
        "<"
      )

      //animation of the content part 2
      .to(
        awardsContentWrapper,
        {
          yPercent: 0,
        },
        "<"
      )
      .to(
        awardsContentWrapper,
        {
          duration: 0.3,
          opacity: 1,
        },
        "<"
      );
  };

  // adding awards event listeners and setting up
  const eventlistenerAwards = () => {
    for (let a = 0; a < arrTimeline.length; a++) {
      const arrTlAwards = arrTimeline[a].querySelectorAll(
        ".timeline-awards__item"
      );
      if (arrTlAwards.length < 5 && !isMobileActive()) {
        arrTimeline[a].querySelector(
          ".timeline-awards__gradient"
        ).style.display = "none";
      }
      for (let b = 0; b < arrTlAwards.length; b++) {
        arrTlAwards[b].addEventListener("click", () => {
          if (awardsTarget != b && avastAwardsAnim != 1) {
            slideLineAwards(b - awardsTarget);
            startActiveAwards(b - awardsTarget);
            awardsTarget = b;
          }
        });
      }
    }
  };

  // timeline animation and reset functions
  const resetCards = () => {
    // select new tab cards elements
    arrTlCardsWrapper = arrTimeline[mainWatcher].querySelector(
      ".timeline-card__wrapper"
    );
    arrTlCards = Array.from(arrTlCardsWrapper.childNodes);
  };

  const resetAwards = () => {
    // reset for 4+ awards tabs
    if (awardsTarget != 0) {
      if (arrTlAwards.length > 4 && !isMobileActive()) {
        gsap.set(arrTlAwards[0].parentNode, {
          x: `0rem`,
        });
        gsap.set([blockLeft, gradientLeft], {
          opacity: 0,
        });
        gsap.set([blockRight, gradientRight], {
          opacity: 1,
        });
      }
      // reset for active awards on tabs
      startActiveAwards(0 - awardsTarget);
    }

    arrTlAwards = arrTimeline[mainWatcher].querySelectorAll(
      ".timeline-awards__item"
    );

    gradientRight = null;
    blockRight = null;
    gradientLeft = null;
    blockLeft = null;

    lineAwardsTarget = 0;
    awardsTarget = 0;
  };

  let avastTimeline = 0;
  let mainWatcher = 0;
  const timelineWrapper = activeBlock.querySelector(
    ".timeline-main-collection__wrapper"
  );

  const startTimeline = (mode) => {
    const mainColectionLeftPast = arrTimeline[mainWatcher].querySelector(
      ".timeline-main-collection__left"
    );
    const mainColectionImagePast = arrTimeline[mainWatcher].querySelector(
      ".timeline-main-collection__image"
    );
    const mainColectionAllPast = arrTimeline[mainWatcher].querySelector(
      ".timeline-main-collection__all-content"
    );

    const mainColectionLeft = arrTimeline[mainWatcher - mode].querySelector(
      ".timeline-main-collection__left"
    );
    const mainColectionImage = arrTimeline[mainWatcher - mode].querySelector(
      ".timeline-main-collection__image"
    );
    const mainColectionAll = arrTimeline[mainWatcher - mode].querySelector(
      ".timeline-main-collection__all-content"
    );

    const tlTimelineSlider = gsap.timeline({
      autoRemoveChildren: true,
      defaults: {
        ease: "power2.Out",
        duration: 0.6,
      },
      onStart: () => {
        avastTimeline = 1;
      },
      onComplete: () => {
        avastTimeline = 0;
        resetAwards();
        resetCards();
      },
    });

    const tlTimelineYears = gsap.timeline({
      autoRemoveChildren: true,
      defaults: {
        ease: "power2.out",
        duration: 0.6,
      },
    });

    if (!isMobileActive()) {
      tlTimelineYears.set(tlYearSecond, {
        text: arrYears[mainWatcher - mode].textContent,
      });
    }
    tlTimelineYears
      .set(
        arrYears[mainWatcher].querySelector(".timeline__line-years-item-p"),
        {
          fontWeight: !isMobileActive() ? 500 : 700,
          color: !isMobileActive() ? "var(--white)" : "var(--grey)",
        }
      )
      .set(
        arrYears[mainWatcher - mode].querySelector(
          ".timeline__line-years-item-p"
        ),
        {
          fontWeight: 700,
          color: "var(--white)",
        }
      )
      .to(
        arrYears[mainWatcher].querySelector(
          ".timeline__line-years-decor-circle"
        ),
        {
          scale: 1,
        }
      )
      .to(
        arrYears[mainWatcher - mode].querySelector(
          ".timeline__line-years-decor-circle"
        ),
        {
          scale: !isMobileActive() ? 2.4 : 1.8,
        },
        "<"
      );
    if (!isMobileActive()) {
      tlTimelineYears
        .to(
          yearWrapperAnimate,
          {
            yPercent: -50,
          },
          "<"
        )
        .set(tlYearFirst, {
          text: arrYears[mainWatcher - mode].textContent,
        })
        .set(yearWrapperAnimate, {
          yPercent: 0,
        });
    }

    tlTimelineSlider
      .add(tlTimelineYears, "+=0")

      .fromTo(
        mainColectionLeftPast,
        {
          x: "0rem",
          y: "0rem",
        },
        {
          x: !isMobileActive() ? "-10rem" : "0rem",
          y: !isMobileActive() ? "0rem" : "4rem",
        },
        "<"
      )
      .fromTo(
        mainColectionImagePast,
        {
          yPercent: 0,
        },
        {
          yPercent: 80,
        },
        "<"
      )
      .fromTo(
        mainColectionLeftPast,
        {
          opacity: 1,
        },
        {
          duration: 0.3,
          opacity: 0,
        },
        "<"
      )
      .fromTo(
        mainColectionImagePast,
        {
          opacity: 1,
        },
        {
          duration: 0.3,
          opacity: 0,
        },
        "<"
      )
      .set(mainColectionAll, {
        display: "flex",
      })
      .set(timelineWrapper, {
        x: `+=${120 * mode}%`,
      })
      .set(mainColectionAllPast, {
        display: "none",
      })
      .fromTo(
        mainColectionLeft,
        {
          x: !isMobileActive() ? "-10rem" : "0rem",
          y: !isMobileActive() ? "0rem" : "4rem",
        },
        {
          x: "0rem",
          y: "0rem",
        },
        "<"
      )
      .fromTo(
        mainColectionImage,
        {
          yPercent: 80,
        },
        {
          yPercent: 0,
        },
        "<"
      )
      .fromTo(
        mainColectionLeft,
        {
          opacity: 0,
        },
        {
          duration: 0.3,
          opacity: 1,
        },
        "<"
      )
      .fromTo(
        mainColectionImage,
        {
          opacity: 0,
        },
        {
          duration: 0.3,
          opacity: 1,
        },
        "<"
      );
  };

  // animation of main years line
  let lineMainWatcher = 0;
  let line = activeBlock.querySelector(".timeline-collection__wrapper");
  const slideLineYears = (step) => {
    if (!isMobileActive()) {
      const animation = (a) => {
        gsap.to(line, {
          ease: "power1.inOut",
          duration: 1,
          x: `-=${7.65 * a}rem`,
        });
      };

      const avaibleMainRightState = arrTimeline.length - 15 - lineMainWatcher;
      const avaibleMainLeftState =
        arrTimeline.length - 15 - avaibleMainRightState;

      // animation of line conditions: first - forward direction steps, second - disable triggering at start position
      if (step > 0 && mainWatcher + step != 1) {
        // inner conditions: first - available space check, second - comparison of available space and step
        if (avaibleMainRightState > 0 && step < avaibleMainRightState) {
          let count = step > 1 ? step - 1 : step;
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
          let count = step < -1 ? step + 1 : step;
          animation(count);
          lineMainWatcher += count;
        } else if (avaibleMainLeftState > 0 && -step >= avaibleMainLeftState) {
          animation(-avaibleMainLeftState);
          lineMainWatcher += -avaibleMainLeftState;
        }
      }
    }
  };

  // arrow update
  let arrowWatcherLeft = 1;
  let arrowWatcherRight = 0;
  const updateArrow = (mode) => {
    if (!isMobileActive()) {
      if (mode > 0) {
        if (arrowWatcherRight == 1 && mainWatcher < arrTimeline.length - 1) {
          arrowWatcherRight = 0;
          gsap.set(rightTimelinelArrow, {
            opacity: "100%",
            pointerEvents: "auto",
          });
        }
        if (mainWatcher == 0) {
          arrowWatcherLeft = 1;
          gsap.set(leftTimelinelArrow, {
            opacity: "40%",
            pointerEvents: "none",
          });
        }
      } else {
        if (arrowWatcherLeft == 1 && mainWatcher > 0) {
          arrowWatcherLeft = 0;
          gsap.set(leftTimelinelArrow, {
            opacity: "100%",
            pointerEvents: "auto",
          });
        }
        if (mainWatcher == arrTimeline.length - 1) {
          arrowWatcherRight = 1;
          gsap.set(rightTimelinelArrow, {
            opacity: "40%",
            pointerEvents: "none",
          });
        }
      }
    }
  };

  // timeline add years blocks addevent listener
  for (let a = 0; a < arrTimeline.length; a++) {
    arrYears[a].addEventListener("click", () => {
      if (avastTimeline == 0 && a != mainWatcher) {
        if (a > mainWatcher) {
          startTimeline(-1 * (a - mainWatcher));
          slideLineYears(a - mainWatcher);
          mainWatcher += a - mainWatcher;
          updateArrow(-1);
        } else {
          startTimeline(-1 * (a - mainWatcher));
          slideLineYears(a - mainWatcher);
          mainWatcher += a - mainWatcher;
          updateArrow(1);
        }
      }
    });
  }

  // timeline addevent add arrow listener
  activeBlock
    .querySelector(".timeline__arrow-wrapper_left")
    .addEventListener("click", () => {
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

  activeBlock
    .querySelector(".timeline__arrow-wrapper_right")
    .addEventListener("click", () => {
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
  const observer = new MutationObserver((mutations) => {
    observerWatcher += 1;
    if (observerWatcher == arrTimeline.length) {
      arrTlCardsWrapper = activeBlock.querySelector(".timeline-card__wrapper");
      arrTlCards = Array.from(arrTlCardsWrapper.childNodes);
      arrTlAwards = activeBlock.querySelector(
        ".timeline-awards__wrapper"
      ).childNodes;
      initialSwipe("start");
      eventlistenerAwards();
      startSortElements();
      observer.disconnect();
    }
  });
  observer.observe(activeBlock, {
    childList: true,
    subtree: true,
  });
});
