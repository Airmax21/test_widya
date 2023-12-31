# Test Widya

## Deskripsi

Ini adalah contoh aplikasi web full-stack menggunakan React untuk frontend dan Node.js untuk backend. Aplikasi ini mencakup otentikasi, halaman dasboard, dan halaman detail pengguna.

## Fitur

- Otentikasi pengguna (Login dan Register)
- Halaman dasboard
- Halaman detail pengguna
- Fungsionalitas logout

## Teknologi yang Digunakan

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Penyajian: CSS, Bootstrap

## Memulai

### Prasyarat

- Node.js terinstal
- NPM terinstal
- PostgreSQL terinstal dan berjalan

### Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/Airmax21/test_widya.git
   cd test_widya
2. Instal Dependesi:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
3. Import database yang sudah di sediakan menggunakan PostgreSQL:

   ```bash
   psql -U <username> -W -h <ip_address> -d db_test_widya -f db_test_widya.sql
5. Jalankan server:

   ```bash
   node index.js
6. Jalankan client:

   ```bash
   cd ../client
   npm start

## Penggunaan Aplikasi

### Registrasi atau Login:

1. Buka aplikasi di peramban web Anda dengan alamat http://localhost:3000.
2. Registrasi akun baru atau login jika sudah memiliki akun.

### Jelajahi Aplikasi:

- Akses halaman dasbor untuk melihat informasi terkini.
- Kunjungi halaman detail pengguna untuk mendapatkan informasi akun Anda.

### Logout:

- Logout ketika selesai menggunakan aplikasi.
- Tombol logout terdapat di pojok kanan navbar.

### Menghentikan Pengembangan:

- Tekan `Ctrl + C` pada terminal untuk menghentikan server frontend dan backend.
