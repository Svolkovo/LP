document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

  // adding glow-neon effects on blocks
  if (!isMobileActive()) {
    const glowBlocks = document.querySelectorAll("[glow-neon]");

    if (glowBlocks.length > 0) {
      for (let a = 0; a < glowBlocks.length; a++) {
        let glowTarget =
          glowBlocks[a].querySelector("[glow-target]") || glowBlocks[a];
          glowTarget.classList.add("glow-target");
        const glowNeon = document.querySelector(".glow-neon");
        let clone = glowNeon.cloneNode(true);
        if (glowBlocks[a].getAttribute("glow-neon-color") == "orange") {
          clone.querySelector(".glow-neon__image").src =
            "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14ef8b685545f491ca58_orange_dark-01.svg";
        } else if (glowBlocks[a].getAttribute("glow-neon-color") == "green") {
          clone.querySelector(".glow-neon__image").src =
            "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14f08a5ca7dec9275faf_green_dark-01.svg";
        }
        if (glowBlocks[a].hasAttribute("glow-neon-rotate")) {
          clone.style.transform = "rotateX(180deg)";
        }
        if (glowBlocks[a].hasAttribute("glow-neon-clipped")) {
          let scale = glowBlocks[a].getAttribute("glow-neon-clipped");
          //console.log(scale)
          clone.style.transform += `scaleY(${scale * 0.1}) translateY(${
            -scale * 100
          }%)`;
        }
        glowBlocks[a].addEventListener("mouseenter", () => {
          const tlNeonEnter = gsap.timeline({
            defaults: {
              ease: "power2.Out",
              duration: 0.75,
              overwrite: true,
            },
          });
          tlNeonEnter
            .to(clone.querySelector(".glow-neon__image"), {
              opacity: 1,
              scaleX: 1.65,
              filter: "saturate(100%)",
            })
            .to(
              clone,
              {
                opacity: 1,
              },
              "<"
            )
            .to(
              clone.querySelector(".glow-neon__gradient"),
              {
                yPercent: 80,
              },
              "<"
            );
        });
        glowBlocks[a].addEventListener("mouseleave", () => {
          const tlNeonLeave = gsap.timeline({
            defaults: {
              ease: "power2.In",
              duration: 0.45,
              overwrite: true,
            },
          });
          tlNeonLeave
            .to(clone.querySelector(".glow-neon__image"), {
              opacity: 0,
              scaleX: 1.55,
              filter: "saturate(80%)",
            })
            .to(
              clone,
              {
                opacity: 0,
              },
              "<"
            )
            .to(
              clone.querySelector(".glow-neon__gradient"),
              {
                yPercent: 0,
              },
              "<"
            );
        });
        glowTarget.append(clone);
      }
    }
  }

  // splitting the text to start the scrolling trigger animation
  let typeSplit = new SplitText("[text-split]", {
    types: "words",
    wordsClass: "word",
    tag: "div",
  });

  gsap.set("[text-split]", { opacity: 1 });

  // animation the appearance of text by words by scrolling
  const wordsSlideUp = document.querySelectorAll("[words-slide-up]");

  for (let a = 0; a < wordsSlideUp.length; a++) {
    gsap.from(wordsSlideUp[a].querySelectorAll(".word"), {
      scrollTrigger: {
        trigger: wordsSlideUp[a],
        start: "top 90%",
      },
      opacity: 0,
      yPercent: 60,
      duration: 1,
      ease: "power2.out",
      stagger: { amount: 0.5 },
    });
  }

  // animation the appearance of block by scrolling
  const blockSlideUp = document.querySelectorAll("[block-slide-up]");

  for (let a = 0; a < blockSlideUp.length; a++) {
    gsap.from(blockSlideUp[a], {
      scrollTrigger: {
        trigger: blockSlideUp[a],
        start: "top 90%",
      },
      opacity: 0,
      yPercent: 30,
      duration: 1,
      ease: "power2.out",
    });
  }

  // animation the stagger appearance of group of blocks by scrolling
  const blockSlideUpStagger = document.querySelectorAll(
    "[block-slide-up-stagger]"
  );

  for (let a = 0; a < blockSlideUpStagger.length; a++) {
    gsap.from(blockSlideUpStagger[a].querySelectorAll("[active-stagger]"), {
      scrollTrigger: {
        trigger: blockSlideUpStagger[a],
        start: "top 90%",
      },
      opacity: 0,
      yPercent: 30,
      duration: 1,
      ease: "power2.out",
      stagger: { amount: 0.5 },
    });
  }

  // animation the appearance of horizontal line by scrolling
  const horizontalLine = document.querySelectorAll(".line-horizontal");

  for (let a = 0; a < horizontalLine.length; a++) {
    gsap.fromTo(
      horizontalLine[a],
      {
        width: "0%",
      },
      {
        scrollTrigger: {
          trigger: horizontalLine[a],
          start: "top 90%",
        },
        duration: 1,
        ease: "power1.out",
        width: "100%",
      }
    );
  }

  // animation the appearance of bottom horizontal line by scrolling
  const horizontalLineBottom = document.querySelectorAll(
    ".line-horizontal--bottom-edge"
  );

  for (let a = 0; a < horizontalLineBottom.length; a++) {
    gsap.fromTo(
      horizontalLineBottom[a],
      {
        width: "0%",
      },
      {
        scrollTrigger: {
          trigger: horizontalLineBottom[a],
          start: "top 112%",
        },
        duration: 1,
        ease: "power1.out",
        width: "100%",
      }
    );
  }

  // animation the appearance of large horizontal line by scrolling
  const horizontalLineLarge = document.querySelectorAll(
    ".line-horizontal-large"
  );

  for (let a = 0; a < horizontalLineLarge.length; a++) {
    gsap.fromTo(
      horizontalLineLarge[a],
      {
        width: "0%",
      },
      {
        scrollTrigger: {
          trigger: horizontalLineLarge[a],
          start: "top 90%",
        },
        duration: 1.75,
        ease: "power1.out",
        width: "100%",
      }
    );
  }

  // animation the appearance of vertical line by scrolling
  const verticallLine = document.querySelectorAll(".line-vertical");

  for (let a = 0; a < verticallLine.length; a++) {
    gsap.fromTo(
      verticallLine[a],
      {
        height: "0%",
      },
      {
        scrollTrigger: {
          trigger: verticallLine[a],
          start: "top 90%",
        },
        duration: 1,
        ease: "power1.out",
        height: "100%",
      }
    );
  }
});
