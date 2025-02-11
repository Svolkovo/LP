// swiper function

const initialSwipe = (variation) => {
    if (isMobileActive()) {

        const swipeWrapper = variation == "start" ? document.querySelectorAll('[swipe="wait"]') : document.querySelectorAll('[swipe]:not([swipe="wait"])')

        if (swipeWrapper.length == 0) {
            return;
        }

        for (let a = 0; a < swipeWrapper.length; a++) {

            const swipeParent = swipeWrapper[a].querySelector('[swipe-content-parent]')
            if (!swipeParent) {
                continue;
            }

            const swipeBlocks = swipeParent.childNodes
            const swipeTarget = swipeParent.parentNode
            
            const paginationWrapper = swipeWrapper[a].querySelector('.pagination')
            let paginationBlocks = swipeWrapper[a].querySelector('.pagination__block')

            const distance = -(swipeBlocks[0].offsetWidth + parseInt(getComputedStyle(swipeBlocks[0], true).marginRight));

            if (swipeBlocks.length <= 1) {
                gsap.set(paginationWrapper, {
                    opacity: "0%",
                })

            } else {
                for (let b = 1; b < swipeBlocks.length; b++) {
                    let copy = paginationBlocks.cloneNode(false);
                    paginationWrapper.append(copy)
                    gsap.set(swipeBlocks[b], {
                        opacity: 0.4,
                    })
                }
                paginationBlocks.classList.add('pagination__block--active')
                paginationBlocks = paginationWrapper.querySelectorAll('.pagination__block')
            }

            let swipeWatcher = 0
            const startSwiper = (event) => {
                console.log('сработала функция')
                const swipeAnimation = (step) => {
                    swipeWatcher += step
                    gsap.to(swipeParent, {
                        x: `${swipeWatcher * distance}`,
                    })
                   
                    gsap.to(swipeBlocks[swipeWatcher], {
                        overwrite: true,
                        ease: "power1.inOut",
                        duration: 0.4,
                        opacity: 1,
                    })
                      
                    gsap.to(swipeBlocks[swipeWatcher - step], {
                        overwrite: true,
                        ease: "power1.inOut",
                        duration: 0.4,
                        opacity: 0.4
                    })
                       
                    paginationBlocks[swipeWatcher].classList.add('pagination__block--active')
                    paginationBlocks[swipeWatcher - step].classList.remove('pagination__block--active')
                }

                if (event.detail.dir == "left" && swipeWatcher != swipeBlocks.length - 1) {
                    swipeAnimation(1)
                } else if (event.detail.dir == "right" && swipeWatcher != 0) {
                    swipeAnimation(-1)
                }
            }

            swipe(swipeTarget, { maxTime: 2000, minTime: 10, maxDist: 2000, minDist: 10 });
            swipeTarget.addEventListener('swipe', (e) => {
                console.log('евент листенер сработал')
                startSwiper(e)
            })
        }
    }
}

initialSwipe()