/* Prabowo — karikatur parodi. Tidak berafiliasi dengan dan tidak mewakili tokoh aslinya. */
(() => {
  const { eye, M } = PI.util;
  const OL = '#3A2216';   // outline color shared by all tokoh
  const LN = '#A9623C';   // garis dalam di kulit (kerut, hidung, jari)
  const ST = `stroke="${OL}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;
  const st = (w, c = OL) => `stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"`;

  /* kepala: wajah bulat penuh, rambut gelap disisir ke belakang */
  const FACE = 'M200 92 C 258 92, 300 124, 302 180 C 304 216, 300 248, 286 270 C 270 292, 238 302, 200 302 C 162 302, 130 292, 114 270 C 100 248, 96 216, 98 180 C 100 124, 142 92, 200 92 Z';
  const HAIR = 'M106 194 C 92 174, 86 144, 92 118 C 98 82, 128 62, 170 52 C 196 47, 226 50, 250 60 C 284 64, 306 88, 310 118 C 315 146, 309 174, 295 194 C 291 180, 289 166, 287 154 C 285 140, 281 129, 271 124 C 254 116, 232 112, 212 113 C 192 114, 176 117, 164 122 C 154 120, 142 121, 133 126 C 122 132, 117 141, 114 154 C 111 166, 109 180, 106 194 Z';
  const ear = (u) => `<ellipse cx="94" cy="208" rx="16" ry="25" fill="url(#${u}k)" ${ST}/><path d="M97 193 q11 13 2 30" ${st(3, LN)}/>`;
  const brow = `<path d="M134 169 Q158 156 186 170" ${st(10.5, '#22140E')}/>`;
  const lash = `<path d="M174 184 Q160 174 146 185 l-3 -1" ${st(2.8)}/><path d="M147 206 Q160 211.5 174 206" ${st(2.4, LN)} opacity=".75"/><path d="M139 186 l-7 -2" ${st(2, LN)} opacity=".45"/>`;
  const cheek = `<path d="M174 228 C 162 240, 160 256, 166 268" ${st(2.8, LN)} opacity=".75"/><path d="M136 264 C 142 274, 150 280, 160 284" ${st(2.4, LN)} opacity=".4"/><ellipse cx="140" cy="238" rx="20" ry="12" fill="#FFDDBB" opacity=".18"/>`;

  /* badan: kemeja safari putih */
  const TORSO = 'M16 416 L16 376 C 18 334, 46 310, 96 298 C 124 292, 148 284, 166 280 L234 280 C 252 284, 276 292, 304 298 C 354 310, 382 334, 384 376 L384 416 Z';
  const epa = (u) => `<path d="M40 326 C 58 312, 94 299, 132 289 L135 301 C 100 310, 68 321, 47 338 Z" fill="url(#${u}w)" ${st(3.5)}/><circle cx="122" cy="297" r="4.2" fill="#FFFFFF" ${st(2.4)}/>`;
  const collar = (u) => `<path d="M166 274 C 150 284, 128 292, 106 298 L138 348 Q 172 332 200 320 C 188 306, 176 292, 168 278 Z" fill="url(#${u}w)" ${st(4)}/><path d="M118 304 L141 340" ${st(2, '#C5C6BE')}/>`;
  const pocket = (u) => `<path d="M56 344 L118 344 L118 418 L56 418 Z" fill="url(#${u}w)" ${st(3.5)}/><path d="M87 358 V418" ${st(2.5)} opacity=".5"/><path d="M51 336 L123 336 L123 350 Q87 362 51 350 Z" fill="#FFFFFF" ${st(3.5)}/><circle cx="87" cy="352" r="4.2" fill="#FFFFFF" ${st(2.4)}/>`;
  const side = `<path d="M38 332 C 42 352, 44 384, 44 416" ${st(3.2)}/><path d="M24 370 q5 10 6 24" ${st(2.5, '#BDBEB6')}/>`;
  const fist = (u) => `<path d="M98 418 L98 376 C 98 366, 104 361, 110 362 C 112 356, 120 355, 124 359 C 128 354, 136 354, 139 359 C 143 355, 151 356, 153 362 C 160 363, 164 370, 164 378 L164 418 Z" fill="url(#${u}k)" ${ST}/>
<path d="M111 363 q1 9 0 16 M125 360 q1 10 0 18 M139 360 q1 10 0 17" ${st(2.6, LN)}/>
<path d="M165 384 C 150 381, 132 385, 121 391 C 113 396, 117 405, 126 403 C 139 399, 152 399, 165 401" fill="url(#${u}k)" ${st(3, OL)}/>`;
  const E = { rx: 14.5, ry: 11, irisR: 9, iris: '#2A1A10', irisHi: '#6A4228', sclera: '#FFFFFF', lid: '#F0BA8C', lidLine: OL };

  PI.register('prabowo', {
    group: 'tokoh', name: 'Prabowo', species: 'Tokoh · parodi', tag: 'Istirahat itu perintah. Siap!',
    accent: '#D8E6C8', glow: 'rgba(110,160,80,.28)', crop: '64 28 272 286',
    sfx: { voice: 'hmm', angry: 'ahem', happy: 'hmm' },
    happyAct: 'gesture', angryMouth: 0, happyMouth: .45, earAmp: .06, tiltAmp: .6,
    gesture: { side: 'L', wave: false },
    baseIdles: ['look', 'look', 'tilt'], idles: ['nod', 'gesture', 'dance'],
    rig: { head: [200, 300], look: [200, 190], earL: [94, 208], earR: [306, 208], pawL: [128, 414], pawR: [272, 414],
           mouth: [200, 258], browL: [160, 165], browR: [240, 165], arm: [110, 420] },
    lines: {"greet":["Siap! Saya Prabowo. Istirahat itu perintah.","Hormat! Waktunya istirahat."],"idle":["Jangan lupa makan bergizi, ya.","Santai. Saya joget dulu sebentar.","Disiplin itu termasuk istirahat.","Hmm. Bagus."],"escape":["Siap?! Mau ke mana?","Kembali ke posisi!","Duduk. Itu perintah."],"angry":["Saya bisa tegas, lho.","Jangan bikin saya gebrak meja."],"slam":["*gebrak* Duduk!","Ini perintah langsung."],"close":["Saya maju ke depan.","Saya makin dekat. Siap?"],"pet":["Wah, gemoy, ya?","Hehe. Terima kasih.","Boleh, boleh."],"boop":["Eh! Hidung saya.","Siap! Jangan dipencet."],"sleep":["Istirahat di tempat… zzz.","Zzz…"],"wake":["Siap! Saya bangun."],"back":["Tadi ke mana? Laporkan."],"hold":["Mundur? Yakin?","Tahan dulu, prajurit."],"stay":["Bagus. Disiplin."],"quit":["Ya sudah. Besok lebih disiplin."],"done":["Istirahat selesai. Bubar, jalan!","Siap! Kembali bertugas."]},
    svg: (u) => `<defs>
<radialGradient id="${u}s" cx="50%" cy="42%" r="68%"><stop offset="0" stop-color="#F6C79A"/><stop offset=".7" stop-color="#E9A97A"/><stop offset="1" stop-color="#D48B5E"/></radialGradient>
<radialGradient id="${u}k" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="#F4C396"/><stop offset=".7" stop-color="#E4A272"/><stop offset="1" stop-color="#CF885A"/></radialGradient>
<linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B281F"/><stop offset="1" stop-color="#1C120D"/></linearGradient>
<linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E4E5DF"/></linearGradient>
<clipPath id="${u}tc"><path d="${TORSO}"/></clipPath>
<clipPath id="${u}mc"><path d="M177 259 Q200 254 223 259 Q221 283 200 285 Q179 283 177 259 Z"/></clipPath>
</defs>
<g data-part="root">
<g data-part="body">
<path d="M158 246 L158 294 Q200 312 242 294 L242 246 Z" fill="#D28C5E" ${ST}/>
<path d="${TORSO}" fill="url(#${u}w)" ${ST}/>
<path d="M162 266 L200 320 L238 266 Z" fill="#D28C5E"/>
${side}${M(side)}
${epa(u)}${M(epa(u))}
${pocket(u)}${M(pocket(u))}
<rect x="193" y="320" width="14" height="98" fill="#FFFFFF" ${st(2.5)}/>
<circle cx="200" cy="342" r="4" fill="#FFFFFF" ${st(2.2)}/><circle cx="200" cy="374" r="4" fill="#FFFFFF" ${st(2.2)}/><circle cx="200" cy="406" r="4" fill="#FFFFFF" ${st(2.2)}/>
${collar(u)}${M(collar(u))}
<g clip-path="url(#${u}tc)"><ellipse cx="200" cy="292" rx="112" ry="22" fill="#B9BBB3" opacity=".3"/></g>
<rect x="286" y="313" width="22" height="7.5" fill="#E1262D"/><rect x="286" y="320.5" width="22" height="7.5" fill="#FFFFFF"/><rect x="286" y="313" width="22" height="15" rx="2" ${st(2.5)}/>
</g>
<g data-part="head">
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
<path d="${FACE}" fill="url(#${u}s)" ${ST}/>
<path d="${HAIR}" fill="url(#${u}h)" ${ST}/>
<path d="M130 94 C 154 68, 206 58, 254 68" ${st(7, '#5C4434')} opacity=".7"/><path d="M150 72 C 140 90, 136 108, 140 124" ${st(3, '#5C4434')}/>
<path d="M140 124 C 132 104, 140 82, 164 66 M168 124 C 174 102, 190 84, 216 70 M214 116 C 230 98, 254 86, 280 86 M252 121 C 268 111, 286 108, 302 112 M118 146 C 112 124, 116 104, 128 92" ${st(2.5, '#4E3628')}/>
<g data-part="face">
<path d="M170 140 Q200 134 230 140 M178 149 Q200 144 222 149" ${st(2.4, LN)} opacity=".45"/>
${cheek}${M(cheek)}
<g data-part="blush" opacity="0"><ellipse cx="136" cy="240" rx="18" ry="9" fill="#FF8A80" opacity=".45"/><ellipse cx="264" cy="240" rx="18" ry="9" fill="#FF8A80" opacity=".45"/></g>
${lash}${M(lash)}
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
${eye(u, { side: 'L', cx: 160, cy: 190, ...E })}${eye(u, { side: 'R', cx: 240, cy: 190, ...E })}
<path d="M195 198 Q193 210 190 220" ${st(2.4, LN)} opacity=".5"/>
<ellipse cx="200" cy="230" rx="8" ry="5.5" fill="#FFE0BE" opacity=".55"/>
<path d="M186 222 C 176 226, 175 240, 187 241 Q193 247 200 245 Q207 247 213 241 C 225 240, 224 226, 214 222" ${st(3.2, LN)}/>
<path d="M191 238 q3 -3 6 0 M203 238 q3 -3 6 0" ${st(2.6, '#8A4A2C')}/>
<g data-part="mouthOpen" style="display:none">
<path d="M177 259 Q200 254 223 259 Q221 283 200 285 Q179 283 177 259 Z" fill="#5A1E1E"/>
<g clip-path="url(#${u}mc)"><ellipse cx="200" cy="281" rx="13" ry="7" fill="#D9686C"/><path d="M178 258 Q200 254 222 258 L221 266 Q200 262.5 179 266 Z" fill="#FFFFFF"/></g>
<path d="M177 259 Q200 254 223 259 Q221 283 200 285 Q179 283 177 259 Z" ${st(3.2)}/>
</g>
<g data-part="mouthClosed"><path d="M175 257 Q200 273 225 257" ${st(3.8, '#6E3424')}/><path d="M172 253 q3 3 3 7 M228 253 q-3 3 -3 7" ${st(2.4, LN)}/><path d="M192 278 Q200 281 208 278" ${st(2.4, LN)} opacity=".55"/></g>
</g>
</g>
<g data-part="arm">
<path d="M88 184 L34 278 C 26 290, 26 300, 28 308 L42 372 L110 360 L88 302 L132 212 Z" fill="url(#${u}k)" ${ST}/>
<path d="M86 302 q-9 -2 -13 -11" ${st(2.4, LN)}/>
<g transform="translate(108 196) rotate(-50) scale(1.22)">
<path d="M-12 -16 C 6 -19, 28 -20, 46 -18 C 58 -17, 68 -15, 74 -11 C 81 -6, 81 4, 74 8 C 64 12, 52 15, 40 16 C 28 19, 10 20, -12 17 Z" fill="url(#${u}k)"/><path d="M-12 -16 C 6 -19, 28 -20, 46 -18 C 58 -17, 68 -15, 74 -11 C 81 -6, 81 4, 74 8 C 64 12, 52 15, 40 16 C 28 19, 10 20, -12 17" fill="none" stroke="${OL}" stroke-width="3.8" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M46 -10 C 56 -9, 64 -8, 72 -6 M44 -2 C 56 -1, 66 0, 76 1 M42 6 C 52 7, 60 8, 68 9" ${st(2.2, LN)}/>
<path d="M0 10 C 14 13, 30 11, 41 6" ${st(2.4, LN)}/>
</g>
<path d="M26 346 C 38 332, 78 322, 104 326 C 112 364, 120 404, 130 452 L52 462 C 44 420, 34 382, 26 346 Z" fill="url(#${u}w)" ${ST}/>
<path d="M30 360 C 44 346, 80 337, 107 340" ${st(3)}/>
<path d="M62 384 q8 18 8 40 M100 372 q0 16 6 34" ${st(2.5, '#BDBEB6')}/>
</g>
<g data-part="pawL">${fist(u)}</g><g data-part="pawR">${M(fist(u))}</g>
</g>`
  });
})();
