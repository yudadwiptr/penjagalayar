/* Kapi — kapibara dengan jeruk di kepala */
(() => {
  const { eye, M } = PI.util;
  const ear = '<ellipse cx="124" cy="104" rx="21" ry="17" fill="#80593A"/><ellipse cx="126" cy="107" rx="11" ry="8" fill="#563A25"/>';
  const paw = '<ellipse cx="136" cy="392" rx="38" ry="22" fill="#684830"/><path d="M122 398 v-7 M136 396 v-8 M150 398 v-7" stroke="#3E2B1F" stroke-width="3" stroke-linecap="round"/>';
  const E = { rx: 12.5, ry: 11.5, irisR: 10, iris: '#24170F', irisHi: '#5A4431', lid: '#A47850', lidLine: '#3E2A1C' };

  PI.register('kapi', {
    name: 'Kapi', species: 'Kapibara', tag: 'Tenang, tapi tidak bisa ditawar',
    accent: '#E3CDAE', glow: 'rgba(205,155,100,.32)', crop: '60 48 280 262',
    sfx: { voice: 'squeak', angry: 'huff', happy: 'squeak' }, happyAct: 'bob', lidBias: .2, angryMouth: 0, happyMouth: 0,
    idles: ['bob', 'twitch', 'twitch', 'munch'],
    rig: { head: [200, 300], look: [200, 152], earL: [128, 116], earR: [272, 116], hat: [200, 106], pawL: [136, 412], pawR: [264, 412], mouth: [200, 252] },
    lines: {
      greet: ['Halo. Santai dulu.', 'Saya Kapi. Kita berendam sebentar.'],
      idle: ['Santai.', 'Air panasnya masih hangat.', 'Tidak ada yang perlu dikejar.', 'Jeruknya jangan diambil.'],
      escape: ['Pelan-pelan.', 'Belum waktunya.', 'Duduk saja.'],
      angry: ['Saya tetap tenang. Kamu juga, ya.', 'Kapibara tidak pernah marah. Hampir.'],
      slam: ['Saya taruh kaki di sini.', 'Tenang. Tapi tidak.'],
      close: ['Saya geser sedikit ke sini.', 'Kita duduk berdua saja.'],
      pet: ['Ah. Enak.', 'Lanjut, di belakang telinga.', 'Mmm.'],
      boop: ['Itu hidung.', 'Halo juga.'],
      sleep: ['Bagus. Ngantuk, ya.', 'Zzz…'],
      wake: ['Oh. Kamu masih di sini. Bagus.'],
      back: ['Selamat datang kembali. Duduk lagi.'],
      hold: ['Yakin?', 'Masih ada waktu.'],
      stay: ['Nah. Santai.'],
      quit: ['Oke. Lain kali lebih lama, ya.'],
      done: ['Selesai. Pelan-pelan bangunnya.', 'Sudah. Jeruknya boleh kamu ambil.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}f" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#BC9064"/><stop offset=".7" stop-color="#A47850"/><stop offset="1" stop-color="#8A6240"/></radialGradient>
<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A97D53"/><stop offset="1" stop-color="#785435"/></linearGradient>
<radialGradient id="${u}y" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#FFC453"/><stop offset="1" stop-color="#EE860A"/></radialGradient>
</defs>
<g data-part="root">
<g data-part="body"><path d="M22 404 C 22 322, 100 270, 200 270 C 300 270, 378 322, 378 404 Z" fill="url(#${u}b)"/><path d="M78 332 l10 -8 M108 312 l8 -9 M300 318 l-8 -9 M324 340 l-10 -8 M58 368 l10 -6 M342 368 l-10 -6 M186 300 l4 -8 M214 302 l-4 -8" stroke="#6A4A2E" stroke-width="3.5" stroke-linecap="round" opacity=".5"/></g>
<g data-part="head">
<g data-part="earL">${ear}</g><g data-part="earR">${M(ear)}</g>
<path d="M104 162 C 102 114, 146 88, 200 88 C 254 88, 298 114, 296 162 L 300 234 C 302 280, 258 302, 200 302 C 142 302, 98 280, 100 234 Z" fill="url(#${u}f)"/>
<g data-part="face">
<path d="M130 218 C 130 184, 162 172, 200 172 C 238 172, 270 184, 270 218 C 270 262, 240 290, 200 290 C 160 290, 130 262, 130 218 Z" fill="#8A6040" opacity=".42"/>
<path d="M184 114 l4 10 M200 110 v11 M216 114 l-4 10" stroke="#8A6240" stroke-width="3" stroke-linecap="round"/>
<g data-part="blush" opacity="0"><ellipse cx="128" cy="200" rx="16" ry="9" fill="#FF8A8A" opacity=".5"/><ellipse cx="272" cy="200" rx="16" ry="9" fill="#FF8A8A" opacity=".5"/></g>
${eye(u, { side: 'L', cx: 148, cy: 152, ...E })}${eye(u, { side: 'R', cx: 252, cy: 152, ...E })}
<g data-part="mouthOpen" style="display:none"><path d="M184 252 Q200 247 216 252 Q214 278 200 282 Q186 278 184 252 Z" fill="#4E1F1F"/><rect x="191.5" y="250" width="8" height="12" rx="2" fill="#FFF4DA"/><rect x="200.5" y="250" width="8" height="12" rx="2" fill="#FFF4DA"/></g>
<g data-part="mouthClosed"><path d="M200 238 v14 M200 252 q-11 9 -22 2 M200 252 q11 9 22 2" stroke="#3B2A1E" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
<path d="M166 212 Q200 196 234 212 Q238 232 220 238 Q200 243 180 238 Q162 232 166 212 Z" fill="#3E2B1F"/><path d="M180 220 q7 -5 12 2 M220 220 q-7 -5 -12 2" stroke="#1C120B" stroke-width="3.2" fill="none" stroke-linecap="round"/><ellipse cx="190" cy="208" rx="9" ry="3" fill="#6E5646" opacity=".7"/>
<g data-part="whiskers" fill="#3B2A1E"><circle cx="160" cy="238" r="2"/><circle cx="153" cy="246" r="2"/><circle cx="164" cy="252" r="2"/><circle cx="240" cy="238" r="2"/><circle cx="247" cy="246" r="2"/><circle cx="236" cy="252" r="2"/></g>
</g>
<g data-part="hat"><circle cx="200" cy="82" r="25" fill="url(#${u}y)"/><g fill="#D9740A" opacity=".45"><circle cx="190" cy="90" r="1.6"/><circle cx="207" cy="93" r="1.6"/><circle cx="213" cy="80" r="1.6"/><circle cx="197" cy="78" r="1.6"/><circle cx="184" cy="82" r="1.6"/></g><ellipse cx="190" cy="72" rx="8" ry="5" fill="#FFE2A0" opacity=".8"/><path d="M200 59 v-7" stroke="#5A3D27" stroke-width="3" stroke-linecap="round"/><path d="M201 55 q15 -15 30 -6 q-13 13 -30 6 Z" fill="#5FA03A"/></g>
</g>
<g data-part="pawL">${paw}</g><g data-part="pawR">${M(paw)}</g>
</g>`
  });
})();
