/* Komo — komodo yang tidak pernah kalah tatap */
(() => {
  const { eye, M } = PI.util;
  const TAIL = 'M300 396 C 352 392, 392 360, 396 316 C 398 296, 386 284, 376 296 C 368 312, 352 344, 296 360 Z';
  let teeth = 'M136 258';
  for (let i = 0; i < 16; i++) teeth += ' l4 6 l4 -6';
  const paw = (u) => `<ellipse cx="110" cy="392" rx="50" ry="24" fill="url(#${u}b)"/><g stroke="#EDE6C8" stroke-width="5" stroke-linecap="round"><path d="M76 388 l-8 10 M94 380 l-6 13 M116 380 l-2 14 M136 384 l2 12"/></g>`;
  const brow = '<path d="M112 172 Q140 156 168 170" stroke="#4E4C32" stroke-width="9" fill="none" stroke-linecap="round"/>';
  const E = { rx: 13, ry: 11, irisR: 10.5, iris: '#B07A1E', irisHi: '#E8B84A', sclera: '#E8DFB8', lid: '#7E7C54', lidLine: '#3E3C26' };

  PI.register('komo', {
    name: 'Komo', species: 'Komodo', tag: 'Lambat, sabar, tidak pernah kalah tatap',
    accent: '#D3D6AC', glow: 'rgba(150,160,90,.30)', crop: '50 108 300 222',
    sfx: { voice: 'hiss', angry: 'hiss', happy: 'huff' }, happyAct: 'flick', angryMouth: .45, happyMouth: 0, earAmp: 0,
    baseIdles: ['look', 'tilt', 'sniff'], idles: ['flick', 'flick', 'look'],
    rig: { head: [200, 300], look: [200, 188], tail: [318, 384], pawL: [110, 414], pawR: [290, 414], mouth: [200, 258], tongue: [200, 262], browL: [140, 166], browR: [260, 166] },
    lines: {
      greet: ['Saya Komo. Dari Pulau Komodo.', 'Saya diam. Saya menunggu. Kamu juga.'],
      idle: ['…', 'Saya bisa diam berjam-jam.', 'Lidah saya mencium bau lembur.', 'Tenang.'],
      escape: ['Hsss. Tidak.', 'Duduk.', 'Saya lebih cepat dari kelihatannya.'],
      angry: ['Hsssss.', 'Jangan buat saya bergerak.'],
      slam: ['*bruk*', 'Cakar saya di sini.'],
      close: ['Saya merayap mendekat.', 'Lihat mata saya.'],
      pet: ['…boleh.', 'Sisik saya halus, kan.', 'Hsss. Senang.'],
      boop: ['Hidung saya bukan tombol.', 'Hsss!'],
      sleep: ['Berjemur dulu. Tidur.', 'Zzz…'],
      wake: ['Saya tidak tidur. Saya hemat energi.'],
      back: ['Saya cium kamu tadi pergi.'],
      hold: ['Berhenti? Hsss.', 'Tunggu.'],
      stay: ['Bijak.'],
      quit: ['Pergi sana. Pelan-pelan.'],
      done: ['Selesai. Kamu boleh jalan.', 'Sudah. Saya kembali berjemur.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}f" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#9A9868"/><stop offset=".7" stop-color="#7C7A52"/><stop offset="1" stop-color="#5E5C3C"/></radialGradient>
<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#83815A"/><stop offset="1" stop-color="#55533A"/></linearGradient>
<pattern id="${u}sc" width="14" height="12" patternUnits="userSpaceOnUse"><g fill="#000" opacity=".1"><circle cx="7" cy="6" r="3.2"/><circle cx="0" cy="0" r="3.2"/><circle cx="14" cy="0" r="3.2"/><circle cx="0" cy="12" r="3.2"/><circle cx="14" cy="12" r="3.2"/></g></pattern>
</defs>
<g data-part="root">
<g data-part="tail"><path d="${TAIL}" fill="url(#${u}b)"/><path d="${TAIL}" fill="url(#${u}sc)"/></g>
<g data-part="body"><path d="M8 404 C 16 334, 104 292, 200 292 C 296 292, 384 334, 392 404 Z" fill="url(#${u}b)"/><path d="M8 404 C 16 334, 104 292, 200 292 C 296 292, 384 334, 392 404 Z" fill="url(#${u}sc)"/><path d="M120 404 C 124 350, 160 322, 200 322 C 240 322, 276 350, 280 404 Z" fill="#B0AA7E" opacity=".55"/></g>
<g data-part="head">
<path d="M84 222 C 84 166, 136 134, 200 134 C 264 134, 316 166, 316 222 C 316 268, 270 298, 200 298 C 130 298, 84 268, 84 222 Z" fill="url(#${u}f)"/>
<path d="M84 222 C 84 166, 136 134, 200 134 C 264 134, 316 166, 316 222 C 316 268, 270 298, 200 298 C 130 298, 84 268, 84 222 Z" fill="url(#${u}sc)"/>
<g data-part="face">
<ellipse cx="140" cy="188" rx="30" ry="24" fill="#86845C"/><ellipse cx="260" cy="188" rx="30" ry="24" fill="#86845C"/>
<g data-part="blush" opacity="0"><ellipse cx="116" cy="240" rx="16" ry="8" fill="#FF8C8C" opacity=".45"/><ellipse cx="284" cy="240" rx="16" ry="8" fill="#FF8C8C" opacity=".45"/></g>
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
${eye(u, { side: 'L', cx: 140, cy: 188, ...E })}${eye(u, { side: 'R', cx: 260, cy: 188, ...E })}
<ellipse cx="184" cy="226" rx="5" ry="3.5" fill="#2E2C1E"/><ellipse cx="216" cy="226" rx="5" ry="3.5" fill="#2E2C1E"/>
<g data-part="mouthOpen" style="display:none"><path d="M124 256 Q200 266 276 256 Q252 292 200 296 Q148 292 124 256 Z" fill="#5A2222"/><path d="${teeth}" stroke="#F4EED8" stroke-width="2" fill="none" stroke-linejoin="round"/></g>
<g data-part="mouthClosed"><path d="M118 254 Q200 276 282 254" stroke="#3E3C26" stroke-width="4" fill="none" stroke-linecap="round"/></g>
<g data-part="tongue" style="display:none"><path d="M195 262 L195 318 Q194 326 186 338 L196 328 L200 322 L204 328 L214 338 Q206 326 205 318 L205 262 Z" fill="#EAC04C" stroke="#B8902A" stroke-width="1.5" stroke-linejoin="round"/></g>
</g></g>
<g data-part="pawL">${paw(u)}</g><g data-part="pawR">${M(paw(u))}</g>
</g>`
  });
})();
