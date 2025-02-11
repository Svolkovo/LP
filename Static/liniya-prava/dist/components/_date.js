document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".date")) {
    let arrDate = document.querySelectorAll(".date");
    for (let a = 0; a < arrDate.length; a++) {
      let splitDateArray = arrDate[a].innerText.split(".");
      if (splitDateArray[0] < 10) {
        let day = "0" + splitDateArray[0];
        let currentDate =
          day + "." + splitDateArray[1] + "." + splitDateArray[2];
        arrDate[a].innerText = currentDate;
        splitDateArray = currentDate.split(".");
      }
      if (splitDateArray[1] < 10) {
        let month = "0" + splitDateArray[1];
        let currentDate =
          splitDateArray[0] + "." + month + "." + splitDateArray[2];
        arrDate[a].innerText = currentDate;
        splitDateArray = currentDate.split(".");
      }
    }
  }
});
