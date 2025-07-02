// Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.createToggleButton();
        this.createHideButton();
        this.addEventListeners();
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('sadar-theme');
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('sadar-theme', theme);
        this.updateToggleButton();
        
        // Emit custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: theme } 
        }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add visual feedback
        this.showThemeToast(newTheme);
    }

    createToggleButton() {
        const toggleButton = document.createElement('div');
        toggleButton.className = 'theme-toggle';
        toggleButton.innerHTML = `
            <div class="theme-toggle-icon sun" id="sun-icon">☀️</div>
            <div class="theme-toggle-slider"></div>
            <div class="theme-toggle-icon moon" id="moon-icon">🌙</div>
        `;
        
        document.body.appendChild(toggleButton);
        this.toggleElement = toggleButton;
    }

    createHideButton() {
        const hideButton = document.createElement('div');
        hideButton.className = 'theme-toggle-hide-btn';
        hideButton.innerHTML = '👁️';
        hideButton.title = 'Show theme toggle';
        
        document.body.appendChild(hideButton);
        this.hideButtonElement = hideButton;
    }

    updateToggleButton() {
        if (!this.toggleElement) return;
        
        const sunIcon = this.toggleElement.querySelector('#sun-icon');
        const moonIcon = this.toggleElement.querySelector('#moon-icon');
        
        if (this.currentTheme === 'dark') {
            sunIcon.classList.remove('active');
            moonIcon.classList.add('active');
        } else {
            sunIcon.classList.add('active');
            moonIcon.classList.remove('active');
        }
    }

    toggleThemeToggleVisibility() {
        if (!this.toggleElement || !this.hideButtonElement) return;
        
        const isHidden = this.toggleElement.classList.contains('hidden');
        
        if (isHidden) {
            // Show theme toggle
            this.toggleElement.classList.remove('hidden');
            this.hideButtonElement.classList.remove('show');
            this.hideButtonElement.innerHTML = '👁️';
            this.hideButtonElement.title = 'Hide theme toggle';
            this.showHideToast(false);
        } else {
            // Hide theme toggle
            this.toggleElement.classList.add('hidden');
            this.hideButtonElement.classList.add('show');
            this.hideButtonElement.innerHTML = '👁️';
            this.hideButtonElement.title = 'Show theme toggle';
            this.showHideToast(true);
        }
    }

    addEventListeners() {
        // Toggle button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggleTheme();
            }
        });

        // Toggle button double click to hide
        document.addEventListener('dblclick', (e) => {
            if (e.target.closest('.theme-toggle')) {
                e.preventDefault();
                this.toggleThemeToggleVisibility();
            }
        });

        // Hide button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle-hide-btn')) {
                this.toggleThemeToggleVisibility();
            }
        });

        // System theme change
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });

        // System theme change
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + T to toggle theme
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
            
            // Ctrl/Cmd + Shift + H to hide/show theme toggle
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'H') {
                e.preventDefault();
                this.toggleThemeToggleVisibility();
            }
        });
    }

    showThemeToast(theme) {
        const toast = document.createElement('div');
        toast.className = 'theme-toast';
        
        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        const mobileText = isMobile ? ' (Optimized for mobile)' : '';
        
        toast.innerHTML = `
            <div class="theme-toast-content">
                <span class="theme-toast-icon">${theme === 'dark' ? '🌙' : '☀️'}</span>
                <span class="theme-toast-text">${theme === 'dark' ? 'Dark' : 'Light'} mode activated${mobileText}</span>
            </div>
        `;
        
        // Adjust position for theme toggle now at bottom
        const position = isMobile ? {
            bottom: '80px',
            right: '20px',
            top: 'auto',
            left: 'auto'
        } : {
            bottom: '80px',
            right: '20px',
            top: 'auto',
            left: 'auto'
        };
        
        Object.assign(toast.style, {
            position: 'fixed',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: 'var(--text-primary)',
            fontSize: isMobile ? '13px' : '14px',
            zIndex: '10001',
            backdropFilter: isMobile ? 'blur(5px)' : 'blur(10px)',
            animation: 'slideInThemeToast 0.3s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: isMobile ? '280px' : 'auto',
            ...position
        });
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutThemeToast 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, isMobile ? 1500 : 2000);
    }

    showHideToast(isHidden) {
        const toast = document.createElement('div');
        toast.className = 'theme-toast';
        
        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        const message = isHidden ? 'Theme toggle hidden' : 'Theme toggle visible';
        const instruction = isHidden ? 'Double-click the eye icon to show' : 'Double-click theme toggle to hide';
        
        toast.innerHTML = `
            <div class="theme-toast-content">
                <span class="theme-toast-icon">${isHidden ? '🫥' : '👁️'}</span>
                <span class="theme-toast-text">${message}<br><small>${instruction}</small></span>
            </div>
        `;
        
        // Adjust position for theme toggle now at bottom
        const position = isMobile ? {
            bottom: '80px',
            right: '20px',
            top: 'auto',
            left: 'auto'
        } : {
            bottom: '80px',
            right: '20px',
            top: 'auto',
            left: 'auto'
        };
        
        Object.assign(toast.style, {
            position: 'fixed',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: 'var(--text-primary)',
            fontSize: isMobile ? '12px' : '13px',
            zIndex: '10001',
            backdropFilter: isMobile ? 'blur(5px)' : 'blur(10px)',
            animation: 'slideInThemeToast 0.3s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: isMobile ? '250px' : '300px',
            ...position
        });
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutThemeToast 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    
    // Add CSS animations for toast
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInThemeToast {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutThemeToast {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
        
        .theme-toast-content {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .theme-toast-icon {
            font-size: 16px;
        }
        
        .theme-toast-text {
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
