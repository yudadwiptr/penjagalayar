/* Ganjar — karikatur parodi. Tidak berafiliasi dengan dan tidak mewakili tokoh aslinya. */
(() => {
  const { eye, M } = PI.util;
  const OL = '#3A2216';   // outline color shared by all tokoh
  const SK = '#EDB68C', SKD = '#DFA076', LN = '#B5704A';
  const S = `stroke="${OL}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;

  /* bentuk dasar */
  const FACE = 'M200 98 C 250 98, 290 126, 291 176 C 292 202, 289 224, 284 240 C 274 274, 242 304, 200 305 C 158 304, 126 274, 116 240 C 111 224, 108 202, 109 176 C 110 126, 150 98, 200 98 Z';
  const HAIR = 'M120 204 C 112 200, 106 192, 104 182 C 99 182, 95 179, 93 175 C 97 174, 99 170, 99 166 C 93 152, 91 134, 96 118 C 100 96, 114 78, 132 66 C 128 60, 126 54, 122 50 C 132 50, 140 54, 146 58 C 168 46, 196 40, 224 42 C 254 45, 280 56, 296 76 C 309 94, 311 120, 306 140 C 302 156, 304 166, 301 174 C 305 176, 308 180, 309 184 C 303 186, 298 188, 295 192 C 292 198, 288 202, 282 204 C 284 188, 282 172, 278 158 C 270 136, 246 114, 200 112 C 156 114, 132 136, 124 156 C 121 172, 122 188, 120 204 Z';
  const HL = 'M282 210 C 284 188, 282 172, 278 158 C 270 136, 246 114, 200 112 C 156 114, 132 136, 124 156 C 121 172, 122 188, 120 210';
  const SHIRT = 'M14 412 L14 396 C 18 350, 42 326, 88 312 C 116 304, 144 296, 168 286 L200 344 L232 286 C 256 296, 284 304, 312 312 C 358 326, 382 350, 386 396 L386 412 Z';
  const MO = 'M162 245 C 178 239, 222 239, 238 245 C 236 274, 220 292, 200 292 C 180 292, 164 274, 162 245 Z';
  const SLV = 'M40 446 C 46 400, 56 350, 66 304 C 86 292, 116 292, 134 300 C 140 350, 148 400, 156 446 Z';

  /* potongan */
  const ear = (u) => `<path d="M118 186 C 102 174, 86 182, 88 202 C 90 224, 102 238, 120 234 Z" fill="url(#${u}s)" ${S}/><path d="M110 196 Q 99 202 102 216 Q 106 224 113 219" stroke="${LN}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const brow = `<path d="M141 172 C 148 160, 166 155, 184 160 C 186 166, 184 170, 178 170 C 165 167, 154 169, 147 176 C 143 178, 139 176, 141 172 Z" fill="#B4B4AD" stroke="${OL}" stroke-width="3.2" stroke-linejoin="round"/><path d="M150 166 q10 -5 26 -4" stroke="#DCDCD6" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  const lines = `<path d="M137 190 l-9 -3 M138 197 l-9 3" stroke="${LN}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M178 222 C 164 229, 156 240, 160 252" stroke="${LN}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const fist = `<path d="M96 412 C 94 392, 96 374, 104 366 C 106 358, 116 356, 120 362 C 124 355, 134 355, 137 361 C 141 355, 151 356, 153 363 C 160 364, 164 374, 162 388 C 162 398, 162 406, 162 412 Z" fill="${SK}" ${S}/><path d="M120 362 q1 8 -1 14 M137 361 q1 8 0 14 M153 363 q0 7 -2 12" stroke="${LN}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M161 384 C 150 380, 139 384, 133 393" stroke="${OL}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  const E = { rx: 13.5, ry: 10.5, irisR: 9, iris: '#2A1A10', irisHi: '#6A4428', sclera: '#FFFFFF', lid: '#F2C29A', lidLine: OL };
  /* sklera sedikit diperkecil supaya tidak ada cincin terang saat kelopak menutup; garis tepi mata dipertebal */
  const eyeX = (u, o) => eye(u, o).replace(`rx="${o.rx}" ry="${o.ry}" fill="#FFFFFF"`, `rx="${o.rx - .8}" ry="${o.ry - .8}" fill="#FFFFFF"`)
    .replace('stroke-width="2" opacity=".5"', 'stroke-width="3.4" opacity=".5"');

  /* tangan melambai: lapisan garis tepi lalu lapisan isi, supaya siluetnya menyatu */
  const FING = [[66, 194, 54, 169], [74, 184, 64, 148], [86, 180, 85, 137], [95, 184, 100, 152]];
  const hand = (() => {
    const fl = (w, c) => FING.map(([a, b, c2, d]) => `<path d="M${a} ${b} L${c2} ${d}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`).join('');
    return `<g transform="translate(70 192) scale(.88) translate(-84 -200)">
<g>${fl(20, OL)}<path d="M96 208 L108 197" stroke="${OL}" stroke-width="21" stroke-linecap="round"/><ellipse cx="82" cy="198" rx="21" ry="23" fill="${OL}" stroke="${OL}" stroke-width="9"/></g>
<g>${fl(11, SK)}<path d="M96 208 L108 197" stroke="${SK}" stroke-width="12" stroke-linecap="round"/><ellipse cx="82" cy="198" rx="21" ry="23" fill="${SK}"/></g>
<path d="M72 208 Q 82 214 92 206 M95 200 q 6 4 8 10" stroke="${LN}" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>`;
  })();

  PI.register('ganjar', {
    group: 'tokoh', name: 'Ganjar', species: 'Tokoh · parodi', tag: 'Istirahatnya sat-set, ya, Lur',
    accent: '#F8D9C2', glow: 'rgba(225,95,45,.28)', crop: '64 30 272 290',
    sfx: { voice: 'hmm', angry: 'ahem', happy: 'hmm' },
    happyAct: 'gesture', angryMouth: 0, happyMouth: .45, earAmp: .06, tiltAmp: .6,
    gesture: { side: 'L', wave: true },
    baseIdles: ['look', 'look', 'tilt'], idles: ['nod', 'gesture'],
    rig: { head: [200, 300], look: [200, 192], earL: [112, 206], earR: [288, 206], pawL: [128, 414], pawR: [272, 414],
           mouth: [200, 243], browL: [161, 165], browR: [239, 165], arm: [110, 420] },
    lines: {"greet":["Saya Ganjar. Istirahatnya sat-set, ya.","Halo! Ayo istirahat dulu."],"idle":["Sat-set, tas-tes.","Rambut saya putih bukan karena kurang istirahat. Mungkin.","Santai, Lur.","Hmm."],"escape":["Eh, Lur, mau ke mana?","Duduk dulu.","Belum, belum."],"angry":["Saya tegur, ya, Lur.","Jangan bikin saya serius."],"slam":["*tok* Duduk, Lur.","Ini serius."],"close":["Saya mendekat, Lur.","Saya turun langsung."],"pet":["Wah, matur nuwun.","Hehe.","Boleh, boleh."],"boop":["Eh, hidung saya.","Waduh."],"sleep":["Saya rehat sebentar, Lur.","Zzz…"],"wake":["Saya bangun. Sat-set."],"back":["Tadi ke mana, Lur?"],"hold":["Mau berhenti, Lur?","Tahan dulu."],"stay":["Mantap."],"quit":["Ya sudah. Besok sat-set lagi."],"done":["Selesai! Sat-set, kerja lagi.","Sudah, Lur. Matur nuwun."]},
    svg: (u) => {
      const col = `<path d="M168 284 L199 342 L172 354 L136 310 C 146 298, 156 290, 168 284 Z" fill="url(#${u}r)" ${S}/>`;
      const side = '<path d="M84 96 C 108 120, 126 156, 128 214 L 80 214 Z" fill="#B9B9B1" opacity=".5"/>';
      return `<defs>
<radialGradient id="${u}s" cx="50%" cy="35%" r="72%"><stop offset="0" stop-color="#F7D0AA"/><stop offset=".65" stop-color="#EDB68C"/><stop offset="1" stop-color="#DB9C72"/></radialGradient>
<linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBFBF8"/><stop offset=".55" stop-color="#EDEDE8"/><stop offset="1" stop-color="#CACAC3"/></linearGradient>
<radialGradient id="${u}r" cx="50%" cy="20%" r="85%"><stop offset="0" stop-color="#D93A34"/><stop offset=".7" stop-color="#C02A28"/><stop offset="1" stop-color="#9E1C1E"/></radialGradient>
<pattern id="${u}bp" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
<g fill="#951719" opacity=".5"><ellipse cx="17" cy="8" rx="3.6" ry="6.5"/><ellipse cx="17" cy="26" rx="3.6" ry="6.5"/><ellipse cx="8" cy="17" rx="6.5" ry="3.6"/><ellipse cx="26" cy="17" rx="6.5" ry="3.6"/></g><circle cx="17" cy="17" r="1.8" fill="#E2604A" opacity=".6"/><circle cx="0" cy="0" r="2.2" fill="#951719" opacity=".5"/><circle cx="34" cy="34" r="2.2" fill="#951719" opacity=".5"/></pattern>
<pattern id="${u}bo" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
<rect width="36" height="36" fill="#C63E2C"/><path d="M6 28 C 4 16, 22 12, 24 22 C 25 30, 14 31, 14 24" stroke="#F3A55E" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M0 34 C 10 30, 24 32, 36 26" stroke="#E4823F" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M24 3 Q 35 5, 33 16 Q 24 13, 24 3 Z" fill="#EF9550"/><path d="M2 8 Q 10 2, 16 8" stroke="#F6B872" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="9" cy="14" r="2" fill="#F8C888"/><circle cx="31" cy="31" r="1.8" fill="#F8C888"/></pattern>
<clipPath id="${u}fc"><path d="${FACE}"/></clipPath>
<clipPath id="${u}hc"><path d="${HAIR}"/></clipPath>
<clipPath id="${u}shc"><path d="${SHIRT}"/></clipPath>
<clipPath id="${u}slc"><path d="${SLV}"/></clipPath>
<clipPath id="${u}mc"><path d="${MO}"/></clipPath>
</defs>
<g data-part="root">
<g data-part="body">
<path d="M170 226 L170 282 C 168 296, 154 306, 136 312 L200 348 L264 312 C 246 306, 232 296, 230 282 L230 226 Z" fill="${SKD}" ${S}/>
<path d="M170 290 Q200 316 230 290 L230 304 L200 346 L170 304 Z" fill="#C98258" opacity=".45"/>
<path d="${SHIRT}" fill="url(#${u}r)" ${S}/>
<g clip-path="url(#${u}shc)">
<rect x="0" y="280" width="400" height="140" fill="url(#${u}bp)"/>
<path d="M108 412 C 104 388, 122 372, 114 352 C 108 334, 122 318, 142 306 L166 292 L200 346 L200 412 Z" fill="url(#${u}bo)"/>
<path d="M232 412 C 234 392, 252 378, 274 384 C 296 390, 314 374, 336 382 C 352 388, 360 400, 362 412 Z" fill="url(#${u}bo)"/>
<path d="M14 340 C 40 360, 52 390, 56 412 M386 340 C 360 360, 348 390, 344 412" stroke="#7E1416" stroke-width="16" fill="none" opacity=".25"/>
</g>
<path d="M80 316 C 66 344, 58 376, 56 412 M320 316 C 334 344, 342 376, 344 412" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M204 346 V412" stroke="${OL}" stroke-width="2.6"/>
<circle cx="198" cy="368" r="3.8" fill="#8E1A1C" stroke="${OL}" stroke-width="1.8"/><circle cx="198" cy="398" r="3.8" fill="#8E1A1C" stroke="${OL}" stroke-width="1.8"/>
${col}${M(col)}
</g>
<g data-part="head">
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
<path d="${FACE}" fill="url(#${u}s)" ${S}/>
<g clip-path="url(#${u}fc)"><path d="${HAIR}" transform="translate(0 7)" fill="#C77F57" opacity=".35"/></g>
<path d="${HAIR}" fill="url(#${u}h)"/>
<g clip-path="url(#${u}hc)">${side}${M(side)}<path d="${HL}" stroke="#BDBDB5" stroke-width="18" fill="none" opacity=".6"/><path d="M150 66 C 176 52, 214 50, 252 60" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/></g>
<g clip-path="url(#${u}hc)"><path d="M140 132 C 130 112, 132 92, 146 76 M160 120 C 154 100, 160 80, 178 64 M184 116 C 182 96, 192 76, 214 62 M210 124 C 214 104, 228 86, 250 74 M236 122 C 246 108, 262 98, 282 96 M262 134 C 274 126, 288 124, 300 126 M106 176 C 100 156, 100 136, 108 118 M118 150 C 114 134, 116 116, 124 102 M292 170 C 298 156, 300 142, 298 128 M200 70 C 212 60, 228 55, 246 56" stroke="#A3A39B" stroke-width="2.3" fill="none" stroke-linecap="round"/><path d="M150 112 C 146 96, 152 82, 166 70 M198 104 C 202 88, 214 76, 232 68 M226 112 C 236 98, 252 88, 270 84" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/></g>
<path d="${HAIR}" fill="none" ${S}/>
<g data-part="face">
<path d="M170 140 Q200 132 230 140 M176 151 Q200 145 224 151" stroke="${LN}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".85"/>
${lines}${M(lines)}
<g data-part="blush" opacity="0"><ellipse cx="141" cy="232" rx="15" ry="9" fill="#FF8A80" opacity=".45"/><ellipse cx="259" cy="232" rx="16" ry="9" fill="#FF8A80" opacity=".45"/></g>
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
<path d="M147 178 Q160 172 174 179 M226 179 Q240 172 253 178" stroke="${LN}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".7"/>
${eyeX(u, { side: 'L', cx: 160, cy: 192, ...E })}${eyeX(u, { side: 'R', cx: 240, cy: 192, ...E })}
<path d="M195 198 Q193 210 189 216" stroke="${LN}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M188 216 C 179 220, 182 233, 192 231 Q 200 236 208 231 C 218 233, 221 220, 212 216" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g data-part="mouthOpen" style="display:none"><path d="${MO}" fill="#5C1B1B"/><g clip-path="url(#${u}mc)"><ellipse cx="200" cy="292" rx="24" ry="13" fill="#E0706A"/><path d="M156 230 H244 V253 C 224 249, 176 249, 156 253 Z" fill="#FFFFFF"/></g><path d="${MO}" fill="none" stroke="${OL}" stroke-width="3.6" stroke-linejoin="round"/></g>
<g data-part="mouthClosed"><path d="M168 248 Q200 270 232 248 Q200 258 168 248 Z" fill="#8A3A30" stroke="${OL}" stroke-width="3.2" stroke-linejoin="round"/><path d="M162 241 Q166 247 163 253 M238 241 Q234 247 237 253" stroke="${LN}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
</g></g>
<g data-part="arm">
<path d="M52 212 C 56 246, 66 278, 74 312 L120 308 C 110 276, 96 246, 90 210 Z" fill="${SK}" ${S}/>
<path d="M88 250 C 94 270, 100 286, 106 300" stroke="${LN}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".7"/>
<path d="${SLV}" fill="url(#${u}r)" ${S}/>
<g clip-path="url(#${u}slc)"><rect x="30" y="280" width="140" height="170" fill="url(#${u}bp)"/><path d="M92 446 C 88 410, 106 392, 100 368 C 96 350, 110 336, 136 330 L160 446 Z" fill="url(#${u}bo)"/></g>
<path d="${SLV}" fill="none" ${S}/>
<path d="M70 318 C 90 306, 112 304, 131 312" stroke="${OL}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
${hand}
</g>
<g data-part="pawL">${fist}</g><g data-part="pawR">${M(fist)}</g>
</g>`;
    }
  });
})();
