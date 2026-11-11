/* Anies — karikatur parodi. Tidak berafiliasi dengan dan tidak mewakili tokoh aslinya. */
(() => {
  const { eye, M } = PI.util;
  const OL = '#3A2216';   // warna garis tepi bersama semua tokoh
  const SK = { hand: '#E0A576', neck: '#C9875A', line: '#A3613A' };
  const BL = { base: '#3A69A3', collar: '#4171AD', dark: '#1F3F6E', beige: '#E4D3AE', soft: '#5C88C0' };
  const GL = '#2A1A12';   // bingkai kacamata
  const S = `stroke="${OL}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;

  const ear = (u) => `<path d="M114 172 C 98 160, 84 170, 86 192 C 88 212, 100 226, 118 222" fill="url(#${u}s)" ${S}/>
<path d="M106 182 Q 96 194, 103 210 M99 198 q7 -3 9 4" stroke="${SK.line}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const brow = '<path d="M139 148 Q 161 137, 186 144" stroke="#1C1512" stroke-width="9.5" fill="none" stroke-linecap="round"/>';
  const LENS = 'M137 162 L185 162 Q196 162 195 174 L193 193 Q191 211 175 211 L147 211 Q131 211 129 193 L127 174 Q126 162 137 162 Z';
  const lens = `<path d="${LENS}" fill="#FFFFFF" fill-opacity=".07" stroke="${GL}" stroke-width="7" stroke-linejoin="round"/>
<path d="M176 204 L189 175" stroke="#FFFFFF" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/>
<path d="M128 173 L113 170" stroke="${GL}" stroke-width="6" stroke-linecap="round"/>`;
  const smileLine = `<path d="M166 229 Q 156 241, 160 255" stroke="${SK.line}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".6"/>`;
  const collar = `<path d="M174 282 L200 318 L184 345 Q 166 330, 150 302 Q 160 290, 174 282 Z" fill="${BL.collar}" ${S}/>
<path d="M160 300 Q 170 316, 182 330" stroke="#6D95C8" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  const armSeam = `<path d="M86 309 C 104 332, 136 366, 158 404" stroke="${BL.dark}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>
<path d="M58 346 q14 4 22 14 M68 378 q12 2 18 10" stroke="${BL.dark}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".6"/>`;
  /* kepalan istirahat: buku jari bergelombang, ibu jari melingkar dari sisi dalam */
  const fist = `<path d="M97 404 C 94 384, 96 369, 105 362 C 109 355, 118 353, 123 357 C 128 352, 137 351, 141 356 C 147 353, 155 356, 157 363 C 162 371, 163 388, 161 404 Z" fill="${SK.hand}" ${S}/>
<path d="M123 359 Q 121 366, 122 373 M141 358 Q 141 366, 140 372 M106 366 Q 108 372, 106 378" stroke="${SK.line}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M158 372 C 148 371, 136 374, 128 380 C 121 385, 123 393, 132 392 C 142 391, 151 387, 158 386" fill="${SK.hand}" stroke="${OL}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M130 383 q4 -3 8 0" stroke="${SK.line}" stroke-width="2" fill="none" stroke-linecap="round"/>`;

  /* tangan terbuka "mari" (sisi kiri layar), digambar dua lapis: garis tepi lalu isi */
  const FING = 'M52 288 L34 276 M48 296 L26 288 M48 305 L26 302 M50 313 L33 316';
  const THUMB = 'M74 290 L82 268', WRIST = 'M80 346 L68 312';
  const hand = `<g stroke="${OL}" stroke-linecap="round" fill="${OL}">
<path d="${FING}" stroke-width="22" fill="none"/><path d="${THUMB}" stroke-width="23" fill="none"/><path d="${WRIST}" stroke-width="46" fill="none"/>
<ellipse cx="62" cy="300" rx="21" ry="17" stroke-width="9"/></g>
<g stroke="${SK.hand}" stroke-linecap="round" fill="none">
<path d="${FING}" stroke-width="13"/><path d="${THUMB}" stroke-width="14"/><path d="${WRIST}" stroke-width="37"/></g>
<ellipse cx="62" cy="300" rx="21" ry="17" fill="${SK.hand}"/>
<path d="M50 292 L36 285 M46 300 L32 296.5 M47 309 L35 309" stroke="${OL}" stroke-width="2.2" stroke-linecap="round" fill="none" opacity=".85"/>
<path d="M58 291 Q 68 298, 72 311 M50 304 Q 60 306, 66 313 M72 294 Q 76 288, 78 282" stroke="${SK.line}" stroke-width="2.3" stroke-linecap="round" fill="none"/>`;
  const SLEEVE = 'M44 342 C 62 338, 82 334, 100 330 C 110 370, 122 406, 136 446 L 58 456 C 54 416, 48 378, 44 342 Z';
  const arm = (u) => `${hand}
<path d="${SLEEVE}" fill="url(#${u}bs)" ${S}/><path d="${SLEEVE}" fill="url(#${u}ash)"/>
<path d="M76 380 q10 4 16 12 M80 412 q10 2 16 10" stroke="${BL.dark}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".6"/>
<path d="M44 342 C 62 338, 82 334, 100 330 L 103 344 C 85 348, 66 352, 47 356 Z" fill="${BL.collar}" ${S}/>`;

  /* rambut: mahkota agak rata, belahan di kiri layar, poni tersapu ke kanan, pelipis sedikit naik */
  const HAIR = 'M106 186 C 97 152, 95 114, 110 90 C 122 70, 142 60, 164 57 C 190 53, 224 52, 250 56 C 274 60, 292 72, 299 96 C 305 122, 303 156, 294 186 C 290 176, 287 162, 285 148 C 284 136, 280 126, 274 120 Q 268 112, 260 110 C 236 98, 204 94, 180 99 C 166 102, 156 110, 150 118 Q 140 112, 130 116 C 120 126, 116 146, 114 162 C 112 172, 110 180, 106 186 Z';
  const FACE = 'M200 72 C 254 72, 292 112, 292 170 C 292 232, 256 288, 200 298 C 144 288, 108 232, 108 170 C 108 112, 146 72, 200 72 Z';
  const TORSO = 'M14 404 C 12 350, 46 318, 104 304 C 132 298, 156 294, 172 290 L200 318 L228 290 C 244 294, 268 298, 296 304 C 354 318, 388 350, 386 404 Z';
  const FRONT = 'M86 309 C 104 332, 136 366, 158 410 L201 410 L201 318 L172 282 L80 294 Z';
  const MOUTH = 'M162 243 Q 200 253, 238 243 Q 232 285, 200 288 Q 168 285, 162 243 Z';
  /* sklera diperkecil 1px agar tepinya tidak berpendar saat kelopak tertutup (rim memudar) */
  const eyeX = (u, o) => eye(u, o).replace(`rx="${o.rx}" ry="${o.ry}" fill="${o.sclera}"`, `rx="${o.rx - 1}" ry="${o.ry - 1}" fill="${o.sclera}"`);
  const E = { rx: 15, ry: 12, irisR: 9, iris: '#2A1A10', irisHi: '#6A4428', sclera: '#FFFFFF', lid: '#E3AA7C', lidLine: OL };

  PI.register('anies', {
    group: 'tokoh', name: 'Anies', species: 'Tokoh · parodi', tag: 'Mari kita istirahat dengan tenang',
    accent: '#CFDDF0', glow: 'rgba(80,130,200,.28)', crop: '72 40 256 270',
    sfx: { voice: 'hmm', angry: 'ahem', happy: 'hmm' },
    happyAct: 'gesture', angryMouth: 0, happyMouth: .45, earAmp: .06, tiltAmp: .6,
    gesture: { side: 'both', wave: false },
    baseIdles: ['look', 'look', 'tilt'], idles: ['nod', 'gesture'],
    rig: { head: [200, 300], look: [200, 187], earL: [108, 196], earR: [292, 196], pawL: [128, 414], pawR: [272, 414],
           mouth: [200, 243], browL: [162, 142], browR: [238, 142], arm: [200, 420] },
    lines: {"greet":["Saya Anies. Mari kita istirahat dengan tenang.","Selamat beristirahat. Saya temani."],"idle":["Istirahat itu hak semua pekerja.","Mari kita duduk sejenak.","Pelan-pelan saja. Kita diskusikan nanti.","Hmm."],"escape":["Sebentar, mau ke mana?","Mari kita duduk kembali.","Kita belum selesai."],"angry":["Mari kita bicarakan baik-baik. Duduk.","Saya ingatkan sekali lagi."],"slam":["*tok* Mari duduk.","Ini demi kebaikan bersama."],"close":["Saya mendekat untuk berdialog.","Desak Anies: kenapa belum istirahat?"],"pet":["Terima kasih, terima kasih.","Wah, hangat sekali.","Hehe."],"boop":["Kacamata saya!","Eh, hati-hati."],"sleep":["Saya rehat sejenak.","Zzz…"],"wake":["Saya tidak tidur. Saya merenung."],"back":["Tadi ke mana? Mari kembali."],"hold":["Mau berhenti sekarang?","Mari kita tuntaskan."],"stay":["Baik. Terima kasih."],"quit":["Baik. Lain kali kita tuntaskan."],"done":["Selesai. Mari kita lanjutkan kerja.","Terima kasih sudah beristirahat."]},
    svg: (u) => `<defs>
<radialGradient id="${u}s" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#EDB88A"/><stop offset=".22" stop-color="#E5AC7E"/><stop offset=".46" stop-color="#E2A87A"/><stop offset=".62" stop-color="#DA9F71"/><stop offset="1" stop-color="#C47F4E"/></radialGradient>
<linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#30251F"/><stop offset="1" stop-color="#141010"/></linearGradient>
<pattern id="${u}bp" width="36" height="36" patternUnits="userSpaceOnUse">
<rect width="36" height="36" fill="${BL.base}"/>
<g fill="none"><path d="M-8 8 L8 -8 M-6 42 L42 -6 M30 42 L42 30" stroke="${BL.dark}" stroke-width="10.5"/>
<path d="M-8 8 L8 -8 M-6 42 L42 -6 M30 42 L42 30" stroke="${BL.beige}" stroke-width="6.5"/>
<path d="M2 29 L7 34 M11 20 L16 25 M20 11 L25 16 M29 2 L34 7" stroke="${BL.dark}" stroke-width="1.8" stroke-linecap="round"/></g>
<g fill="${BL.beige}" stroke="${BL.dark}" stroke-width="1.1"><path d="M9 4.5 L13.5 9 L9 13.5 L4.5 9 Z"/><path d="M27 22.5 L31.5 27 L27 31.5 L22.5 27 Z"/></g>
<circle cx="9" cy="9" r="1.3" fill="#FFFFFF"/><circle cx="27" cy="27" r="1.3" fill="#FFFFFF"/>
</pattern>
<pattern id="${u}bf" width="48" height="48" patternUnits="userSpaceOnUse">
<rect width="48" height="48" fill="${BL.base}"/><g transform="scale(.75)">
<g fill="none" stroke="#A9C7EA" stroke-width="2.2"><circle cx="0" cy="0" r="9"/><circle cx="64" cy="0" r="9"/><circle cx="0" cy="64" r="9"/><circle cx="64" cy="64" r="9"/></g>
<g fill="#F4EEE0"><circle cx="0" cy="0" r="3.2"/><circle cx="64" cy="0" r="3.2"/><circle cx="0" cy="64" r="3.2"/><circle cx="64" cy="64" r="3.2"/></g>
<g fill="${BL.beige}" stroke="${BL.dark}" stroke-width="1.4"><ellipse cx="32" cy="21" rx="5.6" ry="9.5"/><ellipse cx="32" cy="43" rx="5.6" ry="9.5"/><ellipse cx="21" cy="32" rx="9.5" ry="5.6"/><ellipse cx="43" cy="32" rx="9.5" ry="5.6"/>
<circle cx="0" cy="32" r="3.2"/><circle cx="64" cy="32" r="3.2"/><circle cx="32" cy="0" r="3.2"/><circle cx="32" cy="64" r="3.2"/></g>
<path d="M32 16 v9 M32 39 v9 M16 32 h9 M39 32 h9" stroke="#B39566" stroke-width="1.4" stroke-linecap="round"/>
<circle cx="32" cy="32" r="3.2" fill="${BL.dark}"/>
<path d="M10 20 q2 -8 10 -10 M44 10 q8 2 10 10 M54 44 q-2 8 -10 10 M20 54 q-8 -2 -10 -10" stroke="#9CC0E6" stroke-width="2" fill="none" stroke-linecap="round"/>
</g>
</pattern>
<pattern id="${u}bs" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
<rect width="40" height="40" fill="${BL.base}"/>
<path d="M0 12 C 6 4, 14 4, 20 12 S 34 20, 40 12" stroke="${BL.soft}" stroke-width="2.2" fill="none"/>
<path d="M8 30 a5 5 0 1 1 7 4" stroke="${BL.soft}" stroke-width="2" fill="none" stroke-linecap="round"/>
<circle cx="30" cy="30" r="1.8" fill="#D9C39A"/>
</pattern>
<radialGradient id="${u}tsh" cx="50%" cy="10%" r="85%"><stop offset=".45" stop-color="#0E2240" stop-opacity="0"/><stop offset="1" stop-color="#0E2240" stop-opacity=".5"/></radialGradient>
<linearGradient id="${u}ash" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0E2240" stop-opacity=".35"/><stop offset=".5" stop-color="#0E2240" stop-opacity="0"/><stop offset="1" stop-color="#0E2240" stop-opacity=".3"/></linearGradient>
<clipPath id="${u}tc"><path d="${TORSO}"/></clipPath>
<clipPath id="${u}mc"><path d="${MOUTH}"/></clipPath>
</defs>
<g data-part="root">
<g data-part="body">
<path d="M162 300 Q 164 276, 176 268 L224 268 Q 236 276, 238 300 Z" fill="${BL.collar}" ${S}/>
<path d="M172 226 L172 312 Q 200 324, 228 312 L228 226 Z" fill="${SK.neck}" ${S}/>
<path d="${TORSO}" fill="url(#${u}bs)"/>
<g clip-path="url(#${u}tc)"><path d="${FRONT}" fill="url(#${u}bp)"/>${M(`<path d="${FRONT}" fill="url(#${u}bf)"/>`)}</g>
<path d="${TORSO}" fill="url(#${u}tsh)"/>
<path d="${TORSO}" fill="none" ${S}/>
${armSeam}${M(armSeam)}
<path d="M193 318 L207 318 L207 406 L193 406 Z" fill="${BL.base}"/>
<path d="M193 320 V404 M207 320 V404" stroke="${BL.dark}" stroke-width="2.4"/>
<circle cx="200" cy="352" r="3.6" fill="#EDE5D0" stroke="${OL}" stroke-width="1.6"/><circle cx="200" cy="386" r="3.6" fill="#EDE5D0" stroke="${OL}" stroke-width="1.6"/>
${collar}${M(collar)}
</g>
<g data-part="head">
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
<path d="${FACE}" fill="url(#${u}s)" ${S}/>
<path d="${HAIR}" fill="url(#${u}h)" ${S}/>
<path d="M176 66 Q 214 58, 250 64" stroke="#5B4C45" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/>
<path d="M164 104 C 192 88, 236 86, 264 104" stroke="#5B4C45" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5"/>
<path d="M168 90 Q 208 74, 262 84 M162 76 Q 204 64, 256 70 M266 94 Q 282 106, 288 126 M141 110 Q 132 96, 138 80" stroke="#3E322C" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M150 118 Q 152 92, 160 66" stroke="#6B5548" stroke-width="4" fill="none" stroke-linecap="round"/>
<g data-part="face">
${smileLine}${M(smileLine)}
<g data-part="blush" opacity="0"><ellipse cx="150" cy="238" rx="14" ry="7.5" fill="#F07E7E" opacity=".45"/><ellipse cx="250" cy="238" rx="14" ry="7.5" fill="#F07E7E" opacity=".45"/></g>
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
${eyeX(u, { side: 'L', cx: 162, cy: 187, ...E })}${eyeX(u, { side: 'R', cx: 238, cy: 187, ...E })}
<path d="M197 197 Q 195 213, 189 221" stroke="${SK.line}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M186 224 Q 192 233, 200 230 Q 208 233, 214 224" stroke="${SK.line}" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
${lens}${M(lens)}
<path d="M194 177 Q 200 171, 206 177" stroke="${GL}" stroke-width="6" fill="none" stroke-linecap="round"/>
<g data-part="mouthOpen" style="display:none">
<path d="${MOUTH}" fill="#6A2320"/>
<g clip-path="url(#${u}mc)"><ellipse cx="200" cy="287" rx="22" ry="12" fill="#E27A72"/>
<path d="M160 241 Q 200 252, 240 241 L238 257 Q 200 266, 162 257 Z" fill="#FFFFFF"/>
<path d="M180 256 v5 M190 258 v5 M200 259 v5 M210 258 v5 M220 256 v5" stroke="#D9D2C6" stroke-width="1.4"/></g>
<path d="${MOUTH}" fill="none" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
</g>
<g data-part="mouthClosed">
<path d="M166 244 Q 200 269, 234 244" stroke="${OL}" stroke-width="3.6" fill="none" stroke-linecap="round"/>
<path d="M161 240 Q 164 245, 168 247 M239 240 Q 236 245, 232 247" stroke="${OL}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
</g>
</g></g>
<g data-part="arm">${arm(u)}${M(arm(u))}</g>
<g data-part="pawL">${fist}</g><g data-part="pawR">${M(fist)}</g>
</g>`
  });
})();
