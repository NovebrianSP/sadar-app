// Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.createToggleButton();
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

    addEventListeners() {
        // Toggle button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggleTheme();
            }
        });

        // System theme change
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });

        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    showThemeToast(theme) {
        const toast = document.createElement('div');
        toast.className = 'theme-toast';
        toast.innerHTML = `
            <div class="theme-toast-content">
                <span class="theme-toast-icon">${theme === 'dark' ? '🌙' : '☀️'}</span>
                <span class="theme-toast-text">${theme === 'dark' ? 'Dark' : 'Light'} mode activated</span>
            </div>
        `;
        
        Object.assign(toast.style, {
            position: 'fixed',
            top: '80px',
            left: '20px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: 'var(--text-primary)',
            fontSize: '14px',
            zIndex: '10001',
            backdropFilter: 'blur(10px)',
            animation: 'slideInThemeToast 0.3s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        });
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutThemeToast 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
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
