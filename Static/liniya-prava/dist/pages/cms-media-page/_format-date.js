document.addEventListener('DOMContentLoaded', (event) => {
    // Function to convert date format from YYYY-MM-DD to DD-MMMM-YYYY
    function convertDateFormat(dateString) {
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        
        const dateParts = dateString.split("-");
        const year = dateParts[0];
        const month = months[parseInt(dateParts[1], 10) - 1];
        const day = dateParts[2];
        
        return `${day} ${month} ${year}`;
    }

    // Get all elements with the class 'time_format'
    const timeFormatElements = document.querySelectorAll('.time_format');

    if(timeFormatElements.length <= 0) { return 0 } ;

    // Iterate over each element and replace the date format
    timeFormatElements.forEach((element) => {
        const originalDate = element.textContent.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(originalDate)) {  // Check if it matches the YYYY-MM-DD format
            const newDate = convertDateFormat(originalDate);
            element.textContent = newDate;
        }
    });

    gsap.to(".article-meta", {"opacity": "1"})
});
