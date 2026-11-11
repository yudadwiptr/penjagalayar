/* Bambu — panda yang tidak berhenti makan */
(() => {
  const { eye, M } = PI.util;
  const ear = '<circle cx="106" cy="100" r="34" fill="#232326"/><circle cx="110" cy="104" r="17" fill="#3A3A40"/>';
  const E = { rx: 12, ry: 12, irisR: 9.5, iris: '#2B1D14', irisHi: '#6B4A33', sclera: '#F7F4EC', lid: '#232326', lidLine: '#000' };

  PI.register('bambu', {
    name: 'Bambu', species: 'Panda', tag: 'Lambat, berat, dan menghalangi',
    accent: '#CFE3BE', glow: 'rgba(140,200,110,.28)', crop: '40 50 344 268',
    sfx: { voice: 'bleat', angry: 'growl', happy: 'bleat' }, happyAct: 'munch', angryMouth: .2, happyMouth: .3, slamSide: 'L',
    idles: ['munch', 'munch', 'yawn', 'twitch'],
    rig: { head: [200, 296], look: [200, 176], earL: [122, 122], earR: [278, 122], pawL: [124, 414], pawR: [290, 410], mouth: [200, 250], prop: [290, 400] },
    lines: {
      greet: ['Saya Bambu. Saya duduk di sini.', 'Halo. Saya sedang makan.'],
      idle: ['Masih makan.', 'Nanti dulu.', 'Kunyah… kunyah…', 'Tidak usah buru-buru.'],
      escape: ['Saya berat. Tidak bisa digeser.', 'Duduk. Diam.', 'Belum.'],
      angry: ['Bambunya saya taruh. Ini serius.', 'Hmph.'],
      slam: ['*buk*', 'Panda juga beruang, lho.'],
      close: ['Saya pindah ke sini saja.', 'Sekarang layarnya penuh panda.'],
      pet: ['Hehe.', 'Empuk, ya.', 'Lagi.'],
      boop: ['Hidungnya basah, maaf.', 'Hei.'],
      sleep: ['Tidur siang. Ide bagus.', 'Zzz… bambu…'],
      wake: ['Hm? Saya bangun. Sudah dari tadi.'],
      back: ['Kamu pergi, saya makan dua batang lagi.'],
      hold: ['Tunggu, saya belum selesai makan.', 'Jangan dulu.'],
      stay: ['Bagus. Duduk lagi.'],
      quit: ['Ya sudah. Bambunya buat saya.'],
      done: ['Selesai. Saya juga sudah kenyang.', 'Sudah. Sampai nanti.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}w" cx="50%" cy="28%" r="80%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".75" stop-color="#F1EEE6"/><stop offset="1" stop-color="#DCD7CB"/></radialGradient>
<linearGradient id="${u}wb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7F5EF"/><stop offset="1" stop-color="#D3CEC1"/></linearGradient>
<linearGradient id="${u}bb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6FAE40"/><stop offset=".5" stop-color="#9ACF5F"/><stop offset="1" stop-color="#5E9C34"/></linearGradient>
</defs>
<g data-part="root">
<g data-part="body"><path d="M22 404 C 22 320, 100 268, 200 268 C 300 268, 378 320, 378 404 Z" fill="url(#${u}wb)"/><path d="M22 404 C 22 334, 66 288, 138 274 C 112 310, 104 360, 112 404 Z" fill="#232326"/><path d="M378 404 C 378 334, 334 288, 262 274 C 288 310, 296 360, 288 404 Z" fill="#232326"/></g>
<g data-part="head">
<g data-part="earL">${ear}</g><g data-part="earR">${M(ear)}</g>
<path d="M78 194 C 78 124, 132 88, 200 88 C 268 88, 322 124, 322 194 C 322 256, 270 296, 200 296 C 130 296, 78 256, 78 194 Z" fill="url(#${u}w)"/>
<g data-part="face">
<ellipse cx="150" cy="182" rx="31" ry="42" fill="#232326" transform="rotate(36 150 182)"/><ellipse cx="250" cy="182" rx="31" ry="42" fill="#232326" transform="rotate(-36 250 182)"/>
<g data-part="blush" opacity="0"><ellipse cx="116" cy="236" rx="18" ry="10" fill="#FF8C98" opacity=".55"/><ellipse cx="284" cy="236" rx="18" ry="10" fill="#FF8C98" opacity=".55"/></g>
${eye(u, { side: 'L', cx: 156, cy: 176, ...E })}${eye(u, { side: 'R', cx: 244, cy: 176, ...E })}
<ellipse cx="200" cy="240" rx="48" ry="34" fill="#FFFFFF"/>
<g data-part="mouthOpen" style="display:none"><path d="M184 250 Q200 245 216 250 Q214 276 200 280 Q186 276 184 250 Z" fill="#5A2222"/><ellipse cx="200" cy="270" rx="9" ry="6" fill="#EE8590"/></g>
<g data-part="mouthClosed"><path d="M200 236 v10 M200 246 q-11 10 -22 3 M200 246 q11 10 22 3" stroke="#232326" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
<path d="M184 224 Q200 214 216 224 Q214 236 200 239 Q186 236 184 224 Z" fill="#232326"/><ellipse cx="195" cy="221" rx="5" ry="2.5" fill="#5A5A60"/>
</g></g>
<g data-part="prop"><path d="M290 400 L338 200" stroke="url(#${u}bb)" stroke-width="18" stroke-linecap="round"/><path d="M300 356 l17 4 M312 306 l17 4 M324 256 l17 4" stroke="#4E8A2C" stroke-width="4" stroke-linecap="round"/><path d="M336 214 q32 -22 56 -10 q-28 18 -56 10 Z" fill="#6FB13E"/><path d="M330 236 q-30 -18 -48 -8 q24 16 48 8 Z" fill="#5C9C33"/><path d="M340 204 q8 -30 28 -40 q-6 28 -28 40 Z" fill="#7CC04A"/></g>
<g data-part="pawL"><ellipse cx="124" cy="390" rx="46" ry="30" fill="#232326"/><g fill="#3E3E44"><ellipse cx="108" cy="380" rx="6" ry="5"/><ellipse cx="124" cy="376" rx="6" ry="5"/><ellipse cx="140" cy="380" rx="6" ry="5"/></g></g>
<g data-part="pawR"><ellipse cx="290" cy="384" rx="40" ry="30" fill="#232326"/><path d="M272 372 q18 -8 36 0" stroke="#3E3E44" stroke-width="4" fill="none" stroke-linecap="round"/></g>
</g>`
  });
})();
