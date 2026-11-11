/* Uhu — burung hantu yang matanya tidak pernah lepas */
(() => {
  const { eye, M } = PI.util;
  const wing = (u) => `<path d="M120 404 C 64 396, 40 330, 66 290 C 88 258, 132 266, 148 300 C 134 332, 128 370, 140 404 Z" fill="url(#${u}b)"/><path d="M70 320 q24 -6 48 4 M64 346 q28 -4 54 8 M74 372 q26 0 50 12" stroke="#4A3624" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/>`;
  const ear = '<path d="M112 122 L90 50 Q94 42 104 48 L158 104 Z" fill="#5E4630"/>';
  const brow = '<path d="M100 144 Q148 120 196 166" stroke="#4A3624" stroke-width="7" fill="none" stroke-linecap="round"/>';
  const talon = '<g fill="#E8B23A" stroke="#B88418" stroke-width="2"><path d="M124 404 Q124 380 132 376 Q140 378 140 404 Z"/><path d="M142 404 Q144 372 150 370 Q156 372 158 404 Z"/><path d="M160 404 Q162 378 168 378 Q176 380 174 404 Z"/></g>';
  const E = { rx: 34, ry: 34, irisR: 30, iris: '#E8960E', irisHi: '#FFD34D', sclera: '#2A1C10', lid: '#9A7652', lidLine: '#3A2818' };

  PI.register('uhu', {
    name: 'Uhu', species: 'Burung hantu', tag: 'Kepalanya bisa miring. Matanya tidak lepas',
    accent: '#DCCFB8', glow: 'rgba(200,170,110,.28)', crop: '56 40 288 272',
    sfx: { voice: 'hoot', angry: 'hiss', happy: 'hoot' }, happyAct: 'flap', angryMouth: .4, happyMouth: 0, turn: 2.2, tiltAmp: 1.8, earAmp: .7, jawAmp: 8,
    baseIdles: ['look', 'twitch', 'tilt'], idles: ['tilt', 'tilt', 'flap', 'look'],
    rig: { head: [200, 290], look: [200, 188], earL: [126, 108], earR: [274, 108], wingL: [124, 392], wingR: [276, 392], pawL: [148, 404], pawR: [252, 404], mouth: [200, 222], browL: [148, 146], browR: [252, 146] },
    lines: {
      greet: ['Uhu. Saya yang jaga sekarang.', 'Saya Uhu. Saya lihat semuanya.'],
      idle: ['Uhu.', 'Saya lihat kursornya.', 'Mata saya besar untuk alasan yang jelas.', 'Hmm.'],
      escape: ['Uhu?! Mau ke mana?', 'Saya lihat itu.', 'Duduk.'],
      angry: ['Saya sudah perhatikan dari tadi.', 'Uhu. Jangan diulang.'],
      slam: ['*cakar*', 'UHU.'],
      close: ['Saya terbang lebih dekat.', 'Sekarang kita tatapan.'],
      pet: ['Uhu~', 'Bulu saya lembut, ya.', 'Lagi.'],
      boop: ['Paruh saya!', 'Uhu!'],
      sleep: ['Siang memang jam tidur saya.', 'Zzz… uhu…'],
      wake: ['Saya tidak tidur. Saya burung malam.'],
      back: ['Saya lihat kamu pergi. Saya lihat semuanya.'],
      hold: ['Uhu? Yakin?', 'Belum.'],
      stay: ['Bijak. Seperti burung hantu.'],
      quit: ['Uhu. Kecewa.'],
      done: ['Selesai. Uhu.', 'Sudah. Sekarang giliran saya tidur.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}f" cx="50%" cy="30%" r="78%"><stop offset="0" stop-color="#A88260"/><stop offset=".7" stop-color="#8B6A4C"/><stop offset="1" stop-color="#6E5238"/></radialGradient>
<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8E6C4E"/><stop offset="1" stop-color="#5E4630"/></linearGradient>
<radialGradient id="${u}d" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#F3E7D2"/><stop offset="1" stop-color="#DCC6A6"/></radialGradient>
</defs>
<g data-part="root">
<g data-part="wingL">${wing(u)}</g><g data-part="wingR">${M(wing(u))}</g>
<g data-part="body"><path d="M66 404 C 66 324, 124 276, 200 276 C 276 276, 334 324, 334 404 Z" fill="url(#${u}b)"/><ellipse cx="200" cy="372" rx="88" ry="84" fill="#C9AE8A"/><path d="M168 320 l8 8 l8 -8 M208 320 l8 8 l8 -8 M148 352 l8 8 l8 -8 M188 352 l8 8 l8 -8 M228 352 l8 8 l8 -8 M168 384 l8 8 l8 -8 M208 384 l8 8 l8 -8" stroke="#7A5A3E" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g data-part="head">
<g data-part="earL">${ear}</g><g data-part="earR">${M(ear)}</g>
<ellipse cx="200" cy="186" rx="122" ry="104" fill="url(#${u}f)"/>
<g data-part="face">
<circle cx="152" cy="190" r="58" fill="url(#${u}d)"/><circle cx="248" cy="190" r="58" fill="url(#${u}d)"/>
<g data-part="blush" opacity="0"><ellipse cx="108" cy="238" rx="16" ry="9" fill="#FF8C98" opacity=".5"/><ellipse cx="292" cy="238" rx="16" ry="9" fill="#FF8C98" opacity=".5"/></g>
${eye(u, { side: 'L', cx: 152, cy: 188, ...E })}${eye(u, { side: 'R', cx: 248, cy: 188, ...E })}
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
<g data-part="mouthOpen" style="display:none"><path d="M191 218 Q200 222 209 218 L200 248 Z" fill="#3A1414"/></g>
<g data-part="jaw"><path d="M193 222 L207 222 L200 240 Z" fill="#4E3A28"/></g>
<path d="M188 200 Q200 190 212 200 Q208 218 200 232 Q192 218 188 200 Z" fill="#3E3022"/><ellipse cx="196" cy="202" rx="3" ry="2" fill="#6E5A44"/>
</g></g>
<g data-part="pawL">${talon}</g><g data-part="pawR">${M(talon)}</g>
</g>`
  });
})();
