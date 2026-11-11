# Suara khas karakter

Tiap karakter bisa punya sampai tiga file MP3. Nama filenya memakai kunci karakter, yaitu nama file di `js/characters/` tanpa `.js`:

| File | Kapan diputar |
|---|---|
| `<kunci>.mp3` | menyapa, bergumam, teguran pertama, istirahat selesai |
| `<kunci>-marah.mp3` | teguran kedua dan seterusnya, dan saat kamu berhenti lebih awal |
| `<kunci>-senang.mp3` | saat dielus |

Contoh: `oyen.mp3`, `oyen-marah.mp3`, `oyen-senang.mp3`.

**Setiap menambah file, daftarkan juga namanya (tanpa `.mp3`) di [`daftar.js`](daftar.js).** File yang tidak terdaftar tidak akan diputar. Karakter tanpa file otomatis memakai suara sintetis bawaan, jadi semua file di sini opsional.

Rekaman hewan di folder ini diambil dari Wikimedia Commons dengan lisensi bebas. Sumber, pembuat, dan lisensi tiap file dicatat di [CREDITS.md](CREDITS.md). Kalau menambah atau mengganti file, perbarui juga CREDITS.md.

Saran:
- Durasi pendek, sekitar 0,5–2 detik. Suara yang panjang akan bertumpuk dengan gelembung bicara.
- Volume dinormalkan dan ukurannya kecil (mono, 64–96 kbps sudah cukup).
- Pakai hanya rekaman yang memang boleh kamu pakai dan sebarkan. Untuk karakter tokoh, hindari rekaman asli atau tiruan suara AI dari orang sungguhan, apalagi kalau repo ini publik. Rekaman suaramu sendiri yang menirukan lebih aman.
