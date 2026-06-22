// js/slider.js
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    // Function to update slide state
    const updateSlider = (index) => {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let index = currentSlide + 1;
        if (index >= slideCount) index = 0;
        updateSlider(index);
    };

    const prevSlide = () => {
        let index = currentSlide - 1;
        if (index < 0) index = slideCount - 1;
        updateSlider(index);
    };

    // Event Listeners for controls
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Event Listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlider(index);
            resetInterval();
        });
    });

    // Auto Slide Logic (10 seconds)
    const startInterval = () => {
        autoSlideInterval = setInterval(nextSlide, 10000);
    };

    const resetInterval = () => {
        clearInterval(autoSlideInterval);
        startInterval();
    };

    // Initialize
    startInterval();
});