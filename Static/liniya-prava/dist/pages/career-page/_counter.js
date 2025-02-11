document.addEventListener("DOMContentLoaded", () => {
    const indexes = document.querySelectorAll(".vacancy__index_p");

    if(indexes.length === 0) {return 0;}

    indexes.forEach((index, i) => index.style.opacity = 0);
    indexes.forEach((index, i) => index.innerHTML = i + 1);
    indexes.forEach((index, i) => index.style.opacity = 1);
    
});