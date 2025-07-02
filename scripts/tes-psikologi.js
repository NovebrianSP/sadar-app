// Tes Psikologi JavaScript
class TesPsikologiManager {
    constructor() {
        this.currentTest = null;
        this.testHistory = this.loadTestHistory();
        this.init();
    }

    init() {
        this.setupTestItems();
        this.setupHistorySection();
        this.setupNavigationHandlers();
        this.loadTheme();
        this.setupAnimations();
        console.log('🧠 Tes Psikologi page loaded successfully!');
    }

    setupTestItems() {
        const testItems = document.querySelectorAll('.test-item');
        
        testItems.forEach((item, index) => {
            // Add entrance animation with delay
            item.style.animationDelay = `${index * 0.1}s`;
            
            // Setup click handlers
            const startBtn = item.querySelector('.test-start-btn');
            const testType = item.dataset.test;
            
            if (startBtn) {
                startBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.startTest(testType, item);
                });
            }
            
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                this.addHoverEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeHoverEffect(item);
            });
        });
    }

    startTest(testType, itemElement) {
        // Add loading state to button
        const btn = itemElement.querySelector('.test-start-btn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Memuat...</span>';
        btn.style.opacity = '0.7';
        btn.disabled = true;
        
        // Show loading toast
        this.showToast('Mempersiapkan tes...', 'info');
        
        // Simulate test preparation
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
            
            // Show test start confirmation
            this.showTestConfirmation(testType);
        }, 1500);
    }

    showTestConfirmation(testType) {
        const testNames = {
            'kepribadian': 'Tes Kepribadian',
            'intelegensi': 'Tes Intelegensi',
            'minat-bakat': 'Tes Minat Bakat',
            'kesehatan': 'Tes Kesehatan Mental',
            'kreativitas': 'Tes Kreativitas'
        };
        
        const testName = testNames[testType] || 'Tes Psikologi';
        
        // Create confirmation modal
        const modal = this.createConfirmationModal(testName, testType);
        document.body.appendChild(modal);
        
        // Animate modal appearance
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    createConfirmationModal(testName, testType) {
        const modal = document.createElement('div');
        modal.className = 'test-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content glass-dashboard">
                <div class="modal-header">
                    <h3>Mulai ${testName}</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="test-info">
                        <div class="test-preview">
                            <div class="preview-icon">🧠</div>
                            <h4>${testName}</h4>
                            <p>Anda akan memulai tes psikologi. Pastikan Anda berada di tempat yang tenang dan memiliki waktu yang cukup.</p>
                        </div>
                        <div class="test-instructions">
                            <h5>Instruksi:</h5>
                            <ul>
                                <li>Jawab semua pertanyaan dengan jujur</li>
                                <li>Tidak ada jawaban yang benar atau salah</li>
                                <li>Pilih jawaban yang paling sesuai dengan diri Anda</li>
                                <li>Tes tidak dapat dijeda setelah dimulai</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel">Batal</button>
                    <button class="btn-start" data-test="${testType}">Mulai Tes</button>
                </div>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .test-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .test-modal.show {
                opacity: 1;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(8px);
            }
            
            .modal-content {
                position: relative;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                border-radius: 20px;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .test-modal.show .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--text-primary);
                font-size: 1.25rem;
                font-weight: 600;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-muted);
                transition: color 0.2s;
            }
            
            .modal-close:hover {
                color: var(--text-primary);
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .test-preview {
                text-align: center;
                margin-bottom: 1.5rem;
            }
            
            .preview-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            
            .test-preview h4 {
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }
            
            .test-preview p {
                color: var(--text-secondary);
                line-height: 1.6;
            }
            
            .test-instructions {
                background: var(--bg-glass);
                border-radius: 12px;
                padding: 1rem;
            }
            
            .test-instructions h5 {
                color: var(--text-primary);
                margin-bottom: 0.75rem;
            }
            
            .test-instructions ul {
                color: var(--text-secondary);
                padding-left: 1.5rem;
            }
            
            .test-instructions li {
                margin-bottom: 0.5rem;
                line-height: 1.4;
            }
            
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid var(--border-color);
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            .btn-cancel {
                background: var(--bg-glass);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 0.75rem 1.5rem;
                color: var(--text-primary);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .btn-cancel:hover {
                background: var(--bg-glass-hover);
            }
            
            .btn-start {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border: none;
                border-radius: 8px;
                padding: 0.75rem 1.5rem;
                color: white;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .btn-start:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
            }
        `;
        
        document.head.appendChild(style);
        
        // Setup modal event handlers
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.btn-cancel');
        const startBtn = modal.querySelector('.btn-start');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        
        startBtn.addEventListener('click', () => {
            this.proceedToTest(testType);
            closeModal();
        });
        
        return modal;
    }

    proceedToTest(testType) {
        // Show start confirmation
        this.showToast(`Memulai ${this.getTestName(testType)}...`, 'success');
        
        // Simulate test navigation (in real app, would navigate to test page)
        setTimeout(() => {
            this.showToast('Tes akan dimulai dalam aplikasi lengkap', 'info');
            console.log(`Starting test: ${testType}`);
            
            // In a real application, you would navigate to the actual test page
            // window.location.href = `test-${testType}.html`;
        }, 1000);
    }

    getTestName(testType) {
        const testNames = {
            'kepribadian': 'Tes Kepribadian',
            'intelegensi': 'Tes Intelegensi',
            'minat-bakat': 'Tes Minat Bakat',
            'kesehatan': 'Tes Kesehatan Mental',
            'kreativitas': 'Tes Kreativitas'
        };
        return testNames[testType] || 'Tes Psikologi';
    }

    setupHistorySection() {
        const historyItems = document.querySelectorAll('.view-result-btn');
        
        historyItems.forEach(btn => {
            btn.addEventListener('click', () => {
                this.viewTestResult(btn);
            });
        });
    }

    viewTestResult(btn) {
        const historyItem = btn.closest('.history-item');
        const testName = historyItem.querySelector('.history-test').textContent;
        
        btn.innerHTML = 'Memuat...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = 'Lihat Detail';
            btn.disabled = false;
            
            this.showToast(`Membuka hasil ${testName}`, 'info');
            
            // In real app, would show detailed results
            console.log(`Viewing result for: ${testName}`);
        }, 1000);
    }

    setupNavigationHandlers() {
        // Back button
        const backBtn = document.querySelector('.back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.goBack();
            });
        }
        
        // Bottom navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('href');
                if (href && href !== '#') {
                    this.showToast('Navigating...', 'info');
                }
            });
        });
    }

    goBack() {
        this.showToast('Kembali ke dashboard...', 'info');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 500);
    }

    addHoverEffect(element) {
        element.style.background = 'var(--bg-glass-hover)';
        element.style.transform = 'translateY(-5px) scale(1.02)';
    }

    removeHoverEffect(element) {
        element.style.background = 'var(--bg-glass)';
        element.style.transform = 'translateY(0) scale(1)';
    }

    setupAnimations() {
        // Stagger animation for test items
        const testItems = document.querySelectorAll('.test-item');
        testItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Add scroll animations
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const animateElements = document.querySelectorAll('.test-item, .history-card');
        animateElements.forEach(el => observer.observe(el));
    }

    loadTestHistory() {
        // In real app, would load from localStorage or API
        return [
            {
                type: 'kepribadian',
                date: '2025-01-15',
                result: 'ENFP',
                score: 85
            },
            {
                type: 'kesehatan',
                date: '2025-01-10',
                result: 'Sehat',
                score: 92
            }
        ];
    }

    saveTestHistory(testData) {
        this.testHistory.push(testData);
        // In real app, would save to localStorage or API
        localStorage.setItem('tesHistory', JSON.stringify(this.testHistory));
    }

    loadTheme() {
        // Theme is managed by theme-manager.js
        const savedTheme = localStorage.getItem('sadar-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Toast styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-glass);
            backdrop-filter: var(--backdrop-blur);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1rem 1.5rem;
            color: var(--text-primary);
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: var(--shadow-light);
        `;
        
        // Type-specific styling
        if (type === 'success') {
            toast.style.borderColor = 'var(--success-color)';
            toast.style.background = 'rgba(16, 185, 129, 0.1)';
        } else if (type === 'error') {
            toast.style.borderColor = 'var(--error-color)';
            toast.style.background = 'rgba(239, 68, 68, 0.1)';
        } else if (type === 'warning') {
            toast.style.borderColor = 'var(--warning-color)';
            toast.style.background = 'rgba(245, 158, 11, 0.1)';
        }
        
        document.body.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });
        
        // Auto remove
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
function goBack() {
    window.tesPsikologiManager?.goBack();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.tesPsikologiManager = new TesPsikologiManager();
});

// Handle page visibility for animations
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Restart animations when page becomes visible
        const particles = document.querySelectorAll('.tes-particle');
        particles.forEach(particle => {
            particle.style.animation = 'none';
            particle.offsetHeight; // Trigger reflow
            particle.style.animation = null;
        });
    }
});
