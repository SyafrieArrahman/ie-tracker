# IE Tracker Website Documentation

## Gambaran Umum

IE Tracker adalah aplikasi web sederhana untuk melacak pendapatan (Income) dan pengeluaran (Expense). Aplikasi ini memungkinkan pengguna untuk mencatat transaksi, melihat ringkasan keuangan, dan menghasilkan laporan dalam format PDF.

## Struktur Aplikasi

Aplikasi ini terdiri dari dua halaman utama:

1. **index.html**: Halaman utama untuk memasukkan dan menampilkan transaksi.
2. **report.html**: Halaman laporan yang menampilkan grafik dan riwayat transaksi, serta opsi untuk mengunduh laporan PDF.

## Fitur Utama

### Halaman Utama (index.html)

1. **Dashboard Keuangan**
   - Menampilkan total pendapatan, pengeluaran, dan saldo.

2. **Formulir Transaksi**
   - Formulir untuk menambahkan transaksi pendapatan.
   - Formulir untuk menambahkan transaksi pengeluaran.

3. **Tabel Transaksi**
   - Menampilkan riwayat transaksi dengan opsi filter dan pengurutan.

### Halaman Laporan (report.html)

1. **Grafik Pendapatan vs Pengeluaran**
   - Menampilkan grafik garis yang membandingkan pendapatan dan pengeluaran dari waktu ke waktu.

2. **Tabel Riwayat Transaksi**
   - Menampilkan daftar lengkap semua transaksi.

3. **Unduh Laporan PDF**
   - Tombol untuk menghasilkan dan mengunduh laporan dalam format PDF.

## Teknologi yang Digunakan

- HTML5 untuk struktur halaman
- Tailwind CSS untuk styling
- JavaScript untuk fungsionalitas dinamis
- Chart.js untuk membuat grafik
- jsPDF dan html2canvas untuk menghasilkan PDF

## Penyimpanan Data

Aplikasi menggunakan localStorage untuk menyimpan data transaksi di browser pengguna. Ini berarti data akan tersimpan bahkan setelah browser ditutup, tetapi hanya tersedia di perangkat dan browser yang sama.

## Petunjuk Penggunaan

### Menambahkan Transaksi

1. Buka halaman utama (index.html).
2. Pilih formulir "Add Income" atau "Add Expense".
3. Isi tanggal, deskripsi, dan jumlah transaksi.
4. Klik tombol "Add" untuk menyimpan transaksi.

### Melihat Laporan

1. Klik link "Report" di navigasi atas untuk membuka halaman report.html.
2. Lihat grafik pendapatan vs pengeluaran dan tabel riwayat transaksi.

### Mengunduh Laporan PDF

1. Di halaman laporan, klik tombol "Download Report".
2. File PDF akan dihasilkan dan diunduh otomatis.
3. PDF berisi tabel transaksi pada halaman pertama dan grafik pada halaman kedua.

## Keterbatasan dan Pertimbangan

1. Data disimpan secara lokal di browser, sehingga tidak dapat diakses dari perangkat lain.
2. Tidak ada fitur autentikasi atau perlindungan data.
3. Performa mungkin menurun jika jumlah transaksi sangat besar.

## Pengembangan Lebih Lanjut

Beberapa ide untuk pengembangan di masa depan:

1. Implementasi backend untuk penyimpanan data terpusat.
2. Fitur autentikasi pengguna.
3. Kategorisasi transaksi yang lebih detail.
4. Fitur ekspor data ke format lain (misalnya CSV).
5. Visualisasi data yang lebih beragam (misalnya grafik pie untuk kategori pengeluaran).