// Konsultasi JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🩺 Konsultasi page loaded successfully!');
    
    // Initialize konsultasi components
    initializeCategorySelection();
    initializeDoctorActions();
    initializeNavigation();
    
    // Add entrance animations
    animatePageEntrance();
});

// Category Selection Functions
function initializeCategorySelection() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get category type
            const category = this.dataset.category;
            
            // Filter doctors based on category (simulation)
            filterDoctorsByCategory(category);
            
            // Show feedback
            showToast(`Filtering doctors for: ${this.querySelector('.category-label').textContent}`, 'info');
        });
    });
}

// Doctor Actions Functions
function initializeDoctorActions() {
    // Booking buttons
    const bookingBtns = document.querySelectorAll('.booking-btn');
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const doctorName = this.closest('.doctor-card').querySelector('.doctor-name').textContent;
            
            // Add loading state
            this.style.opacity = '0.7';
            this.innerHTML = '<span>Loading...</span>';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.innerHTML = '<span>Booking</span>';
                
                // Navigate to appropriate booking page
                let bookingPage = 'booking-ani.html'; // default
                if (doctorName.includes('Rahma')) {
                    bookingPage = 'booking-rahma.html';
                } else if (doctorName.includes('Hanna')) {
                    bookingPage = 'booking-hanna.html';
                } else if (doctorName.includes('Ani')) {
                    bookingPage = 'booking-ani.html';
                }
                
                showToast(`Membuka booking Dr. ${doctorName}`, 'success');
                
                // Navigate with animation
                setTimeout(() => {
                    window.location.href = bookingPage;
                }, 500);
                
                console.log(`Booking clicked for Dr. ${doctorName}, navigating to ${bookingPage}`);
            }, 1000);
        });
    });
    
    // Chat buttons
    const chatBtns = document.querySelectorAll('.chat-btn');
    chatBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const doctorName = this.closest('.doctor-card').querySelector('.doctor-name').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            showToast(`Opening chat with Dr. ${doctorName}`, 'info');
            
            // Navigate to appropriate chat page
            let chatPage = 'chat-ani.html'; // default
            if (doctorName.includes('Rahma')) {
                chatPage = 'chat-rahma.html';
            } else if (doctorName.includes('Hanna')) {
                chatPage = 'chat-hanna.html';
            } else if (doctorName.includes('Ani')) {
                chatPage = 'chat-ani.html';
            }
            
            // Navigate with animation
            setTimeout(() => {
                window.location.href = chatPage;
            }, 500);
            
            console.log(`Chat clicked for Dr. ${doctorName}, navigating to ${chatPage}`);
        });
    });
    
    // Video call buttons
    const videoBtns = document.querySelectorAll('.video-btn');
    videoBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const doctorName = this.closest('.doctor-card').querySelector('.doctor-name').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            showToast(`Starting video call with Dr. ${doctorName}`, 'success');
            
            // Navigate to appropriate video call page
            let videocallPage = 'videocall-ani.html'; // default
            if (doctorName.includes('Rahma')) {
                videocallPage = 'videocall-rahma.html';
            } else if (doctorName.includes('Hanna')) {
                videocallPage = 'videocall-hanna.html';
            } else if (doctorName.includes('Ani')) {
                videocallPage = 'videocall-ani.html';
            }
            
            // Navigate with animation
            setTimeout(() => {
                window.location.href = videocallPage;
            }, 500);
            
            console.log(`Video call clicked for Dr. ${doctorName}, navigating to ${videocallPage}`);
        });
    });
}

// Navigation Functions
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Filter doctors by category (simulation)
function filterDoctorsByCategory(category) {
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    // Add loading effect
    doctorCards.forEach(card => {
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.98)';
    });
    
    // Simulate filtering delay
    setTimeout(() => {
        doctorCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
        
        console.log(`Filtered doctors for category: ${category}`);
    }, 300);
}

// Page entrance animation
function animatePageEntrance() {
    const categoryItems = document.querySelectorAll('.category-item');
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    // Animate categories
    categoryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate doctor cards
    doctorCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 150));
    });
}

// Navigation Functions
function goBack() {
    // Add exit animation
    document.body.style.opacity = '0.8';
    document.body.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        window.history.back();
        // If no history, go to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 100);
    }, 300);
}

function goToHome() {
    // Add exit animation
    document.body.style.opacity = '0.8';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 300);
}

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'konsul-toast';
    
    const isMobile = window.innerWidth <= 768;
    
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="toast-text">${message}</span>
        </div>
    `;
    
    Object.assign(toast.style, {
        position: 'fixed',
        top: isMobile ? '80px' : '100px',
        right: '20px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '10px',
        padding: '12px 16px',
        color: 'var(--text-primary)',
        fontSize: isMobile ? '13px' : '14px',
        zIndex: '10001',
        backdropFilter: 'blur(10px)',
        animation: 'slideInToast 0.3s ease-out',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        maxWidth: isMobile ? '280px' : '350px',
        boxShadow: 'var(--shadow-medium)'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutToast 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations to CSS (dynamic injection)
if (!document.querySelector('#toast-animations')) {
    const style = document.createElement('style');
    style.id = 'toast-animations';
    style.textContent = `
        @keyframes slideInToast {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutToast {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Handle responsive behavior
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 768;
    
    // Adjust animations for mobile
    if (isMobile) {
        const categoryItems = document.querySelectorAll('.category-item');
        const doctorCards = document.querySelectorAll('.doctor-card');
        
        categoryItems.forEach(item => {
            item.style.transition = 'background-color 0.2s ease, border-color 0.2s ease';
        });
        
        doctorCards.forEach(card => {
            card.style.transition = 'background-color 0.2s ease, border-color 0.2s ease';
        });
    }
});

// Logout function (if needed)
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Add exit animation
        document.body.style.opacity = '0.5';
        document.body.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    }
}
