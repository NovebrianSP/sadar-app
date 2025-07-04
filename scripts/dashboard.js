// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏠 Dashboard loaded successfully!');
    console.log('💡 Theme Toggle Controls (Bottom-right):');
    console.log('   - Single click: Toggle theme');
    console.log('   - Double click: Hide/Show theme toggle');
    console.log('   - Keyboard: Ctrl+Shift+T (toggle), Ctrl+Shift+H (hide/show)');
    console.log('   - Mobile: Smaller size for better mobile experience');
    
    // Initialize dashboard components
    initializeNavigation();
    initializeMenuItems();
    initializeQuickActions();
    initializeNotifications();
    initializeArticles();
    
    // Add welcome animation
    animateWelcomeCard();
});

// Navigation Functions
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the navigation type
            const navLabel = this.querySelector('.nav-label').textContent;
            
            // Show notification based on navigation
            showToast(`Navigating to ${navLabel}`, 'info');
            
            // Simulate page navigation
            console.log(`Navigation to: ${navLabel}`);
        });
    });
}

// Menu Items Functions
function initializeMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const menuText = this.querySelector('.menu-text').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show loading state
            this.classList.add('loading');
            
            setTimeout(() => {
                this.classList.remove('loading');
                showToast(`Opening ${menuText}...`, 'success');
                console.log(`Menu clicked: ${menuText}`);
            }, 800);
        });
        
        // Add hover effect for desktop
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

// Quick Actions Functions
function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionText = this.querySelector('span').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle navigation based on action type
            if (actionText === 'Konsultasi') {
                // Navigate to konsultasi page
                this.querySelector('span').textContent = 'Loading...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    // Add page transition effect
                    document.body.style.opacity = '0.8';
                    document.body.style.transform = 'translateX(20px)';
                    
                    setTimeout(() => {
                        window.location.href = 'konsul.html';
                    }, 300);
                }, 500);
                
                return;
            } else if (actionText === 'Tes Psikologi') {
                // Navigate to tes psikologi page
                this.querySelector('span').textContent = 'Loading...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    // Add page transition effect
                    document.body.style.opacity = '0.8';
                    document.body.style.transform = 'translateX(20px)';
                    
                    setTimeout(() => {
                        window.location.href = 'tes-psikologi.html';
                    }, 300);
                }, 500);
                
                return;
            }
            
            // Show loading state for other actions
            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Loading...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.querySelector('span').textContent = originalText;
                this.style.opacity = '1';
                showToast(`${actionText} feature coming soon!`, 'info');
                console.log(`Quick action clicked: ${actionText}`);
            }, 1000);
        });
    });
}

// Notification Functions
function initializeNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    
    notificationBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        showToast('No new notifications', 'info');
        console.log('Notification button clicked');
    });
}

// Articles Functions
function initializeArticles() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const articleTitle = this.querySelector('.article-title').textContent;
            
            // Add click animation (mobile-friendly)
            if (window.innerWidth > 768) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
            
            // Show loading state
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.style.opacity = '1';
                showToast(`Opening article: ${articleTitle}`, 'success');
                console.log(`Article clicked: ${articleTitle}`);
                
                // Here you can add navigation to article detail page
                // For now, we'll just show a message
                setTimeout(() => {
                    showToast('Article detail page coming soon!', 'info');
                }, 500);
            }, 600);
        });
        
        // Add hover effect for desktop only
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', function() {
                this.style.borderColor = 'var(--primary-color)';
                this.style.boxShadow = 'var(--shadow-medium)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        }
    });
}

// Welcome Card Animation
function animateWelcomeCard() {
    const welcomeCard = document.querySelector('.welcome-card');
    const greeting = document.querySelector('.greeting');
    const avatar = document.querySelector('.user-avatar');
    
    // Animate greeting text
    setTimeout(() => {
        greeting.style.opacity = '0';
        greeting.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            greeting.textContent = getTimeBasedGreeting();
            greeting.style.transition = 'all 0.5s ease';
            greeting.style.opacity = '1';
            greeting.style.transform = 'translateY(0)';
        }, 300);
    }, 1000);
    
    // Add subtle hover effect to avatar
    avatar.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    avatar.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Global navigation functions
function navigateToKonsul() {
    showToast('Menuju halaman konsultasi...', 'info');
    setTimeout(() => {
        window.location.href = 'konsul.html';
    }, 500);
}

function navigateToTesPsikologi() {
    showToast('Menuju halaman tes psikologi...', 'info');
    setTimeout(() => {
        window.location.href = 'tes-psikologi.html';
    }, 500);
}

// Navigation functions for specific pages
function goToRiwayat() {
    showToast('Membuka halaman riwayat...', 'info');
    setTimeout(() => {
        window.location.href = 'riwayat.html';
    }, 500);
}

function goToProfil() {
    showToast('Membuka halaman profil...', 'info');
    setTimeout(() => {
        window.location.href = 'profil.html';
    }, 500);
}

function goToTesModal() {
    showToast('Membuka tes psikologi...', 'info');
    setTimeout(() => {
        window.location.href = 'tes-psikologi.html';
    }, 500);
}

// Add event listeners for navigation buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for bottom navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href !== '#') {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const pageName = href.replace('.html', '');
                showToast(`Membuka halaman ${pageName}...`, 'info');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        }
    });
});

// Utility Functions
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) {
        return 'Hi, Jumbo!';
    } else if (hour < 17) {
        return 'Good Afternoon, Jumbo!';
    } else {
        return 'Good Evening, Jumbo!';
    }
}

function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '25px',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '10000',
        maxWidth: '300px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        animation: 'slideInToast 0.3s ease-out',
        cursor: 'pointer'
    });
    
    // Set background based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#4f63d8',
        warning: '#ffc107'
    };
    
    toast.style.background = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Click to dismiss
    toast.addEventListener('click', () => {
        toast.remove();
    });
    
    // Auto remove
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOutToast 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// Profile Management
function updateUserProfile() {
    const userName = document.querySelector('.greeting');
    const userType = document.querySelector('.user-type');
    const userAvatar = document.querySelector('.user-avatar');
    
    // Simulate profile data
    const profiles = [
        { name: 'Jumbo', type: 'Student', avatar: 'assets/Image/Dokter.png' },
        { name: 'Alex', type: 'Professional', avatar: 'assets/Image/Dokter.png' },
        { name: 'Sarah', type: 'Therapist', avatar: 'assets/Image/Dokter.png' }
    ];
    
    const currentProfile = profiles[0]; // Default to first profile
    
    userName.textContent = `Hi, ${currentProfile.name}!`;
    userType.textContent = currentProfile.type;
    userAvatar.src = currentProfile.avatar;
}

// Logout Function
function logout() {
    showToast('Logging out...', 'info');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Add logout functionality to profile section (if needed)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('user-avatar')) {
        const confirmLogout = confirm('Do you want to logout?');
        if (confirmLogout) {
            logout();
        }
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or return to previous state
        document.activeElement.blur();
    }
    
    // Navigate with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const focusableElements = document.querySelectorAll(
            '.menu-item, .action-btn, .nav-item'
        );
        
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        let nextIndex;
        
        if (e.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % focusableElements.length;
        } else {
            nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
        }
        
        focusableElements[nextIndex].focus();
        e.preventDefault();
    }
});

// Add CSS for toast animations
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideInToast {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutToast {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyles);

// Performance monitoring
console.log('📊 Dashboard performance metrics:');
console.log(`- Load time: ${performance.now().toFixed(2)}ms`);
console.log('- Interactive elements initialized');
console.log('- Responsive design active');
console.log('- Accessibility features enabled');
