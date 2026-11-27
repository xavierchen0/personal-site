document.querySelectorAll(".photo-carousel").forEach((carousel) => {
    const controls = carousel.querySelector(".photo-carousel-controls");
    if (!controls) return;

    const slides = carousel.querySelectorAll("figure");
    const counter = controls.querySelector("output");
    let current = 0;

    function showSlide(index) {
        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.hidden = i !== current;
        });

        counter.textContent = `${current + 1} / ${slides.length}`;
    }

    controls.querySelector("[data-previous]")
        .addEventListener("click", () => showSlide(current - 1));

    controls.querySelector("[data-next]")
        .addEventListener("click", () => showSlide(current + 1));

    showSlide(0);
    controls.hidden = false;
});
