function isMobile() {
    return window.innerWidth <= 768;
}
  



document.addEventListener("DOMContentLoaded", () => {
    const preloader =  document.querySelector(".preloader-new");
    //if(preloader === null) return;

    console.log(preloader);

    const firstLine = document.querySelector(".lineone-container");
    const secondLine = document.querySelector(".linetwo-container");

    const firstSvg  = firstLine.querySelector("svg");
    const secondSvg  = secondLine.querySelector("svg");

    const greenline = document.querySelector(".linegreen");

    gsap.set([firstLine, secondLine], {
        "overflow": "hidden",
        "position": "relative"
    });

    gsap.set(greenline, {
        "width": "0%",
    });

    gsap.set([firstSvg, secondSvg], {
        "y": "125%",
        // "position": "absolute"
    });


    gsap.set(".preloader-container", {
        "opacity": 1,
    });

    document.querySelector(".preloader-container").style.opacity = 1;

    const tl = gsap.timeline({defaults: {
        duration: 0.7,
    }});

    tl.to([firstSvg, secondSvg], {
        "y": "0%",
        stagger: 0.33,
        duration: 1
    }, );

    tl.to(greenline, {
        width: "100%",
    });

    // Находим верхнюю границу `greenline` и `preloader` относительно страницы
    const greenlineOffsetTop = greenline.getBoundingClientRect().top;
    const preloaderOffsetTop = preloader.getBoundingClientRect().top;

    // Вычисляем расстояние, чтобы поднять `greenline` до верхней границы `preloader`
    const distanceToTop = greenlineOffsetTop - preloaderOffsetTop;

    
    tl.to(greenline, {
        y: `-${distanceToTop}px`, 
        delay: 0.6,
        duration: 1.1,
    });

    tl.set(greenline, {
        transformOrigin: "center", // Устанавливаем точку трансформации в центр
    });

    tl.to(greenline, {
        x: "-70vw",
        width: "165vw", // расширяем до 120% от ширины экрана
        duration: 2,

        onComplete: () => {
            gsap.set(greenline, {
                "position": 'fixed',
                top: 0,
                left: 0,
                height: "1.5vh",
                width: "700vw"
            });

            gsap.set(preloader.querySelectorAll("svg"), {
                opacity: 0,
            });

            gsap.set(preloader, {
                width: "600vw"
            });


        }
    });

    tl.to(greenline, {
        y: `105vh`,
        duration: 2,
    }, "hide");

    tl.to(preloader, {
        y: `105vh`,
        duration: 0.8,
    }, "hide");
});