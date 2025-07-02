// Video Call Page JavaScript
class VideoCallManager {
    constructor() {
        this.doctorInfo = this.getDoctorInfo();
        this.callDuration = 0;
        this.callTimer = null;
        this.isCallActive = false;
        this.isCameraOn = true;
        this.isMicOn = true;
        this.isSpeakerOn = true;
        this.init();
    }

    init() {
        this.setupCallControls();
        this.startCallTimer();
        this.simulateCallConnection();
        this.loadTheme();
        this.setupAnimations();
        console.log('Video call initialized for:', this.doctorInfo?.name);
    }

    getDoctorInfo() {
        // Get doctor info based on current page
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('videocall-ani')) {
            return {
                id: 'ani',
                name: 'Dr. Ani Sulistyani',
                specialty: 'Psikolog Klinis',
                initialDuration: 5
            };
        } else if (currentPage.includes('videocall-rahma')) {
            return {
                id: 'rahma',
                name: 'Dr. Rahma Sari',
                specialty: 'Psikolog CBT',
                initialDuration: 8
            };
        } else if (currentPage.includes('videocall-hanna')) {
            return {
                id: 'hanna',
                name: 'Dr. Hanna Putri',
                specialty: 'Psikolog Remaja',
                initialDuration: 12
            };
        }
        
        return null;
    }

    setupCallControls() {
        // Camera toggle
        const cameraBtn = document.querySelector('.camera-btn');
        if (cameraBtn) {
            cameraBtn.addEventListener('click', () => {
                this.toggleCamera();
            });
        }

        // Microphone toggle
        const micBtn = document.querySelector('.mic-btn');
        if (micBtn) {
            micBtn.addEventListener('click', () => {
                this.toggleMic();
            });
        }

        // Speaker toggle
        const speakerBtn = document.querySelector('.speaker-btn');
        if (speakerBtn) {
            speakerBtn.addEventListener('click', () => {
                this.toggleSpeaker();
            });
        }

        // End call
        const endCallBtn = document.querySelector('.end-call-btn');
        if (endCallBtn) {
            endCallBtn.addEventListener('click', () => {
                this.endCall();
            });
        }

        // Chat button
        const chatBtn = document.querySelector('.chat-btn');
        if (chatBtn) {
            chatBtn.addEventListener('click', () => {
                this.openChat();
            });
        }

        // Switch camera
        const switchCameraBtn = document.querySelector('.switch-camera-btn');
        if (switchCameraBtn) {
            switchCameraBtn.addEventListener('click', () => {
                this.switchCamera();
            });
        }
    }

    startCallTimer() {
        if (this.doctorInfo) {
            this.callDuration = this.doctorInfo.initialDuration;
        }
        
        this.updateCallDuration();
        
        this.callTimer = setInterval(() => {
            this.callDuration++;
            this.updateCallDuration();
        }, 1000);
        
        this.isCallActive = true;
    }

    updateCallDuration() {
        const callDurationElement = document.getElementById('callDuration');
        if (callDurationElement) {
            const minutes = Math.floor(this.callDuration / 60);
            const seconds = this.callDuration % 60;
            callDurationElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    simulateCallConnection() {
        const callStatus = document.getElementById('callStatus');
        if (callStatus) {
            // Show connecting status
            callStatus.classList.add('show');
            
            setTimeout(() => {
                // Hide connecting status
                callStatus.classList.remove('show');
                
                // Show connected toast
                this.showToast('Call connected successfully', 'success');
            }, 3000);
        }
    }

    toggleCamera() {
        this.isCameraOn = !this.isCameraOn;
        const cameraBtn = document.querySelector('.camera-btn');
        const userVideo = document.querySelector('.user-video');
        
        if (cameraBtn) {
            if (this.isCameraOn) {
                cameraBtn.classList.add('active');
                cameraBtn.style.background = 'var(--success-color)';
                this.showToast('Camera turned on', 'success');
            } else {
                cameraBtn.classList.remove('active');
                cameraBtn.style.background = 'var(--danger-color)';
                this.showToast('Camera turned off', 'info');
            }
        }

        if (userVideo) {
            userVideo.style.opacity = this.isCameraOn ? '1' : '0.5';
        }

        // Add button animation
        this.animateButton(cameraBtn);
    }

    toggleMic() {
        this.isMicOn = !this.isMicOn;
        const micBtn = document.querySelector('.mic-btn');
        
        if (micBtn) {
            if (this.isMicOn) {
                micBtn.classList.add('active');
                micBtn.style.background = 'var(--success-color)';
                this.showToast('Microphone turned on', 'success');
            } else {
                micBtn.classList.remove('active');
                micBtn.style.background = 'var(--danger-color)';
                this.showToast('Microphone muted', 'info');
            }
        }

        // Add button animation
        this.animateButton(micBtn);
    }

    toggleSpeaker() {
        this.isSpeakerOn = !this.isSpeakerOn;
        const speakerBtn = document.querySelector('.speaker-btn');
        const speakerIcon = document.querySelector('.speaker-icon');
        
        if (speakerBtn) {
            if (this.isSpeakerOn) {
                speakerBtn.classList.add('active');
                speakerBtn.style.background = 'var(--success-color)';
                if (speakerIcon) speakerIcon.textContent = '🔊';
                this.showToast('Speaker on', 'success');
            } else {
                speakerBtn.classList.remove('active');
                speakerBtn.style.background = 'var(--glass-bg)';
                if (speakerIcon) speakerIcon.textContent = '🔇';
                this.showToast('Speaker off', 'info');
            }
        }

        // Add button animation
        this.animateButton(speakerBtn);
    }

    switchCamera() {
        const switchBtn = document.querySelector('.switch-camera-btn');
        
        // Add rotation animation
        if (switchBtn) {
            switchBtn.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                switchBtn.style.transform = 'rotate(0deg)';
            }, 300);
        }

        this.showToast('Camera switched', 'info');
    }

    endCall() {
        // Stop call timer
        if (this.callTimer) {
            clearInterval(this.callTimer);
            this.callTimer = null;
        }
        
        this.isCallActive = false;
        
        // Show ending animation
        const container = document.querySelector('.videocall-container');
        if (container) {
            container.style.opacity = '0';
            container.style.transform = 'scale(0.9)';
        }
        
        this.showToast('Call ended', 'info');
        
        // Save call data
        this.saveCallData();
        
        // Navigate back after animation
        setTimeout(() => {
            window.history.back();
        }, 1500);
    }

    openChat() {
        if (this.doctorInfo) {
            this.showToast(`Opening chat with ${this.doctorInfo.name}`, 'info');
            
            setTimeout(() => {
                window.location.href = `chat-${this.doctorInfo.id}.html`;
            }, 1000);
        }
    }

    animateButton(button) {
        if (button) {
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        }
    }

    setupAnimations() {
        // Animate controls on load
        const controls = document.querySelectorAll('.control-btn');
        controls.forEach((control, index) => {
            control.style.opacity = '0';
            control.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                control.style.transition = 'all 0.5s ease';
                control.style.opacity = '1';
                control.style.transform = 'translateY(0)';
            }, index * 100 + 500);
        });

        // Animate user video
        const userVideo = document.querySelector('.user-video-container');
        if (userVideo) {
            userVideo.style.opacity = '0';
            userVideo.style.transform = 'scale(0.8) translateX(20px)';
            
            setTimeout(() => {
                userVideo.style.transition = 'all 0.6s ease';
                userVideo.style.opacity = '1';
                userVideo.style.transform = 'scale(1) translateX(0)';
            }, 800);
        }

        // Pulse effect for active call
        const doctorImage = document.querySelector('.doctor-image');
        if (doctorImage) {
            setInterval(() => {
                if (this.isCallActive) {
                    doctorImage.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.5)';
                    setTimeout(() => {
                        doctorImage.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                    }, 1000);
                }
            }, 2000);
        }
    }

    saveCallData() {
        const callData = {
            doctorId: this.doctorInfo?.id,
            doctorName: this.doctorInfo?.name,
            duration: this.callDuration,
            endTime: new Date().toISOString(),
            type: 'video_call'
        };
        
        // Save to localStorage
        const existingCalls = JSON.parse(localStorage.getItem('call_history') || '[]');
        existingCalls.push(callData);
        localStorage.setItem('call_history', JSON.stringify(existingCalls));
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
    if (window.videoCallManager && window.videoCallManager.isCallActive) {
        const confirm = window.confirm('Are you sure you want to end the call?');
        if (!confirm) return;
        
        window.videoCallManager.endCall();
    } else {
        // Animate out before navigation
        const container = document.querySelector('.videocall-container');
        if (container) {
            container.style.transform = 'translateX(-100%)';
            container.style.opacity = '0';
        }
        
        setTimeout(() => {
            window.history.back();
        }, 300);
    }
}

function goToHome() {
    if (window.videoCallManager && window.videoCallManager.isCallActive) {
        const confirm = window.confirm('Are you sure you want to end the call?');
        if (!confirm) return;
        
        window.videoCallManager.endCall();
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        // Animate out before navigation
        const container = document.querySelector('.videocall-container');
        if (container) {
            container.style.transform = 'translateY(100%)';
            container.style.opacity = '0';
        }
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 300);
    }
}

function toggleCamera() {
    if (window.videoCallManager) {
        window.videoCallManager.toggleCamera();
    }
}

function toggleMic() {
    if (window.videoCallManager) {
        window.videoCallManager.toggleMic();
    }
}

function toggleSpeaker() {
    if (window.videoCallManager) {
        window.videoCallManager.toggleSpeaker();
    }
}

function switchCamera() {
    if (window.videoCallManager) {
        window.videoCallManager.switchCamera();
    }
}

function endCall() {
    if (window.videoCallManager) {
        window.videoCallManager.endCall();
    }
}

function openChat() {
    if (window.videoCallManager) {
        window.videoCallManager.openChat();
    }
}

// Theme Functions
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
    if (window.videoCallManager) {
        window.videoCallManager.showToast(
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
        if (window.videoCallManager) {
            window.videoCallManager.showToast('Theme toggle ditampilkan', 'info');
        }
    } else {
        // Hide theme toggle
        toggleBtn.style.display = 'none';
        visibilityIcon.textContent = '👁️‍🗨️';
        if (window.videoCallManager) {
            window.videoCallManager.showToast('Theme toggle disembunyikan', 'info');
        }
    }
}

// Touch/Gesture Support
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

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - this.startX;
            const deltaY = endY - this.startY;
            
            // Swipe right to go back (with confirmation during call)
            if (deltaX > 100 && Math.abs(deltaY) < 100) {
                goBack();
            }
            
            // Swipe up to end call
            if (deltaY < -100 && Math.abs(deltaX) < 100) {
                if (window.videoCallManager && window.videoCallManager.isCallActive) {
                    endCall();
                }
            }
        });

        // Double tap to toggle camera
        let lastTap = 0;
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 500 && tapLength > 0) {
                // Double tap detected
                toggleCamera();
            }
            lastTap = currentTime;
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
    
    // Space to toggle microphone
    if (e.key === ' ') {
        e.preventDefault();
        toggleMic();
    }
    
    // C to toggle camera
    if (e.key === 'c' || e.key === 'C') {
        toggleCamera();
    }
    
    // E or Escape to end call
    if (e.key === 'e' || e.key === 'E' || e.key === 'Escape') {
        endCall();
    }
    
    // S to toggle speaker
    if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        toggleSpeaker();
    }
});

// Prevent accidental refresh during call
window.addEventListener('beforeunload', (e) => {
    if (window.videoCallManager && window.videoCallManager.isCallActive) {
        e.preventDefault();
        e.returnValue = 'You are currently in a video call. Are you sure you want to leave?';
        return e.returnValue;
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.videoCallManager = new VideoCallManager();
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

// Performance Optimization and Cleanup
window.addEventListener('beforeunload', () => {
    // Clean up call timer
    if (window.videoCallManager && window.videoCallManager.callTimer) {
        clearInterval(window.videoCallManager.callTimer);
    }
    
    // Clean up any other intervals or timeouts
    const timeouts = window.setTimeout(() => {}, 0);
    for (let i = 0; i < timeouts; i++) {
        window.clearTimeout(i);
    }
});
