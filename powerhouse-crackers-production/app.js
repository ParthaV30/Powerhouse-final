// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('nav--open');
            mobileMenuBtn.classList.toggle('mobile-menu-btn--open');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('nav--open');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('mobile-menu-btn--open');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && mobileMenuBtn && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('nav--open');
            mobileMenuBtn.classList.remove('mobile-menu-btn--open');
        }
    });
});

// Enhanced smooth scrolling for navigation links
function initializeScrolling() {
    // Handle navigation links
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                if (nav) nav.classList.remove('nav--open');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('mobile-menu-btn--open');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle all other anchor links
    document.querySelectorAll('a[href^="#"]:not(.nav__link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle button links
    document.querySelectorAll('.btn[href^="#"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttled scroll handler
window.addEventListener('scroll', throttle(handleHeaderScroll, 16));

// Form handling with proper validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const locationSelect = document.getElementById('location');
            const requirementsTextarea = document.getElementById('requirements');
            
            // Clear previous error styles
            [nameInput, phoneInput, locationSelect].forEach(input => {
                if (input) {
                    input.style.borderColor = '#FF6B35';
                }
            });

            // Validate form
            let isValid = true;
            const errors = [];

            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = '#DC143C';
                errors.push('Name is required');
                isValid = false;
            }

            if (!phoneInput.value.trim()) {
                phoneInput.style.borderColor = '#DC143C';
                errors.push('Phone number is required');
                isValid = false;
            } else {
                // Validate phone number (basic validation for 10 digits)
                const phoneDigits = phoneInput.value.replace(/\D/g, '');
                if (phoneDigits.length !== 10) {
                    phoneInput.style.borderColor = '#DC143C';
                    errors.push('Please enter a valid 10-digit phone number');
                    isValid = false;
                }
            }

            if (!locationSelect.value) {
                locationSelect.style.borderColor = '#DC143C';
                errors.push('Please select a delivery location');
                isValid = false;
            }

            if (!isValid) {
                showNotification(errors.join('. '), 'error');
                return;
            }

            // Mark valid fields
            [nameInput, phoneInput, locationSelect].forEach(input => {
                if (input && input.value.trim()) {
                    input.style.borderColor = '#FF6B35';
                }
            });

            // Button loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Build JSON payload
            const formData = {
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                location: locationSelect.value,
                requirements: requirementsTextarea.value.trim()
            };

            try {
                const response = await fetch("https://formspree.io/f/xqadkyan", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showNotification('✅ Thank you! We will call you soon to discuss your Powerhouse Crackers requirements.', 'success');
                    this.reset();
                } else {
                    showNotification('⚠️ Failed to send your request. Please try again later.', 'error');
                }
            } catch (err) {
                showNotification('🚨 Network error! Please check your connection.', 'error');
            }

            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }
});

// document.addEventListener('DOMContentLoaded', function() {
//     const contactForm = document.getElementById('contactForm');
    
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             // Get form elements
//             const nameInput = document.getElementById('name');
//             const phoneInput = document.getElementById('phone');
//             const locationSelect = document.getElementById('location');
//             const requirementsTextarea = document.getElementById('requirements');
            
//             // Clear previous error styles
//             [nameInput, phoneInput, locationSelect].forEach(input => {
//                 if (input) {
//                     input.style.borderColor = '#FF6B35';
//                 }
//             });

//             // Validate form
//             let isValid = true;
//             const errors = [];

//             if (!nameInput.value.trim()) {
//                 nameInput.style.borderColor = '#DC143C';
//                 errors.push('Name is required');
//                 isValid = false;
//             }

//             if (!phoneInput.value.trim()) {
//                 phoneInput.style.borderColor = '#DC143C';
//                 errors.push('Phone number is required');
//                 isValid = false;
//             } else {
//                 // Validate phone number (basic validation for 10 digits)
//                 const phoneDigits = phoneInput.value.replace(/\D/g, '');
//                 if (phoneDigits.length !== 10) {
//                     phoneInput.style.borderColor = '#DC143C';
//                     errors.push('Please enter a valid 10-digit phone number');
//                     isValid = false;
//                 }
//             }

//             if (!locationSelect.value) {
//                 locationSelect.style.borderColor = '#DC143C';
//                 errors.push('Please select a delivery location');
//                 isValid = false;
//             }

//             if (!isValid) {
//                 showNotification(errors.join('. '), 'error');
//                 return;
//             }

//             // Mark valid fields
//             [nameInput, phoneInput, locationSelect].forEach(input => {
//                 if (input && input.value.trim()) {
//                     input.style.borderColor = '#FF6B35';
//                 }
//             });
//             action="https://formspree.io/f/mayvlkna" 
//             method="POST"
//             // Simulate form submission
//             const submitButton = this.querySelector('button[type="submit"]');
//             const originalText = submitButton.textContent;
            
//             submitButton.textContent = 'Submitting...';
//             submitButton.disabled = true;

//             // Simulate API call
//             setTimeout(() => {
//                 showNotification('Thank you! We will call you soon to discuss your Powerhouse Crackers requirements.', 'success');
//                 this.reset();
//                 // Reset field styles
//                 [nameInput, phoneInput, locationSelect].forEach(input => {
//                     if (input) {
//                         input.style.borderColor = '#FF6B35';
//                     }
//                 });
//                 submitButton.textContent = originalText;
//                 submitButton.disabled = false;
//             }, 1500);
//         });
//     }
// });

// Real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('name');
    const locationSelect = document.getElementById('location');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            // Format phone number as user types
            if (value.length >= 6) {
                this.value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                this.value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            } else {
                this.value = value;
            }
            
            // Validation styling
            const phoneDigits = this.value.replace(/\D/g, '');
            if (phoneDigits.length === 10) {
                this.style.borderColor = '#FF6B35';
                this.style.boxShadow = '0 0 10px rgba(255, 107, 53, 0.3)';
            } else if (phoneDigits.length > 0) {
                this.style.borderColor = '#FF8C42';
                this.style.boxShadow = '0 0 5px rgba(255, 140, 66, 0.3)';
            } else {
                this.style.borderColor = '#FF6B35';
                this.style.boxShadow = 'none';
            }
        });
    }
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value.trim().length >= 2) {
                this.style.borderColor = '#FF6B35';
                this.style.boxShadow = '0 0 10px rgba(255, 107, 53, 0.3)';
            } else if (this.value.length > 0) {
                this.style.borderColor = '#FF8C42';
                this.style.boxShadow = '0 0 5px rgba(255, 140, 66, 0.3)';
            } else {
                this.style.borderColor = '#FF6B35';
                this.style.boxShadow = 'none';
            }
        });
    }

    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#FF6B35';
                this.style.boxShadow = '0 0 10px rgba(255, 107, 53, 0.3)';
            } else {
                this.style.borderColor = '#FF6B35';
                this.style.boxShadow = 'none';
            }
        });
    }
});

// Notification system with Powerhouse theme
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const iconMap = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${iconMap[type] || iconMap.info}</span>
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;

    // Add styles for notification if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                border-radius: var(--radius-base);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                animation: slideInRight 0.3s ease-out;
                font-family: var(--font-family-base);
                backdrop-filter: blur(10px);
            }

            .notification--success {
                background: linear-gradient(135deg, #FF6B35, #DC143C);
                color: #ffffff;
                border: 1px solid #FF6B35;
            }

            .notification--error {
                background: linear-gradient(135deg, #DC143C, #8B0000);
                color: #ffffff;
                border: 1px solid #DC143C;
            }

            .notification--warning {
                background: linear-gradient(135deg, #FF8C42, #FFA500);
                color: #000000;
                border: 1px solid #FF8C42;
            }

            .notification--info {
                background: linear-gradient(135deg, #2d2d2d, #1a1a1a);
                color: #ffffff;
                border: 1px solid #FF6B35;
            }

            .notification__content {
                display: flex;
                align-items: center;
                padding: var(--space-16);
                gap: var(--space-12);
            }

            .notification__icon {
                font-weight: bold;
                font-size: var(--font-size-lg);
                flex-shrink: 0;
            }

            .notification__message {
                flex: 1;
                font-weight: var(--font-weight-medium);
            }

            .notification__close {
                background: none;
                border: none;
                font-size: var(--font-size-xl);
                cursor: pointer;
                opacity: 0.7;
                transition: opacity var(--duration-fast);
                color: inherit;
                flex-shrink: 0;
            }

            .notification__close:hover {
                opacity: 1;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    top: 80px;
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Add to document
    document.body.appendChild(notification);

    // Close functionality
    const closeButton = notification.querySelector('.notification__close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .delivery__item, .eco-friendly__content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Enhanced sparkle animation with Powerhouse colors
document.addEventListener('DOMContentLoaded', function() {
    const sparkles = document.querySelectorAll('.sparkle');
    const colors = ['#FF6B35', '#DC143C', '#FF8C42', '#B22222'];
    
    sparkles.forEach((sparkle, index) => {
        // Set random color from Powerhouse palette
        sparkle.style.background = colors[index % colors.length];
        sparkle.style.boxShadow = `0 0 10px ${colors[index % colors.length]}`;
        
        sparkle.addEventListener('animationiteration', function() {
            // Randomize position slightly for more dynamic effect
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            sparkle.style.transform = `translate(${randomX}px, ${randomY}px)`;
            
            // Change color randomly
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.background = randomColor;
            sparkle.style.boxShadow = `0 0 15px ${randomColor}`;
        });
    });
});

// Add dynamic glow effects to interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            if (this.classList.contains('btn--primary')) {
                this.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.6)';
            } else if (this.classList.contains('btn--outline')) {
                this.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.4)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn--primary')) {
                this.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
            } else {
                this.style.boxShadow = 'none';
            }
        });
    });

    // Add glow effect to cards on hover
    const cards = document.querySelectorAll('.feature-card, .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 40px rgba(255, 107, 53, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('feature-card')) {
                this.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.3)';
            } else {
                this.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.2)';
            }
        });
    });
});

// Utility functions for validation
function validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 10;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Main initialization function
function initializeApp() {
    console.log('Powerhouse Crackers website loaded successfully! 🎆');
    console.log('Dark theme with orange and red accents applied');
    
    // Initialize smooth scrolling
    initializeScrolling();
    
    // Ensure header scroll effect is initialized
    handleHeaderScroll();
    
    // Add a subtle pulsing effect to the logo
    const logo = document.querySelector('.logo__text');
    if (logo) {
        setInterval(() => {
            logo.style.textShadow = '0 0 30px rgba(255, 107, 53, 0.8)';
            setTimeout(() => {
                logo.style.textShadow = '0 0 20px rgba(255, 107, 53, 0.5)';
            }, 1000);
        }, 3000);
    }
    
    // Ensure all links are working
    setTimeout(() => {
        const navLinks = document.querySelectorAll('.nav__link');
        console.log(`Navigation links found: ${navLinks.length}`);
        navLinks.forEach((link, index) => {
            console.log(`Link ${index + 1}: ${link.getAttribute('href')} - ${link.textContent}`);
        });
    }, 100);
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', initializeApp);