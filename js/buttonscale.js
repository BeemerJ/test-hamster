document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
    const buttonContainer = document.getElementById("button-container");

    function setNextButtonWidth() {
        const ButtonWidth = window.getComputedStyle(prevButton).getPropertyValue("width");
        nextButton.style.width = ButtonWidth;
    }

    setNextButtonWidth();
    window.addEventListener("resize", setNextButtonWidth);

    function adjustButtonContainer() {
        if (window.innerWidth >= 361) {
            buttonContainer.style.flexDirection = "row";
            prevButton.style.maxWidth = "fit-content";
        } else {
            buttonContainer.style.flexDirection = "column";
            prevButton.style.maxWidth = "100%";
            nextButton.style.width = "";
            nextButton.style.maxWidth = "100%";
        }
    }

    function hideFooter() {

        const footer = document.getElementById("footer");

        if (window.innerHeight < 361) {
            footer.style.opacity = "0";
        } else {
            footer.style.opacity = "1";
        }
    }

    adjustButtonContainer();
    window.addEventListener("load", adjustButtonContainer);
    window.addEventListener("resize", hideFooter);
});