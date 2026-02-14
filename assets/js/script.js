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
    
    // Add mobile menu toggle
    setupMobileMenu();
    
    // Setup dark mode toggle
    setupDarkMode();
    
    // Setup copy to clipboard for email
    setupCopyToClipboard();
});

// ==========================================
// SMOOTH SCROLL FUNCTION
// ==========================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for hash links
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// ==========================================
// HIGHLIGHT CURRENT NAVIGATION
// ==========================================
function highlightCurrentNav() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('header nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if current page matches the link
        if (currentPage === href || currentPage.includes(href.replace('/', ''))) {
            link.style.borderBottom = '3px solid white';
            link.style.fontWeight = 'bold';
        } else {
            link.style.borderBottom = 'none';
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('fade-in');
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                
                // Optional: Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.blog-post-card, .project-card, .experience-item, .skill-category, section').forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function setupMobileMenu() {
    // Create mobile menu button if it doesn't exist
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    
    // Check if screen is small
    if (window.innerWidth <= 768) {
        createMobileMenuButton();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenuButton();
            }
        } else {
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn) {
                mobileBtn.remove();
            }
            const navList = document.querySelector('header nav ul');
            if (navList) {
                navList.style.display = 'flex';
            }
        }
    });
}

function createMobileMenuButton() {
    const nav = document.querySelector('header nav');
    
    // Create menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
    `;
    
    // Show on mobile
    if (window.innerWidth <= 768) {
        menuBtn.style.display = 'block';
    }
    
    nav.appendChild(menuBtn);
    
    // Toggle menu on click
    menuBtn.addEventListener('click', function() {
        const navList = document.querySelector('header nav ul');
        if (navList.style.display === 'none' || !navList.style.display) {
            navList.style.display = 'flex';
            navList.style.flexDirection = 'column';
            navList.style.position = 'absolute';
            navList.style.top = '50px';
            navList.style.left = '0';
            navList.style.right = '0';
            navList.style.backgroundColor = '#0f172a';
            navList.style.padding = '1rem';
            navList.style.gap = '0';
        } else {
            navList.style.display = 'none';
        }
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', function() {
            const navList = document.querySelector('header nav ul');
            navList.style.display = 'none';
        });
    });
}

// ==========================================
// DARK MODE TOGGLE
// ==========================================
function setupDarkMode() {
    // Check if user has dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
                       window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDarkMode) {
        enableDarkMode();
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
}

function enableDarkMode() {
    document.documentElement.style.setProperty('--primary-color', '#3b82f6');
    document.documentElement.style.setProperty('--secondary-color', '#1e293b');
    document.documentElement.style.setProperty('--text-color', '#e2e8f0');
    document.documentElement.style.setProperty('--light-bg', '#0f172a');
    document.body.style.backgroundColor = '#0f172a';
    document.body.style.color = '#e2e8f0';
    localStorage.setItem('darkMode', 'true');
}

function disableDarkMode() {
    document.documentElement.style.setProperty('--primary-color', '#1e40af');
    document.documentElement.style.setProperty('--secondary-color', '#0f172a');
    document.documentElement.style.setProperty('--text-color', '#1f2937');
    document.documentElement.style.setProperty('--light-bg', '#f9fafb');
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#1f2937';
    localStorage.setItem('darkMode', 'false');
}

// ==========================================
// COPY TO CLIPBOARD
// ==========================================
function setupCopyToClipboard() {
    document.querySelectorAll('[data-copy]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show success message
                const originalText = this.textContent;
                this.textContent = '✓ Copied!';
                this.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy to clipboard');
            });
        });
    });
}

// ==========================================
// ANALYTICS - Page View Tracking
// ==========================================
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            'page_path': window.location.pathname,
            'page_title': document.title
        });
    }
}

// Track page views on load
trackPageView();

// ==========================================
// LAZY LOAD IMAGES
// ==========================================
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

setupLazyLoading();

// ==========================================
// FORM VALIDATION (if needed)
// ==========================================
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Check required fields
            this.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            // Validate email
            const emailFields = this.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailRegex.test(field.value)) {
                    isValid = false;
                    field.style.borderColor = 'red';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly');
            }
        });
    });
}

setupFormValidation();

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
function setupScrollToTop() {
    // Create button
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1e40af;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show button when scrolled down
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#3b82f6';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#1e40af';
        this.style.transform = 'scale(1)';
    });
}

setupScrollToTop();

// ==========================================
// READING TIME ESTIMATION
// ==========================================
function setupReadingTime() {
    const article = document.querySelector('.post-content');
    if (article) {
        const text = article.innerText;
        const wordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        
        // Update reading time in meta
        const meta = document.querySelector('.post-meta');
        if (meta && !meta.textContent.includes('min read')) {
            const readingTimeSpan = document.createElement('span');
            readingTimeSpan.textContent = `${readingTime} min read`;
            meta.appendChild(readingTimeSpan);
        }
    }
}

setupReadingTime();

// ==========================================
// SYNTAX HIGHLIGHTING (if using code blocks)
// ==========================================
function setupSyntaxHighlighting() {
    // If you're using Prism.js or Highlight.js, initialize here
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

setupSyntaxHighlighting();

// ==========================================
// ANIMATIONS CSS (add to style.css or here)
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    /* Smooth transitions */
    * {
        scroll-behavior: smooth;
    }
`;
document.head.appendChild(style);

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// CONSOLE MESSAGE (Brand yourself!)
// ==========================================
console.log('%c Welcome to Jai Sathiya\'s Portfolio! ', 'background: #1e40af; color: white; font-size: 14px; padding: 5px 10px; border-radius: 3px;');
console.log('%c Senior Java Developer & Software Architect | 13 Years Experience ', 'background: #0f172a; color: #3b82f6; font-size: 12px; padding: 5px 10px;');
console.log('%c Check out my blog for daily challenges and insights! ', 'color: #10b981; font-size: 11px;');

// ==========================================
// EXPORT FUNCTIONS (if needed externally)
// ==========================================
window.portfolio = {
    setupDarkMode: setupDarkMode,
    enableDarkMode: enableDarkMode,
    disableDarkMode: disableDarkMode,
    scrollToTop: () => window.scrollTo({top: 0, behavior: 'smooth'}),
    trackEvent: (eventName, eventData) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }
};

console.log('Portfolio utilities loaded. Access via window.portfolio');

// ==========================================
// END OF SCRIPT
// ==========================================