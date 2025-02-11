document.addEventListener("DOMContentLoaded", () => {
  const themeCheckboxWrapper = !isMobileActive()
    ? document.querySelector(".checkbox-wrapper--desktop")
    : document.querySelector(".checkbox-wrapper--mobile");
  console.log(themeCheckboxWrapper);
  const themeCheckbox = themeCheckboxWrapper.querySelector(".theme-checkbox");
  const animateTab = themeCheckboxWrapper.querySelector(".slider__tab");

  // проверка на главную страницу
  const isHomePage = () => "/".includes(window.location.pathname);

  const darkTheme = {
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
    "--black-main": "#000",
  };

  const lightTheme = {
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
    "--black-main": "white",

    // проверка на главную страницу - удалить если не понадобится
    //  "--white-main": isHomePage() ? "white" : "#000",
    //  "--black-main": isHomePage() ? "#000" : "white",
  };

  const applyTheme = (isLight) => {
    const theme = isLight ? lightTheme : darkTheme;
    for (const variable in theme) {
      document.documentElement.style.setProperty(variable, theme[variable]);
    }

    // Attribute neon
    document.querySelectorAll("[glow-neon]").forEach((element) => {
      const glowNeonImage = element.querySelector(".glow-neon__image");
      if (glowNeonImage) {
        const neonColor = element.getAttribute("glow-neon-color");
        if (neonColor === "orange") {
          glowNeonImage.setAttribute(
            "src",
            isLight
              ? "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14ef71740bd02b75a370_orange_light-01.svg"
              : "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14ef8b685545f491ca58_orange_dark-01.svg"
          );
        } else if (neonColor === "green") {
          glowNeonImage.setAttribute(
            "src",
            isLight
              ? "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14efb11dd329978f9001_green_light-01.svg"
              : "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14f08a5ca7dec9275faf_green_dark-01.svg"
          );
        } else {
          glowNeonImage.setAttribute(
            "src",
            isLight
              ? "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14efb11dd329978f9001_green_light-01.svg"
              : "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14f08a5ca7dec9275faf_green_dark-01.svg"
          );
        }
      }
    });

    // Timeline neon
    document
      .querySelectorAll(".timeline-awards__item .glow-neon__image")
      .forEach((image) => {
        image.setAttribute(
          "src",
          isLight
            ? "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14efb11dd329978f9001_green_light-01.svg"
            : "https://uploads-ssl.webflow.com/65e895026235ef420ec82141/660f14f08a5ca7dec9275faf_green_dark-01.svg"
        );
      });

    // Gradient fix
    document.querySelectorAll(".glow-neon__gradient").forEach((element) => {
      if (element) {
        element.style.backgroundImage = isLight
          ? "linear-gradient(rgba(255, 255, 255, 0), #F6F7F9 40%)"
          : "linear-gradient(rgba(255, 255, 255, 0), #232323 40%)";
      }
    });

    // Project tags fix
    document
      .querySelectorAll(".project-item__tag, .key-projects__header-tag")
      .forEach((element) => {
        if (element) {
          element.style.backgroundColor = isLight
            ? "#f6f7f9"
            : "rgba(38, 38, 38, .3)";
        }
      });

    // home page video
    if (isHomePage()) {
      const videoDay =  !isMobileActive() ? document.querySelector(".screen-1__video-day") : document.querySelector(".screen-1__image-day")
      const videoNight = !isMobileActive() ? document.querySelector(".screen-1__video-night") : document.querySelector(".screen-1__image-night")
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
  if (
    localStorage.getItem("storageTheme") != null &&
    localStorage.getItem("storageTheme") != 0
  ) {
    animateTab.classList.add("slider__tab--active");
    themeCheckbox.checked = true;
    applyTheme(true);
  }
});
