/* Pawang Layar — pemuat tunggal untuk semua script inti dan karakter.
   Dipakai oleh index.html, galeri.html, ext/popup.html, dan ext/jaga.html:

     <script src="js/pawang.js"></script>      (tanpa defer, harus di <head>)

   MENAMBAH KARAKTER: cukup tambahkan kuncinya ke daftar KARAKTER di bawah.
   Urutan di sini = urutan di layar. */
(() => {
  const KARAKTER = [
    // hewan
    'oyen', 'mochi', 'kapi', 'bambu', 'honk', 'utan', 'komo', 'uhu', 'jago', 'bangkong',
    // tokoh
    'prabowo', 'jokowi', 'gibran', 'megawati', 'anies', 'ganjar', 'bahlil', 'kdm'
  ];

  const js = document.currentScript.src.replace(/pawang\.js(\?.*)?$/, '');   // …/js/
  const files = [
    js + 'core/util.js',
    js + 'core/audio.js',
    js + '../assets/suara/daftar.js',
    js + 'core/rig.js',
    js + 'core/stage.js',
    ...KARAKTER.map((k) => `${js}characters/${k}.js`),
    js + 'core/guard.js'
  ];
  // defer menjaga urutan eksekusi dan membuat script halaman (app.js, popup.js, …) jalan sesudahnya
  document.write(files.map((f) => `<script src="${f}" defer><\/script>`).join('\n'));
})();
