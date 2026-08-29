const sections = document.querySelectorAll('.section-container');

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
});

document.querySelectorAll('[data-slideshow]').forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide');
    const dotsContainer = slideshow.querySelector('.slide-dots');
    const prevButton = slideshow.querySelector('.slide-prev');
    const nextButton = slideshow.querySelector('.slide-next');
    let current = 0;

    const dots = Array.from(slides).map((_, index) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Go to screenshot ${index + 1}`);
        dot.addEventListener('click', () => goTo(index));
        dotsContainer.appendChild(dot);
        return dot;
    });

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    prevButton.addEventListener('click', () => goTo(current - 1));
    nextButton.addEventListener('click', () => goTo(current + 1));

    goTo(0);
});

