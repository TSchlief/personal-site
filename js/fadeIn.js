document.addEventListener("DOMContentLoaded", function () {
    var fadeElems = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeElems.forEach(function (elem) {
            var distance = elem.getBoundingClientRect().top;
            var screenHeight = window.innerHeight;

            if (distance < screenHeight * 0.85) {
                elem.style.opacity = 1;
            }
            else if (distance > screenHeight) {
                elem.style.opacity = 0;
            }
        });
    }

    window.addEventListener('scroll', checkFade);
    checkFade();
});