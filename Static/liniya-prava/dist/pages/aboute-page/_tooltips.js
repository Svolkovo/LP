document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".tooltips")) {
        return;
    }

    // Get the paragraph element
    const paragraph = document.querySelector('.multy-text__p');

    // Function to replace content between << and >> with <span>
    function replaceWithSpan(text) {
        // Regular expression to match content between << and >>
        const regex = /<<(.*?)>>/g;
        // Replace matched content with <span> element
        if (!isMobileActive()) {
            return text.replace(regex, (match, p1) => `<span class="multy-text__span">${p1}<span class="multy-text__cover"></span></span>`);
        } else {
            return text.replace(regex, (match, p1) => `${p1}`);
        }
    }

    // Get the current text content of the paragraph
    const originalText = paragraph.textContent;
    // Replace the content and update the paragraph's HTML
    const updatedText = replaceWithSpan(originalText);
    paragraph.innerHTML = updatedText;

    if (!isMobileActive()) {
        const tooltips = document.querySelectorAll('.tooltip');
        const spans = document.querySelectorAll('.multy-text__span');
        const multyCoverArr = document.querySelectorAll('.multy-text__cover');

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
        for (let a = 0; a < tooltips.length; a++) {
            const activeText = tooltips[a].getAttribute('data-active-text');
            const activeColor = tooltips[a].getAttribute('data-active-color');
            console.log(activeColor, true, activeColor == true)
            for (let b = 0; b < spans.length; b++) {
                if (spans[b].textContent.trim() === activeText) {
                    spans[b].appendChild(tooltips[a]);
                    if (activeColor === "true") {
                        spans[b].classList.add('multy-text__span--green')
                    } else {
                        spans[b].classList.add('multy-text__span--gray')
                    }
                    break;  // Assuming each tooltip matches only one span
                }
            }
        }

        // Add event listeners for hover effects
        for (let a = 0; a < spans.length; a++) {
            spans[a].addEventListener('mouseenter', (e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                const tooltip = spans[a].querySelector('.tooltip');
                if (tooltip) {
                    gsap.fromTo(tooltip, {
                        y: `5rem`,
                        opacity: 0
                    }, {
                        y: `0rem`,
                        opacity: 1,
                        duration: 0.45,
                        ease: "power2.In",
                        overwrite: true
                    });
                }
            });

            spans[a].addEventListener('mouseleave', (e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                const tooltip = spans[a].querySelector('.tooltip');
                if (tooltip) {
                    gsap.to(tooltip, {
                        y: `5rem`,
                        opacity: 0,
                        duration: 0.2,
                        ease: "power2.In",
                        overwrite: true
                    });

                }
            });
        }
    } 
});