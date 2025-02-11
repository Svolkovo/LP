document.addEventListener("DOMContentLoaded", () => {
    const filtersArr = document.querySelectorAll('.filters__directions, .filters__practices')

    if (filtersArr.length == 0) { return };

    let activeFilterPart = 0;
    const radioArr = document.querySelectorAll('.filter-collection__checkbox-wrapper')
    const filtersNames = document.querySelectorAll('.filters__name')
    //let radioStatus = []

    for (let a = 0; a < filtersArr.length; a++) {
        const finalHeight = filtersArr[a].querySelector('.filter-collection').offsetHeight;
        const animList = filtersArr[a].querySelector('.filters__animate')
        const plusPart = filtersArr[a].querySelector('.plus-img__wrapper-2')

        if (!isMobileActive()) {
            filtersArr[a].addEventListener('mouseenter', () => {
                animList.style.height = finalHeight + "px"
                gsap.to(plusPart, {
                    duration: 0.2,
                    rotate: "90deg"
                })
                activeFilterPart = a + 1
            })
            filtersArr[a].addEventListener('mouseleave', () => {
                animList.style.height = "0px"
                filtersArr[a].querySelector('.plus-img__wrapper-2').style.transform = 'rotate(0deg)'
                gsap.to(plusPart, {
                    duration: 0.2,
                    rotate: "0deg"
                })
                activeFilterPart = 0
            })
        } else {
            let clickAnim = 0;
            filtersArr[a].addEventListener('click', (e) => {
                if (clickAnim == 0 && e.target.tagName != "INPUT") {
                    animList.style.height = finalHeight + "px"
                    gsap.to(plusPart, {
                        duration: 0.2,
                        rotate: "90deg"
                    })
                    activeFilterPart = a + 1
                    clickAnim = 1
                    console.log('open', e.target)
                } else {
                    animList.style.height = "0px"
                    filtersArr[a].querySelector('.plus-img__wrapper-2').style.transform = 'rotate(0deg)'
                    gsap.to(plusPart, {
                        duration: 0.2,
                        rotate: "0deg"
                    })
                    activeFilterPart = 0
                    clickAnim = 0
                }
            })

        }
    }


    for (let a = 0; a < radioArr.length; a++) {
        radioArr[a].addEventListener('click', (e) => {
            if (activeFilterPart == 1) {
                filtersNames[0].textContent = radioArr[a].querySelector('.filter-collection__checkbox-text').textContent
                if (!isMobileActive()) {
                    filtersArr[0].classList.add('filters--active')
                    filtersArr[0].querySelector('.plus-img__line-2').style.backgroundColor = '#000000'
                    filtersArr[0].querySelector('.plus-img__line').style.backgroundColor = '#000000'
                } 
            } else if (activeFilterPart == 2) {
                filtersNames[1].textContent = radioArr[a].querySelector('.filter-collection__checkbox-text').textContent
                if (!isMobileActive()) {
                    filtersArr[1].classList.add('filters--active')
                    filtersArr[1].querySelector('.plus-img__line-2').style.backgroundColor = '#000000'
                    filtersArr[1].querySelector('.plus-img__line').style.backgroundColor = '#000000'
                } 
            }
        });
    }

    document.querySelector('.filters__clear').addEventListener('click', (e) => {
        if (!isMobileActive()) {
        filtersArr[0].classList.remove('filters--active')
        filtersArr[1].classList.remove('filters--active')
        }
        filtersArr[0].querySelector('.plus-img__line-2').style.backgroundColor = 'var(--white)'
        filtersArr[1].querySelector('.plus-img__line-2').style.backgroundColor = 'var(--white)'
        filtersArr[0].querySelector('.plus-img__line').style.backgroundColor = 'var(--white)'
        filtersArr[1].querySelector('.plus-img__line').style.backgroundColor = 'var(--white)'
        filtersNames[0].textContent = "Отрасль"
        filtersNames[1].textContent = "Практика"
    })
        
});
