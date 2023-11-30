document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;

    function showSlide(index) {
        // Oculta todas las diapositivas
        slides.forEach((slide) => {
            slide.style.display = 'none';
        });
        // Muestra la diapositiva en el índice actual
        slides[index].style.display = 'block';
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Agrega listeners de eventos a los botones
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Inicializa el carrusel mostrando la primera diapositiva
    showSlide(currentIndex);

    // Función para iniciar el carrusel automáticamente
    function autoSlide() {
        nextSlide();
    }

    // Establece un intervalo para el carrusel automático
    let interval = setInterval(autoSlide, 5000);

    // Detiene el carrusel automático al hacer clic en los botones de navegación
    prevButton.addEventListener('click', () => {
        clearInterval(interval);
        interval = setInterval(autoSlide, 5000);
    });

    nextButton.addEventListener('click', () => {
        clearInterval(interval);
        interval = setInterval(autoSlide, 5000);
    });
});

