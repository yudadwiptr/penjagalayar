/* Panggung: satu rig + gelembung bicara + lapisan partikel, plus interaksi elus dan sentil. */
(() => {
  'use strict';
  const { clamp, rand, pick } = PI.util;
  const { Rig, ptr, SFX } = PI;

  const FX = {
    heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8 3.3 4.5 6.8 4.5c2 0 3.6 1.1 5.2 3 1.6-1.9 3.2-3 5.2-3 3.5 0 5.8 3.5 4.3 7.3C19.5 16.4 12 21 12 21z" fill="#FF6F91"/></svg>',
    anger: '<svg viewBox="0 0 24 24"><g stroke="#FF4D4D" stroke-width="2.8" fill="none" stroke-linecap="round"><path d="M9.5 3c0 4.5-2 6.5-6.5 6.5"/><path d="M14.5 3c0 4.5 2 6.5 6.5 6.5"/><path d="M9.5 21c0-4.5-2-6.5-6.5-6.5"/><path d="M14.5 21c0-4.5 2-6.5 6.5-6.5"/></g></svg>',
    spark: '<svg viewBox="0 0 24 24"><path d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9L1.5 12l7.9-2.6z" fill="#FFD25A"/></svg>',
    z: 'z', bang: '!', dust: ''
  };

  const stages = [];

  class Stage {
    constructor(root, o) {
      this.root = root; this.slot = o.slot; this.bubble = o.bubble || null; this.fxl = o.fx || null;
      this.viewBox = o.viewBox; this.align = o.align; this.pettable = !!o.pettable;
      this.onBoop = o.onBoop; this.onSlam = o.onSlam; this.group = o.group || '';
      this.active = true; this.petAcc = 0; this.heartAcc = 0; this.petCool = 0;
      this.hb = null; this.hbAt = 0; this.bubbleOn = false; this.rig = null;
      stages.push(this);
    }
    mount(def, noEnter) {
      this.def = def; this.hideBubble();
      this.rig = new Rig(this.slot, def, { viewBox: this.viewBox, align: this.align, noEnter });
      this.rig.onSlam = (side) => this.onSlam && this.onSlam(this, side);
      if (this.onBoop) this.rig.svg.addEventListener('pointerdown', (e) => { e.stopPropagation(); this.onBoop(this, e); });
      this.hb = null;
      return this.rig;
    }
    unmount() { this.hideBubble(); this.slot.innerHTML = ''; this.rig = null; if (this.fxl) this.fxl.innerHTML = ''; }
    say(text, ms) {
      if (!this.bubble || !this.rig) return;
      const b = this.bubble;
      b.textContent = text; b.classList.remove('show'); void b.offsetWidth; b.classList.add('show');
      this.bubbleOn = true; this.rig.talk(text.length); this.place();
      clearTimeout(this.bt); this.bt = setTimeout(() => this.hideBubble(), ms || clamp(text.length * 75, 2200, 4200));
    }
    hideBubble() { if (!this.bubble) return; this.bubble.classList.remove('show'); this.bubbleOn = false; clearTimeout(this.bt); }
    place() {
      const h = this.rig.p.head.getBoundingClientRect(), r = this.root.getBoundingClientRect(), b = this.bubble;
      const bw = b.offsetWidth, bh = b.offsetHeight;
      let x = h.left - r.left + h.width * .68, y = h.top - r.top + h.height * .14;
      x = clamp(x, 12, Math.max(12, r.width - bw - 12)); y = clamp(y, bh + 12, r.height);
      b.style.transform = `translate(${x.toFixed(1)}px,${(y - bh).toFixed(1)}px)`;
    }
    update(dt) {
      if (!this.rig) return;
      this.rig.update(dt); this.petAcc *= Math.exp(-dt * 1.1);
      if (this.bubbleOn) this.place();
    }
    headRect() {
      const n = performance.now();
      if (!this.hb || n - this.hbAt > 250) { this.hb = this.rig.p.head.getBoundingClientRect(); this.hbAt = n; }
      return this.hb;
    }
    local(x, y) { const r = this.root.getBoundingClientRect(); return { x: x - r.left, y: y - r.top }; }
    headPt(fx, fy) {
      const h = this.rig.p.head.getBoundingClientRect(), r = this.root.getBoundingClientRect();
      return { x: h.left - r.left + h.width * fx, y: h.top - r.top + h.height * fy };
    }
    fx(kind, x, y, n = 1, spread = 0) {
      if (!this.fxl) return;
      for (let i = 0; i < n; i++) {
        const el = document.createElement('span');
        el.className = 'fx fx-' + kind;
        el.style.left = (x + rand(-spread, spread)).toFixed(0) + 'px';
        el.style.top = (y + rand(-spread * .5, spread * .5)).toFixed(0) + 'px';
        el.style.setProperty('--dx', rand(-50, 50).toFixed(0) + 'px');
        el.style.setProperty('--r', rand(-30, 30).toFixed(0) + 'deg');
        el.style.animationDelay = (i * 80) + 'ms';
        el.innerHTML = FX[kind] || '';
        this.fxl.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
        setTimeout(() => el.remove(), 4500);
      }
    }
  }

  /* ---------- interaksi ---------- */
  function petMove(st, x, y, d) {
    if (!st.rig || st.rig.enterP < 1) return;
    const h = st.headRect();
    if (x < h.left || x > h.right || y < h.top || y > h.bottom) return;
    st.petAcc += d;
    const n = performance.now(); if (n < st.petCool) return;
    st.heartAcc += d;
    if (st.heartAcc > 260) { st.heartAcc = 0; const L = st.local(x, y); st.fx('heart', L.x, L.y - 12); }
    if (st.petAcc > 700) { st.petAcc = 0; st.petCool = n + 4500; beHappy(st, x, y); }
  }
  function beHappy(st, x, y) {
    const r = st.rig, d = st.def;
    r.setMood('happy', 3.4); if (d.happyAct) r.doAct(d.happyAct);
    st.say(pick(d.lines.pet)); SFX.voice(d, 'happy');
    const L = st.local(x, y); st.fx('heart', L.x, L.y - 12, 4, 30);
  }
  function boop(st, e) {
    const r = st.rig, d = st.def;
    if (!r || r.enterP < 1) return;
    r.setMood('shock', .75); st.say(pick(d.lines.boop)); SFX.play('pop');
    const L = st.local(e.clientX, e.clientY); st.fx('bang', L.x + 20, L.y - 28);
  }

  /* ---------- kursor global + loop animasi ---------- */
  addEventListener('pointermove', (e) => {
    const d = ptr.has ? Math.hypot(e.clientX - ptr.x, e.clientY - ptr.y) : 0;
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.has = true; ptr.active = true; ptr.last = performance.now();
    if (e.pointerType === 'mouse' || e.buttons) for (const st of stages) if (st.active && st.pettable) petMove(st, e.clientX, e.clientY, d);
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => { ptr.active = false; });

  let lastT = performance.now(), running = false;
  function frame(n) {
    const dt = Math.min(.1, Math.max(0, (n - lastT) / 1000)); lastT = n;
    for (const st of stages) if (st.active) st.update(dt);
    requestAnimationFrame(frame);
  }
  function startLoop() { if (running) return; running = true; lastT = performance.now(); requestAnimationFrame(frame); }

  Object.assign(PI, { Stage, stages, startLoop, interact: { petMove, beHappy, boop } });
})();
