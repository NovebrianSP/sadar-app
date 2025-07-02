// Riwayat JavaScript
class RiwayatManager {
    constructor() {
        this.currentFilter = 'all';
        this.riwayatData = this.loadRiwayatData();
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupDateFilters();
        this.setupActionButtons();
        this.setupNavigationHandlers();
        this.loadTheme();
        this.setupAnimations();
        console.log('📋 Riwayat page loaded successfully!');
    }

    setupFilterButtons() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filter = btn.dataset.filter;
                this.currentFilter = filter;
                
                // Apply filter
                this.applyFilter(filter);
                
                // Show feedback
                this.showToast(`Filter: ${btn.textContent}`, 'info');
            });
        });
    }

    setupDateFilters() {
        const dateFrom = document.getElementById('date-from');
        const dateTo = document.getElementById('date-to');
        
        if (dateFrom && dateTo) {
            // Set default dates (last 30 days)
            const today = new Date();
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            
            dateFrom.value = monthAgo.toISOString().split('T')[0];
            dateTo.value = today.toISOString().split('T')[0];
            
            // Add event listeners
            dateFrom.addEventListener('change', () => this.applyDateFilter());
            dateTo.addEventListener('change', () => this.applyDateFilter());
        }
    }

    setupActionButtons() {
        // View Detail buttons
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.viewDetail(btn);
            });
        });

        // Download buttons
        const downloadBtns = document.querySelectorAll('.download-btn');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadReport(btn);
            });
        });

        // Add hover effects to riwayat items
        const riwayatItems = document.querySelectorAll('.riwayat-item');
        riwayatItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.addHoverEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeHoverEffect(item);
            });
        });
    }

    viewDetail(btn) {
        const riwayatItem = btn.closest('.riwayat-item');
        const doctorName = riwayatItem.querySelector('.doctor-name').textContent;
        const consultationType = riwayatItem.querySelector('.consultation-type').textContent;
        
        // Add loading state
        const originalText = btn.textContent;
        btn.textContent = 'Loading...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            
            // Show detail modal
            this.showDetailModal({
                doctor: doctorName,
                type: consultationType,
                date: riwayatItem.querySelector('.consultation-date').textContent,
                status: 'Selesai'
            });
        }, 1000);
    }

    downloadReport(btn) {
        const riwayatItem = btn.closest('.riwayat-item');
        const doctorName = riwayatItem.querySelector('.doctor-name').textContent;
        const consultationType = riwayatItem.querySelector('.consultation-type').textContent;
        
        // Add loading state
        const originalText = btn.textContent;
        btn.textContent = 'Downloading...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            
            this.showToast(`Laporan ${consultationType} berhasil diunduh`, 'success');
            console.log(`Downloaded report for: ${doctorName} - ${consultationType}`);
        }, 2000);
    }

    showDetailModal(data) {
        const modal = this.createDetailModal(data);
        document.body.appendChild(modal);
        
        // Animate modal appearance
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    createDetailModal(data) {
        const modal = document.createElement('div');
        modal.className = 'detail-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content glass-dashboard">
                <div class="modal-header">
                    <h3>Detail Konsultasi</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="detail-info">
                        <div class="detail-item">
                            <label>Dokter:</label>
                            <span>${data.doctor}</span>
                        </div>
                        <div class="detail-item">
                            <label>Jenis Konsultasi:</label>
                            <span>${data.type}</span>
                        </div>
                        <div class="detail-item">
                            <label>Tanggal & Waktu:</label>
                            <span>${data.date}</span>
                        </div>
                        <div class="detail-item">
                            <label>Status:</label>
                            <span class="status-badge">${data.status}</span>
                        </div>
                        <div class="detail-item">
                            <label>Hasil:</label>
                            <div class="hasil-content">
                                <p>Hasil konsultasi menunjukkan kondisi mental yang baik. Disarankan untuk tetap menjaga pola hidup sehat dan rutin melakukan aktivitas yang positif.</p>
                                <ul>
                                    <li>Tingkat stres: Normal</li>
                                    <li>Kondisi emosi: Stabil</li>
                                    <li>Rekomendasi: Lanjutkan terapi rutin</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-print">Cetak Laporan</button>
                    <button class="btn-close">Tutup</button>
                </div>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .detail-modal {
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
            
            .detail-modal.show {
                opacity: 1;
            }
            
            .detail-modal .modal-content {
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                border-radius: 20px;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .detail-modal.show .modal-content {
                transform: scale(1);
            }
            
            .detail-info {
                space-y: 1rem;
            }
            
            .detail-item {
                display: flex;
                flex-direction: column;
                margin-bottom: 1rem;
                padding: 1rem;
                background: var(--bg-glass);
                border-radius: 12px;
                border: 1px solid var(--border-color);
            }
            
            .detail-item label {
                font-weight: 600;
                color: var(--text-secondary);
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }
            
            .detail-item span {
                color: var(--text-primary);
                font-weight: 500;
            }
            
            .hasil-content {
                color: var(--text-primary);
                line-height: 1.6;
            }
            
            .hasil-content p {
                margin-bottom: 1rem;
            }
            
            .hasil-content ul {
                padding-left: 1.5rem;
            }
            
            .hasil-content li {
                margin-bottom: 0.5rem;
            }
            
            .btn-print {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                border: none;
                border-radius: 8px;
                padding: 0.75rem 1.5rem;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.2s;
            }
            
            .btn-print:hover {
                transform: scale(1.05);
            }
            
            .btn-close {
                background: var(--bg-glass);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 0.75rem 1.5rem;
                color: var(--text-primary);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .btn-close:hover {
                background: var(--bg-glass-hover);
            }
        `;
        
        document.head.appendChild(style);
        
        // Setup modal event handlers
        const closeBtn = modal.querySelector('.modal-close');
        const closeBtnFooter = modal.querySelector('.btn-close');
        const printBtn = modal.querySelector('.btn-print');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        closeBtnFooter.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        
        printBtn.addEventListener('click', () => {
            this.showToast('Laporan sedang dicetak...', 'info');
            console.log('Printing report...');
        });
        
        return modal;
    }

    applyFilter(filter) {
        const riwayatItems = document.querySelectorAll('.riwayat-item');
        
        riwayatItems.forEach(item => {
            const shouldShow = this.shouldShowItem(item, filter);
            
            if (shouldShow) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.3s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update stats
        this.updateStats(filter);
    }

    shouldShowItem(item, filter) {
        if (filter === 'all') return true;
        
        const consultationType = item.querySelector('.consultation-type').textContent.toLowerCase();
        
        switch (filter) {
            case 'konsultasi':
                return consultationType.includes('konsultasi') || consultationType.includes('chat');
            case 'tes':
                return consultationType.includes('tes');
            case 'booking':
                return consultationType.includes('booking') || consultationType.includes('jadwal');
            default:
                return true;
        }
    }

    applyDateFilter() {
        const dateFrom = document.getElementById('date-from').value;
        const dateTo = document.getElementById('date-to').value;
        
        if (!dateFrom || !dateTo) return;
        
        this.showToast(`Filter tanggal: ${dateFrom} - ${dateTo}`, 'info');
        console.log(`Date filter applied: ${dateFrom} to ${dateTo}`);
    }

    updateStats(filter) {
        // Simulate stats update based on filter
        const statNumbers = document.querySelectorAll('.stat-number');
        
        setTimeout(() => {
            statNumbers.forEach((num, index) => {
                const originalValue = num.textContent;
                const newValue = this.getFilteredStatValue(filter, index);
                this.animateNumber(num, originalValue, newValue);
            });
        }, 300);
    }

    getFilteredStatValue(filter, index) {
        // Simulate different values based on filter
        const allStats = [12, 8, 4.8];
        const konsultasiStats = [8, 0, 4.9];
        const tesStats = [0, 8, 4.7];
        const bookingStats = [4, 0, 4.8];
        
        switch (filter) {
            case 'konsultasi': return konsultasiStats[index];
            case 'tes': return tesStats[index];
            case 'booking': return bookingStats[index];
            default: return allStats[index];
        }
    }

    animateNumber(element, from, to) {
        const duration = 500;
        const startTime = performance.now();
        const fromNum = parseFloat(from);
        const toNum = parseFloat(to);
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = fromNum + (toNum - fromNum) * progress;
            element.textContent = index === 2 ? current.toFixed(1) : Math.round(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
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
        element.style.transform = 'translateY(-2px) scale(1.01)';
    }

    removeHoverEffect(element) {
        element.style.background = 'var(--bg-glass)';
        element.style.transform = 'translateY(0) scale(1)';
    }

    setupAnimations() {
        // Stagger animation for riwayat items
        const riwayatItems = document.querySelectorAll('.riwayat-item');
        riwayatItems.forEach((item, index) => {
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

        const animateElements = document.querySelectorAll('.riwayat-item, .filter-card, .stat-card');
        animateElements.forEach(el => observer.observe(el));
    }

    loadRiwayatData() {
        // In real app, would load from localStorage or API
        return [
            {
                id: 1,
                doctor: 'Dr. Ani Sulistyani',
                type: 'Tes Kepribadian',
                date: '25 Nov 2024 • 10:30 AM',
                status: 'Selesai'
            },
            // ... more data
        ];
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
    window.riwayatManager?.goBack();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.riwayatManager = new RiwayatManager();
});

// Handle page visibility for animations
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Restart animations when page becomes visible
        const particles = document.querySelectorAll('.riwayat-particle');
        particles.forEach(particle => {
            particle.style.animation = 'none';
            particle.offsetHeight; // Trigger reflow
            particle.style.animation = null;
        });
    }
});
