# Pawang Layar

Pawang untuk layarmu. Pilih satu penjaga, lalu dia duduk di layarmu sampai waktu istirahat habis. Selama itu dia memperhatikan kursormu, ikut tertidur kalau kamu benar-benar istirahat, dan makin galak kalau kamu coba kabur.

Semua karakter adalah ilustrasi vektor yang dianimasikan langsung di browser. Suara bawaannya dibuat lewat Web Audio. Tidak ada build step, framework, atau file gambar eksternal. Suara khas per karakter bisa ditambahkan sendiri lewat `assets/suara/` (lihat [README di folder itu](assets/suara/README.md)).

## Fitur

- **Penjaga yang hidup.** Mereka bernapas, berkedip, dan mata serta kepalanya mengikuti kursor. Kalau dibiarkan, mereka melakukan hal kecil sendiri: menguap, memiringkan kepala, mengibaskan ekor, menjulurkan lidah, dan lain-lain.
- **Ikut tertidur.** Kalau kamu diam sekitar 22 detik, penjaga ikut terlelap.
- **Teguran bertingkat.** Pindah tab, tekan tombol, dorong kursor ke atas, atau keluar dari layar penuh. Urutannya: melotot → menggeram → menggebrak sampai layar bergetar → maju mendekat.
- **Bisa dielus dan disentil.** Usap kepalanya dengan kursor untuk mendapat hati dan dengkuran. Klik hidungnya kalau berani.
- **Gestur khas tokoh.** Prabowo hormat (dan kadang joget), Jokowi menunjuk, Gibran mengacungkan jempol, Megawati mengangkat telunjuk, Anies membuka kedua tangan, Ganjar dan Bahlil melambai.
- **Tahan 3 detik untuk keluar lebih awal.** Penjaganya akan bereaksi.
- **Jadwal otomatis.** Pilih tiap 25, 45, atau 60 menit kerja. Ada hitung mundur dan notifikasi browser.
- Pilihan tersimpan di `localStorage`. Tersedia mode gelap, tampilan HP, dan dukungan `prefers-reduced-motion`.

## Daftar penjaga

| File | Nama | Jenis |
|---|---|---|
| `oyen.js` | Oyen | Kucing oren |
| `mochi.js` | Mochi | Shiba |
| `kapi.js` | Kapi | Kapibara |
| `bambu.js` | Bambu | Panda |
| `honk.js` | Pak Honk | Angsa |
| `utan.js` | Utan | Orangutan |
| `komo.js` | Komo | Komodo |
| `uhu.js` | Uhu | Burung hantu |
| `jago.js` | Jago | Ayam jago |
| `bangkong.js` | Bangkong | Kodok |
| `prabowo.js` | Prabowo | Tokoh (parodi) |
| `jokowi.js` | Jokowi | Tokoh (parodi) |
| `gibran.js` | Gibran | Tokoh (parodi) |
| `megawati.js` | Megawati | Tokoh (parodi) |
| `anies.js` | Anies | Tokoh (parodi) |
| `ganjar.js` | Ganjar | Tokoh (parodi) |
| `bahlil.js` | Bahlil | Tokoh (parodi) |

## Menjalankan

Buka `index.html` langsung di browser. Kalau mau lewat server lokal:

```bash
python -m http.server 5173
```

lalu buka <http://localhost:5173>.

`galeri.html` menampilkan semua karakter sekaligus, lengkap dengan tombol untuk mencoba setiap suasana hati dan aksi. Halaman ini berguna saat membuat atau mengubah karakter.

### Chrome Extension (Latar Transparan)

Proyek ini juga berfungsi langsung sebagai **Chrome Extension (Manifest V3)**. Saat waktu istirahat dimulai, penjaga akan duduk di atas halaman web yang sedang kamu buka dengan latar belakang transparan (halaman tetap terlihat, tapi tidak bisa diklik/di-scroll sampai waktu istirahat habis, dan penjaga ikut pindah kalau kamu ganti tab).

1. Buka `chrome://extensions` di Google Chrome / Edge / Brave.
2. Aktifkan **Developer mode** (Mode pengembang) di pojok kanan atas.
3. Klik **Load unpacked** (Muat yang belum dikemas), lalu pilih folder repositori ini.
4. Klik ikon **Pawang Layar** di toolbar browser untuk memilih penjaga, durasi, atau jadwal otomatis.

### GitHub Pages

Buka **Settings → Pages**, pilih **Deploy from a branch**, lalu pilih branch `main` dan folder `/ (root)`. Situsnya akan tersedia di `https://<username>.github.io/penjagalayar/`.

## Struktur

```
index.html            halaman utama (versi web)
galeri.html           alat bantu: lihat semua karakter dan ekspresinya
manifest.json         konfigurasi Chrome Extension (Manifest V3)
css/style.css         gaya halaman utama
css/guard.css         gaya mode jaga & varian transparan extension
assets/favicon.svg    ikon vektor & ikon PNG extension (icon-16..128.png)
assets/suara/         rekaman suara MP3 tiap karakter + daftar.js
js/core/util.js       namespace PI, helper, eye(), registri karakter
js/core/audio.js      suara sintetis & pemutar MP3 (PI.SFX)
js/core/rig.js        rig animasi: suasana hati, mata, aksi (PI.Rig)
js/core/stage.js      panggung, gelembung bicara, partikel, elus/sentil
js/core/guard.js      logika mode jaga (dipakai versi web & extension)
js/characters/*.js    satu file per karakter
js/app.js             pengaturan, mode jaga, jadwal (versi web)
ext/background.js     service worker extension (alarm, sesi, injeksi tab)
ext/content.js        overlay Shadow DOM transparan di atas halaman web
ext/popup.html & .js  antarmuka popup extension di toolbar browser
ext/jaga.html & .js   halaman jaga cadangan untuk tab internal (chrome://)
```

Semua script dimuat sebagai `<script defer>` biasa (bukan ES module), supaya `index.html` tetap bisa dibuka langsung dari disk.

## Menambah karakter

1. Salin salah satu file di `js/characters/`, misalnya `oyen.js`, lalu ganti kunci dan isinya:

   ```js
   PI.register('kuncinya', {
     name: 'Nama', species: 'Jenis', tag: 'Kalimat singkat',
     group: 'hewan',                 // atau 'tokoh'
     accent: '#F3C48E',              // warna panel pratinjau
     glow: 'rgba(240,150,70,.34)',   // cahaya latar di mode jaga
     crop: '38 44 324 276',          // viewBox untuk kartu kecil
     sfx: { voice: 'meow', angry: 'growl', happy: 'purr' },
     rig: { head: [200, 292], look: [200, 184], mouth: [200, 244], /* … */ },
     lines: { greet: [], idle: [], escape: [], angry: [], slam: [], close: [], pet: [], boop: [],
              sleep: [], wake: [], back: [], hold: [], stay: [], quit: [], done: [] },
     svg: (u) => `…`                 // SVG 400×400; awali setiap id dengan ${u}
   });
   ```

2. Tambahkan `<script src="js/characters/kuncinya.js" defer></script>` di `index.html` dan `galeri.html`, sebelum `app.js`.

### Bagian SVG yang dikenali rig

Beri atribut `data-part` pada grup SVG. Bagian yang tidak ada akan dilewati.

| `data-part` | Gerakan | Titik poros di `rig` |
|---|---|---|
| `root` | masuk, keluar, dan mendekat (wajib) | — |
| `body` | bernapas | — |
| `head` | menoleh, miring, mengangguk (wajib) | `head` |
| `face` | bergeser sedikit saat menoleh (efek 3D) | — |
| `earL` / `earR` | berkedut, rebah saat marah | `earL` / `earR` |
| `browL` / `browR` | naik/turun sesuai suasana hati | `browL` / `browR` |
| `tail` | mengibas | `tail` |
| `pawL` / `pawR` | menggebrak, menguleni, menghentak | `pawL` / `pawR` |
| `wingL` / `wingR` | mengepak | `wingL` / `wingR` |
| `mouthOpen` / `mouthClosed` | bicara, menguap | `mouth` |
| `jaw` | rahang bawah turun saat bicara | — (`jawAmp`) |
| `tongue` | menjulur (`flick`) | `tongue` |
| `sac` | kantong suara menggembung (`croak`) | `sac` |
| `hat` | aksesoris memantul (`bob`) | `hat` |
| `prop` | benda yang dipegang | `prop` |
| `dangle` | bergoyang (misalnya pial ayam) | `dangle` |
| `arm` | tangan gestur khas: digambar dalam pose terangkat, rig menariknya naik dari bawah layar (`gesture`) | `arm` (+ `gesture: {side: 'L'\|'R'\|'both', wave}`) |
| `whiskers` | bergetar saat mengendus | — |
| `blush` | muncul saat senang | — |

Mata dibuat dengan `PI.util.eye(u, {...})`. Kelopak, lirikan, dan ukuran pupil diatur otomatis oleh rig. `look` di `rig` adalah titik di antara kedua mata, dipakai untuk menghitung arah tatapan.

Opsi tambahan: `idles`, `baseIdles`, `happyAct`, `happyMouth`, `angryMouth`, `lidBias`, `turn`, `tiltAmp`, `earAmp`, `jawAmp`, `slamSide`, `gesture`.

Aksi yang bisa dipakai di `idles` / `happyAct`: `look`, `twitch`, `tilt`, `sniff`, `yawn`, `munch`, `flap`, `bob`, `wag`, `knead`, `stomp`, `flick`, `croak`, `nod`, `gesture`, `dance`.

Suara sintetis yang tersedia (`js/core/audio.js`): `meow`, `purr`, `honk`, `hiss`, `bark`, `growl`, `huff`, `squeak`, `bleat`, `ooh`, `hoot`, `crow`, `cluck`, `croak`, `hmm`, `hmm2`, `ahem`, `thud`, `chime`, `pop`. Kalau `assets/suara/<kunci>.mp3`, `<kunci>-marah.mp3` atau `<kunci>-senang.mp3` ada, file itu yang dipakai. Lihat [assets/suara/README.md](assets/suara/README.md).

`galeri.html?only=<kunci>&poses=1` menampilkan satu karakter dalam 6 pose statis (calm, angry, happy, gesture, bicara, sleepy). Halaman ini cocok untuk mengecek hasil gambar atau mengambil screenshot otomatis.

## Catatan tentang karakter tokoh

Karakter di grup **Tokoh** adalah karikatur parodi untuk hiburan. Karakter ini tidak berafiliasi dengan, tidak disetujui oleh, dan tidak mewakili tokoh aslinya. Semua kalimatnya rekaan. Kalau ada keberatan, karakter bisa dihapus dengan menghapus file dan baris `<script>`-nya.
