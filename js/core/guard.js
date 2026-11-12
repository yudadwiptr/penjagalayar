/* Mode jaga: penjaga duduk di layar sampai waktu istirahat habis.
   Dipakai oleh website (layar penuh) dan extension browser (lapisan transparan di atas halaman).

   PI.Guard.create({
     host,            // elemen/ShadowRoot tempat mode jaga dipasang
     def,             // definisi karakter (PI.chars[kunci])
     startAt, endAt,  // timestamp (ms)
     sound,           // suara nyala?
     pinHash,         // hash sandi (PI.util.pinHash); kalau ada, berhenti lebih awal harus memasukkan sandi
     fullscreen,      // minta layar penuh (website)
     autoStart,       // dimulai otomatis tanpa klik (tampilkan tombol "Layar penuh")
     transparent,     // latar transparan (extension)
     blockInput,      // blokir keyboard & scroll ke halaman di belakangnya (extension)
     escaped,         // langsung dihitung sebagai "coba kabur" (pindah tab ke halaman ini)
     setTitle,        // ubah document.title dengan sisa waktu
     onSound(on), onLeave(reason, stats)
   }) → { stop(), attempt(kind), el, get done() } */
(() => {
  'use strict';
  const { pick, fmt } = PI.util;
  const { RM, Stage, SFX, interact } = PI;
  const { boop } = interact;

  const TIPS = [
    'Lihat sesuatu yang jauh selama 20 detik.', 'Turunkan bahu. Tarik napas pelan.', 'Minum air dulu.',
    'Kedipkan mata beberapa kali.', 'Berdiri dan regangkan punggung.', 'Putar pergelangan tangan pelan-pelan.',
    'Tutup mata sebentar. Biar dia yang jaga.', 'Lemaskan rahang. Kamu menggigitnya dari tadi.'
  ];

  const HTML = `<section class="guard" aria-label="Mode jaga">
  <div class="g-world">
    <div class="g-bar"><i class="g-prog"></i></div>
    <header class="g-head"><p class="g-tip"></p><p class="num g-clock">00:00</p><p class="g-who"></p></header>
    <div class="g-stage"><div class="slot g-slot"></div></div>
    <div class="bubble g-bubble" aria-live="polite"></div>
    <div class="fx-layer g-fx"></div>
  </div>
  <div class="g-foot">
    <div class="g-left">
      <button class="exit g-exit" type="button"><span class="fill g-fill"></span><span class="g-exit-label">Tahan untuk berhenti</span></button>
      <form class="g-pin" hidden>
        <svg class="g-pin-ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
        <input class="g-pin-in" type="password" placeholder="Masukkan sandi…" aria-label="Sandi untuk berhenti" autocomplete="off">
        <button class="g-pin-ok" type="submit">Buka</button>
        <button class="g-pin-cancel" type="button">Batal</button>
      </form>
    </div>
    <div class="g-right">
      <span class="g-count"></span>
      <button class="icon-btn g-fs" type="button" hidden>Layar penuh</button>
      <button class="icon-btn g-sound" type="button" aria-pressed="true">Suara nyala</button>
    </div>
  </div>
</section>`;

  function create(o) {
    const def = o.def, pinHash = o.pinHash || '';
    const tpl = document.createElement('template');
    tpl.innerHTML = HTML;
    const el = tpl.content.firstElementChild;
    o.host.appendChild(el);
    const $ = (c) => el.querySelector(c);
    const world = $('.g-world'), clock = $('.g-clock'), who = $('.g-who'), tip = $('.g-tip'), prog = $('.g-prog');
    const exitBtn = $('.g-exit'), fill = $('.g-fill'), exitLabel = $('.g-exit-label'), count = $('.g-count'), soundBtn = $('.g-sound'), fsBtn = $('.g-fs');
    const pinForm = $('.g-pin'), pinIn = $('.g-pin-in'), pinCancel = $('.g-pin-cancel');

    const G = {
      done: false, leaving: false, closed: false, attempts: 0, hist: [], lastAtt: 0, lastAct: performance.now(),
      sleeping: false, awayAt: 0, startAt: o.startAt || Date.now(), endAt: o.endAt,
      tipI: Math.floor(Math.random() * TIPS.length), timers: []
    };
    G.dur = Math.max(1, Math.round((G.endAt - G.startAt) / 1000));
    const baseTitle = document.title;

    el.style.setProperty('--glow', def.glow);
    el.classList.add('on');
    if (o.transparent) el.classList.add('transparent');

    const stage = new Stage(world, {
      slot: $('.g-slot'), bubble: $('.g-bubble'), fx: $('.g-fx'), pettable: true,
      onBoop: (st, e) => { activity(); boop(st, e); },
      onSlam: (st, side) => {
        shake(); SFX.play('thud');
        const R = st.def.rig['paw' + side], pt = st.rig.toScreen(R[0], R[1] - 14), L = st.local(pt.x, pt.y);
        st.fx('dust', L.x, L.y, 8, 44);
      }
    });
    stage.mount(def); stage.rig.setBase('watch');
    who.textContent = `${def.name} sedang bertugas`;

    function setSoundUI(on) { soundBtn.setAttribute('aria-pressed', String(on)); soundBtn.textContent = on ? 'Suara nyala' : 'Suara mati'; }
    SFX.on = o.sound !== false; setSoundUI(SFX.on); SFX.ensure();
    soundBtn.addEventListener('click', () => { SFX.on = !SFX.on; setSoundUI(SFX.on); if (SFX.on) SFX.ensure(); if (o.onSound) o.onSound(SFX.on); });

    function shake() { if (RM) return; world.classList.remove('shake'); void world.offsetWidth; world.classList.add('shake'); }
    function requestFS() {
      const d = document.documentElement;
      if (!o.fullscreen || !d.requestFullscreen || document.fullscreenElement) return;
      d.requestFullscreen().then(() => { fsBtn.hidden = true; }).catch(() => { fsBtn.hidden = false; });
    }
    if (o.fullscreen) { if (o.autoStart) fsBtn.hidden = !document.documentElement.requestFullscreen; else requestFS(); }
    fsBtn.addEventListener('click', requestFS);

    function showTip() {
      tip.classList.remove('in');
      setTimeout(() => { tip.textContent = TIPS[G.tipI++ % TIPS.length]; tip.classList.add('in'); }, 350);
    }
    function greet() { stage.say(pick(def.lines.greet)); if (stage.rig.p.arm) stage.rig.doAct('gesture'); SFX.voice(def); }

    /* ---------- event ---------- */
    const ac = new AbortController(), sig = { signal: ac.signal };
    addEventListener('pointermove', (e) => { activity(); if (e.clientY < 16) attempt('top'); }, { signal: ac.signal, passive: true });
    addEventListener('keydown', onKey, { signal: ac.signal, capture: true });
    addEventListener('blur', onAway, sig); addEventListener('focus', onBack, sig);
    document.addEventListener('visibilitychange', () => (document.hidden ? onAway() : onBack()), sig);
    document.addEventListener('fullscreenchange', () => {
      if (!o.fullscreen || G.leaving || G.closed) return;
      if (document.fullscreenElement) { fsBtn.hidden = true; return; }
      fsBtn.hidden = false; attempt('fs');
    }, sig);
    el.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.g-foot')) return;
      activity();
      if (o.fullscreen && !G.done && !fsBtn.hidden) requestFS();
      else if (o.blockInput && !e.target.closest('.pet-svg')) attempt('click');
    }, sig);
    if (o.blockInput) {
      const block = (e) => { if (!G.closed) { e.preventDefault(); e.stopPropagation(); } };
      addEventListener('wheel', block, { signal: ac.signal, passive: false, capture: true });
      addEventListener('touchmove', block, { signal: ac.signal, passive: false, capture: true });
      el.addEventListener('contextmenu', block, sig);
    }

    function onKey(e) {
      const t = e.composedPath ? e.composedPath()[0] : e.target;
      if (t && t.closest && t.closest('.g-pin')) {
        e.stopPropagation();
        if (e.key === 'Escape') { e.preventDefault(); closePin(true); }
        return;
      }
      if (t === exitBtn && (e.key === ' ' || e.key === 'Enter')) return;
      if (o.blockInput) { e.preventDefault(); e.stopImmediatePropagation(); }
      activity(); attempt('key');
    }
    function onAway() { if (!G.awayAt) G.awayAt = performance.now(); }
    function onBack() {
      if (!G.awayAt) return;
      const gone = performance.now() - G.awayAt; G.awayAt = 0;
      if (gone > 1200) attempt('back');
    }

    /* ---------- waktu, tidur, teguran ---------- */
    function tick() {
      if (G.done || G.leaving || G.closed) return;
      const left = Math.max(0, Math.ceil((G.endAt - Date.now()) / 1000));
      clock.textContent = fmt(left);
      prog.style.transform = `scaleX(${Math.min(1, 1 - left / G.dur).toFixed(4)})`;
      if (o.setTitle) document.title = `${fmt(left)} · ${def.name} jaga`;
      if (left <= 0) { finish(); return; }
      const m = stage.rig.mood;
      if (!G.sleeping && !holding && performance.now() - G.lastAct > 22000 && (m === 'watch' || m === 'calm')) sleep();
    }
    function activity() { G.lastAct = performance.now(); if (G.sleeping && !G.done) wake(false); }
    function sleep() {
      G.sleeping = true; const r = stage.rig;
      r.setBase('sleepy'); r.moodUntil = 0; r.setMood('sleepy');
      stage.say(pick(def.lines.sleep));
      clearInterval(G.zzz); G.zzz = setInterval(() => { const h = stage.headPt(.74, .2); stage.fx('z', h.x, h.y); }, 1300);
    }
    function wake(silent) {
      G.sleeping = false; clearInterval(G.zzz);
      const r = stage.rig; r.setBase(G.done ? 'happy' : 'watch'); r.setMood('shock', .6);
      if (!silent) stage.say(pick(def.lines.wake));
    }
    /* teguran bertingkat: melotot → menggeram → menggebrak → mendekat */
    function attempt(kind) {
      if (G.done || G.leaving || G.closed || holding) return;
      const n = performance.now(); if (n - G.lastAtt < 1400) return; G.lastAtt = n;
      if (G.sleeping) wake(true);
      G.attempts++; G.hist = G.hist.filter((x) => n - x < 45000); G.hist.push(n);
      const c = G.hist.length, r = stage.rig, L = def.lines, h = stage.headPt(.86, .08);
      count.textContent = `Coba kabur: ${G.attempts}×`;
      if (c >= 5) { r.setMood('furious', 3.4); r.doAct('slam'); stage.say(pick(L.close)); SFX.voice(def, 'angry'); stage.fx('anger', h.x, h.y); }
      else if (c >= 3) { r.setMood('angry', 2.8); r.doAct('slam'); stage.say(pick(L.slam)); }
      else if (c === 2) { r.setMood('angry', 2.4); stage.say(pick(kind === 'back' ? L.back : L.angry)); SFX.voice(def, 'angry'); stage.fx('anger', h.x, h.y); }
      else { r.setMood('angry', 2); stage.say(pick(kind === 'back' ? L.back : L.escape)); SFX.voice(def); }
    }

    /* ---------- tahan tiga detik untuk berhenti + kunci sandi ---------- */
    let holding = false, holdStart = 0, holdRaf = 0, holdStep = 0, unlockMode = 'quit';
    function requestUnlock(mode) {
      if (!pinHash) {
        if (mode === 'done') leave('done'); else quitEarly();
        return;
      }
      unlockMode = mode;
      exitBtn.hidden = true;
      pinForm.hidden = false;
      pinIn.value = '';
      setTimeout(() => pinIn.focus(), 20);
      stage.rig.setMood('watch', 3);
      stage.say('Masukkan sandi dulu.');
    }
    function closePin(sayStay) {
      pinForm.hidden = true; pinForm.classList.remove('err');
      exitBtn.hidden = false;
      pinIn.value = '';
      if (sayStay && !G.done) {
        const r = stage.rig; r.setMood(r.base); stage.say(pick(def.lines.stay));
      }
    }
    pinCancel.addEventListener('click', () => closePin(true));
    pinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (PI.util.pinHash(pinIn.value) === pinHash) {
        closePin(false);
        if (unlockMode === 'done') leave('done'); else quitEarly();
      } else {
        pinForm.classList.remove('err'); void pinForm.offsetWidth; pinForm.classList.add('err');
        pinIn.value = '';
        pinIn.focus();
        G.attempts++;
        count.textContent = `Coba kabur: ${G.attempts}×`;
        const r = stage.rig, h = stage.headPt(.86, .08);
        r.setMood('furious', 3.4); r.doAct('slam');
        stage.say('Sandi salah! Jangan coba-coba.');
        SFX.voice(def, 'angry');
        stage.fx('anger', h.x, h.y);
      }
    });

    function holdBegin(e) {
      if (G.leaving || G.done || G.closed || holding) return;
      if (e && e.pointerId != null) { e.preventDefault(); try { exitBtn.setPointerCapture(e.pointerId); } catch (_) { /* abaikan */ } }
      holding = true; holdStart = performance.now(); holdStep = 0; activity();
      const r = stage.rig; r.setMood('shock'); stage.say(pick(def.lines.hold));
      const step = () => {
        if (!holding) return;
        const pct = Math.min(1, (performance.now() - holdStart) / 3000);
        fill.style.transform = `scaleX(${pct.toFixed(3)})`;
        if (pct > .5 && holdStep === 0) { holdStep = 1; r.setMood('sad'); }
        if (pct >= 1) { holding = false; fill.style.transform = 'scaleX(0)'; requestUnlock('quit'); return; }
        holdRaf = requestAnimationFrame(step);
      };
      holdRaf = requestAnimationFrame(step);
    }
    function holdEnd() {
      if (!holding) return;
      holding = false; cancelAnimationFrame(holdRaf); fill.style.transform = 'scaleX(0)';
      const r = stage.rig; r.setMood(r.base); stage.say(pick(def.lines.stay));
    }
    exitBtn.addEventListener('pointerdown', holdBegin);
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => exitBtn.addEventListener(ev, holdEnd));
    exitBtn.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat && !G.done) { e.preventDefault(); holdBegin(); } });
    exitBtn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') holdEnd(); });
    /* waktu sudah habis: langsung boleh kembali, sandi hanya untuk berhenti lebih awal */
    exitBtn.addEventListener('click', () => { if (G.done && !G.leaving) leave('done'); });

    function quitEarly() {
      G.leaving = true;
      const r = stage.rig; r.setBase('sad'); r.setMood('sad');
      stage.say(pick(def.lines.quit)); SFX.voice(def, 'angry');
      setTimeout(() => leave('quit'), 1500);
    }
    function finish() {
      G.done = true; clearInterval(G.tick); clearInterval(G.idleT);
      if (G.sleeping) { G.sleeping = false; clearInterval(G.zzz); }
      el.classList.add('done'); clock.textContent = 'Selesai'; prog.style.transform = 'scaleX(1)';
      if (o.setTitle) document.title = 'Selesai · Pawang Layar';
      const r = stage.rig; r.moodUntil = 0; r.setBase('happy'); r.setMood('happy'); if (def.happyAct) r.doAct(def.happyAct);
      const line = pick(def.lines.done);
      stage.say(line, 5200);
      SFX.play('chime'); setTimeout(() => SFX.voice(def), 520);
      const h = stage.headPt(.5, .25); stage.fx('spark', h.x, h.y, 9, 140);
      exitLabel.textContent = 'Kembali kerja'; who.textContent = `${def.name} selesai bertugas`;
      if (o.onFinish) o.onFinish(line);
    }
    function teardown() {
      G.closed = true;
      [G.tick, G.idleT, G.tipT, G.zzz].forEach(clearInterval); clearTimeout(G.greetT);
      ac.abort();
    }
    function leave(reason) {
      G.leaving = true;
      teardown();
      stage.hideBubble();
      const stats = { attempts: G.attempts, elapsed: Math.round((Date.now() - G.startAt) / 1000), def };
      const after = () => {
        if (o.setTitle) document.title = baseTitle;
        if (o.fullscreen && document.fullscreenElement) document.exitFullscreen().catch(() => {});
        stage.destroy(); el.remove();
        if (o.onLeave) o.onLeave(reason, stats);
      };
      if (stage.rig) stage.rig.leave().then(after); else after();
    }

    /* ---------- mulai ---------- */
    G.greetT = setTimeout(() => { if (!G.done && !G.closed) { if (o.escaped) attempt('back'); else greet(); } }, RM ? 200 : 1000);
    G.tick = setInterval(tick, 250); tick();
    showTip(); G.tipT = setInterval(showTip, 20000);
    G.idleT = setInterval(() => {
      if (!G.done && !G.sleeping && !holding && !G.closed && Math.random() < .6) { stage.say(pick(def.lines.idle)); if (Math.random() < .35) SFX.voice(def); }
    }, 28000);
    PI.startLoop();

    return {
      el,
      get done() { return G.done; },
      get closed() { return G.closed; },
      attempt: (k) => { activity(); attempt(k); },
      leave,
      stop() { if (G.closed) return; teardown(); if (o.setTitle) document.title = baseTitle; stage.destroy(); el.remove(); }
    };
  }

  PI.Guard = { create, TIPS };
})();
