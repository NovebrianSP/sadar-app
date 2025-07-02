# Sadar - Mental Health Platform Frontend Demo

**Frontend-only demonstration** untuk platform kesehatan mental "Sadar" yang dibuat menggunakan HTML, CSS, dan JavaScript vanilla. Website ini berfokus pada UI/UX tanpa validasi backend.

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

```
sadar-web/
├── index.html          # File HTML utama
├── style.css           # Stylesheet responsif
├── script.js           # JavaScript untuk interaktivitas
├── README.md           # Dokumentasi
└── assets/             # Asset gambar dan ikon
    ├── Logo/
    │   ├── sadar_biru.png
    │   └── sadar_putih.png
    ├── google_icon.svg
    ├── facebook_icon.svg
    └── apple_icon.svg
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

## 📄 License

Project ini dibuat untuk keperluan pendidikan dan dapat digunakan sebagai referensi pembelajaran.

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk pembelajaran UI/UX dan Web Development

---

**Happy Coding! 🚀**
