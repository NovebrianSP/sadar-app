document.addEventListener('DOMContentLoaded', function() {
    // Initialize splash screen
    initSplashScreen();
});

function initSplashScreen() {
    // Auto redirect after 4 seconds
    setTimeout(() => {
        redirectToLogin();
    }, 4000);
    
    // Add click event to logo for early redirect
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('click', redirectToLogin);
    }
    
    // Animate loading text
    animateLoadingText();
    
    // Add entrance animations to feature items
    animateFeatureItems();
}

function animateLoadingText() {
    const loadingText = document.querySelector('.loading-text');
    if (!loadingText) return;
    
    const texts = ['Loading', 'Loading.', 'Loading..', 'Loading...'];
    let currentIndex = 0;
    
    setInterval(() => {
        loadingText.textContent = texts[currentIndex];
        currentIndex = (currentIndex + 1) % texts.length;
    }, 500);
}

function animateFeatureItems() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '0.8';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, 1500 + (index * 200));
    });
}

function skipToLogin() {
    redirectToLogin();
}

function redirectToLogin() {
    // Add fade out animation
    const splashContainer = document.querySelector('.splash-container');
    if (splashContainer) {
        splashContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        splashContainer.style.opacity = '0';
        splashContainer.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    } else {
        window.location.href = 'login.html';
    }
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const circles = document.querySelectorAll('.circle');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX * speed) / 50;
        const y = (mouseY * speed) / 50;
        
        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add touch support for mobile
document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    if (touch) {
        const circles = document.querySelectorAll('.circle');
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.05;
            const x = (touch.clientX * speed) / 30;
            const y = (touch.clientY * speed) / 30;
            
            circle.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});

// Prevent right-click context menu during splash
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Add keyboard shortcut to skip (Enter or Space)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        redirectToLogin();
    }
});
