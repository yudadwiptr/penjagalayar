/* Utan — orangutan Kalimantan */
(() => {
  const { eye, M } = PI.util;
  const ear = '<ellipse cx="86" cy="198" rx="16" ry="20" fill="#C9906A"/><path d="M84 190 q8 8 2 16" stroke="#9E6A48" stroke-width="3" fill="none" stroke-linecap="round"/>';
  const tuft = '<path d="M88 226 L64 236 L90 244 L70 260 L100 256 Z" fill="#AE4E18"/>';
  const hand = (u) => `<path d="M78 404 C 76 372, 92 354, 118 352 C 144 352, 160 368, 158 404 Z" fill="#A9481A"/><path d="M90 372 q8 -12 2 -22 M112 362 q6 -12 0 -22 M140 368 q8 -10 4 -22" stroke="#7A3210" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/><g fill="url(#${u}s)"><rect x="88" y="378" width="15" height="28" rx="7.5"/><rect x="104" y="373" width="15" height="33" rx="7.5"/><rect x="120" y="373" width="15" height="33" rx="7.5"/><rect x="136" y="378" width="15" height="28" rx="7.5"/></g>`;
  const E = { rx: 12, ry: 11, irisR: 9.5, iris: '#3A2210', irisHi: '#7A4A28', sclera: '#FBF4EA', lid: '#E6BC94', lidLine: '#6A3E22' };

  PI.register('utan', {
    name: 'Utan', species: 'Orangutan', tag: 'Sabar, berbulu, lengannya panjang',
    accent: '#F2C3A0', glow: 'rgba(210,100,40,.32)', crop: '38 40 324 280',
    sfx: { voice: 'ooh', angry: 'huff', happy: 'ooh' }, happyAct: 'bob', angryMouth: .35, happyMouth: .55, earAmp: .25,
    idles: ['bob', 'yawn', 'tilt'],
    rig: { head: [200, 292], look: [200, 188], earL: [86, 198], earR: [314, 198], hat: [200, 112], pawL: [118, 414], pawR: [282, 414], mouth: [200, 254], browL: [167, 164], browR: [233, 164] },
    lines: {
      greet: ['Saya Utan. Dari hutan Kalimantan.', 'Halo. Duduk dulu, pelan-pelan.'],
      idle: ['Hmm.', 'Di sini tidak ada daun. Sayang.', 'Pelan-pelan saja.', 'Lengan saya panjang. Bisa sampai keyboard kamu.'],
      escape: ['Eh. Mau ke mana?', 'Ooh-ooh. Tidak.', 'Duduk lagi.'],
      angry: ['Lengan saya panjang, lho.', 'Saya sabar. Tapi ada batasnya.'],
      slam: ['*buk*', 'Saya pegang layarnya.'],
      close: ['Saya bergelantung lebih dekat.', 'Sekarang saya di depan kamu.'],
      pet: ['Ooh. Enak.', 'Garuk lagi, di situ.', 'Hehe.'],
      boop: ['Itu hidung saya.', 'Ooh!'],
      sleep: ['Saya bikin sarang dulu. Tidur.', 'Zzz…'],
      wake: ['Saya bangun. Dari tadi kok.'],
      back: ['Tadi ke mana? Saya cari di semua pohon.'],
      hold: ['Yakin?', 'Tunggu sebentar.'],
      stay: ['Bagus. Santai lagi.'],
      quit: ['Ya sudah. Lain kali lebih lama.'],
      done: ['Selesai. Silakan turun dari pohon.', 'Sudah. Kerja yang tenang, ya.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}f" cx="50%" cy="30%" r="78%"><stop offset="0" stop-color="#DB7A30"/><stop offset=".7" stop-color="#BC5A1E"/><stop offset="1" stop-color="#9C4415"/></radialGradient>
<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C4612A"/><stop offset="1" stop-color="#8E3C12"/></linearGradient>
<radialGradient id="${u}s" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#F0C9A2"/><stop offset="1" stop-color="#D9A47A"/></radialGradient>
</defs>
<g data-part="root">
<g data-part="body"><path d="M22 404 C 22 316, 100 266, 200 266 C 300 266, 378 316, 378 404 Z" fill="url(#${u}b)"/><path d="M70 330 q8 18 2 34 M100 304 q10 20 4 38 M300 304 q-10 20 -4 38 M330 330 q-8 18 -2 34 M170 290 q4 16 -2 30 M230 290 q-4 16 2 30" stroke="#7A3210" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/></g>
<g data-part="head">
<g data-part="earL">${ear}</g><g data-part="earR">${M(ear)}</g>
${tuft}${M(tuft)}
<path d="M84 200 C 80 136, 132 98, 200 98 C 268 98, 320 136, 316 200 C 314 258, 266 294, 200 294 C 134 294, 86 258, 84 200 Z" fill="url(#${u}f)"/>
<g data-part="face">
<path d="M118 196 C 116 150, 152 134, 200 150 C 248 134, 284 150, 282 196 C 286 246, 250 284, 200 284 C 150 284, 114 246, 118 196 Z" fill="url(#${u}s)"/>
<ellipse cx="200" cy="246" rx="54" ry="36" fill="#CF9670"/>
<g data-part="blush" opacity="0"><ellipse cx="136" cy="226" rx="16" ry="9" fill="#FF8A8A" opacity=".55"/><ellipse cx="264" cy="226" rx="16" ry="9" fill="#FF8A8A" opacity=".55"/></g>
<g data-part="browL"><path d="M146 168 Q166 156 188 166" stroke="#8E5A38" stroke-width="6" fill="none" stroke-linecap="round"/></g>
<g data-part="browR"><path d="M254 168 Q234 156 212 166" stroke="#8E5A38" stroke-width="6" fill="none" stroke-linecap="round"/></g>
${eye(u, { side: 'L', cx: 167, cy: 188, ...E })}${eye(u, { side: 'R', cx: 233, cy: 188, ...E })}
<g data-part="mouthOpen" style="display:none"><path d="M168 254 Q200 248 232 254 Q228 286 200 290 Q172 286 168 254 Z" fill="#5A2020"/><path d="M174 254 Q200 250 226 254 L224 262 Q200 258 176 262 Z" fill="#FFF6E6"/></g>
<g data-part="mouthClosed"><path d="M166 256 Q200 270 234 256" stroke="#6A3A22" stroke-width="3.6" fill="none" stroke-linecap="round"/></g>
<ellipse cx="192" cy="230" rx="4" ry="3" fill="#5A3420"/><ellipse cx="208" cy="230" rx="4" ry="3" fill="#5A3420"/>
</g>
<g data-part="hat"><path d="M150 118 C 150 96, 164 78, 172 64 C 176 84, 182 92, 190 98 C 192 76, 200 60, 210 50 C 210 72, 216 86, 224 96 C 232 84, 242 78, 252 76 C 246 92, 250 106, 252 120 C 220 106, 182 106, 150 118 Z" fill="url(#${u}f)"/></g>
</g>
<g data-part="pawL">${hand(u)}</g><g data-part="pawR">${M(hand(u))}</g>
</g>`
  });
})();
