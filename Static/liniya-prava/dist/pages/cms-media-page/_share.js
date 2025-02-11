document.addEventListener("DOMContentLoaded", (event) => {
  const shareButton = document.querySelector(".share-btn");
  if (shareButton) {
    shareButton.addEventListener("click", () => {
      // Create a temporary textarea element
      const textarea = document.createElement("textarea");
      textarea.value = window.location.href;

      // Add the textarea to the document
      document.body.appendChild(textarea);

      // Select the text inside the textarea
      textarea.select();

      // Copy the selected text to the clipboard
      document.execCommand("copy");

      // Remove the textarea from the document
      document.body.removeChild(textarea);

      gsap.set(".creator__link-copy", {
        display: "flex",
        opacity: "0",
        y: "140%",
      });
      gsap.to(".creator__link-copy", {
        opacity: "1",
        y: "0%",
      });
    });
  }
}); 
