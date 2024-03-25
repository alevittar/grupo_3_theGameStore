document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const carousel = document.querySelector('.carousel');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let intervalId;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        slides[index].style.display = 'block';
    }

    function nextSlide() {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    }

    function startCarousel() {
        intervalId = setInterval(nextSlide, 3000);
    }

    function stopCarousel() {
        clearInterval(intervalId);
    }

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchEnd(event) {
        touchEndX = event.changedTouches[0].clientX;
        let difference = touchEndX - touchStartX;
        if (difference > 50) {
            prevSlide();
        } else if (difference < -50) {
            nextSlide();
        }
    }

    function handleCarouselClick(event) {
        const rect = carousel.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const carouselWidth = rect.width;
        if (clickX < carouselWidth / 2) {
            prevSlide();
        } else {
            nextSlide();
        }
    }

    showSlide(currentIndex);
    startCarousel();

    carousel.addEventListener('touchstart', handleTouchStart, false);
    carousel.addEventListener('touchend', handleTouchEnd, false);
    carousel.addEventListener('click', handleCarouselClick, false);
    carousel.addEventListener('mouseenter', stopCarousel, false);
    carousel.addEventListener('mouseleave', startCarousel, false);
});
