// ==========================================
// PORTFOLIO CUSTOM JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    setupSmoothScroll();
    
    // Highlight current navigation item
    highlightCurrentNav();
    
    // Add scroll animations
    setupScrollAnimations();
});

// Smooth Scroll Function
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Highlight current navigation item
function highlightCurrentNav() {
    const currentPage = window.location.pathname;
    document.querySelectorAll('header nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.borderBottom = '2px solid white';
        }
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(