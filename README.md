# Sadar - Mental Health Platform Frontend Demo

**Frontend-only demonstration** untuk platform## 🧪 Quick Testing Guide

### Cara Testing Cepat
1. **Buka `navigation.html`** - Hub navigasi untuk mengakses semua halaman
2. **Buka `test-validation.html`** - Panel testing lengkap dengan semua fitur
3. **Mulai dari `splash.html`** - Untuk testing user journey lengkap

### Testing Flow Recommended
```
1. splash.html → login.html → dashboard.html
2. dashboard.html → (test bottom navigation ke semua halaman)
3. konsul.html → booking → chat → video call
4. tes-psikologi.html → (test semua jenis tes)
5. riwayat.html → (test filter dan statistik)
6. profil.html → (test edit dan pengaturan)
```

### Keyboard Shortcuts
- **T** atau **Ctrl+Shift+T**: Toggle dark/light theme
- **Ctrl+Shift+H**: Hide/show theme toggle button
- **Tab**: Navigate through interactive elements

### Testing Features
- ✅ **Responsive Design**: Test di berbagai ukuran layar
- ✅ **Theme Toggle**: Test dark/light mode
- ✅ **Bottom Navigation**: Test navigasi antar halaman
- ✅ **Interactive Elements**: Test hover, click, dan animasi
- ✅ **Toast Notifications**: Test feedback visual
- ✅ **Form Interactions**: Test input dan validasi (frontend-only)al "Sadar" yang dibuat menggunakan HTML, CSS, dan JavaScript vanilla. Website ini berfokus pada UI/UX tanpa validasi backend.

## ✨ Fitur Demo

### 🎬 Splash Screen
- Animasi splash screen dengan durasi 2.5 detik
- Menampilkan logo "Sadar" dengan efek animasi yang smooth
- Transisi otomatis ke halaman login

### 🔐 Demo Autentikasi
- **Halaman Login**: Form dapat disubmit tanpa mengisi field apapun
- **Halaman Register**: Otomatis redirect ke login setelah klik "Sign Up"
- **Social Login**: Simulasi login berhasil dengan notifikasi
- **Navigasi Smooth**: Transisi animasi antar halaman

### 🏥 Halaman Konsultasi
- **Kategori Mental Health**: 8 kategori masalah kesehatan mental
- **Daftar Dokter**: 3 dokter dengan spesialisasi berbeda
- **Interaksi**: Booking, chat, dan video call dengan animasi
- **Filter Kategori**: Aktif/non-aktif dengan feedback visual

### 🧠 Halaman Tes Psikologi
- **5 Jenis Tes Psikologi**: Kepribadian, Intelegensi, Minat Bakat, Kesehatan Mental, Kreativitas
- **Detail Tes**: Durasi, jumlah pertanyaan, dan deskripsi lengkap untuk setiap tes
- **Modal Konfirmasi**: Instruksi dan persiapan sebelum memulai tes
- **Riwayat Tes**: Menampilkan hasil tes sebelumnya dengan badge status
- **Responsive Design**: Layout adaptif untuk mobile dan desktop
- **Interactive UI**: Hover effects, loading states, dan toast notifications

### 📋 Halaman Riwayat
- **Filter Riwayat**: Tab untuk semua, konsultasi, dan tes psikologi
- **Statistik Summary**: Total konsultasi, tes selesai, dan rating rata-rata
- **Detail Riwayat**: Informasi lengkap konsultasi dan hasil tes
- **Filter Waktu**: 7 hari, 30 hari, 3 bulan, atau semua waktu
- **Interactive Cards**: Hover effects dan detail view untuk setiap item
- **Load More**: Pagination untuk riwayat yang panjang

### 👤 Halaman Profil
- **Informasi Pengguna**: Foto profil, nama, email, dan status online
- **Edit Profil**: Form untuk mengubah data diri dan foto profil
- **Statistik Pengguna**: Jumlah konsultasi, tes, dan achievement
- **Pengaturan Akun**: Password, notifikasi, dan preferensi
- **Logout**: Konfirmasi logout dengan modal
- **Responsive Design**: Layout adaptif untuk semua perangkat

### 🧭 Bottom Navigation
- **5 Menu Utama**: Home, Konsultasi, Tes, Riwayat, Profil
- **Active State**: Indikator visual untuk halaman aktif
- **Smooth Transition**: Animasi saat berpindah halaman
- **Mobile Optimized**: Touch-friendly untuk perangkat mobile
- **Consistent**: Tersedia di semua halaman utama

### 📅 Halaman Booking Dokter
- **3 Halaman Booking**: Terpisah untuk setiap dokter
  - Dr. Ani Sulistyani (Yogyakarta) - Rating 4.9
  - Dr. Rahma Sari (Jakarta) - Rating 4.8  
  - Dr. Hanna Putri (Bandung) - Rating 4.7
- **Pemilihan Jadwal**: 5 slot waktu tersedia per dokter
- **Informasi Lengkap**: Foto, lokasi, rating, dan deskripsi dokter
- **Proses Booking**: Simulasi booking dengan feedback

### 🌙 Theme Toggle
- **Dark/Light Mode**: Dapat diaktifkan/dinonaktifkan
- **Hide/Show Toggle**: Tombol theme dapat disembunyikan
- **Keyboard Shortcut**: Ctrl/Cmd + T untuk toggle theme
- **Toast Notification**: Feedback visual untuk setiap aksi

### 📱 Responsive Design
- **Mobile First**: Optimized untuk perangkat mobile
- **Tablet Support**: Layout yang disesuaikan untuk tablet
- **Desktop Ready**: Interface yang elegan untuk desktop
- **Cross-browser Compatible**: Mendukung semua browser modern

### 🎭 Interactive Features
- **No Form Validation**: Demonstrasi UI tanpa validasi input
- **Smooth Animations**: Transisi halus antar komponen
- **Loading States**: Simulasi loading saat submit form
- **Toast Notifications**: Feedback visual untuk setiap aksi

## 🎯 Demo Flow

### User Journey
1. **Splash Screen** (2.5 detik) → **Login Page**
2. **Login Page** → Klik "Sign In" (tanpa mengisi form) → Success notification
3. **Login Page** → Klik "Sign Up" → **Register Page**
4. **Register Page** → Klik "Sign Up" (tanpa mengisi form) → Kembali ke **Login Page**
5. **Social Login** → Klik ikon sosial → Success notification

### Fitur Demo
- ✅ **No Form Validation**: Form dapat disubmit kosong
- ✅ **Auto Navigation**: Register langsung redirect ke Login
- ✅ **Visual Feedback**: Loading states dan notifications
- ✅ **Responsive**: Bekerja di semua ukuran layar

## � Cara Menjalankan

1. **Clone atau download project**
2. **Buka folder project**
3. **Jalankan dengan live server atau buka `index.html` di browser**

```bash
# Jika menggunakan Live Server di VS Code
# Klik kanan pada index.html -> Open with Live Server

# Atau langsung buka di browser
# Double click pada index.html
```

> **Note**: Ini adalah demo frontend-only. Tidak ada validasi server dan semua interaksi disimulasi.

## 📁 Struktur Project

```
sadar-web/
├── index.html               # Redirect ke splash
├── navigation.html          # Halaman navigasi semua page
├── test-validation.html     # Testing dashboard lengkap
├── splash.html             # Splash screen dengan animasi
├── login.html              # Halaman login
├── register.html           # Halaman register
├── dashboard.html          # Dashboard utama
├── konsul.html             # Halaman konsultasi
├── tes-psikologi.html      # Halaman tes psikologi
├── riwayat.html            # Halaman riwayat konsultasi & tes
├── profil.html             # Halaman profil pengguna
├── booking-ani.html        # Booking Dr. Ani Sulistyani
├── booking-rahma.html      # Booking Dr. Rahma Sari
├── booking-hanna.html      # Booking Dr. Hanna Putri
├── chat-ani.html           # Chat dengan Dr. Ani
├── chat-rahma.html         # Chat dengan Dr. Rahma
├── chat-hanna.html         # Chat dengan Dr. Hanna
├── videocall-ani.html      # Video call dengan Dr. Ani
├── videocall-rahma.html    # Video call dengan Dr. Rahma
├── videocall-hanna.html    # Video call dengan Dr. Hanna
├── navigation.html         # Halaman navigasi untuk testing
├── test-validation.html    # Panel testing & validasi
├── README.md               # Dokumentasi project
├── styles/                 # Direktori CSS
│   ├── splash.css          # Style splash screen
│   ├── login.css           # Style halaman login
│   ├── register.css        # Style halaman register
│   ├── dashboard.css       # Style dashboard
│   ├── konsul.css          # Style halaman konsultasi
│   ├── tes-psikologi.css   # Style halaman tes psikologi
│   ├── riwayat.css         # Style halaman riwayat
│   ├── profil.css          # Style halaman profil
│   ├── booking.css         # Style halaman booking
│   ├── chat.css            # Style halaman chat
│   ├── videocall.css       # Style halaman video call
│   └── theme-toggle.css    # Style theme toggle
├── scripts/                # Direktori JavaScript
│   ├── splash.js           # Logic splash screen
│   ├── login.js            # Logic halaman login
│   ├── register.js         # Logic halaman register
│   ├── dashboard.js        # Logic dashboard
│   ├── konsul.js           # Logic halaman konsultasi
│   ├── tes-psikologi.js    # Logic halaman tes psikologi
│   ├── riwayat.js          # Logic halaman riwayat
│   ├── profil.js           # Logic halaman profil
│   ├── booking.js          # Logic halaman booking
│   ├── chat.js             # Logic halaman chat
│   ├── videocall.js        # Logic halaman video call
│   └── theme-manager.js    # Logic theme management
└── assets/                 # Asset gambar dan ikon
    ├── Logo/
    │   ├── sadar_biru.png
    │   └── sadar_putih.png
    ├── Icon/               # Semua ikon aplikasi
    ├── Image/              # Gambar dokter dan lainnya
    ├── icons/              # Ikon sosial media
    └── Keyboard/           # Asset keyboard dan status
```

## 🎨 Design System

### Warna
- **Primary**: #4f63d8 (Biru Sadar)
- **Secondary**: #667eea (Biru Gradient)
- **Background**: Linear gradient (#667eea → #764ba2)
- **Text**: #666 (Abu-abu gelap)
- **Success**: #28a745 (Hijau)
- **Error**: #dc3545 (Merah)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Font Weights**: 300 (Light), 400 (Regular), 600 (Semibold), Bold

### Spacing
- **Mobile**: 10px-30px
- **Tablet**: 15px-45px  
- **Desktop**: 20px-50px

## 📱 Breakpoints Responsif

```css
/* Mobile */
@media (max-width: 767px)

/* Mobile Extra Small */
@media (max-width: 480px)

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px)

/* Desktop */
@media (min-width: 1024px)
```

## ⚙️ Fitur JavaScript (Demo Mode)

### 🔄 State Management
- Manajemen transisi halaman tanpa refresh
- Loading states untuk semua button interactions
- Smooth page transitions dengan animasi

### 🎭 Simulated Interactions
- **Login**: Submit tanpa validasi → Success notification
- **Register**: Submit tanpa validasi → Auto redirect ke Login
- **Social Login**: Click → Loading → Success notification
- **Navigation**: Smooth transitions antar halaman

### 📢 Notification System
- Toast notifications untuk semua aksi
- Auto-dismiss setelah 4 detik
- Multiple types: success, info, error
- Click to dismiss

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Semantic markup
- **CSS3**: 
  - Flexbox & Grid Layout
  - CSS Animations & Transitions
  - CSS Variables
  - Media Queries
  - Backdrop Filter
- **JavaScript ES6+**:
  - Event Listeners
  - Async/Await simulation
  - Form Validation
  - DOM Manipulation
  - Local Storage (ready for implementation)

## 🔮 Pengembangan Selanjutnya

### Backend Integration
- [ ] API endpoint untuk autentikasi
- [ ] Database integration
- [ ] Session management
- [ ] JWT token handling

### Enhanced Features
- [ ] Password strength indicator
- [ ] Remember me functionality
- [ ] Forgot password flow
- [ ] Email verification
- [ ] Multi-language support

### Progressive Web App
- [ ] Service Worker
- [ ] Offline functionality
- [ ] Push notifications
- [ ] App manifest

## 🚀 Cara Menjalankan

### Prerequisites
- Browser modern (Chrome, Firefox, Safari, Edge)
- Tidak memerlukan server backend
- Tidak memerlukan installasi dependencies

### Menjalankan Aplikasi
```bash
# Method 1: Live Server (Recommended)
# 1. Install Live Server extension di VS Code
# 2. Klik kanan pada index.html atau navigation.html
# 3. Pilih "Open with Live Server"

# Method 2: Direct Browser
# 1. Double click pada index.html
# 2. Atau buka navigation.html untuk quick access
# 3. Atau buka test-validation.html untuk testing panel

# Method 3: Python Simple Server
python -m http.server 8000
# Buka http://localhost:8000

# Method 4: Node.js http-server
npx http-server
# Buka http://localhost:8080
```

### Quick Start
1. **Testing Hub**: Buka `navigation.html` untuk akses cepat ke semua halaman
2. **Full Testing**: Buka `test-validation.html` untuk panel testing lengkap
3. **User Journey**: Mulai dari `splash.html` untuk experience lengkap

> **Note**: Ini adalah demo frontend-only. Tidak ada validasi server dan semua interaksi disimulasi dengan JavaScript.

## 🎯 Best Practices

### Performance
- ✅ Minified assets
- ✅ Optimized images
- ✅ Efficient animations
- ✅ Debounced event handlers

### Security
- ✅ Input validation
- ✅ XSS prevention
- ✅ CSRF protection ready
- ✅ Secure form handling

### SEO
- ✅ Semantic HTML
- ✅ Meta tags
- ✅ Alt text untuk images
- ✅ Proper heading structure

## 🐛 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 70+     |
| Firefox | 65+     |
| Safari  | 12+     |
| Edge    | 79+     |

## 🧪 Testing & Validation

### 🚀 Quick Start Testing
1. **Main Testing Dashboard**: Open `test-validation.html` for comprehensive testing interface
2. **Flow Testing**: Follow `splash.html` → `login.html` → `dashboard.html` → `konsul.html`
3. **Doctor Interactions**: Test Booking, Chat, Video Call buttons for each doctor from konsul.html
4. **Theme Testing**: Use 'T' key or eye icon (bottom right) to toggle dark/light themes
5. **Responsive Testing**: Test on different screen sizes (mobile, tablet, desktop)

### ✅ Complete Testing Checklist
- [ ] Splash screen animation and auto-redirect (2.5s)
- [ ] Login form submission (any input accepted)  
- [ ] Register form auto-redirect to login
- [ ] Dashboard navigation and mental health categories
- [ ] Konsultasi doctor browsing and category filtering
- [ ] Dynamic doctor navigation (Booking/Chat/Video Call)
- [ ] Booking system with doctor-specific pages and scheduling
- [ ] Chat interface with message sending and emoji support
- [ ] Video call interface with camera controls and timer
- [ ] Theme toggle functionality and persistence
- [ ] Responsive design across all devices
- [ ] Smooth animations and glassmorphism effects
- [ ] Bottom navigation consistency across pages

### 🧭 Testing Navigation
- **Primary Testing**: `test-validation.html` - Comprehensive testing dashboard
- **Quick Navigation**: `navigation.html` - Fast access to all pages  
- **Main Flow**: `splash.html` → `login.html` → `dashboard.html` → `konsul.html`
- **Doctor Features**: From konsul.html, test each doctor's Booking/Chat/Video Call
- **Individual Pages**: Direct access to any specific feature page

### 🎯 Key Features to Test
1. **Theme System**: Toggle visibility with eye icon, switch themes with 'T' key
2. **Navigation Flow**: Smooth transitions between all pages
3. **Doctor Interactions**: Booking appointments, chat messages, video calls
4. **Responsive Layout**: Mobile-first design adaptation
5. **Visual Feedback**: Toast notifications, loading states, hover effects

## 📄 License

Project ini dibuat untuk keperluan pendidikan dan dapat digunakan sebagai referensi pembelajaran.

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk pembelajaran UI/UX dan Web Development

---

**Happy Coding! 🚀**
