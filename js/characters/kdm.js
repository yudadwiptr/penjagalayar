/* KDM (Kang Dedi) — karikatur parodi. Tidak berafiliasi dengan dan tidak mewakili tokoh aslinya. */
(() => {
  const { eye, M } = PI.util;
  const OL = '#3A2216';   // warna garis luar tokoh
  const LN = '#A9623C';   // garis dalam kulit (kerutan senyum, hidung, dagu)
  const SK = '#F0A874';   // kelopak mata
  const ST = `stroke="${OL}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;
  const st = (w, c = OL) => `stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"`;

  /* telinga */
  const ear = (u) => `<path d="M108 184 C 90 172, 78 186, 83 214 C 87 236, 100 248, 114 238 Z" fill="url(#${u}s)" ${ST}/>
<path d="M99 194 C 90 194, 89 210, 96 224 M94 208 q7 1 8 9" ${st(2.8, LN)}/>`;

  /* alis tebal melengkung ramah + kerutan sudut mata (crow's feet) */
  const brow = `<path d="M134 164 C 146 152, 168 150, 184 160 C 188 163, 185 170, 179 168 C 165 162, 148 163, 138 171 C 133 174, 130 168, 134 164 Z" fill="#261710" stroke="#261710" stroke-width="1.5" stroke-linejoin="round"/>`;
  const crow = `<path d="M134 188 l-10 -3 M135 194 l-12 2 M146 206 Q162 212 178 205" ${st(2.5, LN)} opacity=".8"/>`;
  const crease = `<path d="M174 218 C 156 230, 148 250, 154 268" ${st(3, LN)} opacity=".85"/>`;

  /* kemeja putih berkerah lipat + skoder bahu + dua saku dada */
  const TORSO = 'M16 416 L16 374 C 18 334, 48 310, 98 298 C 126 291, 150 284, 168 280 L232 280 C 250 284, 274 291, 302 298 C 352 310, 382 334, 384 374 L384 416 Z';
  const epa = (u) => `<path d="M44 324 C 64 310, 98 298, 134 289 L138 301 C 104 310, 72 320, 52 336 Z" fill="url(#${u}w)" ${st(3.6)}/>`;
  const collar = (u) => `<path d="M164 274 C 146 286, 128 296, 114 304 L138 352 L196 318 C 184 304, 172 290, 164 274 Z" fill="url(#${u}w)" ${st(4.2)}/>`;
  const pocket = (u) => `<path d="M62 348 L122 348 L122 416 L62 416 Z" fill="url(#${u}w)" ${st(3.5)}/>
<path d="M58 340 L126 340 L126 356 L92 366 L58 356 Z" fill="#FFFFFF" ${st(3.6)}/>`;

  const fist = (u) => `<path d="M98 416 L98 376 C 98 366, 104 361, 110 362 C 112 356, 120 355, 124 359 C 128 354, 136 354, 139 359 C 143 355, 151 356, 153 362 C 160 363, 164 370, 164 378 L164 416 Z" fill="url(#${u}s)" ${ST}/>
<path d="M111 363 q1 9 0 16 M125 360 q1 10 0 18 M139 360 q1 10 0 17" ${st(2.6, LN)}/>`;

  /* tangan melambai ramah */
  const FING = [[66, 194, 54, 169], [74, 184, 64, 148], [86, 180, 85, 137], [95, 184, 100, 152]];
  const hand = (() => {
    const fl = (w, c) => FING.map(([a, b, c2, d]) => `<path d="M${a} ${b} L${c2} ${d}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`).join('');
    return `<g transform="translate(70 192) scale(.88) translate(-84 -200)">
<g>${fl(20, OL)}<path d="M96 208 L108 197" stroke="${OL}" stroke-width="21" stroke-linecap="round"/><ellipse cx="82" cy="198" rx="21" ry="23" fill="${OL}" stroke="${OL}" stroke-width="9"/></g>
<g>${fl(11, '#F0A874')}<path d="M96 208 L108 197" stroke="#F0A874" stroke-width="12" stroke-linecap="round"/><ellipse cx="82" cy="198" rx="21" ry="23" fill="#F0A874"/></g>
<path d="M72 208 Q 82 214 92 206 M95 200 q 6 4 8 10" stroke="${LN}" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>`;
  })();

  const E = { rx: 14, ry: 10, irisR: 8.8, iris: '#2A1A10', irisHi: '#6A4428', sclera: '#FFFFFF', lid: SK, lidLine: OL };

  PI.register('kdm', {
    group: 'tokoh', name: 'KDM', species: 'Tokoh · parodi', tag: 'Sok atuh istirahat heula, ulah gawe wae',
    accent: '#E4EFE7', glow: 'rgba(120,185,145,.28)', crop: '58 24 284 292',
    sfx: { voice: 'hmm', angry: 'ahem', happy: 'hmm' },
    happyAct: 'gesture', angryMouth: 0, happyMouth: .65, earAmp: .06, tiltAmp: .65,
    gesture: { side: 'L', wave: true },
    baseIdles: ['look', 'look', 'tilt'], idles: ['nod', 'gesture', 'bob'],
    rig: {
      head: [200, 300], look: [200, 188], earL: [104, 208], earR: [296, 208],
      pawL: [128, 414], pawR: [272, 414], hat: [200, 118],
      mouth: [200, 254], browL: [160, 160], browR: [240, 160], arm: [110, 420]
    },
    lines: {
      greet: ['Sampurasun! Saya Kang Dedi. Sok atuh istirahat heula.', 'Aduh, kasihan ini matanya capek. Istirahat dulu, ya.'],
      idle: ['Ulah gawe wae atuh, bisi gering.', 'Saya mah sedih lihat kamu kerja terus nggak istirahat.', 'Hirup mah kudu seimbang, kerja jalan, istirahat jalan.', 'Sok, tarik napas heula.'],
      escape: ['Eh, mau ke mana atuh?', 'Cicing heula di dieu, belum beres istirahatnya.', 'Ulah kabur atuh, Kang.'],
      angry: ['Aduh, kok bandel pisan ini teh?', 'Saya tegur ya, duduk dulu atuh!'],
      slam: ['*gebrak* Sok duduk heula!', 'Dengekeun Kang Dedi, istirahat!'],
      close: ['Saya samperin ke depan layar, nih.', 'Tatap mata Kang Dedi. Kenapa susah banget disuruh istirahat?'],
      pet: ['Aduh, hatur nuhun pisan.', 'Hehe, jadi terharu saya.', 'Bageur pisan.'],
      boop: ['Eh, pangambung saya dipencet.', 'Ulah gitu atuh.'],
      sleep: ['Tah gitu, rehat heula… zzz.', 'Zzz… tibra pisan…'],
      wake: ['Eh! Saya nggak tidur, lagi ngelamun nasib rakyat.'],
      back: ['Tadi habis dari mana atuh?'],
      hold: ['Beneran mau udahan sekarang?', 'Sakedap deui atuh, tanggung.'],
      stay: ['Tah gitu atuh, bageur.'],
      quit: ['Ya sudah atuh, saya mah cuma bisa mendoakan.'],
      done: ['Alhamdulillah beres. Sok atuh lanjut kerja lagi!', 'Hatur nuhun sudah istirahat. Sehat selalu, ya!']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}s" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#F6B885"/><stop offset=".65" stop-color="#EAA068"/><stop offset="1" stop-color="#D1834D"/></radialGradient>
<linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#F1F3F4"/><stop offset="1" stop-color="#D8DCDF"/></linearGradient>
<linearGradient id="${u}ik" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#F3F4F6"/><stop offset="1" stop-color="#DADDE2"/></linearGradient>
<clipPath id="${u}mc"><path d="M162 246 Q200 240 238 246 C 236 278, 220 290, 200 290 C 180 290, 164 278, 162 246 Z"/></clipPath>
</defs>
<g data-part="root">
<g data-part="body">
<path d="M158 246 L158 302 Q200 322 242 302 L242 246 Z" fill="#DA8C56" ${ST}/>
<path d="${TORSO}" fill="url(#${u}w)" ${ST}/>
<path d="M164 274 L200 326 L236 274 Z" fill="#DA8C56"/>
${epa(u)}${M(epa(u))}
${pocket(u)}${M(pocket(u))}
<path d="M200 322 V 416" ${st(3.8, OL)}/>
${collar(u)}${M(collar(u))}
</g>
<g data-part="head">
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
<!-- kubah rambut hitam terlihat di atas iket -->
<path d="M114 134 C 114 74, 152 44, 200 44 C 248 44, 286 74, 286 134 Z" fill="#271F1C" ${ST}/>
<!-- wajah bulat penuh -->
<path d="M200 96 C 258 96, 294 128, 296 184 C 298 222, 288 256, 268 278 C 250 298, 226 306, 200 306 C 174 306, 150 298, 132 278 C 112 256, 102 222, 104 184 C 106 128, 142 96, 200 96 Z" fill="url(#${u}s)" ${ST}/>
<!-- cambang rambut hitam di pelipis kiri & kanan di bawah iket -->
<path d="M104 192 C 102 172, 106 150, 118 140 L 122 184 Z M296 192 C 298 172, 294 150, 282 140 L 278 184 Z" fill="#271F1C" ${ST}/>
<g data-part="face">
${crease}${M(crease)}
<path d="M140 270 C 156 292, 178 300, 200 300 C 222 300, 244 292, 260 270" ${st(2.6, LN)} opacity=".55"/>
<g data-part="blush" opacity="0"><ellipse cx="140" cy="234" rx="17" ry="9" fill="#FF8575" opacity=".45"/><ellipse cx="260" cy="234" rx="17" ry="9" fill="#FF8575" opacity=".45"/></g>
${crow}${M(crow)}
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
${eye(u, { side: 'L', cx: 162, cy: 190, ...E })}${eye(u, { side: 'R', cx: 238, cy: 190, ...E })}
<!-- hidung bulat ramah -->
<path d="M192 186 C 190 198, 188 210, 184 218 M182 220 C 172 224, 174 236, 188 236 Q 200 242 212 236 C 226 236, 228 224, 218 220" ${st(3.2, LN)}/>
<path d="M189 233 q5 -4 10 0 M201 233 q5 -4 10 0" ${st(2.6, '#7A3E22')}/>
<g data-part="mouthOpen" style="display:none">
<path d="M162 246 Q200 240 238 246 C 236 278, 220 290, 200 290 C 180 290, 164 278, 162 246 Z" fill="#4A1818"/>
<g clip-path="url(#${u}mc)">
<ellipse cx="200" cy="284" rx="22" ry="12" fill="#E56B6F"/>
<path d="M160 242 L240 242 L238 262 Q200 268 162 262 Z" fill="#FFFFFF"/>
</g>
<path d="M162 246 Q200 240 238 246 C 236 278, 220 290, 200 290 C 180 290, 164 278, 162 246 Z" ${st(3.8)}/>
<path d="M184 295 Q200 300 216 295" ${st(2.6, LN)} opacity=".7"/>
</g>
<g data-part="mouthClosed">
<path d="M166 248 Q200 243 234 248 C 230 272, 216 280, 200 280 C 184 280, 170 272, 166 248 Z" fill="#4A1818" ${st(3.6)}/>
<path d="M168 248 Q200 244 232 248 L229 260 Q200 264 171 260 Z" fill="#FFFFFF" ${st(2.6)}/>
<ellipse cx="200" cy="274" rx="14" ry="5.5" fill="#E56B6F"/>
<path d="M184 289 Q200 294 216 289" ${st(2.6, LN)} opacity=".7"/>
</g>
</g>
<!-- Iket Sunda Putih Khas dengan Simpul Kelopak di Tengah Dahi (sesuai referensi) -->
<g data-part="hat">
<path d="M100 164 C 96 132, 114 96, 156 88 C 184 82, 216 82, 244 88 C 286 96, 304 132, 300 164 C 286 142, 246 130, 200 130 C 154 130, 114 142, 100 164 Z" fill="url(#${u}ik)" ${ST}/>
<!-- garis lipatan iket kiri & kanan -->
<path d="M103 144 C 126 122, 160 112, 194 112 M297 144 C 274 122, 240 112, 206 112" ${st(3.2, OL)}/>
<path d="M108 124 C 132 104, 162 96, 190 96 M292 124 C 268 104, 238 96, 210 96" ${st(2.8, '#B8BEC6')}/>
<!-- simpul iket 3 kelopak di tengah dahi -->
<path d="M196 98 C 190 74, 202 56, 212 60 C 218 64, 214 84, 204 98 Z" fill="url(#${u}ik)" ${st(3.8)}/>
<path d="M204 98 C 212 76, 228 68, 232 76 C 235 84, 222 98, 206 102 Z" fill="url(#${u}ik)" ${st(3.8)}/>
<path d="M194 102 C 174 90, 156 92, 160 102 C 164 110, 182 112, 196 108 Z" fill="url(#${u}ik)" ${st(3.8)}/>
<path d="M206 102 C 226 92, 244 96, 240 105 C 235 113, 216 113, 204 108 Z" fill="url(#${u}ik)" ${st(3.8)}/>
<ellipse cx="200" cy="105" rx="9" ry="7" fill="url(#${u}ik)" ${st(3.8)}/>
</g>
</g>
<g data-part="arm">
${hand}
<path d="M44 342 C 62 338, 82 334, 102 330 C 112 370, 124 406, 136 446 L 56 456 C 52 416, 48 378, 44 342 Z" fill="url(#${u}w)" ${ST}/>
<path d="M74 378 q10 12 14 34" ${st(2.5, '#C4CAC4')}/>
</g>
<g data-part="pawL">${fist(u)}</g><g data-part="pawR">${M(fist(u))}</g>
</g>`
  });
})();
