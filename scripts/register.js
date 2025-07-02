document.addEventListener('DOMContentLoaded', function() {
    // Initialize all effects
    initAllEffects();
    
    // Handle form submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.signup-btn');
        addLoadingEffect(submitBtn);
        
        // Add page transition animation before redirect
        setTimeout(() => {
            animatePageTransition('index.html');
        }, 1500);
    });
    
    // Handle login link click
    const loginLink = document.querySelector('.login-link a');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            animatePageTransition('index.html');
        });
    }
});

function initPageAnimations() {
    // Add staggered animation to form elements
    const formElements = document.querySelectorAll('.form-group, .signup-btn, .social-login, .login-link');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 600 + (index * 100));
    });
}

function animatePageTransition(targetUrl) {
    // Add exit animation to body
    document.body.classList.add('page-exit');
    
    // Wait for animation to complete then navigate
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 500);
}

// Add loading effect to button
function addLoadingEffect(button) {
    button.classList.add('loading');
    const originalText = button.innerHTML;
    button.innerHTML = '<span>Creating account...</span>';
    
    setTimeout(() => {
        button.classList.remove('loading');
        button.innerHTML = originalText;
    }, 2000);
}

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.signup-btn, .social-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all effects
function initAllEffects() {
    initPageAnimations();
    addRippleEffect();
    
    // Add form validation visual feedback
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}
