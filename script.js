document.addEventListener("DOMContentLoaded", () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        const updateCursor = (e) => {
            const x = e.clientX || e.pageX;
            const y = e.clientY || e.pageY;
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;
            
            cursor.style.left = `${x}px`;
            cursor.style.top = `${y + scrollY}px`;
        };

        window.addEventListener('mousemove', updateCursor);
        
        // Add cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .activity-card, .contact-form input, .contact-form textarea');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });

        // Handle cursor visibility
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
    }

    // Add animation to skill cards on scroll
    const observeElements = document.querySelectorAll('.skill-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.5s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observeElements.forEach(element => {
        observer.observe(element);
    });

    // Image Overlay
    const imageCircle = document.querySelector(".photo-circle img");
    const overlay = document.querySelector(".image-overlay");
    const overlayImage = document.querySelector(".image-overlay img");
    const closeBtn = document.querySelector(".image-overlay .close-btn");

    imageCircle.addEventListener("click", () => {
        overlay.style.display = "flex";
        overlayImage.src = imageCircle.src;
    });

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", (e) => {
        if (e.target !== overlayImage && e.target !== closeBtn) {
            overlay.style.display = "none";
        }
    });

    // Education Carousel
    const blocks = document.querySelectorAll('.education-block');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    const updateCarousel = () => {
        blocks.forEach((block, index) => {
            block.classList.remove('active');
            if (index === currentIndex) {
                block.classList.add('active');
                block.style.opacity = "1";
                block.style.transform = "translateX(0)";
            } else {
                block.style.opacity = "0";
                block.style.transform = index < currentIndex
                    ? "translateX(-100%)"
                    : "translateX(100%)";
            }
        });
    };

    // Initialize the carousel
    updateCarousel();

    // Event listeners for navigation arrows
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + blocks.length) % blocks.length;
        updateCarousel();
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % blocks.length;
        updateCarousel();
    });
});
