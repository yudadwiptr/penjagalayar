/* Bangkong — kodok yang jago diam */
(() => {
  const { eye, M } = PI.util;
  const hand = (u) => `<path d="M84 404 Q86 374 112 370 Q138 374 140 404 Z" fill="url(#${u}b)"/><g fill="#8CC968"><circle cx="86" cy="396" r="9"/><circle cx="102" cy="386" r="9"/><circle cx="122" cy="386" r="9"/><circle cx="138" cy="396" r="9"/></g>`;
  const E = { rx: 32, ry: 30, irisR: 27, iris: '#C9A21E', irisHi: '#F6DC62', sclera: '#F8F4D8', lid: '#7DBE5A', lidLine: '#2E5A1E', pupil: 'h' };

  PI.register('bangkong', {
    name: 'Bangkong', species: 'Kodok', tag: 'Diam di tempat adalah keahliannya',
    accent: '#CFE6B6', glow: 'rgba(110,190,80,.28)', crop: '40 96 320 240',
    sfx: { voice: 'croak', angry: 'croak', happy: 'croak' }, happyAct: 'croak', angryMouth: .2, happyMouth: .45, earAmp: 0,
    baseIdles: ['look', 'tilt'], idles: ['croak', 'croak', 'look'],
    rig: { head: [200, 316], look: [200, 162], mouth: [200, 258], pawL: [112, 414], pawR: [288, 414], sac: [200, 290] },
    lines: {
      greet: ['Kwok. Saya Bangkong.', 'Duduk diam. Seperti saya.'],
      idle: ['Kwok.', 'Saya diam. Itu keahlian saya.', 'Ada lalat? Tidak ada. Oke.', 'Kwok… kwok…'],
      escape: ['Kwok! Duduk!', 'Jangan lompat.', 'Mau ke mana?'],
      angry: ['Leher saya menggembung. Itu tanda bahaya.', 'Kwok. KWOK.'],
      slam: ['*plak*', 'Tangan saya lengket. Hati-hati.'],
      close: ['Saya lompat lebih dekat.', 'Kwok. Sekarang dekat sekali.'],
      pet: ['Kwok~', 'Agak licin, ya. Maaf.', 'Hehe.'],
      boop: ['Kwok!', 'Hidung saya kecil, jangan dipencet.'],
      sleep: ['Berendam dulu. Tidur.', 'Zzz… kwok…'],
      wake: ['Kwok? Saya bangun.'],
      back: ['Kwok. Tadi ke mana?'],
      hold: ['Mau berhenti? Kwok?', 'Diam dulu.'],
      stay: ['Kwok. Bagus.'],
      quit: ['Ya sudah. Kwok.'],
      done: ['Selesai. Kwok!', 'Sudah. Lompat lagi ke kerjaan.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}f" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#94CF70"/><stop offset=".7" stop-color="#6FAF4E"/><stop offset="1" stop-color="#4E8C36"/></radialGradient>
<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6AA84A"/><stop offset="1" stop-color="#3E7A2A"/></linearGradient>
<radialGradient id="${u}y" cx="50%" cy="30%" r="75%"><stop offset="0" stop-color="#F6F4CE"/><stop offset="1" stop-color="#DCDCA0"/></radialGradient>
</defs>
<g data-part="root">
<g data-part="body"><path d="M30 404 C 34 340, 110 300, 200 300 C 290 300, 366 340, 370 404 Z" fill="url(#${u}b)"/><path d="M120 404 C 126 356, 160 330, 200 330 C 240 330, 274 356, 280 404 Z" fill="url(#${u}y)"/><g fill="#3A6E26" opacity=".55"><circle cx="80" cy="362" r="8"/><circle cx="328" cy="352" r="10"/><circle cx="300" cy="386" r="6"/><circle cx="96" cy="390" r="7"/></g></g>
<g data-part="head">
<g data-part="sac"><ellipse cx="200" cy="300" rx="56" ry="36" fill="url(#${u}y)"/><path d="M168 306 q32 12 64 0" stroke="#C8C890" stroke-width="2" fill="none"/></g>
<ellipse cx="200" cy="236" rx="150" ry="76" fill="url(#${u}f)"/>
<circle cx="140" cy="166" r="48" fill="url(#${u}f)"/><circle cx="260" cy="166" r="48" fill="url(#${u}f)"/>
<g data-part="face">
<g fill="#4E8C36" opacity=".5"><ellipse cx="110" cy="226" rx="9" ry="6"/><ellipse cx="292" cy="222" rx="7" ry="5"/><ellipse cx="200" cy="188" rx="6" ry="4"/></g>
<g data-part="blush" opacity="0"><ellipse cx="100" cy="258" rx="20" ry="10" fill="#FF8C98" opacity=".5"/><ellipse cx="300" cy="258" rx="20" ry="10" fill="#FF8C98" opacity=".5"/></g>
${eye(u, { side: 'L', cx: 140, cy: 162, ...E })}${eye(u, { side: 'R', cx: 260, cy: 162, ...E })}
<circle cx="188" cy="214" r="3" fill="#2E5A1E"/><circle cx="212" cy="214" r="3" fill="#2E5A1E"/>
<g data-part="mouthOpen" style="display:none"><path d="M110 256 Q200 266 290 256 Q260 312 200 316 Q140 312 110 256 Z" fill="#5A2222"/><ellipse cx="200" cy="296" rx="30" ry="12" fill="#E87A86"/></g>
<g data-part="mouthClosed"><path d="M104 250 Q200 294 296 250" stroke="#2E5A1E" stroke-width="4.5" fill="none" stroke-linecap="round"/></g>
</g></g>
<g data-part="pawL">${hand(u)}</g><g data-part="pawR">${M(hand(u))}</g>
</g>`
  });
})();
