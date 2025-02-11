document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelectorAll('.main-screen-news-item').length == 0) {
        return;
    }

    const newsItems = document.querySelectorAll('.main-screen-news-item');
    const totalLine = document.querySelector('.slider__total-line');
    const leftArrow = document.querySelector('.slider__arrow-wrapper_first');
    const rightArrow = document.querySelector('.slider__arrow-wrapper_last');
    let currentIndex = 0;

    const totalWidth = 100;
    const itemWidth = totalWidth / newsItems.length;
    totalLine.style.width = `${itemWidth}%`;

    const updatePaginationLine = (targetIndex) => {
        gsap.to(totalLine, {
            duration: 0.4,
            ease: "power1.inOut",
            x: `${targetIndex * 100}%`
        })
    };

    const updateArrows = (targetIndex) => {
        leftArrow.classList.toggle('slider__arrow-wrapper--disabled', targetIndex === 0);
        rightArrow.classList.toggle('slider__arrow-wrapper--disabled', targetIndex === newsItems.length - 1);
    };

    const changeSlide = (newIndex) => {
        if (newIndex < 0 || newIndex >= newsItems.length || newIndex === currentIndex) return;

        gsap.to(newsItems[currentIndex], {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.5,
        })
        gsap.to(newsItems[currentIndex], {
            duration: 0.5,
            ease: "power1.in",
            x: `5rem`,
            onStart: () => {
                updatePaginationLine(newIndex);
                updateArrows(newIndex);  
            },
            onComplete: () => {
                newsItems[currentIndex].style.display = 'none';
                currentIndex = newIndex;
                newsItems[currentIndex].style.display = 'flex';
                gsap.fromTo(newsItems[currentIndex], {
                    opacity: 0,
                }, {
                    duration: 0.5, 
                    ease: "power1.inOut",
                    opacity: 1, 
                });
                gsap.fromTo(newsItems[currentIndex], {
                    x: `-5rem`,
                }, {
                    duration: 0.5, 
                    ease: "power1.Out",
                    x: `0rem`,
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
})
