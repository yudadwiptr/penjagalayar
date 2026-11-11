/* Gibran — karikatur parodi. Tidak berafiliasi dengan dan tidak mewakili tokoh aslinya. */
(() => {
  const { eye, M } = PI.util;
  const OL = '#3A2216';   // outline color shared by all tokoh
  const SK = '#F5C095';   // kulit di sekitar mata (kelopak)
  const SD = '#C97C55';   // garis dalam kulit
  const S = `stroke="${OL}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;

  const ear = (u) => `<path d="M122 196 C 105 184, 88 192, 91 216 C 94 238, 105 248, 123 240 Z" fill="url(#${u}s)" ${S}/>
<ellipse cx="106" cy="217" rx="6" ry="11" fill="#E39468" opacity=".55"/>
<path d="M113 204 C 102 207, 100 224, 109 232" stroke="${SD}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const brow = `<path d="M130 168 C 144 162, 163 159, 184 159 C 191 160, 191 171, 184 171 C 164 171, 148 172, 135 175 C 128 177, 125 171, 130 168 Z" fill="#22120D" stroke="#22120D" stroke-width="2" stroke-linejoin="round"/>`;
  const hand = (u) => `<path d="M96 410 C 94 390, 96 374, 100 366 C 101 357, 112 355, 114 363 C 116 355, 128 354, 129 362 C 131 354, 143 355, 144 363 C 147 356, 158 359, 157 368 C 166 372, 166 392, 162 410 Z" fill="url(#${u}s)" ${S}/>
<path d="M114 365 L114 377 M129 364 L129 378 M144 365 L144 376" stroke="${SD}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M163 385 C 153 380, 143 383, 139 393" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const COL = 'M174 258 C 160 272, 146 288, 134 300 L 156 354 L 184 322 L 200 350 L 176 296 Z';
  const collar = (u) => `<path d="${COL}" fill="url(#${u}c)"/><path d="${COL}" fill="url(#${u}bt)" opacity=".9"/><path d="${COL}" fill="none" ${S}/>
<path d="M146 300 L 160 340" stroke="#2A2C30" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  const SHIRT = 'M6 412 L10 378 C 14 344, 40 320, 86 306 C 116 297, 146 292, 168 290 L200 348 L232 290 C 254 292, 284 297, 314 306 C 360 320, 386 344, 390 378 L394 412 Z';
  const SLEEVE = 'M42 354 C 70 344, 104 336, 134 332 L160 462 L36 472 Z';
  const MOUTH = 'M178 254 Q200 258 222 254 Q220 282 200 286 Q180 282 178 254 Z';
  /* garis bulu mata atas yang tebal: pita gelap ikut bergerak bersama kelopak atas */
  const eyeX = (u, o) => eye(u, o)
    .replace(/rx="(\d+)" ry="(\d+)" fill="#FFFFFF"/, (m, a, b) => `rx="${a - 0.8}" ry="${b - 0.8}" fill="#FFFFFF"`)
    .replace(/(<g class="lidT">[\s\S]*?)(<\/g>)/, `$1<rect x="${o.cx - o.rx * 2}" y="${o.cy - o.ry - 1.5}" width="${o.rx * 4}" height="6" fill="${OL}"/>$2`);
  const E = { rx: 15, ry: 10, irisR: 9, iris: '#2A1A10', irisHi: '#5E3B22', sclera: '#FFFFFF', lid: SK, lidLine: OL };

  PI.register('gibran', {
    group: 'tokoh', name: 'Gibran', species: 'Tokoh · parodi', tag: 'Lapor Mas Wapres: kamu belum istirahat',
    accent: '#DEDBEC', glow: 'rgba(120,110,170,.28)', crop: '62 30 276 286',
    sfx: { voice: 'hmm', angry: 'ahem', happy: 'hmm' },
    happyAct: 'gesture', angryMouth: 0, happyMouth: .45, earAmp: .06, tiltAmp: .6,
    gesture: { side: 'L', wave: false },
    baseIdles: ['look', 'look', 'tilt'], idles: ['nod', 'gesture'],
    rig: { head: [200, 300], look: [200, 195], earL: [118, 216], earR: [282, 216], pawL: [128, 414], pawR: [272, 414],
           mouth: [200, 254], browL: [157, 166], browR: [243, 166], arm: [110, 420] },
    lines: {
      greet: ['Saya Gibran. Hari ini saya yang jaga.', 'Lapor Mas Wapres: kamu belum istirahat.'],
      idle: ['Saya pantau dari sini.', 'Tenang. Semua sudah dicatat.', 'Istirahat itu juga kerja nyata.', 'Hmm.'],
      escape: ['Mau ke mana, Mas?', 'Lho, kok kabur?', 'Duduk dulu.'],
      angry: ['Saya catat, ya.', 'Ini sudah dua kali.'],
      slam: ['*tok tok* Duduk.', 'Saya serius.'],
      close: ['Saya makin dekat, Mas.', 'Saya pantau dari dekat.'],
      pet: ['Lho, kok dielus.', 'Hehe. Terima kasih.', 'Oke, oke.'],
      boop: ['Hidung saya, Mas.', 'Jangan dipencet.'],
      sleep: ['Saya juga capek. Tidur sebentar.', 'Zzz…'],
      wake: ['Saya tidak tidur. Saya merenung.'],
      back: ['Tadi ke mana? Saya cari-cari.'],
      hold: ['Yakin mau berhenti?', 'Sebentar lagi, Mas.'],
      stay: ['Nah, gitu.'],
      quit: ['Ya sudah. Lain kali sampai habis.'],
      done: ['Selesai. Silakan lanjut kerja.', 'Sudah. Terima kasih sudah istirahat.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}s" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#F8C89F"/><stop offset=".7" stop-color="#F3BA8E"/><stop offset="1" stop-color="#E5A47A"/></radialGradient>
<linearGradient id="${u}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E2A277"/><stop offset="1" stop-color="#D48D62"/></linearGradient>
<linearGradient id="${u}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55585C"/><stop offset="1" stop-color="#3E4145"/></linearGradient>
<linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55585C"/><stop offset="1" stop-color="#3E4145"/></linearGradient>
<linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A2420"/><stop offset="1" stop-color="#1C100D"/></linearGradient>
<pattern id="${u}bt" width="110" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(-22)">
<path d="M4 72 C 16 54, 36 44, 56 46 C 70 47, 80 38, 84 22 C 98 38, 92 60, 72 68 C 52 76, 28 70, 4 72 Z" fill="#A8875F"/>
<path d="M16 66 C 34 58, 54 56, 70 56 C 80 54, 86 46, 86 36" stroke="#6F5A44" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M56 96 C 58 84, 74 78, 84 86 C 90 76, 106 78, 106 90 C 98 98, 74 100, 56 96 Z" fill="#8E7051"/>
<path d="M66 92 C 74 88, 84 90, 90 92 M88 90 C 92 86, 98 85, 102 88" stroke="#6F5A44" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M12 28 C 18 10, 40 4, 52 14 C 58 20, 54 30, 46 30 C 40 30, 38 24, 42 20 C 34 16, 24 20, 20 32 Z" fill="#A8875F"/>
<path d="M22 26 C 26 18, 36 14, 44 18" stroke="#6F5A44" stroke-width="2" fill="none" stroke-linecap="round"/>
</pattern>
<clipPath id="${u}mc"><path d="${MOUTH}"/></clipPath>
</defs>
<g data-part="root">
<g data-part="body">
<path d="M154 304 C 156 284, 162 266, 174 254 L 226 254 C 238 266, 244 284, 246 304 Z" fill="#34363A" ${S}/>
<path d="M170 236 L170 318 L200 352 L230 318 L230 236 Z" fill="url(#${u}n)" ${S}/>
<path d="M170 276 Q200 312 230 276 L230 300 Q200 334 170 300 Z" fill="#B9724A" opacity=".35"/>
<path d="${SHIRT}" fill="url(#${u}t)"/>
<path d="${SHIRT}" fill="url(#${u}bt)" opacity=".92"/>
<path d="${SHIRT}" fill="none" ${S}/>
<path d="M76 310 C 64 336, 58 370, 58 412 M324 310 C 336 336, 342 370, 342 412" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/>
<path d="M206 352 L206 412" stroke="${OL}" stroke-width="2.5" fill="none" opacity=".6"/>
<circle cx="200" cy="372" r="3.6" fill="#2C2F34"/><circle cx="200" cy="398" r="3.6" fill="#2C2F34"/>
${collar(u)}${M(collar(u))}
</g>
<g data-part="head">
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
<path d="M200 104 C 250 104, 284 128, 286 180 C 287 222, 279 254, 260 276 C 245 293, 224 301, 200 301 C 176 301, 155 293, 140 276 C 121 254, 113 222, 114 180 C 116 128, 150 104, 200 104 Z" fill="url(#${u}s)" ${S}/>
<path d="M123 200 C 116 200, 110 197, 108 190 C 104 176, 102 158, 102 140 C 100 112, 108 86, 128 68 C 142 54, 158 46, 178 44 C 206 42, 236 48, 260 56 C 280 63, 296 76, 299 96 C 302 112, 301 126, 299 140 C 297 160, 296 178, 292 192 C 290 197, 284 199, 278 199 C 278 178, 277 156, 272 141 C 268 128, 258 121, 242 119 C 220 117, 186 116, 160 117 C 144 118, 134 126, 129 140 C 124 156, 123 178, 123 200 Z" fill="url(#${u}h)" ${S}/>
<path d="M152 64 C 176 52, 206 50, 232 56" stroke="#5B3A2E" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/>
<path d="M150 116 C 147 106, 145 98, 145 90" stroke="#0E0705" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".6"/>
<path d="M158 112 C 180 92, 222 80, 272 86 M178 116 C 206 102, 246 100, 286 112 M150 76 C 174 64, 214 62, 262 68 M138 90 C 124 100, 114 118, 112 140 M288 128 C 292 144, 292 160, 290 176" stroke="#0E0705" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>
<g data-part="face">
<g data-part="blush" opacity="0"><ellipse cx="140" cy="240" rx="17" ry="9" fill="#FF8A78" opacity=".5"/><ellipse cx="260" cy="240" rx="17" ry="9" fill="#FF8A78" opacity=".5"/></g>
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
${eyeX(u, { side: 'L', cx: 157, cy: 195, ...E })}${eyeX(u, { side: 'R', cx: 243, cy: 195, ...E })}
<ellipse cx="197" cy="230" rx="9" ry="5" fill="#E8996C" opacity=".55"/>
<path d="M192 207 C 186 217, 182 225, 187 232 C 191 236, 199 236, 206 232" stroke="${SD}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g data-part="mouthOpen" style="display:none">
<path d="${MOUTH}" fill="#5A1F1C"/>
<g clip-path="url(#${u}mc)"><path d="M174 250 L226 250 L226 262 Q200 267 174 262 Z" fill="#FFFFFF"/><ellipse cx="200" cy="285" rx="13" ry="8" fill="#D9706C"/></g>
<path d="${MOUTH}" fill="none" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
</g>
<g data-part="mouthClosed">
<ellipse cx="201" cy="265" rx="7" ry="3" fill="#E0936B" opacity=".8"/>
<path d="M181 256 Q200 259 221 253" stroke="${OL}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
</g>
</g>
</g>
<g data-part="arm">
<path d="M44 296 C 48 334, 58 370, 64 404 L138 396 C 120 360, 100 326, 88 294 Z" fill="url(#${u}s)" ${S}/>
<path d="${SLEEVE}" fill="url(#${u}t)"/>
<path d="${SLEEVE}" fill="url(#${u}bt)" opacity=".92"/>
<path d="${SLEEVE}" fill="none" ${S}/>
<path d="M46 362 C 72 352, 104 345, 136 341" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>
<path d="M44 306 C 33 294, 30 272, 34 258 C 37 248, 44 242, 50 241 C 47 228, 47 216, 51 208 C 56 198, 71 198, 73 208 C 75 218, 74 230, 74 241 L88 241 C 100 241, 104 255, 95 258 C 104 260, 104 275, 95 276 C 104 278, 104 293, 94 294 C 101 298, 98 308, 87 308 Z" fill="url(#${u}s)" ${S}/>
<path d="M70 258 L95 258 M70 276 L95 276 M72 294 L93 294" stroke="${SD}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M54 216 C 55 207, 69 207, 70 216" stroke="${SD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M51 243 Q62 249 74 243" stroke="${SD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
</g>
<g data-part="pawL">${hand(u)}</g><g data-part="pawR">${M(hand(u))}</g>
</g>`
  });
})();
