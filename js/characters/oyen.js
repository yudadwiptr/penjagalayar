/* Oyen — kucing oren */
(() => {
  const { eye, M } = PI.util;
  const TAIL = 'M300 394 C 352 382, 386 338, 380 290 C 377 262, 364 246, 351 250 C 338 254, 339 269, 345 283 C 356 313, 343 348, 294 364 Z';
  const ear = (u) => `<path d="M92 164 L91 74 Q93 50 115 61 L174 113 Z" fill="url(#${u}f)"/><path d="M106 146 L105 88 Q107 73 120 81 L159 115 Z" fill="#F2A497"/><path d="M110 104 l15 15 M108 122 l17 9" stroke="#FFF1DF" stroke-width="3" stroke-linecap="round"/>`;
  const paw = (u) => `<ellipse cx="126" cy="390" rx="46" ry="28" fill="url(#${u}c)"/><path d="M110 398 v-9 M126 396 v-11 M142 398 v-9" stroke="#CDB596" stroke-width="3" stroke-linecap="round"/>`;
  const tuft = '<path d="M86 236 L52 246 L84 256 L60 272 L100 268 Z" fill="#E28B3E"/>';
  const E = { rx: 26, ry: 23, irisR: 21, iris: '#B99422', irisHi: '#F4DE6E', slit: true, lid: '#EC9748', lidLine: '#5A2E10' };

  PI.register('oyen', {
    name: 'Oyen', species: 'Kucing oren', tag: 'Gendut, galak, tidak bisa disogok',
    accent: '#F3C48E', glow: 'rgba(240,150,70,.34)', crop: '38 44 324 276',
    sfx: { voice: 'meow', angry: 'growl', happy: 'purr' }, happyAct: 'knead', angryMouth: .32, happyMouth: 0,
    idles: ['yawn', 'twitch', 'tilt', 'knead'],
    rig: { head: [200, 292], look: [200, 184], earL: [132, 132], earR: [268, 132], tail: [302, 384], pawL: [126, 414], pawR: [274, 414], mouth: [200, 244] },
    lines: {
      greet: ['Saya Oyen. Saya yang jaga.', 'Meong. Artinya: istirahat.', 'Layar ini sekarang punya saya.'],
      idle: ['Duduk.', 'Saya lihat kursornya.', 'Babu istirahat dulu.', 'Hmm.', 'Jangan lihat saya begitu.'],
      escape: ['Mau ke mana?', 'Meong. Artinya tidak.', 'Balik.', 'Jangan.'],
      angry: ['Saya sudah bilang.', 'Ekor saya sudah bergerak. Hati-hati.'],
      slam: ['*tepuk*', 'Itu peringatan terakhir.', 'Cakar saya masih disimpan.'],
      close: ['Saya mendekat.', 'Sekarang kita tatap-tatapan.'],
      pet: ['…prrr.', 'Oke. Boleh. Sebentar saja.', 'Disogok elus. Tetap tidak boleh kerja.'],
      boop: ['Hidung saya.', 'Jangan pencet.', 'Tidak sopan.'],
      sleep: ['Bagus. Kita sama-sama tidur.', 'Zzz… tetap jaga…'],
      wake: ['Saya tidak tidur.', 'Saya cuma kedip lama.'],
      back: ['Tadi ke mana?', 'Saya hitung itu.'],
      hold: ['Serius?', 'Kamu mau berhenti?', 'Lepas tombolnya.'],
      stay: ['Pilihan bagus.', 'Duduk lagi.'],
      quit: ['Ya sudah. Saya kecewa.', 'Pergi sana.'],
      done: ['Sudah. Silakan lanjut.', 'Selesai. Jangan lupa minum.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}f" cx="50%" cy="32%" r="75%"><stop offset="0" stop-color="#F8BB78"/><stop offset=".65" stop-color="#EC9547"/><stop offset="1" stop-color="#D5792D"/></radialGradient>
<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EE9B4D"/><stop offset="1" stop-color="#C06724"/></linearGradient>
<radialGradient id="${u}c" cx="50%" cy="30%" r="75%"><stop offset="0" stop-color="#FFFBF4"/><stop offset="1" stop-color="#F0DDC2"/></radialGradient>
<clipPath id="${u}tc"><path d="${TAIL}"/></clipPath>
</defs>
<g data-part="root">
<g data-part="tail"><path d="${TAIL}" fill="url(#${u}b)"/><g clip-path="url(#${u}tc)" stroke="#AE5A1B" stroke-width="9" stroke-linecap="round"><path d="M336 358 L368 340 M352 322 L388 312 M356 290 L392 290 M348 262 L380 258"/></g></g>
<g data-part="body"><path d="M24 404 C 24 318, 100 266, 200 266 C 300 266, 376 318, 376 404 Z" fill="url(#${u}b)"/><path d="M136 404 C 132 336, 160 296, 200 296 C 240 296, 268 336, 264 404 Z" fill="url(#${u}c)"/><path d="M60 342 q22 -8 40 2 M74 312 q20 -10 36 -2 M340 342 q-22 -8 -40 2 M326 312 q-20 -10 -36 -2" stroke="#B9601F" stroke-width="9" fill="none" stroke-linecap="round" opacity=".7"/></g>
<g data-part="head">
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
${tuft}${M(tuft)}
<path d="M80 206 C 76 140, 128 100, 200 100 C 272 100, 324 140, 320 206 C 318 258, 268 294, 200 294 C 132 294, 82 258, 80 206 Z" fill="url(#${u}f)"/>
<g data-part="face">
<path d="M200 108 v28 M178 111 l6 24 M222 111 l-6 24" stroke="#C46A24" stroke-width="7" stroke-linecap="round"/>
<path d="M86 198 l28 5 M86 218 l26 1 M314 198 l-28 5 M314 218 l-26 1" stroke="#C46A24" stroke-width="6" stroke-linecap="round"/>
<g data-part="blush" opacity="0"><ellipse cx="122" cy="234" rx="20" ry="11" fill="#FF7E86" opacity=".55"/><ellipse cx="278" cy="234" rx="20" ry="11" fill="#FF7E86" opacity=".55"/></g>
${eye(u, { side: 'L', cx: 152, cy: 184, ...E })}${eye(u, { side: 'R', cx: 248, cy: 184, ...E })}
<ellipse cx="178" cy="242" rx="30" ry="24" fill="url(#${u}c)"/><ellipse cx="222" cy="242" rx="30" ry="24" fill="url(#${u}c)"/><ellipse cx="200" cy="264" rx="22" ry="14" fill="url(#${u}c)"/>
<g data-part="mouthOpen" style="display:none"><path d="M181 244 Q200 239 219 244 Q217 278 200 282 Q183 278 181 244 Z" fill="#5B1A1A"/><ellipse cx="200" cy="272" rx="11" ry="7" fill="#EC7D88"/><path d="M185 244 l4 11 l4 -10 Z M207 245 l4 10 l4 -11 Z" fill="#FFFDF6"/></g>
<g data-part="mouthClosed"><path d="M200 236 v8 M200 244 q-9 9 -19 3 M200 244 q9 9 19 3" stroke="#5A2E10" stroke-width="3.2" fill="none" stroke-linecap="round"/></g>
<path d="M187 222 Q200 215 213 222 Q211 232 200 236 Q189 232 187 222 Z" fill="#E27D7A"/><ellipse cx="196" cy="221" rx="4" ry="2" fill="#F7B5B0"/>
<g data-part="whiskers" stroke="#FFF7EA" stroke-width="2.2" stroke-linecap="round" fill="none" opacity=".9"><path d="M158 238 Q122 228 90 226 M158 247 Q122 247 92 256 M242 238 Q278 228 310 226 M242 247 Q278 247 308 256"/></g>
</g></g>
<g data-part="pawL">${paw(u)}</g><g data-part="pawR">${M(paw(u))}</g>
</g>`
  });
})();
