/* Pawang Layar — utilitas bersama dan registri karakter.
   Semua file memakai satu namespace global: window.PI */
window.PI = (() => {
  'use strict';
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const f2 = (n) => n.toFixed(2);
  const $ = (id) => document.getElementById(id);
  const setT = (el, v) => { if (el) el.setAttribute('transform', v); };
  const fmt = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  const easeOutBack = (x) => { const c1 = 1.45, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };

  /* Cerminkan potongan SVG di sumbu x = 200 (kanvas karakter 400×400). */
  const M = (s) => `<g transform="translate(400 0) scale(-1 1)">${s}</g>`;

  /* Mata dengan kelopak atas/bawah, iris yang bisa melirik, dan pupil yang bisa mengecil.
     o: {side:'L'|'R', cx, cy, rx, ry, irisR, iris, irisHi, sclera?, lid, lidLine, slit?, pupil?:'h'} */
  function eye(u, o) {
    const { cx, cy, rx, ry, side } = o, ir = o.irisR, id = `${u}e${side}`, H = ry * 3.2, W = rx * 4;
    let pupil;
    if (o.slit) pupil = `<ellipse class="pupil" cx="${cx}" cy="${cy}" rx="${(ir * .32).toFixed(1)}" ry="${(ir * .9).toFixed(1)}" fill="#120C08"/>`;
    else if (o.pupil === 'h') pupil = `<ellipse class="pupil" cx="${cx}" cy="${cy}" rx="${(ir * .62).toFixed(1)}" ry="${(ir * .34).toFixed(1)}" fill="#120C08"/>`;
    else pupil = `<circle class="pupil" cx="${cx}" cy="${cy}" r="${(ir * .58).toFixed(1)}" fill="#120C08"/>`;
    return `<g class="eye" data-side="${side}" data-cx="${cx}" data-cy="${cy}" data-rx="${rx}" data-ry="${ry}"${o.slit ? ' data-slit="1"' : ''}>
  <defs><clipPath id="${id}c"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath>
  <radialGradient id="${id}g" cx="50%" cy="36%" r="64%"><stop offset="0" stop-color="${o.irisHi}"/><stop offset="1" stop-color="${o.iris}"/></radialGradient></defs>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${o.sclera || '#FFFBF1'}"/>
  <g clip-path="url(#${id}c)">
    <g class="iris"><circle cx="${cx}" cy="${cy}" r="${ir}" fill="url(#${id}g)"/>${pupil}
      <circle cx="${(cx - ir * .32).toFixed(1)}" cy="${(cy - ir * .38).toFixed(1)}" r="${(ir * .26).toFixed(1)}" fill="#fff" opacity=".95"/>
      <circle cx="${(cx + ir * .3).toFixed(1)}" cy="${(cy + ir * .32).toFixed(1)}" r="${(ir * .11).toFixed(1)}" fill="#fff" opacity=".7"/></g>
    <ellipse class="lidB" cx="${cx}" cy="${(cy + ry * 2.05).toFixed(1)}" rx="${(rx * 1.6).toFixed(1)}" ry="${(ry * 1.25).toFixed(1)}" fill="${o.lid}"/>
    <g class="lidT"><rect x="${cx - W / 2}" y="${cy - ry - H}" width="${W}" height="${H}" fill="${o.lid}"/><rect x="${cx - W / 2}" y="${cy - ry - 3}" width="${W}" height="3.2" fill="${o.lidLine}"/></g>
  </g>
  <ellipse class="rim" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${o.lidLine}" stroke-width="2" opacity=".5"/>
  </g>`;
  }

  /* SHA-256 murni JS (sinkron, jalan di file://, http://, dan content script). Dipakai untuk sandi:
     yang disimpan hanya hash-nya, jadi sandi tidak bisa dibaca dari penyimpanan. */
  const SHA = (() => {
    const K = [], H0 = [], frac = (x) => ((x - Math.floor(x)) * 4294967296) | 0;
    for (let n = 2, i = 0; i < 64; n++) {
      let prime = true;
      for (let d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
      if (prime) { if (i < 8) H0[i] = frac(Math.pow(n, 1 / 2)); K[i++] = frac(Math.pow(n, 1 / 3)); }
    }
    const rr = (x, n) => (x >>> n) | (x << (32 - n));
    return (str) => {
      const bytes = new TextEncoder().encode(str), l = bytes.length, total = ((l + 72) >> 6) << 6;
      const m = new Uint8Array(total); m.set(bytes); m[l] = 0x80;
      const dv = new DataView(m.buffer); dv.setUint32(total - 4, l * 8);
      const w = new Int32Array(64), h = H0.slice();
      for (let o = 0; o < total; o += 64) {
        for (let t = 0; t < 16; t++) w[t] = dv.getInt32(o + t * 4);
        for (let t = 16; t < 64; t++) {
          const a = w[t - 15], b = w[t - 2];
          w[t] = (w[t - 16] + (rr(a, 7) ^ rr(a, 18) ^ (a >>> 3)) + w[t - 7] + (rr(b, 17) ^ rr(b, 19) ^ (b >>> 10))) | 0;
        }
        let [a, b, c, d, e, f, g, hh] = h;
        for (let t = 0; t < 64; t++) {
          const t1 = (hh + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & f) ^ (~e & g)) + K[t] + w[t]) | 0;
          const t2 = ((rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
          hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
        }
        [a, b, c, d, e, f, g, hh].forEach((v, i) => { h[i] = (h[i] + v) | 0; });
      }
      return h.map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('');
    };
  })();
  /* hash sandi ('' kalau sandinya kosong). ext/background.js memakai rumus yang sama lewat crypto.subtle. */
  const pinHash = (pin) => { const p = String(pin || '').trim(); return p ? SHA('pawang-layar:' + p) : ''; };

  /* Registri karakter. Urutan pendaftaran = urutan di layar. */
  const chars = {}, order = [];
  function register(key, def) {
    def.key = key;
    def.group = def.group || 'hewan';
    chars[key] = def;
    order.push(key);
  }

  return { RM, chars, order, register, util: { clamp, rand, pick, f2, $, setT, fmt, easeOutBack, M, eye, sha256: SHA, pinHash } };
})();
