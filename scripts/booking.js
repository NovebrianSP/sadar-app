// Booking Page JavaScript
class BookingManager {
    constructor() {
        this.selectedTime = null;
        this.doctorInfo = this.getDoctorInfo();
        this.init();
    }

    init() {
        this.setupTimeSlots();
        this.setupAnimations();
        this.loadTheme();
        console.log('Booking page initialized');
    }

    getDoctorInfo() {
        // Get doctor info based on current page
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('booking-ani')) {
            return {
                id: 'ani',
                name: 'dr Ani Sulistyani',
                license: 'IDR20',
                location: 'Yogyakarta',
                rating: 4.9,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc imperdiet, velit non lobortis rutrum, dapibus felis malesuada felis, eliquet hendrerit risus magna in tellus. Curabitur congue vitae pem nec vestibulum. Nullam lacinia est vitae ipsum ultrices commodo.'
            };
        } else if (currentPage.includes('booking-rahma')) {
            return {
                id: 'rahma',
                name: 'dr Rahma Sari',
                license: 'PSY15',
                location: 'Jakarta',
                rating: 4.8,
                description: 'Spesialis psikologi klinis dengan pengalaman 8 tahun menangani kasus anxiety, depression, dan trauma. Menggunakan pendekatan cognitive behavioral therapy (CBT) dan mindfulness-based interventions untuk memberikan perawatan yang komprehensif dan holistik.'
            };
        } else if (currentPage.includes('booking-hanna')) {
            return {
                id: 'hanna',
                name: 'dr Hanna Putri',
                license: 'MED22',
                location: 'Bandung',
                rating: 4.7,
                description: 'Dokter muda yang berspesialisasi dalam kesehatan mental remaja dan dewasa muda. Memiliki keahlian khusus dalam menangani stress management, relationship counseling, dan academic pressure. Menggunakan pendekatan yang empati dan modern sesuai dengan kebutuhan generasi Z.'
            };
        }
        
        return null;
    }

    setupTimeSlots() {
        const timeSlots = document.querySelectorAll('.time-slot');
        
        timeSlots.forEach(slot => {
            slot.addEventListener('click', (e) => {
                // Remove selected class from all slots
                timeSlots.forEach(s => s.classList.remove('selected'));
                
                // Add selected class to clicked slot
                e.target.classList.add('selected');
                
                // Store selected time
                this.selectedTime = e.target.dataset.time;
                
                // Add animation
                e.target.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 200);
                
                this.showToast(`Waktu ${this.selectedTime} dipilih`, 'info');
            });
        });
    }

    setupAnimations() {
        // Animate cards on load
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animate doctor photo
        const doctorPhoto = document.querySelector('.doctor-photo');
        if (doctorPhoto) {
            doctorPhoto.addEventListener('mouseenter', () => {
                doctorPhoto.style.transform = 'scale(1.05) rotate(2deg)';
            });
            
            doctorPhoto.addEventListener('mouseleave', () => {
                doctorPhoto.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }

    loadTheme() {
        // Apply saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Global Functions
function goBack() {
    // Animate out before navigation
    const container = document.querySelector('.booking-container');
    if (container) {
        container.style.transform = 'translateX(-100%)';
        container.style.opacity = '0';
    }
    
    setTimeout(() => {
        window.history.back();
    }, 300);
}

function goToHome() {
    // Animate out before navigation
    const container = document.querySelector('.booking-container');
    if (container) {
        container.style.transform = 'translateY(100%)';
        container.style.opacity = '0';
    }
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 300);
}

function handleBooking(doctorId) {
    const bookingManager = window.bookingManager;
    
    if (!bookingManager.selectedTime) {
        bookingManager.showToast('Pilih waktu konsultasi terlebih dahulu', 'error');
        return;
    }

    // Show loading state
    const bookingBtn = document.querySelector('.booking-action-btn');
    const originalText = bookingBtn.innerHTML;
    
    bookingBtn.innerHTML = '<span>Memproses...</span>';
    bookingBtn.disabled = true;
    bookingBtn.classList.add('loading');

    // Simulate booking process
    setTimeout(() => {
        // Reset button
        bookingBtn.innerHTML = originalText;
        bookingBtn.disabled = false;
        bookingBtn.classList.remove('loading');
        
        // Show success message
        const doctorName = bookingManager.doctorInfo ? bookingManager.doctorInfo.name : 'Dokter';
        bookingManager.showToast(
            `Booking berhasil dengan ${doctorName} pada ${bookingManager.selectedTime}`, 
            'success'
        );
        
        // Store booking data
        const bookingData = {
            doctorId: doctorId,
            doctorName: doctorName,
            time: bookingManager.selectedTime,
            date: new Date().toISOString().split('T')[0],
            status: 'confirmed'
        };
        
        // Save to localStorage
        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        existingBookings.push(bookingData);
        localStorage.setItem('bookings', JSON.stringify(existingBookings));
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    }, 2000);
}

// Theme Functions (from theme-manager.js)
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // Show feedback
    if (window.bookingManager) {
        window.bookingManager.showToast(
            `Tema ${newTheme === 'dark' ? 'gelap' : 'terang'} diaktifkan`,
            'info'
        );
    }
}

function toggleThemeVisibility() {
    const container = document.getElementById('themeToggleContainer');
    const toggleBtn = document.getElementById('themeToggle');
    const visibilityBtn = document.getElementById('toggleVisibility');
    const visibilityIcon = document.querySelector('.visibility-icon');
    
    if (!container || !toggleBtn || !visibilityBtn) return;
    
    const isHidden = toggleBtn.style.display === 'none';
    
    if (isHidden) {
        // Show theme toggle
        toggleBtn.style.display = 'flex';
        visibilityIcon.textContent = '👁️';
        if (window.bookingManager) {
            window.bookingManager.showToast('Theme toggle ditampilkan', 'info');
        }
    } else {
        // Hide theme toggle
        toggleBtn.style.display = 'none';
        visibilityIcon.textContent = '👁️‍🗨️';
        if (window.bookingManager) {
            window.bookingManager.showToast('Theme toggle disembunyikan', 'info');
        }
    }
}

// Touch/Swipe Support for Mobile
class TouchHandler {
    constructor() {
        this.startX = 0;
        this.startY = 0;
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        document.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', (e) => {
            // Prevent default scroll behavior for horizontal swipes
            const deltaX = Math.abs(e.touches[0].clientX - this.startX);
            const deltaY = Math.abs(e.touches[0].clientY - this.startY);
            
            if (deltaX > deltaY) {
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - this.startX;
            const deltaY = endY - this.startY;
            
            // Swipe right to go back
            if (deltaX > 100 && Math.abs(deltaY) < 100) {
                goBack();
            }
        });
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + T for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Escape to go back
    if (e.key === 'Escape') {
        goBack();
    }
    
    // Number keys to select time slots
    if (e.key >= '1' && e.key <= '5') {
        const timeSlots = document.querySelectorAll('.time-slot');
        const index = parseInt(e.key) - 1;
        if (timeSlots[index]) {
            timeSlots[index].click();
        }
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bookingManager = new BookingManager();
    new TouchHandler();
    
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
});

// Performance Optimization
window.addEventListener('beforeunload', () => {
    // Clean up any intervals or timeouts
    const timeouts = window.setTimeout(() => {}, 0);
    for (let i = 0; i < timeouts; i++) {
        window.clearTimeout(i);
    }
});
