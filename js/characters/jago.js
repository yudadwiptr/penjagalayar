/* Jago — ayam jago kampung */
(() => {
  const { eye, M } = PI.util;
  const wing = '<path d="M124 404 C 66 398, 48 340, 74 302 C 96 272, 138 280, 152 310 C 138 340, 134 372, 146 404 Z" fill="#8E3A1E"/><path d="M78 330 q24 -6 46 4 M72 356 q28 -4 52 8 M82 380 q24 0 46 12" stroke="#5E2412" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>';
  const foot = '<path d="M130 370 v26" stroke="#E8B030" stroke-width="7" stroke-linecap="round"/><path d="M130 396 l-22 8 M130 396 v10 M130 396 l22 8" stroke="#E8B030" stroke-width="6" stroke-linecap="round"/>';
  const E = { rx: 9.5, ry: 9.5, irisR: 8, iris: '#E8901A', irisHi: '#FFD060', sclera: '#FFF4E0', lid: '#E0503A', lidLine: '#8A2A1A' };

  PI.register('jago', {
    name: 'Jago', species: 'Ayam jago', tag: 'Berkokok setiap kamu coba kabur',
    accent: '#F4C9AE', glow: 'rgba(220,90,50,.30)', crop: '74 46 252 244',
    sfx: { voice: 'crow', angry: 'cluck', happy: 'cluck' }, happyAct: 'flap', angryMouth: .5, happyMouth: 0, turn: 1.4, jawAmp: 10,
    baseIdles: ['look', 'tilt', 'look'], idles: ['bob', 'flap', 'stomp', 'tilt'],
    rig: { head: [200, 330], look: [200, 150], hat: [200, 114], tail: [292, 372], wingL: [136, 390], wingR: [264, 390], pawL: [130, 404], pawR: [270, 404], mouth: [200, 176], dangle: [200, 188] },
    lines: {
      greet: ['KUKURUYUK! Saya Jago.', 'Pagi! Eh, istirahat dulu.'],
      idle: ['Petok.', 'Saya jago di sini.', 'Kukuruyuk… pelan.', 'Jangan lihat jagung saya.'],
      escape: ['KUKURUYUK!', 'Petok?! Duduk!', 'Mau ke mana?'],
      angry: ['Jangan bikin saya berkokok lagi.', 'Saya bisa berkokok sampai tetangga bangun.'],
      slam: ['*ceker*', 'PETOK.'],
      close: ['Saya maju. Jengger saya duluan.', 'Sekarang saya di depan muka kamu.'],
      pet: ['Petok~', 'Bulu saya bagus, kan.', 'Boleh. Sebentar.'],
      boop: ['Paruh saya bukan tombol.', 'Petok!'],
      sleep: ['Saya tidur dulu. Bangunkan subuh.', 'Zzz… petok…'],
      wake: ['KUKU— eh. Saya bangun.'],
      back: ['Petok. Tadi ke mana?'],
      hold: ['Berhenti? Petok?', 'Tahan dulu.'],
      stay: ['Jago.'],
      quit: ['Ya sudah. Petok.'],
      done: ['Selesai! Kukuruyuk!', 'Sudah. Lanjut kerja, petok.']
    },
    svg: (u) => `<defs>
<radialGradient id="${u}f" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="#F4A852"/><stop offset="1" stop-color="#D9782E"/></radialGradient>
<linearGradient id="${u}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2B04A"/><stop offset="1" stop-color="#C9601E"/></linearGradient>
<radialGradient id="${u}b" cx="50%" cy="20%" r="85%"><stop offset="0" stop-color="#B84A2C"/><stop offset="1" stop-color="#7E2A18"/></radialGradient>
</defs>
<g data-part="root">
<g data-part="tail"><g fill="none" stroke-linecap="round"><path d="M290 368 C 310 300, 320 250, 296 196" stroke="#163029" stroke-width="16"/><path d="M296 370 C 330 310, 360 270, 340 200" stroke="#1E3A33" stroke-width="20"/><path d="M300 372 C 350 330, 392 290, 384 228" stroke="#245A4C" stroke-width="18"/><path d="M304 376 C 360 360, 396 330, 398 286" stroke="#2E6B5A" stroke-width="14"/></g><path d="M332 220 c6 -4 14 -2 16 6 M372 246 c6 -2 12 2 12 8" stroke="#6FB89C" stroke-width="3" fill="none" stroke-linecap="round"/></g>
<g data-part="wingL">${wing}</g><g data-part="wingR">${M(wing)}</g>
<g data-part="body"><path d="M74 404 C 74 330, 130 292, 200 292 C 270 292, 326 330, 326 404 Z" fill="url(#${u}b)"/><path d="M140 404 C 140 350, 166 320, 200 320 C 234 320, 260 350, 260 404 Z" fill="#3A2A22"/></g>
<g data-part="head">
<path d="M128 340 C 138 272, 154 216, 160 176 L 240 176 C 246 216, 262 272, 272 340 Z" fill="url(#${u}n)"/>
<path d="M168 220 q-4 40 -10 80 M186 216 q-2 50 -6 100 M214 216 q2 50 6 100 M232 220 q4 40 10 80" stroke="#B8561A" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
<ellipse cx="200" cy="154" rx="56" ry="52" fill="url(#${u}f)"/>
<g data-part="hat"><path d="M164 116 Q160 84 176 96 Q180 64 196 90 Q204 56 216 88 Q230 64 236 100 Q250 96 240 118 Q200 108 164 116 Z" fill="#E0322B"/><path d="M178 96 Q184 80 192 92" stroke="#FF7466" stroke-width="3" fill="none" stroke-linecap="round"/></g>
<g data-part="face">
<ellipse cx="180" cy="154" rx="14" ry="13" fill="#E0503A"/><ellipse cx="220" cy="154" rx="14" ry="13" fill="#E0503A"/>
<g data-part="blush" opacity="0"><ellipse cx="160" cy="174" rx="10" ry="6" fill="#FF9AA0" opacity=".6"/><ellipse cx="240" cy="174" rx="10" ry="6" fill="#FF9AA0" opacity=".6"/></g>
${eye(u, { side: 'L', cx: 180, cy: 150, ...E })}${eye(u, { side: 'R', cx: 220, cy: 150, ...E })}
<g data-part="dangle"><path d="M190 186 Q180 212 190 224 Q202 214 198 188 Z" fill="#E0322B"/><path d="M210 186 Q220 212 210 224 Q198 214 202 188 Z" fill="#CC2822"/></g>
<g data-part="mouthOpen" style="display:none"><path d="M188 174 Q200 170 212 174 L204 198 Q200 202 196 198 Z" fill="#4A1414"/></g>
<g data-part="jaw"><path d="M190 176 Q200 172 210 176 L203 196 Q200 199 197 196 Z" fill="#D9A020"/></g>
<path d="M184 164 Q200 154 216 164 L204 186 Q200 190 196 186 Z" fill="#F2BE38"/><g fill="#8A5A10"><ellipse cx="194" cy="168" rx="2.2" ry="1.4"/><ellipse cx="206" cy="168" rx="2.2" ry="1.4"/></g>
</g></g>
<g data-part="pawL">${foot}</g><g data-part="pawR">${M(foot)}</g>
</g>`
  });
})();
