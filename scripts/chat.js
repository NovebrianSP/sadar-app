// Chat Page JavaScript
class ChatManager {
    constructor() {
        this.doctorInfo = this.getDoctorInfo();
        this.messages = [];
        this.isEmojiPickerOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAutoScroll();
        this.loadTheme();
        this.simulateTyping();
        console.log('Chat page initialized for:', this.doctorInfo?.name);
    }

    getDoctorInfo() {
        // Get doctor info based on current page
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('chat-ani')) {
            return {
                id: 'ani',
                name: 'dr Ani Sulistyani',
                specialty: 'Psikolog Klinis',
                status: 'Online'
            };
        } else if (currentPage.includes('chat-rahma')) {
            return {
                id: 'rahma',
                name: 'dr Rahma Sari',
                specialty: 'Psikolog CBT',
                status: 'Online'
            };
        } else if (currentPage.includes('chat-hanna')) {
            return {
                id: 'hanna',
                name: 'dr Hanna Putri',
                specialty: 'Psikolog Remaja',
                status: 'Online'
            };
        }
        
        return null;
    }

    setupEventListeners() {
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.querySelector('.send-btn');
        
        // Send message on Enter key
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Auto-resize input
            messageInput.addEventListener('input', (e) => {
                this.autoResizeInput(e.target);
            });
        }

        // Send button click
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Emoji picker toggle
        const emojiBtn = document.querySelector('.emoji-btn');
        if (emojiBtn) {
            emojiBtn.addEventListener('click', () => {
                this.toggleEmojiPicker();
            });
        }

        // Close emoji picker when clicking outside
        document.addEventListener('click', (e) => {
            const emojiPicker = document.getElementById('emojiPicker');
            const emojiBtn = document.querySelector('.emoji-btn');
            
            if (emojiPicker && !emojiPicker.contains(e.target) && !emojiBtn.contains(e.target)) {
                this.closeEmojiPicker();
            }
        });

        // Attachment button
        const attachmentBtn = document.querySelector('.attachment-btn');
        if (attachmentBtn) {
            attachmentBtn.addEventListener('click', () => {
                this.attachFile();
            });
        }
    }

    setupAutoScroll() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            // Auto scroll to bottom when new messages are added
            const observer = new MutationObserver(() => {
                this.scrollToBottom();
            });
            
            observer.observe(messagesContainer, { childList: true });
        }
    }

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        if (!messageInput) return;

        const messageText = messageInput.value.trim();
        if (!messageText) return;

        // Create message object
        const message = {
            id: Date.now(),
            text: messageText,
            type: 'sent',
            timestamp: new Date()
        };

        // Add message to UI
        this.addMessageToUI(message);
        
        // Clear input
        messageInput.value = '';
        this.autoResizeInput(messageInput);

        // Add to messages array
        this.messages.push(message);

        // Close emoji picker if open
        this.closeEmojiPicker();

        // Simulate doctor response
        setTimeout(() => {
            this.simulateDoctorResponse(messageText);
        }, 1000 + Math.random() * 2000);

        // Save to localStorage
        this.saveMessages();
    }

    addMessageToUI(message) {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.type}`;
        
        const timeString = this.formatTime(message.timestamp);
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(message.text)}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;

        messagesContainer.appendChild(messageElement);
        
        // Animate message in
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 100);
    }

    simulateDoctorResponse(userMessage) {
        const doctorResponses = this.getDoctorResponses(userMessage);
        const response = doctorResponses[Math.floor(Math.random() * doctorResponses.length)];

        const message = {
            id: Date.now(),
            text: response,
            type: 'received',
            timestamp: new Date()
        };

        // Show typing indicator
        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessageToUI(message);
            this.messages.push(message);
            this.saveMessages();
        }, 1500 + Math.random() * 1000);
    }

    getDoctorResponses(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Responses based on doctor personality
        if (this.doctorInfo?.id === 'ani') {
            if (lowerMessage.includes('cemas') || lowerMessage.includes('anxiety')) {
                return [
                    'Saya memahami kekhawatiran Anda. Mari kita bahas teknik breathing yang bisa membantu mengurangi kecemasan.',
                    'Kecemasan adalah respons normal, tapi kita bisa belajar mengelolanya. Apakah Anda sudah mencoba teknik grounding?',
                    'Ceritakan lebih detail tentang situasi yang membuat Anda cemas. Kita akan cari solusi bersama.'
                ];
            } else if (lowerMessage.includes('stress') || lowerMessage.includes('stres')) {
                return [
                    'Stress memang bisa sangat menyulitkan. Mari kita identifikasi pemicu stress dan cara mengatasinya.',
                    'Penting untuk mengenali tanda-tanda stress early. Apa yang biasanya Anda rasakan saat stress?',
                    'Kita bisa coba beberapa teknik stress management yang terbukti efektif.'
                ];
            }
        } else if (this.doctorInfo?.id === 'rahma') {
            if (lowerMessage.includes('kerja') || lowerMessage.includes('pekerjaan')) {
                return [
                    'Work-life balance memang tantangan besar. Mari kita susun strategi yang sustainable untuk Anda.',
                    'Tekanan di tempat kerja bisa diatasi dengan pendekatan CBT. Apakah Anda familiar dengan teknik tersebut?',
                    'Penting untuk set boundaries yang sehat di lingkungan kerja. Bagaimana kondisi workplace Anda saat ini?'
                ];
            } else if (lowerMessage.includes('overthinking')) {
                return [
                    'Overthinking adalah pola pikir yang bisa kita ubah dengan latihan mindfulness. Mari kita mulai dari teknik sederhana.',
                    'Cognitive restructuring bisa sangat membantu mengatasi overthinking. Kita akan practice bersama.',
                    'Saya akan ajarkan teknik "thought stopping" yang efektif untuk mengatasi spiral pikiran negatif.'
                ];
            }
        } else if (this.doctorInfo?.id === 'hanna') {
            if (lowerMessage.includes('kuliah') || lowerMessage.includes('mahasiswa')) {
                return [
                    'Academic pressure memang real! Kita bisa work together untuk balance study dan mental health ya.',
                    'Time management skills itu game changer untuk mahasiswa. Let me share some practical tips!',
                    'College life emang challenging, tapi remember you\'re not alone. Kita akan figure this out together!'
                ];
            } else if (lowerMessage.includes('orang tua') || lowerMessage.includes('keluarga')) {
                return [
                    'Family dynamics bisa complicated, especially untuk generasi kita. Mari kita explore cara komunikasi yang healthy.',
                    'Parent expectations vs personal goals itu struggle yang banyak dialami. You\'re valid untuk merasa conflicted.',
                    'Setting boundaries dengan family itu skill yang important. We can work on this together!'
                ];
            }
        }

        // General responses
        const generalResponses = [
            'Saya mendengarkan Anda. Bisa ceritakan lebih detail?',
            'Terima kasih sudah mau share. Bagaimana perasaan Anda setelah menceritakan ini?',
            'Saya memahami situasi yang Anda hadapi. Mari kita cari solusi step by step.',
            'Itu pasti tidak mudah untuk Anda. Apa yang paling ingin Anda ubah dari situasi ini?',
            'Saya appreciate keberanian Anda untuk terbuka. Mari kita work together mengatasi ini.'
        ];

        return generalResponses;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;

        const typingElement = document.createElement('div');
        typingElement.className = 'message received typing-indicator';
        typingElement.id = 'typingIndicator';
        
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    toggleEmojiPicker() {
        const emojiPicker = document.getElementById('emojiPicker');
        if (!emojiPicker) return;

        if (this.isEmojiPickerOpen) {
            this.closeEmojiPicker();
        } else {
            this.openEmojiPicker();
        }
    }

    openEmojiPicker() {
        const emojiPicker = document.getElementById('emojiPicker');
        if (emojiPicker) {
            emojiPicker.classList.add('show');
            this.isEmojiPickerOpen = true;
        }
    }

    closeEmojiPicker() {
        const emojiPicker = document.getElementById('emojiPicker');
        if (emojiPicker) {
            emojiPicker.classList.remove('show');
            this.isEmojiPickerOpen = false;
        }
    }

    insertEmoji(emoji) {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            const cursorPosition = messageInput.selectionStart;
            const textBefore = messageInput.value.substring(0, cursorPosition);
            const textAfter = messageInput.value.substring(cursorPosition);
            
            messageInput.value = textBefore + emoji + textAfter;
            messageInput.focus();
            messageInput.setSelectionRange(cursorPosition + emoji.length, cursorPosition + emoji.length);
        }
        this.closeEmojiPicker();
    }

    attachFile() {
        this.showToast('Fitur upload file akan segera tersedia', 'info');
    }

    autoResizeInput(input) {
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    formatTime(date) {
        return date.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveMessages() {
        if (this.doctorInfo) {
            localStorage.setItem(`chat_${this.doctorInfo.id}`, JSON.stringify(this.messages));
        }
    }

    loadMessages() {
        if (this.doctorInfo) {
            const saved = localStorage.getItem(`chat_${this.doctorInfo.id}`);
            if (saved) {
                this.messages = JSON.parse(saved);
                this.messages.forEach(message => {
                    message.timestamp = new Date(message.timestamp);
                    this.addMessageToUI(message);
                });
            }
        }
    }

    simulateTyping() {
        // Show initial typing after page load
        setTimeout(() => {
            if (this.messages.length === 0) {
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                }, 2000);
            }
        }, 1000);
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
    const container = document.querySelector('.chat-container');
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
    const container = document.querySelector('.chat-container');
    if (container) {
        container.style.transform = 'translateY(100%)';
        container.style.opacity = '0';
    }
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 300);
}

function startVideoCall(doctorId) {
    const chatManager = window.chatManager;
    const doctorName = chatManager?.doctorInfo?.name || 'Dokter';
    
    chatManager?.showToast(`Memulai video call dengan ${doctorName}`, 'info');
    
    // Navigate to video call page
    setTimeout(() => {
        window.location.href = `videocall-${doctorId}.html`;
    }, 1000);
}

function toggleEmojiPicker() {
    if (window.chatManager) {
        window.chatManager.toggleEmojiPicker();
    }
}

function insertEmoji(emoji) {
    if (window.chatManager) {
        window.chatManager.insertEmoji(emoji);
    }
}

function attachFile() {
    if (window.chatManager) {
        window.chatManager.attachFile();
    }
}

function sendMessage() {
    if (window.chatManager) {
        window.chatManager.sendMessage();
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
    if (window.chatManager) {
        window.chatManager.showToast(
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
        if (window.chatManager) {
            window.chatManager.showToast('Theme toggle ditampilkan', 'info');
        }
    } else {
        // Hide theme toggle
        toggleBtn.style.display = 'none';
        visibilityIcon.textContent = '👁️‍🗨️';
        if (window.chatManager) {
            window.chatManager.showToast('Theme toggle disembunyikan', 'info');
        }
    }
}

// Touch/Swipe Support
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
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatManager = new ChatManager();
    new TouchHandler();
    
    // Add CSS for typing indicator
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots {
            display: flex;
            gap: 4px;
            align-items: center;
        }
        
        .typing-dots span {
            width: 6px;
            height: 6px;
            background: var(--text-muted);
            border-radius: 50%;
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance Optimization
window.addEventListener('beforeunload', () => {
    // Clean up any intervals or timeouts
    const timeouts = window.setTimeout(() => {}, 0);
    for (let i = 0; i < timeouts; i++) {
        window.clearTimeout(i);
    }
});
