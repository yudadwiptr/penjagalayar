/* Bahlil — karikatur parodi. Tidak berafiliasi dengan dan tidak mewakili tokoh aslinya. */
(() => {
  const { eye, M } = PI.util;
  const OL = '#3A2216';   // outline color shared by all tokoh
  const SK = '#CD8550', SKD = '#8A4A28', HAIR = '#1F1612';
  const S = `stroke="${OL}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;
  const ln = (w = 2.6, c = SKD) => `stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"`;

  /* kepala oval: paling lebar di tulang pipi, meruncing ke dagu */
  const HEAD = 'M200 70 C 257 70, 297 110, 297 172 C 297 229, 279 281, 200 297 C 121 281, 103 229, 103 172 C 103 110, 143 70, 200 70 Z';
  /* rambut pendek hitam: kubah di atas, pelipis tipis (agak mundur), garis rambut depan melengkung halus */
  const HAIRP = 'M105 170 C 98 140, 100 108, 121 84 C 141 61, 170 51, 200 51 C 230 51, 259 61, 279 84 C 300 108, 302 140, 295 170 L 284 166 C 285 138, 279 116, 262 102 C 244 90, 222 86, 200 86 C 178 86, 156 90, 138 102 C 121 116, 115 138, 116 166 Z';
  /* telinga kiri (layar), dicerminkan untuk kanan */
  const ear = (u) => `<path d="M113 176 C 95 162, 78 172, 80 196 C 82 218, 98 229, 115 221 Z" fill="url(#${u}s)" ${S}/><path d="M107 185 C 94 183, 90 200, 99 211 M98 195 q7 2 6 9" ${ln(2.8)}/>`;
  /* alis tebal, sedikit melengkung */
  const brow = `<path d="M136 160 Q 156 144 184 153" stroke="${HAIR}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  /* lipatan kelopak atas (statis, di atas mata) */
  const crease = `<path d="M143 173 Q 160 164 178 171" ${ln(2.4)} opacity=".6"/>`;
  /* kerah kemeja batik: cokelat polos seperti referensi */
  const collar = (u) => `<path d="M164 270 L 126 302 Q 146 330 170 354 L 197 334 L 166 290 Z" fill="url(#${u}cl)" ${S}/><path d="M160 284 L 138 302 Q 152 322 169 340" ${ln(2, '#5A3420')} opacity=".7"/>`;
  /* kepalan tangan yang bertumpu di tepi bawah */
  const fist = (u) => `<path d="M96 410 C 92 388, 96 370, 108 363 Q 112 353 122 356 Q 128 350 136 355 Q 143 350 150 358 Q 161 359 162 373 C 165 390, 163 402, 162 410 Z" fill="url(#${u}hd)" ${S}/><path d="M122 357 q2 8 -1 14 M136 356 q2 8 -1 14 M150 359 q1 7 -1 12" ${ln(2.6)}/><path d="M162 383 Q 150 390 136 387" ${ln(2.8)}/>`;
  /* tangan melambai: telapak menghadap penonton, jari rileks (koordinat lokal, pergelangan di 0,0) */
  const PALM = 'M-16 2 C -22 -10, -23 -32, -18 -44 Q 0 -52 18 -44 C 23 -32, 21 -10, 16 2 Z';
  const FING = 'M10 -40 Q 15 -56 17 -70 M0 -42 Q 2 -62 3 -80 M-10 -40 Q -11 -58 -10 -74';
  const PINKY = 'M-17 -34 Q -21 -46 -23 -57', THUMB = 'M15 -12 Q 27 -20 32 -34';
  const FORE = 'M73 244 C 76 284, 81 322, 86 366 L 140 360 C 128 318, 118 280, 110 242 Z';
  const HAND_T = 'translate(93 250) rotate(-10) scale(1.18)';
  /* sklera sedikit lebih kecil dari klip kelopak agar tepi putih tidak bocor saat mata terpejam,
     plus garis bulu mata atas yang tebal (ikut bergerak bersama kelopak atas) */
  const eyeB = (u, o) => eye(u, o)
    .replace(`<ellipse cx="${o.cx}" cy="${o.cy}" rx="${o.rx}" ry="${o.ry}" fill="${o.sclera}"/>`,
      `<ellipse cx="${o.cx}" cy="${o.cy}" rx="${o.rx - .9}" ry="${o.ry - .9}" fill="${o.sclera}"/>`)
    .replace(/(<g class="lidT">[\s\S]*?)(<\/g>)/, `$1<rect x="${o.cx - o.rx * 2}" y="${o.cy - o.ry - 5}" width="${o.rx * 4}" height="10" fill="${OL}"/>$2`);
  /* kelopak memakai gradien kulit yang sama (userSpaceOnUse) supaya warnanya menyatu dengan wajah */
  const E = (u) => ({ rx: 15, ry: 11, irisR: 9, iris: '#2A1A10', irisHi: '#5C3A22', sclera: '#FFFFFF', lid: `url(#${u}s)`, lidLine: OL });

  PI.register('bahlil', {
    group: 'tokoh', name: 'Bahlil', species: 'Tokoh · parodi', tag: 'Istirahat dulu, Bung. Energinya diisi ulang',
    accent: '#EBD6BD', glow: 'rgba(186,120,64,.28)', crop: '66 38 268 268',
    sfx: { voice: 'hmm', angry: 'ahem', happy: 'hmm' },
    happyAct: 'gesture', angryMouth: 0, happyMouth: .45, earAmp: .06, tiltAmp: .6,
    gesture: { side: 'L', wave: true },
    baseIdles: ['look', 'look', 'tilt'], idles: ['nod', 'gesture'],
    rig: { head: [200, 300], look: [200, 188], earL: [107, 198], earR: [293, 198], pawL: [128, 414], pawR: [272, 414],
           mouth: [200, 248], browL: [160, 152], browR: [240, 152], arm: [110, 420] },
    lines: {"greet":["Saya Bahlil. Istirahat dulu, Bung.","Tenang, saya yang jaga layarnya."],"idle":["Dulu saya sopir angkot. Saya tahu rasanya capek.","Energi kamu perlu diisi ulang.","Santai, Bung.","Ini namanya hilirisasi istirahat."],"escape":["Eh, Bung, mau ke mana?","Belum, belum.","Duduk dulu."],"angry":["Saya bilang duduk, Bung.","Jangan bikin saya rapat darurat."],"slam":["*tok* Duduk.","Ini keputusan final."],"close":["Saya turun langsung ke lapangan.","Saya makin dekat, Bung."],"pet":["Wah, terima kasih.","Hehe, enak juga.","Boleh, boleh."],"boop":["Eh, hidung saya.","Aduh."],"sleep":["Saya rehat sebentar juga.","Zzz…"],"wake":["Saya bangun. Kita lanjut jaga."],"back":["Bung, tadi ke mana?"],"hold":["Mau berhenti, Bung?","Tahan dulu."],"stay":["Nah, mantap."],"quit":["Ya sudah. Besok lebih disiplin."],"done":["Selesai. Energi sudah penuh lagi.","Sudah, Bung. Gas lagi."]},
    svg: (u) => `<defs>
<radialGradient id="${u}s" gradientUnits="userSpaceOnUse" cx="200" cy="160" r="150"><stop offset="0" stop-color="#D38D5A"/><stop offset=".46" stop-color="#D08955"/><stop offset=".7" stop-color="#C67D48"/><stop offset=".88" stop-color="#B56C3B"/><stop offset="1" stop-color="#A55F30"/></radialGradient>
<linearGradient id="${u}hd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D28B56"/><stop offset="1" stop-color="#B26B3A"/></linearGradient>
<linearGradient id="${u}cl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#966039"/><stop offset="1" stop-color="#76472A"/></linearGradient>
<radialGradient id="${u}ck"><stop offset="0" stop-color="#F0B585" stop-opacity=".35"/><stop offset="1" stop-color="#F0B585" stop-opacity="0"/></radialGradient>
<linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E231D"/><stop offset="1" stop-color="#150F0C"/></linearGradient>
<radialGradient id="${u}sh" cx="50%" cy="10%" r="95%"><stop offset="0" stop-color="#2A160A" stop-opacity="0"/><stop offset=".55" stop-color="#2A160A" stop-opacity="0"/><stop offset="1" stop-color="#2A160A" stop-opacity=".45"/></radialGradient>
<pattern id="${u}bt" patternUnits="userSpaceOnUse" width="80" height="80" patternTransform="rotate(-38) scale(1.35)">
<rect width="80" height="80" fill="#B4733F"/>
<rect y="43" width="80" height="32" fill="#4E3B2E"/>
<path d="M0 22 C 14 8, 26 36, 40 22 C 54 8, 66 36, 80 22" fill="none" stroke="#33281F" stroke-width="17"/>
<path d="M0 22 C 14 8, 26 36, 40 22 C 54 8, 66 36, 80 22" fill="none" stroke="#8A6040" stroke-width="2.4" stroke-dasharray="5 4"/>
<path d="M0 42 H80 M0 76 H80" stroke="#2B2620" stroke-width="3"/><path d="M0 47 H80 M0 71 H80" stroke="#8C5A34" stroke-width="1.6" stroke-dasharray="3 3"/>
<path d="M20 49 l8 10 l-8 10 l-8 -10 Z" fill="#2B2620" stroke="#C99560" stroke-width="2"/><circle cx="20" cy="59" r="2.4" fill="#D8A36A"/>
<path d="M52 68 c -7 -8 1 -17 9 -12 c 6 4 1 11 -4 8" fill="none" stroke="#D8A36A" stroke-width="3.2" stroke-linecap="round"/>
<path d="M4 34 l4 -5 l4 5 M44 34 l4 -5 l4 5" fill="none" stroke="#33281F" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M66 50 l5 7 l5 -7" fill="none" stroke="#C99560" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="64" r="2" fill="#C99560"/>
</pattern>
<clipPath id="${u}mc"><path d="M166 248 Q 200 255 234 248 Q 232 272 216 281 Q 200 287 184 281 Q 168 272 166 248 Z"/></clipPath>
</defs>
<g data-part="root">
<g data-part="body">
<path d="M163 224 L 163 300 L 200 340 L 237 300 L 237 224 Z" fill="#B06838" ${S}/>
<path d="M163 268 Q 200 300 237 268 L 237 298 Q 200 322 163 298 Z" fill="#7E4426" opacity=".4"/>
<path d="M12 412 C 12 352, 48 318, 108 302 C 132 296, 150 290, 164 282 L 200 336 L 236 282 C 250 290, 268 296, 292 302 C 352 318, 388 352, 388 412 Z" fill="url(#${u}bt)" ${S}/>
<path d="M12 412 C 12 352, 48 318, 108 302 C 132 296, 150 290, 164 282 L 200 336 L 236 282 C 250 290, 268 296, 292 302 C 352 318, 388 352, 388 412 Z" fill="url(#${u}sh)"/>
<path d="M72 318 Q 96 356 90 412 M328 318 Q 304 356 310 412" ${ln(3.2, OL)}/>
<path d="M200 336 V 412" ${ln(3, OL)}/><path d="M211 344 V 412" ${ln(2.2, '#2E1B0F')} opacity=".8"/>
<circle cx="205.5" cy="364" r="4.2" fill="#D9B98A" stroke="${OL}" stroke-width="2"/><circle cx="205.5" cy="394" r="4.2" fill="#D9B98A" stroke="${OL}" stroke-width="2"/>
${collar(u)}${M(collar(u))}
</g>
<g data-part="head">
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
<path d="${HEAD}" fill="url(#${u}s)" ${S}/>
<path d="${HAIRP}" fill="url(#${u}h)" ${S}/>
<path d="M134 80 Q 162 62 198 59 M226 62 Q 254 66 270 80" stroke="#4C3B32" stroke-width="5" fill="none" stroke-linecap="round" opacity=".75"/>
<path d="M150 82 q8 -5 16 -5 M184 77 q8 -4 16 -4 M220 78 q8 0 15 3" stroke="#3E2E26" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<g data-part="face">
<path d="M170 116 Q 185 110 200 114 Q 215 110 230 116 M174 126 Q 187 121 200 124 Q 213 121 226 126 M182 136 Q 200 131 218 136" ${ln(2.6)} opacity=".7"/>
<path d="M163 234 Q 157 241 159 248 M237 234 Q 243 241 241 248" ${ln(2.5)} opacity=".5"/>
<ellipse cx="140" cy="232" rx="20" ry="13" fill="url(#${u}ck)"/><ellipse cx="260" cy="232" rx="20" ry="13" fill="url(#${u}ck)"/>
<g data-part="blush" opacity="0"><ellipse cx="140" cy="234" rx="18" ry="10" fill="#FF7F6E" opacity=".45"/><ellipse cx="260" cy="234" rx="18" ry="10" fill="#FF7F6E" opacity=".45"/></g>
${crease}${M(crease)}
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
${eyeB(u, { side: 'L', cx: 160, cy: 188, ...E(u) })}${eyeB(u, { side: 'R', cx: 240, cy: 188, ...E(u) })}
<ellipse cx="197" cy="219" rx="6" ry="4" fill="#E8AA78" opacity=".5"/>
<path d="M194 198 Q 192 208 191 214" ${ln(2.4)} opacity=".6"/>
<path d="M186 214 Q 176 224 184 232 Q 190 237 196 233 Q 200 236 204 233 Q 210 237 216 232 Q 224 224 214 214" ${ln(2.8)}/>
<g data-part="mouthOpen" style="display:none">
<path d="M166 248 Q 200 255 234 248 Q 232 272 216 281 Q 200 287 184 281 Q 168 272 166 248 Z" fill="#5A1A16"/>
<g clip-path="url(#${u}mc)"><ellipse cx="200" cy="285" rx="21" ry="10" fill="#E0796C"/><path d="M166 246 Q 200 254 234 246 L 232 257 Q 200 264 168 257 Z" fill="#FFFFFF"/><path d="M185 252 v8 M200 254 v8 M215 252 v8" stroke="#D9D2C8" stroke-width="1.5"/></g>
<path d="M166 248 Q 200 255 234 248 Q 232 272 216 281 Q 200 287 184 281 Q 168 272 166 248 Z" fill="none" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
</g>
<g data-part="mouthClosed"><path d="M165 247 Q 200 270 235 247" stroke="${OL}" stroke-width="4.2" fill="none" stroke-linecap="round"/><path d="M161 243 Q 163 248 168 250 M239 243 Q 237 248 232 250" ${ln(2.4)} opacity=".8"/></g>
</g>
</g>
<g data-part="arm">
<g stroke="${OL}" stroke-linecap="round" stroke-linejoin="round">
<path d="${FORE}" fill="${OL}" stroke-width="9"/>
<g transform="${HAND_T}"><path d="${PALM}" fill="${OL}" stroke-width="9"/><path d="${FING}" stroke-width="21" fill="none"/><path d="${PINKY}" stroke-width="20" fill="none"/><path d="${THUMB}" stroke-width="22" fill="none"/></g>
</g>
<g stroke="${SK}" stroke-linecap="round" stroke-linejoin="round">
<path d="${FORE}" fill="${SK}" stroke="none"/>
<g transform="${HAND_T}"><path d="${PALM}" fill="${SK}" stroke="none"/><path d="${FING}" stroke-width="12" fill="none"/><path d="${PINKY}" stroke-width="11" fill="none"/><path d="${THUMB}" stroke-width="13" fill="none"/>
<path d="M-12 -16 Q 2 -10 12 -24 M-14 -32 Q 0 -30 14 -38 M6 -10 Q 12 -20 20 -24" stroke="${SKD}" stroke-width="2.4" fill="none" opacity=".7"/>
<path d="M11 -56 q4 1 8 -1 M-2 -60 q4 1 8 -1 M-15 -57 q4 1 8 0 M-25 -48 q4 1 6 -1" stroke="${SKD}" stroke-width="2.2" fill="none" opacity=".7"/>
</g>
</g>
<g transform="translate(110 344) rotate(-16)"><path d="M-31 0 Q 0 -10 33 0 L 42 150 L -42 150 Z" fill="url(#${u}bt)" ${S}/><path d="M-31 0 Q 0 -10 33 0 L 42 150 L -42 150 Z" fill="#2A160A" opacity=".2"/><path d="M-28 11 Q 0 2 30 11" stroke="#2E1B0F" stroke-width="3" fill="none" stroke-linecap="round"/></g>
</g>
<g data-part="pawL">${fist(u)}</g><g data-part="pawR">${M(fist(u))}</g>
</g>`
  });
})();
