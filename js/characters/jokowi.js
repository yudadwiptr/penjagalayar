/* Jokowi — karikatur parodi. Tidak berafiliasi dengan dan tidak mewakili tokoh aslinya. */
(() => {
  const { eye, M } = PI.util;
  const OL = '#3A2216';   // outline color shared by all tokoh
  const S = `stroke="${OL}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;
  const S3 = `stroke="${OL}" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round"`;
  const SK = '#A35F35';   // garis kulit bagian dalam
  const GR = '#B9BEC6';   // lipatan kemeja
  const ln = (c, w) => `stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"`;

  const ear = (u) => `<path d="M124 178 C 110 160, 82 164, 82 193 C 82 218, 100 237, 124 230 Z" fill="url(#${u}s)" ${S}/>
<path d="M110 186 C 100 181, 94 191, 95 203 C 96 213, 102 220, 111 219" ${ln(SK, 2.8)}/><path d="M102 197 q7 1 7 9" ${ln(SK, 2.5)}/>`;
  const brow = `<path d="M141 163 Q160 153 181 166" stroke="#22160F" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;
  const crease = `<path d="M177 224 Q163 238 166 258" ${ln(SK, 2.8)}/>`;
  const bag = `<path d="M151 209 q12 6 25 0" ${ln(SK, 2.2)} opacity=".55"/><path d="M150 177 Q163 169 177 175" ${ln(SK, 2.6)} opacity=".8"/><path d="M128 218 q5 9 15 12" ${ln(SK, 2.2)} opacity=".45"/>`;
  const collar = (u) => `<path d="M173 276 L198 340 L167 351 C 157 335, 150 318, 145 302 C 155 292, 165 284, 173 276 Z" fill="url(#${u}sh)" ${S}/>`;
  const seam = `<path d="M70 334 C 78 358, 82 384, 80 412" ${ln(GR, 2.6)}/><path d="M106 350 q14 -6 26 4" ${ln(GR, 2.4)}/>`;
  const fist = (u) => `<path d="M98 412 C 94 386, 96 368, 106 362 Q 112 354 120 358 Q 127 351 135 357 Q 143 352 150 359 Q 158 361 160 372 C 163 388, 162 402, 160 412 Z" fill="url(#${u}s)" ${S}/>
<path d="M120 359 q-1 8 1 14 M135 357 q-1 8 1 15 M150 360 q0 7 1 12" ${ln(SK, 2.6)}/><path d="M161 380 C 150 378, 136 382, 132 390 C 130 396, 138 398, 148 395 C 154 393, 159 390, 161 388" fill="url(#${u}s)" ${ln(OL, 3)}/>`;
  const E = { rx: 14, ry: 10.5, irisR: 9, iris: '#2A1A10', irisHi: '#6A4428', sclera: '#FFFFFF', lid: '#E8AC7A', lidLine: OL };

  PI.register('jokowi', {
    group: 'tokoh', name: 'Jokowi', species: 'Tokoh · parodi', tag: 'Kerja, kerja, kerja. Tapi istirahat dulu',
    accent: '#D2ECEC', glow: 'rgba(70,170,170,.28)', crop: '64 44 272 274',
    sfx: { voice: 'hmm', angry: 'ahem', happy: 'hmm' },
    happyAct: 'gesture', angryMouth: 0, happyMouth: .45, earAmp: .06, tiltAmp: .6,
    gesture: { side: 'L', wave: false },
    baseIdles: ['look', 'look', 'tilt'], idles: ['nod', 'gesture'],
    rig: { head: [200, 300], look: [200, 190], earL: [116, 200], earR: [284, 200], pawL: [128, 414], pawR: [272, 414],
           mouth: [200, 255], browL: [161, 159], browR: [239, 159], arm: [148, 420] },
    lines: {"greet":["Saya Jokowi. Istirahat dulu, ya.","Kerja, kerja, kerja. Tapi istirahat dulu."],"idle":["Sebutkan lima nama ikan. Nanti saya kasih sepeda.","Saya blusukan ke layar kamu.","Ojo kesusu.","Hmm."],"escape":["Lho, mau ke mana?","Ojo kesusu.","Duduk dulu."],"angry":["Saya tegur, ya.","Ini sudah dua kali, lho."],"slam":["*tok* Duduk.","Saya serius."],"close":["Saya blusukan lebih dekat.","Saya cek langsung ke lapangan."],"pet":["Hehe.","Terima kasih, terima kasih.","Wah."],"boop":["Lho, hidung saya.","Eh."],"sleep":["Saya istirahat juga. Sebentar.","Zzz…"],"wake":["Saya tidak tidur. Saya mikir."],"back":["Tadi ke mana? Saya cari-cari."],"hold":["Mau berhenti? Ojo kesusu.","Sebentar lagi."],"stay":["Nah, begitu."],"quit":["Ya sudah. Nanti istirahat lagi."],"done":["Selesai. Silakan kerja lagi.","Sudah. Ini sepedanya… eh, belum ada."]},
    svg: (u) => `<defs>
<radialGradient id="${u}s" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#F3BE90"/><stop offset=".65" stop-color="#E2A16D"/><stop offset="1" stop-color="#C9824F"/></radialGradient>
<linearGradient id="${u}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B26B3E"/><stop offset="1" stop-color="#D08D58"/></linearGradient>
<radialGradient id="${u}sh" cx="50%" cy="25%" r="80%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#F4F5F7"/><stop offset="1" stop-color="#D9DDE3"/></radialGradient>
<linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C221D"/><stop offset="1" stop-color="#14100E"/></linearGradient>
<clipPath id="${u}mc"><path d="M168 248 Q200 262 232 248 Q229 290 200 293 Q171 290 168 248 Z"/></clipPath>
</defs>
<g data-part="root">
<g data-part="body">
<path d="M160 294 C 162 276, 168 266, 176 262 L 224 262 C 232 266, 238 276, 240 294 Z" fill="#E6E9ED" ${S}/>
<path d="M175 228 L175 296 L200 344 L225 296 L225 228 Z" fill="url(#${u}n)"/>
<path d="M175 228 V 296 M225 228 V 296" ${S} fill="none"/>
<path d="M14 412 C 12 358, 46 324, 104 310 C 130 303, 150 298, 162 288 L 200 344 L 238 288 C 250 298, 270 303, 296 310 C 354 324, 388 358, 386 412 Z" fill="url(#${u}sh)" ${S}/>
<path d="M207 346 V 412" ${ln(GR, 2.6)}/>
<circle cx="200" cy="366" r="3.8" fill="#F7F8FA" stroke="#8E949E" stroke-width="2"/><circle cx="200" cy="396" r="3.8" fill="#F7F8FA" stroke="#8E949E" stroke-width="2"/>
${seam}${M(seam)}
${collar(u)}${M(collar(u))}
</g>
<g data-part="head">
<g data-part="earL">${ear(u)}</g><g data-part="earR">${M(ear(u))}</g>
<path d="M200 94 C 252 94, 284 126, 286 176 C 287 206, 282 232, 268 254 C 251 281, 228 301, 200 304 C 172 301, 149 281, 132 254 C 118 232, 113 206, 114 176 C 116 126, 148 94, 200 94 Z" fill="url(#${u}s)" ${S}/>
<path d="M119 190 C 114 166, 113 130, 120 104 C 125 86, 136 72, 150 66 Q 154 71 158 66 C 172 59, 192 57, 212 58 C 256 57, 286 76, 293 108 C 296 134, 292 166, 286 190 L 283 190 C 283 170, 280 152, 272 138 C 262 126, 236 110, 198 105 C 182 103, 166 102, 150 106 C 136 116, 128 140, 126 166 L 125 188 Z" fill="url(#${u}h)" ${S}/>
<path d="M150 106 C 148 92, 150 80, 154 70" stroke="#7A685C" stroke-width="3.2" fill="none" stroke-linecap="round"/>
<path d="M178 78 C 214 64, 258 70, 282 102" stroke="#4E3F36" stroke-width="5.5" fill="none" stroke-linecap="round" opacity=".75"/>
<path d="M160 94 C 198 78, 246 84, 278 114 M166 84 C 196 72, 232 70, 262 82 M134 112 C 128 128, 126 146, 126 160 M144 84 C 134 98, 127 112, 123 130" stroke="#3E312A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<g data-part="face">
<path d="M178 133 Q200 127 222 133 M183 144 Q200 139 217 144" ${ln(SK, 2.4)} opacity=".6"/>
${crease}${M(crease)}${bag}${M(bag)}
<g data-part="blush" opacity="0"><ellipse cx="146" cy="232" rx="16" ry="8" fill="#FF8C7A" opacity=".45"/><ellipse cx="254" cy="232" rx="16" ry="8" fill="#FF8C7A" opacity=".45"/></g>
<g data-part="browL">${brow}</g><g data-part="browR">${M(brow)}</g>
${eye(u, { side: 'L', cx: 163, cy: 190, ...E })}${eye(u, { side: 'R', cx: 237, cy: 190, ...E })}
<path d="M195 200 C 193 210, 190 216, 188 220 M188 222 C 180 226, 182 236, 192 236 Q 200 240 208 236 C 218 236, 220 226, 212 222" ${ln(SK, 2.8)}/><path d="M196 226 q4 -4 8 0" ${ln(SK, 2.2)} opacity=".6"/>
<ellipse cx="192" cy="231" rx="3.4" ry="2" fill="#7A4024"/><ellipse cx="208" cy="231" rx="3.4" ry="2" fill="#7A4024"/>
<g data-part="mouthOpen" style="display:none">
<path d="M168 248 Q200 262 232 248 Q229 290 200 293 Q171 290 168 248 Z" fill="#5A1E1E"/>
<g clip-path="url(#${u}mc)"><ellipse cx="200" cy="290" rx="20" ry="10" fill="#D9666E"/>
<path d="M160 244 L240 244 L240 268 Q200 276 160 268 Z" fill="#FFFFFF"/><path d="M186 256 v14 M200 258 v14 M214 256 v14" stroke="#D8D8DE" stroke-width="1.6"/></g>
<path d="M168 248 Q200 262 232 248 Q229 290 200 293 Q171 290 168 248 Z" fill="none" ${S3}/>
</g>
<g data-part="mouthClosed">
<path d="M172 252 Q200 259 228 252 Q216 266 200 266 Q184 266 172 252 Z" fill="#FFFFFF" ${S3}/>
<path d="M167 248 q4 2 5 6 M233 248 q-4 2 -5 6" ${ln(OL, 3)}/>
</g>
</g>
</g>
<g data-part="arm">
<path d="M110 360 C 110 390, 108 420, 106 458 L 192 458 C 188 420, 178 370, 164 334 Z" fill="url(#${u}sh)" ${S}/>
<path d="M140 380 q10 30 8 70" ${ln(GR, 2.6)}/>
<path d="M75 280 C 86 300, 98 324, 109 346 L 151 320 C 138 298, 122 276, 107 258 Z" fill="url(#${u}s)" ${S}/>
<path d="M101 344 C 118 334, 138 322, 155 311 C 162 316, 168 324, 167 332 C 150 343, 130 355, 113 365 C 106 360, 101 352, 101 344 Z" fill="url(#${u}sh)" ${S}/>
<path d="M107 355 C 124 345, 144 333, 161 321" ${ln(GR, 2.6)}/>
<g transform="translate(-4 4)">
<path d="M84 211 L 50 213 C 41 213, 37 218, 37 222 C 37 227, 41 231, 50 231 L 84 230 Z" fill="url(#${u}s)" ${S}/>
<path d="M66 222 C 70 212, 88 208, 100 212 C 112 216, 118 230, 116 248 C 114 266, 106 280, 90 282 C 74 282, 64 270, 63 254 C 62 240, 63 230, 66 222 Z" fill="url(#${u}s)" ${S}/>
<ellipse cx="69" cy="267" rx="10" ry="6.5" fill="url(#${u}s)" ${S3}/><ellipse cx="65" cy="254" rx="11" ry="7" fill="url(#${u}s)" ${S3}/><ellipse cx="64" cy="240" rx="11" ry="7" fill="url(#${u}s)" ${S3}/>
<path d="M82 216 C 76 206, 74 196, 77 189 C 80 183, 89 184, 92 190 C 95 198, 98 207, 102 216 Z" fill="url(#${u}s)" ${S}/>
<path d="M48 216 q5 -1 7 5 M80 192 q4 -3 8 0 M96 236 q8 4 12 12" ${ln(SK, 2.2)}/>
</g>
</g>
<g data-part="pawL">${fist(u)}</g><g data-part="pawR">${M(fist(u))}</g>
</g>`
  });
})();
