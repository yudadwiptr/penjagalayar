/* Mochi — shiba */
(() => {
  const { eye, M } = PI.util;
  const ear = (u) => `<path d="M96 158 L100 66 Q103 50 118 58 L174 110 Z" fill="url(#${u}f)"/><path d="M112 140 L114 82 Q116 72 125 78 L160 112 Z" fill="#FBE7D2"/>`;
  const paw = (u) => `<ellipse cx="126" cy="390" rx="44" ry="27" fill="url(#${u}c)"/><path d="M111 397 v-9 M126 395 v-11 M141 397 v-9" stroke="#D9C2A2" stroke-width="3" stroke-linecap="round"/>`;
  const E = { rx: 16, ry: 14, irisR: 13, iris: '#3A2414', irisHi: '#7A4E2A', lid: '#DD8B44', lidLine: '#3A2414' };

  PI.register('mochi', {
    name: 'Mochi', species: 'Shiba', tag: 'Yakin kamu butuh istirahat',
    accent: '#F5D2AE', glow: 'rgba(235,140,70,.32)', crop: '38 44 324 276',
    sfx: { voice: 'bark', angry: 'growl', happy: 'bark' }, happyAct: 'wag', angryMouth: 0, happyMouth: .8,
    idles: ['wag', 'tilt', 'tilt', 'twitch'],
    rig: { head: [200, 294], look: [200, 170], earL: [134, 128], earR: [266, 128], tail: [316, 376], pawL: [126, 414], pawR: [274, 414], mouth: [200, 246], browL: [156, 140], browR: [244, 140] },
    lines: {
      greet: ['Saya Mochi. Kamu butuh istirahat.', 'Guk. Itu artinya duduk.'],
      idle: ['Nggak usah sok sibuk.', 'Istirahat itu kerjaan juga.', 'Ya, saya tahu.', 'Saya anak baik. Kamu juga harus.'],
      escape: ['Hei. Duduk.', 'Nggak, nggak.', 'Guk! Balik.'],
      angry: ['Saya bisa teriak ala shiba, lho.', 'Jangan bikin saya teriak.'],
      slam: ['*tap* Tetap di situ.', 'GUK.'],
      close: ['Saya makin dekat.', 'Lihat mata saya.'],
      pet: ['Ekor saya gerak sendiri.', 'Oke, oke, kamu baik.', 'Lagi, lagi!'],
      boop: ['Boop. Diterima.', 'Hehe. Lagi?'],
      sleep: ['Tidur juga? Oke.', 'Zzz… guk…'],
      wake: ['Saya bangun duluan!'],
      back: ['Kamu tadi ke mana? Saya nunggu.'],
      hold: ['Kok berhenti?', 'Belum selesai!'],
      stay: ['Anak baik.'],
      quit: ['…oke. Saya tunggu di sini.'],
      done: ['Selesai! Kamu hebat.', 'Sudah. Ayo lanjut, pelan-pelan.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}f" cx="50%" cy="28%" r="78%"><stop offset="0" stop-color="#F0A863"/><stop offset=".7" stop-color="#DE8C45"/><stop offset="1" stop-color="#C87534"/></radialGradient>
<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E19248"/><stop offset="1" stop-color="#B9672A"/></linearGradient>
<radialGradient id="${u}c" cx="50%" cy="25%" r="80%"><stop offset="0" stop-color="#FFFCF5"/><stop offset="1" stop-color="#F3E3CB"/></radialGradient>
</defs>
<g data-part="root">
<g data-part="tail"><path d="M312 376 C 362 366, 390 320, 374 284 C 360 254, 320 258, 320 288 C 320 310, 348 314, 352 294" stroke="#D6833E" stroke-width="34" fill="none" stroke-linecap="round"/><path d="M352 294 C 350 302, 344 306, 338 304" stroke="#F3C08C" stroke-width="12" fill="none" stroke-linecap="round" opacity=".8"/></g>
<g data-part="body"><path d="M24 404 C 24 318, 100 266, 200 266 C 300 266, 376 318, 376 404 Z" fill="url(#${u}b)"/><path d="M128 404 C 124 330, 158 292, 200 292 C 242 292, 276 330, 272 404 Z" fill="url(#${u}c)"/></g>
<g data-part="head">
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
<path d="M74 198 C 74 132, 128 96, 200 96 C 272 96, 326 132, 326 198 C 326 256, 272 294, 200 294 C 128 294, 74 256, 74 198 Z" fill="url(#${u}f)"/>
<g data-part="face">
<path d="M82 212 C 100 196, 138 192, 166 204 C 182 194, 218 194, 234 204 C 262 192, 300 196, 318 212 C 312 264, 266 294, 200 294 C 134 294, 88 264, 82 212 Z" fill="url(#${u}c)"/>
<ellipse data-part="browL" cx="156" cy="140" rx="12" ry="8" fill="#FBEAD6"/><ellipse data-part="browR" cx="244" cy="140" rx="12" ry="8" fill="#FBEAD6"/>
<g data-part="blush" opacity="0"><ellipse cx="118" cy="228" rx="20" ry="11" fill="#FF8590" opacity=".5"/><ellipse cx="282" cy="228" rx="20" ry="11" fill="#FF8590" opacity=".5"/></g>
${eye(u, { side: 'L', cx: 158, cy: 170, ...E })}${eye(u, { side: 'R', cx: 242, cy: 170, ...E })}
<g data-part="mouthOpen" style="display:none"><path d="M178 246 Q200 240 222 246 Q220 274 200 278 Q180 274 178 246 Z" fill="#5A1E1E"/><path d="M188 256 Q188 292 200 292 Q212 292 212 256 Z" fill="#F0707E"/><path d="M200 262 v18" stroke="#D9566A" stroke-width="2"/></g>
<g data-part="mouthClosed"><path d="M200 234 v12 M200 246 q-12 10 -24 2 M200 246 q12 10 24 2" stroke="#231A14" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
<path d="M182 222 Q200 210 218 222 Q216 236 200 238 Q184 236 182 222 Z" fill="#241A14"/><ellipse cx="194" cy="218" rx="6" ry="3" fill="#5E4E44"/>
</g></g>
<g data-part="pawL">${paw(u)}</g><g data-part="pawR">${M(paw(u))}</g>
</g>`
  });
})();
