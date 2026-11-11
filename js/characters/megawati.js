/* Megawati — karikatur parodi. Tidak berafiliasi dengan dan tidak mewakili tokoh aslinya. */
(() => {
  const { eye, M } = PI.util;
  const OL = '#3A2216';   // outline color shared by all tokoh
  const LN = '#C98E68';   // garis kulit (kerutan, hidung)
  const SK = '#F3CDA9';   // kulit di sekitar mata (kelopak)
  const ST = `stroke="${OL}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;

  /* telinga kecil dengan anting emas bulat (sebagian tertutup rambut) */
  const ear = (u) => `<path d="M121 193 C 106 188, 100 206, 104 219 C 107 228, 114 233, 122 229 Z" fill="url(#${u}s)" ${ST}/>
<path d="M115 201 q-6 7 -2 17" stroke="${LN}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<circle cx="110" cy="236" r="6.2" fill="#E8B23A" stroke="${OL}" stroke-width="2.5"/><circle cx="108" cy="234" r="1.8" fill="#FFF2C2"/>`;
  const brow = `<path d="M141 165 Q161 155 183 163" stroke="#2A1612" stroke-width="6.2" fill="none" stroke-linecap="round"/>`;
  const lid = `<path d="M150 174 Q163 168 176 174" stroke="${LN}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".75"/>`;
  const lash = `<path d="M150 187 q-5 -1 -9 -6" stroke="${OL}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  const bag = `<path d="M153 207 Q163 211 173 207" stroke="${LN}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".6"/>`;
  const smile = `<path d="M181 231 C 172 237, 168 245, 170 252" stroke="${LN}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/>`;
  const lapel = (u) => `<path d="M128 302 C 140 294, 152 290, 166 290 C 168 334, 176 376, 186 412 L 160 412 C 150 372, 138 334, 128 302 Z" fill="url(#${u}l)" ${ST}/>`;
  const panel = (u) => `<path d="M12 412 C 12 356, 44 322, 104 308 C 128 302, 146 298, 164 296 C 168 336, 176 376, 186 412 Z" fill="url(#${u}r)" ${ST}/>
<path d="M66 332 C 58 356, 56 386, 58 412" stroke="#6A141C" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const hand = (u) => `<path d="M157 374 C 168 374, 172 390, 162 398 L 150 398 Z" fill="url(#${u}s)" ${ST}/>
<path d="M98 406 C 96 388, 96 372, 102 364 C 106 356, 117 355, 120 361 C 124 354, 134 354, 137 360 C 141 354, 151 355, 153 362 C 159 366, 161 378, 160 392 L 160 406 Z" fill="url(#${u}s)" ${ST}/>
<path d="M120 362 q1 9 0 17 M137 361 q1 9 0 17 M152 366 q-4 6 -2 14" stroke="${LN}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M92 395 Q128 389 166 395 L168 414 L90 414 Z" fill="url(#${u}r)" ${ST}/>`;
  /* siluet rambut sasak/bob yang mengembang */
  const HAIR_BACK = 'M200 50 C 246 48, 288 64, 308 90 C 322 110, 328 136, 326 160 C 325 180, 321 198, 316 212 C 311 228, 306 240, 300 250 C 294 260, 282 264, 274 258 C 268 252, 268 242, 272 232 C 252 238, 226 242, 200 242 C 174 242, 148 238, 128 232 C 132 242, 132 252, 126 258 C 118 264, 106 260, 100 250 C 94 240, 89 228, 84 212 C 79 198, 75 180, 74 160 C 72 136, 78 110, 92 90 C 112 64, 154 48, 200 50 Z';
  const HAIR_FRONT = 'M84 212 C 79 198, 75 180, 74 160 C 72 136, 78 110, 92 90 C 112 64, 154 48, 200 50 C 246 48, 288 64, 308 90 C 322 110, 328 136, 326 160 C 325 180, 321 198, 316 212 C 304 216, 290 214, 276 206 C 278 182, 274 160, 262 144 C 250 126, 228 117, 200 118 C 172 117, 150 126, 138 144 C 126 160, 122 182, 124 206 C 110 214, 96 216, 84 212 Z';
  const MOUTH = 'M174 250 Q200 243 226 250 Q222 282 200 286 Q178 282 174 250 Z';
  const E = { rx: 14, ry: 11, irisR: 8.8, iris: '#2A1A10', irisHi: '#6A4228', sclera: '#FFFFFF', lid: SK, lidLine: OL };
  /* mata lembut: klip kelopak sedikit diperbesar (tak ada cincin putih saat terpejam)
     + garis bulu mata atas tebal yang ikut turun bersama kelopak (jadi garis mata terpejam) */
  const eyeX = (u, o) => eye(u, o)
    .replace(/(<clipPath id="[^"]+"><ellipse cx="[^"]+" cy="[^"]+" rx=")([^"]+)(" ry=")([^"]+)"/, (m, a, rx, b, ry) => `${a}${+rx + 1.2}${b}${+ry + 1.2}"`)
    .replace(/(<g class="lidT">[\s\S]*?)(<\/g>)/, `$1<rect x="${o.cx - o.rx * 2}" y="${o.cy - o.ry - 6}" width="${o.rx * 4}" height="10" fill="${OL}"/>$2`);

  PI.register('megawati', {
    group: 'tokoh', name: 'Megawati', species: 'Tokoh · parodi', tag: 'Istirahat dulu, Nak. Ibu yang jaga',
    accent: '#F4D0DC', glow: 'rgba(190,40,90,.28)', crop: '64 36 272 276',
    sfx: { voice: 'hmm2', angry: 'ahem', happy: 'hmm2' },
    happyAct: 'gesture', angryMouth: 0, happyMouth: .45, earAmp: .06, tiltAmp: .6,
    gesture: { side: 'R', wave: false },
    baseIdles: ['look', 'look', 'tilt'], idles: ['nod', 'gesture'],
    rig: { head: [200, 300], look: [200, 190], earL: [112, 210], earR: [288, 210], pawL: [128, 414], pawR: [272, 414],
           mouth: [200, 247], browL: [162, 161], browR: [238, 161], arm: [290, 420] },
    lines: {"greet":["Saya Bu Mega. Istirahat dulu, ya, Nak.","Ayo, istirahat. Ibu yang jaga."],"idle":["Kamu ini harus disiplin.","Ibu perhatikan dari sini.","Jangan kerja terus. Nanti sakit.","Hmm."],"escape":["Eh, mau ke mana?","Duduk dulu, Nak.","Ibu belum selesai bicara."],"angry":["Ibu ini sabar, tapi ada batasnya.","Dengar Ibu dulu."],"slam":["*tok* Duduk.","Ibu serius, lho."],"close":["Ibu dekati, ya.","Sekarang Ibu di sini."],"pet":["Aduh, kamu ini.","Hehe. Anak baik.","Iya, iya."],"boop":["Eh, kamu ini.","Tidak sopan, Nak."],"sleep":["Ibu juga mau rehat sebentar.","Zzz…"],"wake":["Ibu tidak tidur. Ibu merenung."],"back":["Tadi ke mana, Nak?"],"hold":["Mau berhenti? Yakin?","Sebentar lagi, Nak."],"stay":["Nah, anak pintar."],"quit":["Ya sudah. Lain kali dengar Ibu."],"done":["Selesai. Ayo, kerja lagi yang benar.","Sudah, Nak. Jangan lupa makan."]},
    svg: (u) => `<defs>
<radialGradient id="${u}s" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#F6D4B3"/><stop offset=".55" stop-color="#F2CAA6"/><stop offset=".85" stop-color="#EAB992"/><stop offset="1" stop-color="#DFA67E"/></radialGradient>
<linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E171A"/><stop offset="1" stop-color="#150A0A"/></linearGradient>
<linearGradient id="${u}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#AE2C36"/><stop offset="1" stop-color="#841C25"/></linearGradient>
<linearGradient id="${u}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C03842"/><stop offset="1" stop-color="#94222C"/></linearGradient>
<linearGradient id="${u}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3C1A1E"/><stop offset="1" stop-color="#241012"/></linearGradient>
<linearGradient id="${u}k" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2A2424"/><stop offset=".55" stop-color="#3A3232"/><stop offset="1" stop-color="#211C1C"/></linearGradient>
<clipPath id="${u}mc"><path d="${MOUTH}"/></clipPath>
</defs>
<g data-part="root">
<g data-part="body">
<path d="M174 232 L174 318 Q200 334 226 318 L226 232 Z" fill="#E2AC84" ${ST}/>
<path d="M176 280 Q200 304 224 280 L224 300 Q200 322 176 300 Z" fill="#C48C66" opacity=".5"/>
<path d="M148 296 Q200 338 252 296 L258 414 L142 414 Z" fill="url(#${u}t)" ${ST}/>
${panel(u)}${M(panel(u))}
${lapel(u)}${M(lapel(u))}
<path d="M228 294 C 248 278, 282 278, 306 298 L 294 308 C 276 296, 254 294, 238 302 Z" fill="#1A1515" ${ST}/>
<path d="M232 300 C 250 288, 274 290, 292 302 C 294 338, 292 378, 298 414 L 242 414 C 246 376, 242 338, 232 300 Z" fill="url(#${u}k)" ${ST}/>
<path d="M256 300 C 262 340, 258 376, 264 412" stroke="#4E4646" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M276 304 C 280 344, 278 380, 284 412" stroke="#5E5656" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>
</g>
<g data-part="head">
<path d="${HAIR_BACK}" fill="url(#${u}h)" ${ST}/>
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
<path d="M200 108 C 248 108, 282 140, 282 192 C 282 238, 256 288, 200 292 C 144 288, 118 238, 118 192 C 118 140, 152 108, 200 108 Z" fill="url(#${u}s)" ${ST}/>
<path d="${HAIR_FRONT}" fill="url(#${u}h)" ${ST}/>
<path d="M114 130 C 128 92, 180 68, 246 72 C 202 80, 158 96, 126 136 Z" fill="#5A382F" opacity=".3"/>
<path d="M286 92 C 304 110, 314 132, 314 154 C 306 136, 296 118, 280 102 Z" fill="#5A382F" opacity=".3"/>
<path d="M124 150 C 138 104, 196 82, 262 96 M262 96 C 284 108, 298 130, 302 156 M98 126 C 88 148, 88 176, 96 200 M150 70 C 178 58, 222 56, 254 66" stroke="#4A2E26" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<g data-part="face">
<path d="M178 137 Q200 132 222 137 M184 146 Q200 142 216 146" stroke="${LN}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".8"/>
${lid}${M(lid)}${lash}${M(lash)}${bag}${M(bag)}${smile}${M(smile)}
<ellipse cx="148" cy="230" rx="16" ry="9" fill="#F09A88" opacity=".2"/><ellipse cx="252" cy="230" rx="16" ry="9" fill="#F09A88" opacity=".2"/>
<g data-part="blush" opacity="0"><ellipse cx="148" cy="230" rx="18" ry="10" fill="#FF8A8A" opacity=".45"/><ellipse cx="252" cy="230" rx="18" ry="10" fill="#FF8A8A" opacity=".45"/></g>
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
${eyeX(u, { side: 'L', cx: 163, cy: 190, ...E })}${eyeX(u, { side: 'R', cx: 237, cy: 190, ...E })}
<path d="M190 213 C 184 219, 186 227, 193 228 M210 213 C 216 219, 214 227, 207 228 M194 231 Q200 234 206 231" stroke="#B87650" stroke-width="2.8" fill="none" stroke-linecap="round"/>
<g data-part="mouthOpen" style="display:none">
<path d="${MOUTH}" fill="#5A1A20"/>
<g clip-path="url(#${u}mc)"><path d="M172 240 L228 240 L228 257 Q200 253 172 257 Z" fill="#FFFFFF"/><ellipse cx="200" cy="281" rx="15" ry="8" fill="#D9707A"/></g>
<path d="${MOUTH}" fill="none" stroke="${OL}" stroke-width="5.5" stroke-linejoin="round"/>
<path d="${MOUTH}" fill="none" stroke="#C9505A" stroke-width="3.4" stroke-linejoin="round"/>
</g>
<g data-part="mouthClosed">
<path d="M179 252 Q200 259 221 252 Q213 265 200 266 Q187 265 179 252 Z" fill="#C85560" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<path d="M185 249.5 Q193 246 200 248.5 Q207 246 215 249.5" stroke="#B84852" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M174 250 Q200 257 226 250" stroke="${OL}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
<path d="M170 247 q-3 4 1 8 M230 247 q3 4 -1 8" stroke="${LN}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<path d="M193 262 q4 1.5 8 1.5" stroke="#EE949A" stroke-width="2" fill="none" stroke-linecap="round"/>
</g>
</g></g>
<g data-part="arm">
<g transform="translate(350 316) scale(1.2) translate(-350 -316)">
<path d="M328 316 C 324 292, 326 264, 332 250 L 364 248 C 370 262, 372 292, 370 316 Z" fill="url(#${u}s)" ${ST}/>
<path d="M331 268 C 329 246, 330 228, 333 214 C 336 203, 351 203, 352 214 C 354 228, 353 248, 351 268 Z" fill="url(#${u}s)" ${ST}/>
<path d="M337 216 q5 -4 10 0 M334 244 q8 3 16 0" stroke="${LN}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<rect x="348" y="248" width="28" height="14" rx="7" fill="url(#${u}s)" stroke="${OL}" stroke-width="4.5"/>
<rect x="348" y="261" width="28" height="14" rx="7" fill="url(#${u}s)" stroke="${OL}" stroke-width="4.5"/>
<rect x="347" y="274" width="26" height="14" rx="7" fill="url(#${u}s)" stroke="${OL}" stroke-width="4.5"/>
<path d="M328 300 C 334 288, 348 284, 362 286 C 371 287, 371 298, 362 300 C 352 302, 340 306, 332 314 Z" fill="url(#${u}s)" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/>
</g>
<path d="M316 446 C 318 400, 321 352, 324 308 L 378 310 C 380 356, 386 402, 396 446 Z" fill="url(#${u}r)" ${ST}/>
<path d="M324 322 L 378 324" stroke="#6A141C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M344 346 q 8 20 4 44 M366 366 q 4 14 2 30" stroke="#6A141C" stroke-width="3" fill="none" stroke-linecap="round"/>
</g>
<g data-part="pawL">${hand(u)}</g><g data-part="pawR">${M(hand(u))}</g>
</g>`
  });
})();
