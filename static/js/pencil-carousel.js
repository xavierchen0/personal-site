document.querySelectorAll(".pencil-carousel").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll(".pencil-slide")];
    const counter = carousel.querySelector(".pencil-counter");

    let current = 0;

    function showSlide(index) {
        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.hidden = i !== current;
        });

        counter.textContent = `${current + 1} / ${slides.length}`;
    }

    carousel.querySelector(".pencil-prev")
        .addEventListener("click", () => showSlide(current - 1));

    carousel.querySelector(".pencil-next")
        .addEventListener("click", () => showSlide(current + 1));

    showSlide(0);
});
