const servicesArr = document.querySelectorAll('.services-practice-collection__item');

for (let a = 0; a < servicesArr.length; a++) {
    servicesArr[a].querySelector('.services-practice-card__counter').textContent = a + 1
}