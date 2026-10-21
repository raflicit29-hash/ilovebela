# Untuk Bela — website surat cinta

Website statis romantis, responsif untuk HP, dengan animasi mawar, bintang, kelopak, surat yang bisa dibaca, dan piano lembut yang dibuat langsung menggunakan Web Audio API.

## Struktur file

- `index.html` — isi halaman dan surat
- `style.css` — desain, responsif, dan animasi
- `script.js` — efek bintang/kelopak, tombol surat, dan piano

Tidak membutuhkan build tools, server, database, atau file musik eksternal.

## Cara publish lewat GitHub Pages

1. Login ke GitHub.
2. Tekan tombol **New repository**.
3. Beri nama misalnya `surat-untuk-bela`.
4. Pilih **Public** (GitHub Pages gratis untuk repository publik).
5. Buat repository.
6. Pilih **Add file → Upload files**, lalu unggah `index.html`, `style.css`, `script.js`, dan `README.md` dari folder ini. Pastikan `index.html` ada di root repository, bukan di dalam folder lain.
7. Tekan **Commit changes**.
8. Buka **Settings → Pages**.
9. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
10. Pilih branch `main`, folder `/(root)`, lalu tekan **Save**.
11. Tunggu beberapa menit, lalu buka:
   `https://USERNAME.github.io/surat-untuk-bela/`
   Ganti `USERNAME` dengan username GitHub milikmu. URL final harus sesuai nama repository.
12. Tes URL itu di HP, termasuk tombol “Buka suratku” dan “Putar piano”, sebelum membuat QR code.

## Membuat QR code setelah URL benar-benar aktif

1. Salin URL website yang sudah berhasil dibuka.
2. Buka generator QR tepercaya, misalnya `https://www.qrcode-monkey.com/`.
3. Pilih URL/Website, tempel URL GitHub Pages, lalu buat dan unduh QR sebagai PNG atau SVG.
4. Tes hasil QR dengan memindainya dari HP lain sebelum dicetak.
5. Jangan membuat QR dari URL yang masih perkiraan atau belum aktif.

## Catatan

- Audio tidak otomatis menyala; pengunjung harus menekan tombol **Putar piano** karena aturan autoplay browser.
- Musik di sini berupa nada piano sintetis sederhana, bukan rekaman piano profesional.
- Website publik bisa dibuka siapa saja yang memiliki URL.
- Google Fonts memerlukan internet; jika font eksternal tidak tersedia, halaman tetap memakai font cadangan.
