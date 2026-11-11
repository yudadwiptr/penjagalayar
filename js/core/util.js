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
  const fmt = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
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

  /* Registri karakter. Urutan pendaftaran = urutan di layar. */
  const chars = {}, order = [];
  function register(key, def) {
    def.key = key;
    def.group = def.group || 'hewan';
    chars[key] = def;
    order.push(key);
  }

  return { RM, chars, order, register, util: { clamp, rand, pick, f2, $, setT, fmt, easeOutBack, M, eye } };
})();
