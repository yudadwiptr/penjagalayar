/* Rig animasi karakter: suasana hati, mata, telinga, ekor, mulut, dan aksi kecil.
   Setiap karakter adalah SVG 400×400 dengan bagian-bagian bertanda data-part="…".
   Lihat README.md untuk daftar bagian dan titik poros (def.rig). */
(() => {
  'use strict';
  const { clamp, rand, pick, f2, setT, easeOutBack } = PI.util;
  const RM = PI.RM;

  const PARTS = ['root', 'body', 'head', 'face', 'earL', 'earR', 'tail', 'pawL', 'pawR', 'mouthOpen', 'mouthClosed', 'blush',
    'browL', 'browR', 'wingL', 'wingR', 'hat', 'prop', 'jaw', 'whiskers', 'tongue', 'sac', 'dangle', 'arm'];

  const MOODS = {
    calm:    { lid: 0,    slant: 0,   squint: 0,   pupil: 1,    ear: 0,    tailAmp: 6,  tailSpd: .5,  lean: 1,    droop: 0,   brow: 0,    blush: 0,  wing: 0 },
    watch:   { lid: .22,  slant: 6,   squint: .1,  pupil: .85,  ear: 0,    tailAmp: 8,  tailSpd: .7,  lean: 1,    droop: 0,   brow: .3,   blush: 0,  wing: 0 },
    angry:   { lid: .36,  slant: 18,  squint: .18, pupil: .5,   ear: -1,   tailAmp: 16, tailSpd: 2.2, lean: 1.04, droop: 0,   brow: 1,    blush: 0,  wing: .8 },
    furious: { lid: .3,   slant: 22,  squint: .2,  pupil: .4,   ear: -1,   tailAmp: 22, tailSpd: 3,   lean: 1.12, droop: 0,   brow: 1.2,  blush: 0,  wing: 1 },
    happy:   { lid: 0,    slant: -4,  squint: .8,  pupil: 1.3,  ear: .5,   tailAmp: 22, tailSpd: 3.2, lean: 1.01, droop: 0,   brow: -.6,  blush: 1,  wing: 0 },
    sleepy:  { lid: .94,  slant: -2,  squint: .15, pupil: 1.2,  ear: -.35, tailAmp: 3,  tailSpd: .25, lean: .99,  droop: 1,   brow: -.2,  blush: .3, wing: 0 },
    shock:   { lid: -.06, slant: -8,  squint: 0,   pupil: .45,  ear: .8,   tailAmp: 5,  tailSpd: 5,   lean: .97,  droop: -.3, brow: -1,   blush: 0,  wing: .5 },
    sad:     { lid: .4,   slant: -14, squint: .05, pupil: 1.15, ear: -.8,  tailAmp: 2,  tailSpd: .3,  lean: .98,  droop: .5,  brow: -.8,  blush: 0,  wing: 0 }
  };
  const ACT_DUR = { look: 1.8, tilt: 1.9, sniff: .9, yawn: 2.2, munch: 2.2, flap: 1.1, bob: 1.3, wag: 1.8, knead: 2.4, slam: 1.0, stomp: 1.0, flick: 1.1, croak: 1.4, nod: 1.4, gesture: 2.8, dance: 2.6 };
  const easeOut3 = (x) => 1 - Math.pow(1 - x, 3), easeIn3 = (x) => x * x * x;

  /* posisi kursor global, diisi oleh stage.js */
  const ptr = { x: 0, y: 0, active: false, last: 0, has: false };
  let uid = 0;

  class Rig {
    constructor(slot, def, o = {}) {
      this.def = def; this.o = o;
      this.vb = (o.viewBox || '0 0 400 400').split(/\s+/).map(Number);
      this.mid = o.align === 'mid';
      const u = 'p' + (++uid) + '_';
      slot.innerHTML = `<svg class="pet-svg" viewBox="${this.vb.join(' ')}" preserveAspectRatio="xMid${this.mid ? 'YMid' : 'YMax'} meet" role="img" aria-label="${def.name}, ${def.species.toLowerCase()}">${def.svg(u)}</svg>`;
      this.svg = slot.firstElementChild;
      this.p = {};
      for (const n of PARTS) this.p[n] = this.svg.querySelector(`[data-part="${n}"]`);
      this.eyes = [...this.svg.querySelectorAll('.eye')].map((g) => ({
        cx: +g.dataset.cx, cy: +g.dataset.cy, rx: +g.dataset.rx, ry: +g.dataset.ry,
        sign: g.dataset.side === 'L' ? 1 : -1, slit: !!g.dataset.slit,
        iris: g.querySelector('.iris'), pupil: g.querySelector('.pupil'),
        lidT: g.querySelector('.lidT'), lidB: g.querySelector('.lidB'), rim: g.querySelector('.rim')
      }));
      this.s = { ...MOODS.calm, lookX: 0, lookY: 0, mouth: 0 };
      this.goal = { ...MOODS.calm };
      this.mood = 'calm'; this.base = 'calm'; this.moodUntil = 0;
      this.t = 0; this.blinkAt = rand(.8, 3); this.blinkT = -1; this.talkUntil = 0;
      this.nextIdle = rand(2.5, 6); this.act = null; this.tw = { L: 0, R: 0 }; this.tailPh = rand(0, 6);
      this.wander = { x: 0, y: 0, next: 0 };
      this.enterP = (o.noEnter || RM) ? 1 : 0; this.enterDir = 1;
      this.mAt = -9; this.scale = 1; this.ox = 0; this.oy = 0; this.onSlam = null;
      this.apply(0, {});
    }
    setMood(m, dur) { this.mood = m; Object.assign(this.goal, MOODS[m]); this.moodUntil = dur ? this.t + dur : 0; }
    setBase(m) { this.base = m; if (!this.moodUntil) this.setMood(m); }
    talk(n) { this.talkUntil = this.t + clamp(n * .055, .45, 1.9); }
    leave() { this.enterDir = -1; return new Promise((r) => setTimeout(r, RM ? 0 : 480)); }

    doAct(name, side) {
      const p = this.p;
      if (name === 'twitch') { if (p.earL && (this.def.earAmp ?? 1) > .2) this.tw[Math.random() < .5 ? 'L' : 'R'] = 1; return; }
      if ((name === 'slam' || name === 'knead' || name === 'stomp') && !p.pawL) return;
      if (name === 'bob' && !p.hat) return;
      if (name === 'flick' && !p.tongue) return;
      if (name === 'croak' && !p.sac) return;
      if (name === 'gesture' && !p.arm) return;
      this.act = { name, t0: this.t, dur: ACT_DUR[name] || 1.2, side: side || this.def.slamSide || (Math.random() < .5 ? 'L' : 'R'), dir: Math.random() < .5 ? -1 : 1, hit: false };
    }
    measure() {
      const r = this.svg.getBoundingClientRect(), [vx, vy, vw, vh] = this.vb;
      const s = Math.min(r.width / vw, r.height / vh) || 1;
      this.scale = s; this.ox = r.left + (r.width - vw * s) / 2 - vx * s;
      this.oy = r.top + (this.mid ? (r.height - vh * s) / 2 : (r.height - vh * s)) - vy * s; this.mAt = this.t;
    }
    toScreen(x, y) { return { x: this.ox + x * this.scale, y: this.oy + y * this.scale }; }

    /* efek dari aksi yang sedang berjalan */
    actFx() {
      const a = this.act, o = {};
      if (!a) return o;
      const p = (this.t - a.t0) / a.dur;
      if (p >= 1) { this.act = null; return o; }
      const bell = Math.sin(Math.PI * p);
      switch (a.name) {
        case 'look': o.look = { x: a.dir * .95, y: -.15 }; break;
        case 'tilt': o.tilt = a.dir * 12 * (this.def.tiltAmp || 1) * bell; break;
        case 'sniff': o.faceY = Math.sin(p * Math.PI * 12) * 1.6 * bell; o.whisk = Math.sin(p * Math.PI * 12) * bell; break;
        case 'yawn': o.mouth = Math.pow(bell, 1.4); o.lid = .75 * bell; o.tilt = a.dir * 5 * bell; break;
        case 'munch': o.mouth = .38 * Math.max(0, Math.sin(p * Math.PI * 9)) * Math.min(1, bell * 3); o.prop = Math.sin(p * Math.PI * 9) * 3; o.faceY = Math.max(0, Math.sin(p * Math.PI * 9)) * 1.2; break;
        case 'flap': o.wing = Math.abs(Math.sin(p * Math.PI * 5)) * bell * 1.2; break;
        case 'bob': o.hat = Math.sin(p * Math.PI * 7) * (1 - p); break;
        case 'wag': o.tail = 1; o.tilt = a.dir * 6 * bell; break;
        case 'nod': o.headY = Math.sin(p * Math.PI * 4) * 5 * bell; break;
        case 'croak': o.sac = Math.abs(Math.sin(p * Math.PI * 2)); break;
        case 'gesture': {
          /* tangan naik ke pose khas (hormat, menunjuk, jempol, melambai), ditahan, lalu turun */
          o.arm = p < .2 ? easeOut3(p / .2) : p > .82 ? 1 - easeIn3((p - .82) / .18) : 1;
          o.armWave = p > .2 && p < .82 ? Math.sin((p - .2) / .62 * Math.PI * 2 * 4) : 0;
          o.tilt = (this.def.gesture && this.def.gesture.side === 'L' ? 1 : -1) * 4 * o.arm;
          break;
        }
        case 'dance': {
          /* joget: badan bergoyang kiri-kanan, kepala memantul */
          const k = Math.min(1, bell * 2.5);
          o.sway = Math.sin(p * Math.PI * 6) * k;
          o.headY = -Math.abs(Math.sin(p * Math.PI * 6)) * 5 * k;
          o.tilt = o.sway * 7;
          break;
        }
        case 'flick': {
          const f = (q) => Math.sin(Math.PI * clamp(q, 0, 1));
          o.tongue = p < .45 ? f(p / .45) * (.8 + .2 * Math.sin(p * 70)) : f((p - .55) / .35) * (.8 + .2 * Math.sin(p * 70));
          o.mouth = .12; break;
        }
        case 'knead': case 'stomp': {
          const k = Math.sin(p * Math.PI * (a.name === 'knead' ? 8 : 6)), amp = a.name === 'knead' ? 12 : 9;
          o.pawL = -Math.max(0, k) * amp; o.pawR = -Math.max(0, -k) * amp; break;
        }
        case 'slam': {
          let y = 0, r = 0;
          if (p < .5) { const q = 1 - Math.pow(1 - p / .5, 3); y = -78 * q; r = -16 * q; }
          else if (p < .58) { const q = (p - .5) / .08; y = -78 * (1 - q * q); r = -16 * (1 - q); }
          else if (!a.hit) { a.hit = true; if (this.onSlam) this.onSlam(a.side); }
          if (a.side === 'L') { o.pawL = y; o.pawLr = r; } else { o.pawR = y; o.pawRr = -r; }
          o.tilt = (a.side === 'L' ? -1 : 1) * 5 * Math.sin(Math.PI * Math.min(1, p / .6));
          break;
        }
      }
      return o;
    }

    update(dt) {
      this.t += dt; const t = this.t, s = this.s, g = this.goal, d = this.def;
      if (this.moodUntil && t > this.moodUntil) { this.moodUntil = 0; this.setMood(this.base); }
      this.enterP = clamp(this.enterP + dt * (this.enterDir > 0 ? 1 / .9 : -1 / .45), 0, 1);
      if (t - this.mAt > .5) this.measure();
      const A = this.actFx();

      let tx, ty;
      if (A.look) { tx = A.look.x; ty = A.look.y; }
      else if (this.mood === 'sleepy') { tx = 0; ty = .5; }
      else if (ptr.active && performance.now() - ptr.last < 5000) {
        const h = this.toScreen(d.rig.look[0], d.rig.look[1]), R = Math.max(200, this.scale * 210);
        tx = clamp((ptr.x - h.x) / R, -1, 1); ty = clamp((ptr.y - h.y) / (R * .85), -1, 1);
      } else {
        if (t > this.wander.next) { const still = Math.random() < .35; this.wander = { x: still ? 0 : rand(-.7, .7), y: still ? 0 : rand(-.35, .3), next: t + rand(1.5, 3.8) }; }
        tx = this.wander.x; ty = this.wander.y;
      }
      const k = 1 - Math.exp(-dt * 7);
      s.lookX += (tx - s.lookX) * k; s.lookY += (ty - s.lookY) * k;
      const km = 1 - Math.exp(-dt * 6), kl = 1 - Math.exp(-dt * 12);
      for (const key in g) s[key] += (g[key] - s[key]) * (key === 'lid' ? kl : km);

      let blink = 0;
      if (this.blinkT < 0 && t > this.blinkAt && this.mood !== 'sleepy') this.blinkT = 0;
      if (this.blinkT >= 0) {
        this.blinkT += dt; const bp = this.blinkT / .18;
        if (bp >= 1) { this.blinkT = -1; this.blinkAt = t + (Math.random() < .2 ? .15 : rand(1.8, 5.5)); }
        else blink = Math.sin(Math.PI * bp);
      }

      let m = A.mouth || 0;
      if (t < this.talkUntil) m = Math.max(m, .15 + .45 * Math.abs(Math.sin(t * 14)) * (.65 + .35 * Math.sin(t * 4.1)));
      if (this.mood === 'happy') m = Math.max(m, d.happyMouth || 0);
      if (this.mood === 'angry' || this.mood === 'furious') m = Math.max(m, d.angryMouth || 0);
      s.mouth += (m - s.mouth) * (1 - Math.exp(-dt * 18));

      if (t > this.nextIdle) {
        this.nextIdle = t + rand(3.5, 8);
        if (!this.act && (this.mood === 'calm' || this.mood === 'watch')) {
          this.doAct(pick([...(d.baseIdles || ['look', 'twitch', 'tilt', 'sniff']), ...(d.idles || [])]));
        }
      }
      this.tw.L *= Math.exp(-dt * 6); this.tw.R *= Math.exp(-dt * 6);
      this.tailPh += dt * Math.PI * 2 * s.tailSpd * (A.tail ? 1.6 : 1);
      this.apply(blink, A);
    }

    apply(blink, A) {
      const s = this.s, d = this.def, R = d.rig, p = this.p, t = this.t;
      const br = Math.sin(t * Math.PI * 2 / (this.mood === 'sleepy' ? 5.2 : 3.8));
      const e = this.enterDir > 0 ? easeOutBack(this.enterP) : 1 - Math.pow(1 - this.enterP, 2);
      const sway = A.sway || 0;
      setT(p.root, `translate(${f2(sway * 10)} ${f2((1 - e) * 360)}) translate(200 400) rotate(${f2(sway * 2.5)}) scale(${s.lean.toFixed(4)}) translate(-200 -400)`);
      setT(p.body, `translate(200 404) scale(${(1 + br * .012).toFixed(4)} ${(1 + br * .024).toFixed(4)}) translate(-200 -404)`);

      const lx = s.lookX, ly = s.lookY, dr = s.droop, [hx, hy] = R.head;
      const tilt = lx * 6 * (d.turn || 1) + (A.tilt || 0) + dr * 7;
      setT(p.head, `translate(${f2(lx * 11)} ${f2(ly * 7 + dr * 18 + br * 1.8 + (A.headY || 0))}) rotate(${f2(tilt)} ${hx} ${hy})`);
      setT(p.face, `translate(${f2(lx * 8)} ${f2(ly * 5 + (A.faceY || 0))})`);

      const flat = -s.ear, ea = d.earAmp ?? 1;
      if (p.earL) setT(p.earL, `translate(${f2(-lx * 3)} 0) rotate(${f2((-flat * 22 - this.tw.L * 12 * Math.sin(t * 45)) * ea)} ${R.earL[0]} ${R.earL[1]})`);
      if (p.earR) setT(p.earR, `translate(${f2(-lx * 3)} 0) rotate(${f2((flat * 22 + this.tw.R * 12 * Math.sin(t * 45)) * ea)} ${R.earR[0]} ${R.earR[1]})`);
      if (p.tail) setT(p.tail, `rotate(${f2(Math.sin(this.tailPh) * s.tailAmp * (A.tail ? 1.8 : 1))} ${R.tail[0]} ${R.tail[1]})`);
      /* tangan gestur: digambar dalam pose terangkat, rig menariknya naik dari bawah layar */
      const arm = A.arm || 0, gs = (d.gesture && d.gesture.side) || 'R';
      if (p.arm) {
        p.arm.style.display = arm > .01 ? '' : 'none';
        const dir = gs === 'R' ? 1 : gs === 'L' ? -1 : 0, wave = (A.armWave || 0) * (d.gesture && d.gesture.wave ? 10 : 2) * (dir ? 1 : 0);
        setT(p.arm, `translate(0 ${f2((1 - arm) * 260)}) rotate(${f2((1 - arm) * 28 * dir + wave)} ${R.arm[0]} ${R.arm[1]})`);
      }
      /* side: 'L' / 'R' = tangan di sisi kiri/kanan layar, 'both' = kedua tangan */
      const hideL = gs === 'L' || gs === 'both' ? arm * 130 : 0, hideR = gs === 'R' || gs === 'both' ? arm * 130 : 0;
      if (p.pawL) setT(p.pawL, `translate(0 ${f2((A.pawL || 0) + hideL)}) rotate(${f2(A.pawLr || 0)} ${R.pawL[0]} ${R.pawL[1]})`);
      if (p.pawR) setT(p.pawR, `translate(0 ${f2((A.pawR || 0) + hideR)}) rotate(${f2(A.pawRr || 0)} ${R.pawR[0]} ${R.pawR[1]})`);

      const m = s.mouth, [mx, my] = R.mouth;
      if (p.mouthOpen) {
        p.mouthOpen.style.display = m > .03 ? '' : 'none';
        setT(p.mouthOpen, `translate(${mx} ${my}) scale(1 ${Math.max(.001, m).toFixed(3)}) translate(${-mx} ${-my})`);
      }
      if (p.mouthClosed) p.mouthClosed.style.opacity = m > .22 ? 0 : 1;
      if (p.jaw) setT(p.jaw, `translate(0 ${f2(m * (d.jawAmp || 18))})`);
      if (p.tongue) {
        const tg = A.tongue || 0, [tx, ty] = R.tongue || R.mouth;
        p.tongue.style.display = tg > .03 ? '' : 'none';
        setT(p.tongue, `translate(${tx} ${ty}) scale(1 ${Math.max(.001, tg).toFixed(3)}) translate(${-tx} ${-ty})`);
      }
      if (p.sac) {
        const k = (A.sac || 0) + m * .15, [sx, sy] = R.sac;
        setT(p.sac, `translate(${sx} ${sy}) scale(${(1 + k * .9).toFixed(3)} ${(1 + k * 1.1).toFixed(3)}) translate(${-sx} ${-sy})`);
      }
      if (p.dangle) setT(p.dangle, `rotate(${f2(-lx * 10 + Math.sin(t * 10) * m * 10 - (A.tilt || 0) * .6)} ${R.dangle[0]} ${R.dangle[1]})`);
      if (p.blush) p.blush.setAttribute('opacity', clamp(s.blush, 0, 1).toFixed(2));
      if (p.browL && R.browL) setT(p.browL, `translate(0 ${f2(s.brow * 5)}) rotate(${f2(s.brow * 12)} ${R.browL[0]} ${R.browL[1]})`);
      if (p.browR && R.browR) setT(p.browR, `translate(0 ${f2(s.brow * 5)}) rotate(${f2(-s.brow * 12)} ${R.browR[0]} ${R.browR[1]})`);
      const wing = s.wing * 26 + (A.wing || 0) * 34;
      if (p.wingL) setT(p.wingL, `rotate(${f2(-wing)} ${R.wingL[0]} ${R.wingL[1]})`);
      if (p.wingR) setT(p.wingR, `rotate(${f2(wing)} ${R.wingR[0]} ${R.wingR[1]})`);
      if (p.hat) setT(p.hat, `translate(0 ${f2(-Math.max(0, br) * 2.4 - Math.abs(A.hat || 0) * 7)}) rotate(${f2((A.hat || 0) * 12 - lx * 4)} ${R.hat[0]} ${R.hat[1]})`);
      if (p.prop) setT(p.prop, `rotate(${f2((A.prop || 0) + br * 1.5)} ${R.prop[0]} ${R.prop[1]})`);
      if (p.whiskers) setT(p.whiskers, `translate(0 ${f2((A.whisk || 0) * 2)})`);

      const lid = clamp(Math.max(s.lid + (d.lidBias || 0) * (this.mood === 'shock' ? 0 : 1) + (A.lid || 0), blink), -.1, 1);
      const pu = Math.max(.2, s.pupil);
      for (const E of this.eyes) {
        setT(E.lidT, `rotate(${f2(s.slant * E.sign)} ${E.cx} ${E.cy}) translate(0 ${f2(lid * (2 * E.ry + 3))})`);
        setT(E.lidB, `translate(0 ${f2(-s.squint * E.ry * 1.15)})`);
        if (E.rim) E.rim.setAttribute('opacity', (.5 * clamp(1 - lid * 1.4, 0, 1) * clamp(1 - s.squint, 0, 1)).toFixed(2));
        setT(E.iris, `translate(${f2(lx * E.rx * .36)} ${f2(ly * E.ry * .3)})`);
        const sx = E.slit ? 2 * Math.pow(pu, 1.6) : Math.pow(pu, .7), sy = E.slit ? 1 : sx;
        setT(E.pupil, `translate(${E.cx} ${E.cy}) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(${-E.cx} ${-E.cy})`);
      }
    }
  }

  Object.assign(PI, { Rig, MOODS, ptr });
})();
