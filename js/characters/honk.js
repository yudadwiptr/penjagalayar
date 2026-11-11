/* Pak Honk — angsa yang memang tidak ramah */
(() => {
  const { eye, M } = PI.util;
  const wing = (u) => `<path d="M128 404 C 60 400, 30 340, 58 296 C 82 262, 132 270, 150 300 C 136 330, 132 370, 150 404 Z" fill="url(#${u}w)"/><path d="M64 330 q26 -8 52 2 M60 356 q30 -6 58 6 M72 380 q28 -2 54 10" stroke="#CFC8BA" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const foot = '<path d="M96 404 Q108 374 126 368 Q144 374 156 404 Q141 394 126 404 Q111 394 96 404 Z" fill="#F29A2E"/><path d="M126 372 v28 M112 384 l-6 14 M140 384 l6 14" stroke="#D9821C" stroke-width="2.5" stroke-linecap="round"/>';
  const E = { rx: 9.5, ry: 9.5, irisR: 8, iris: '#14100D', irisHi: '#4A3E33', sclera: '#FFFFFF', lid: '#F6F3EC', lidLine: '#9A9385' };

  PI.register('honk', {
    name: 'Pak Honk', species: 'Angsa', tag: 'Tidak ramah. Memang itu intinya',
    accent: '#CFE1EC', glow: 'rgba(150,190,230,.30)', crop: '84 78 232 214',
    sfx: { voice: 'honk', angry: 'hiss', happy: 'honk' }, happyAct: 'flap', angryMouth: .6, happyMouth: 0, turn: 1.5,
    idles: ['flap', 'stomp', 'tilt', 'tilt'],
    rig: { head: [200, 336], look: [200, 132], wingL: [140, 390], wingR: [260, 390], pawL: [126, 404], pawR: [274, 404], mouth: [200, 170], browL: [175, 112], browR: [225, 112] },
    lines: {
      greet: ['HONK. Saya yang jaga.', 'Saya Pak Honk. Saya tidak ramah.'],
      idle: ['Saya lihat kok.', 'Honk.', 'Jangan coba-coba.', 'Ini wilayah saya sekarang.'],
      escape: ['HONK!', 'Balik ke tempat duduk.', 'SAYA LIHAT ITU.'],
      angry: ['Hssss.', 'Saya punya gigi di lidah. Mau lihat?'],
      slam: ['*injak*', 'HONK HONK.'],
      close: ['Saya mendekat. Leher saya panjang.', 'Tidak ada jalan keluar.'],
      pet: ['…boleh.', 'Jangan bilang angsa lain.', 'Hmph. Lanjut.'],
      boop: ['JANGAN SENTUH PARUH.', 'Hss!'],
      sleep: ['Saya tidur dengan satu mata.', 'Zzz… honk…'],
      wake: ['Saya tidak pernah tidur.'],
      back: ['Saya hitung kamu pergi berapa lama.', 'HONK. Kamu pikir saya tidak tahu?'],
      hold: ['Berani?', 'Lepas. Sekarang.'],
      stay: ['Pilihan yang bijak.'],
      quit: ['Kali ini saja. HONK.'],
      done: ['Sudah. Silakan pergi. Pelan-pelan.', 'Selesai. Saya tetap mengawasi.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}w" cx="45%" cy="25%" r="85%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#F3F0E9"/><stop offset="1" stop-color="#D9D4C8"/></radialGradient>
<linearGradient id="${u}n" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E4E0D6"/><stop offset=".45" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DEDACF"/></linearGradient>
<linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFA23A"/><stop offset="1" stop-color="#E7780F"/></linearGradient>
</defs>
<g data-part="root">
<g data-part="wingL">${wing(u)}</g><g data-part="wingR">${M(wing(u))}</g>
<g data-part="body"><path d="M70 404 C 70 330, 126 288, 200 288 C 274 288, 330 330, 330 404 Z" fill="url(#${u}w)"/></g>
<g data-part="head">
<path d="M154 336 C 156 270, 162 214, 164 170 L 236 170 C 238 214, 244 270, 246 336 Z" fill="url(#${u}n)"/>
<ellipse cx="200" cy="142" rx="54" ry="50" fill="url(#${u}w)"/>
<g data-part="face">
<g data-part="browL"><path d="M160 106 L190 118" stroke="#8E877A" stroke-width="6.5" stroke-linecap="round"/></g>
<g data-part="browR"><path d="M240 106 L210 118" stroke="#8E877A" stroke-width="6.5" stroke-linecap="round"/></g>
<g data-part="blush" opacity="0"><ellipse cx="160" cy="164" rx="12" ry="7" fill="#FF8C98" opacity=".55"/><ellipse cx="240" cy="164" rx="12" ry="7" fill="#FF8C98" opacity=".55"/></g>
${eye(u, { side: 'L', cx: 178, cy: 132, ...E })}${eye(u, { side: 'R', cx: 222, cy: 132, ...E })}
<ellipse cx="200" cy="150" rx="14" ry="10" fill="#E06A10"/>
<g data-part="mouthOpen" style="display:none"><path d="M184 168 Q200 164 216 168 L208 200 Q200 206 192 200 Z" fill="#4A1414"/><path d="M190 174 l3 5 l3 -5 l3 5 l3 -5 l3 5 l3 -5 l2 4" stroke="#FFF" stroke-width="1.6" fill="none" stroke-linejoin="round"/></g>
<g data-part="jaw"><path d="M186 170 Q200 166 214 170 L207 196 Q200 202 193 196 Z" fill="#E2760F"/></g>
<path d="M176 158 Q200 146 224 158 L212 184 Q200 190 188 184 Z" fill="url(#${u}k)"/><g fill="#9A4A0A"><ellipse cx="193" cy="164" rx="2.6" ry="1.6"/><ellipse cx="207" cy="164" rx="2.6" ry="1.6"/></g>
</g></g>
<g data-part="pawL">${foot}</g><g data-part="pawR">${M(foot)}</g>
</g>`
  });
})();
