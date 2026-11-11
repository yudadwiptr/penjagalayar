/* Pawang Layar — halaman pengaturan, mode jaga, dan jadwal otomatis. */
(() => {
  'use strict';
  const { pick, fmt, $ } = PI.util;
  const { RM, chars: PETS, order, Stage, stages, SFX, interact } = PI;
  const { boop } = interact;
  const BASE_TITLE = 'Pawang Layar';

  /* ---------- pengaturan tersimpan ---------- */
  const KEY = 'pawang-layar.v1';
  try { // pindahkan pengaturan dari nama lama
    if (!localStorage.getItem(KEY) && localStorage.getItem('penjaga-istirahat.v2')) localStorage.setItem(KEY, localStorage.getItem('penjaga-istirahat.v2'));
  } catch (e) { /* abaikan */ }
  const DURS = [1, 5, 10, 15, 20, 30];
  const WHENS = [{ v: 0, label: 'Sekarang' }, { v: 25, label: 'Tiap 25 menit' }, { v: 45, label: 'Tiap 45 menit' }, { v: 60, label: 'Tiap 60 menit' }];
  const state = { pet: order[0], mins: 5, every: 0, sound: true };
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* abaikan */ }
  if (!PETS[state.pet]) state.pet = order[0];
  if (!DURS.includes(state.mins)) state.mins = 5;
  if (!WHENS.some((w) => w.v === state.every)) state.every = 0;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* abaikan */ } };
  SFX.on = !!state.sound;

  const panel = $('panel'), goBtn = $('go'), goNote = $('goNote'), soundBtn = $('sound');
  const guard = $('guard'), gWorld = $('gWorld'), clock = $('clock'), who = $('who'), gTip = $('gTip'), gProg = $('gProg');
  const exitBtn = $('exit'), fill = $('fill'), exitLabel = $('exitLabel'), gCount = $('gCount'), gSound = $('gSound'), gFs = $('gFs');
  const waitbar = $('waitbar'), wbClock = $('wbClock'), wbPet = $('wbPet'), toastEl = $('toast');

  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => toastEl.classList.remove('show'), 4200);
  }

  /* ---------- kartu karakter (mini-rig yang ikut hidup) ---------- */
  const cards = {};
  const lists = { hewan: $('pets'), tokoh: $('people') };
  for (const key of order) {
    const def = PETS[key], list = lists[def.group] || lists.hewan;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'pet';
    b.setAttribute('aria-pressed', String(key === state.pet));
    b.innerHTML = `<div class="pet-art"></div><b>${def.name}</b><small>${def.group === 'tokoh' ? 'Parodi' : def.species}</small>`;
    list.appendChild(b);
    new Stage(b, { slot: b.firstElementChild, viewBox: def.crop, align: 'mid', group: 'setup' }).mount(def, true);
    b.addEventListener('click', () => { SFX.ensure(); selectPet(key, true); });
    cards[key] = b;
  }
  if (!lists.tokoh.children.length) lists.tokoh.closest('.tokoh-wrap')?.remove();

  /* ---------- panel pratinjau besar ---------- */
  const hero = new Stage(panel, { slot: $('hSlot'), bubble: $('hBubble'), fx: $('hFx'), pettable: true, group: 'setup', onBoop: (st, e) => { SFX.ensure(); boop(st, e); } });
  let heroTok = 0;
  /* sapaan: bicara + gestur khas (kalau karakternya punya tangan gestur) */
  function greet(st) {
    if (!st.rig) return;
    st.say(pick(st.def.lines.greet));
    if (st.rig.p.arm) st.rig.doAct('gesture');
  }
  function showPanel(def) {
    panel.style.setProperty('--accent', def.accent);
    $('wm').textContent = def.name.replace(/^Pak /, '');
    $('pSpecies').textContent = def.species; $('pTag').textContent = def.tag;
  }
  function selectPet(key, user) {
    const def = PETS[key];
    if (key === state.pet && hero.rig) { greet(hero); if (user) SFX.voice(def); return; }
    state.pet = key; save();
    for (const k in cards) cards[k].setAttribute('aria-pressed', String(k === key));
    showPanel(def); updateGo();
    const tok = ++heroTok; hero.hideBubble();
    (hero.rig ? hero.rig.leave() : Promise.resolve()).then(() => {
      if (tok !== heroTok) return;
      hero.mount(def);
      setTimeout(() => { if (tok === heroTok && !G.on) { greet(hero); if (user) SFX.voice(def); } }, RM ? 100 : 750);
    });
  }
  setInterval(() => {
    if (!G.on && hero.rig && !hero.bubbleOn && !document.hidden && Math.random() < .45) hero.say(pick(hero.def.lines.idle));
  }, 15000);

  function mkChips(el, items, get, set) {
    el.innerHTML = '';
    for (const it of items) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = it.label;
      b.setAttribute('aria-pressed', String(it.v === get()));
      b.onclick = () => { set(it.v); [...el.children].forEach((c) => c.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); };
      el.appendChild(b);
    }
  }
  mkChips($('dur'), DURS.map((m) => ({ v: m, label: m + ' menit' })), () => state.mins, (v) => { state.mins = v; save(); updateGo(); });
  mkChips($('when'), WHENS, () => state.every, (v) => { state.every = v; save(); updateGo(); });

  function updateGo() {
    const n = PETS[state.pet].name;
    if (state.every) {
      goBtn.textContent = `Jadwalkan ${n}`;
      goNote.textContent = `${n} datang setelah ${state.every} menit kerja, menjaga ${state.mins} menit, lalu mengulang. Biarkan tab ini tetap terbuka.`;
    } else {
      goBtn.textContent = 'Mulai jaga';
      goNote.textContent = `Layar masuk mode penuh dan ${n} menjaga selama ${state.mins} menit. Untuk berhenti lebih awal, tombol keluar harus ditahan tiga detik.`;
    }
  }
  function setSound(on) {
    state.sound = on; SFX.on = on; save();
    soundBtn.setAttribute('aria-pressed', String(on)); gSound.setAttribute('aria-pressed', String(on));
    gSound.textContent = on ? 'Suara nyala' : 'Suara mati';
    if (on) SFX.ensure();
  }
  soundBtn.onclick = () => setSound(!state.sound);
  gSound.onclick = () => setSound(!state.sound);

  /* =========================================================
     Mode jaga
     ========================================================= */
  const TIPS = [
    'Lihat sesuatu yang jauh selama 20 detik.', 'Turunkan bahu. Tarik napas pelan.', 'Minum air dulu.',
    'Kedipkan mata beberapa kali.', 'Berdiri dan regangkan punggung.', 'Putar pergelangan tangan pelan-pelan.',
    'Tutup mata sebentar. Biar dia yang jaga.', 'Lemaskan rahang. Kamu menggigitnya dari tadi.'
  ];
  const G = { on: false, done: false, leaving: false };
  const gStage = new Stage(gWorld, {
    slot: $('gSlot'), bubble: $('gBubble'), fx: $('gFx'), pettable: true,
    onBoop: (st, e) => { activity(); boop(st, e); },
    onSlam: (st, side) => {
      shake(); SFX.play('thud');
      const R = st.def.rig['paw' + side], pt = st.rig.toScreen(R[0], R[1] - 14), L = st.local(pt.x, pt.y);
      st.fx('dust', L.x, L.y, 8, 44);
    }
  });
  gStage.active = false;

  function shake() { if (RM) return; gWorld.classList.remove('shake'); void gWorld.offsetWidth; gWorld.classList.add('shake'); }
  function requestFS() {
    const el = document.documentElement;
    if (!el.requestFullscreen || document.fullscreenElement) return;
    el.requestFullscreen().then(() => { gFs.hidden = true; }).catch(() => { gFs.hidden = false; });
  }
  function notify(title, body) {
    if (!document.hidden || !('Notification' in window) || Notification.permission !== 'granted') return;
    try { new Notification(title, { body }); } catch (e) { /* abaikan */ }
  }
  function showTip() {
    gTip.classList.remove('in');
    setTimeout(() => { gTip.textContent = TIPS[G.tipI++ % TIPS.length]; gTip.classList.add('in'); }, 350);
  }

  function startGuard(auto) {
    stopWaiting();
    const def = PETS[state.pet];
    Object.assign(G, {
      on: true, done: false, leaving: false, def, attempts: 0, hist: [], lastAtt: 0, lastAct: performance.now(), sleeping: false, awayAt: 0,
      dur: state.mins * 60, endAt: Date.now() + state.mins * 60000, startAt: Date.now(), tipI: Math.floor(Math.random() * TIPS.length)
    });
    guard.style.setProperty('--glow', def.glow);
    guard.classList.add('on'); guard.classList.remove('done'); document.body.classList.add('guarding');
    for (const st of stages) if (st.group === 'setup') st.active = false;
    hero.hideBubble();
    gStage.active = true; gStage.mount(def); gStage.rig.setBase('watch');
    who.textContent = `${def.name} sedang bertugas`; gCount.textContent = ''; exitLabel.textContent = 'Tahan untuk berhenti';
    fill.style.transform = 'scaleX(0)'; gProg.style.transform = 'scaleX(0)'; gFs.hidden = true;
    SFX.ensure();
    if (auto) { if (document.documentElement.requestFullscreen) gFs.hidden = false; } else requestFS();

    G.ac = new AbortController(); const sig = { signal: G.ac.signal };
    addEventListener('pointermove', onGuardMove, { signal: G.ac.signal, passive: true });
    addEventListener('keydown', onGuardKey, sig);
    addEventListener('blur', onAway, sig); addEventListener('focus', onBack, sig);
    document.addEventListener('visibilitychange', () => (document.hidden ? onAway() : onBack()), sig);
    document.addEventListener('fullscreenchange', onFsChange, sig);
    guard.addEventListener('pointerdown', onGuardDown, sig);

    G.greet = setTimeout(() => { if (G.on && !G.done) { greet(gStage); SFX.voice(def); } }, RM ? 200 : 1000);
    G.tick = setInterval(tick, 250); tick();
    showTip(); G.tipT = setInterval(showTip, 20000);
    G.idleT = setInterval(() => {
      if (G.on && !G.done && !G.sleeping && !holding && Math.random() < .6) { gStage.say(pick(def.lines.idle)); if (Math.random() < .35) SFX.voice(def); }
    }, 28000);
  }

  function tick() {
    if (!G.on || G.done || G.leaving) return;
    const left = Math.max(0, Math.ceil((G.endAt - Date.now()) / 1000));
    clock.textContent = fmt(left);
    gProg.style.transform = `scaleX(${(1 - left / G.dur).toFixed(4)})`;
    document.title = `${fmt(left)} · ${G.def.name} jaga`;
    if (left <= 0) { finish(); return; }
    const m = gStage.rig.mood;
    if (!G.sleeping && !holding && performance.now() - G.lastAct > 22000 && (m === 'watch' || m === 'calm')) sleep();
  }
  function activity() { G.lastAct = performance.now(); if (G.sleeping && !G.done) wake(false); }
  function sleep() {
    G.sleeping = true; const r = gStage.rig;
    r.setBase('sleepy'); r.moodUntil = 0; r.setMood('sleepy');
    gStage.say(pick(G.def.lines.sleep));
    clearInterval(G.zzz); G.zzz = setInterval(() => { const h = gStage.headPt(.74, .2); gStage.fx('z', h.x, h.y); }, 1300);
  }
  function wake(silent) {
    G.sleeping = false; clearInterval(G.zzz);
    const r = gStage.rig; r.setBase(G.done ? 'happy' : 'watch'); r.setMood('shock', .6);
    if (!silent) gStage.say(pick(G.def.lines.wake));
  }
  function onGuardMove(e) { activity(); if (e.clientY < 16) attempt('top'); }
  function onGuardKey(e) {
    if (e.target === exitBtn && (e.key === ' ' || e.key === 'Enter')) return;
    activity(); attempt('key');
  }
  function onAway() { if (G.on && !G.awayAt) G.awayAt = performance.now(); }
  function onBack() {
    if (!G.awayAt) return;
    const gone = performance.now() - G.awayAt; G.awayAt = 0;
    if (gone > 1200) attempt('back');
  }
  function onFsChange() {
    if (!G.on || G.leaving) return;
    if (document.fullscreenElement) { gFs.hidden = true; return; }
    gFs.hidden = false; attempt('fs');
  }
  function onGuardDown(e) {
    if (e.target.closest('.g-foot')) return;
    activity();
    if (!G.done && !gFs.hidden) requestFS();
  }

  /* teguran bertingkat: melotot → menggeram → menggebrak → mendekat */
  function attempt(kind) {
    if (!G.on || G.done || G.leaving || holding) return;
    const n = performance.now(); if (n - G.lastAtt < 1400) return; G.lastAtt = n;
    if (G.sleeping) wake(true);
    G.attempts++; G.hist = G.hist.filter((x) => n - x < 45000); G.hist.push(n);
    const c = G.hist.length, r = gStage.rig, L = G.def.lines, sfx = G.def.sfx, h = gStage.headPt(.86, .08);
    gCount.textContent = `Coba kabur: ${G.attempts}×`;
    if (c >= 5) { r.setMood('furious', 3.4); r.doAct('slam'); gStage.say(pick(L.close)); SFX.voice(G.def, 'angry'); gStage.fx('anger', h.x, h.y); }
    else if (c >= 3) { r.setMood('angry', 2.8); r.doAct('slam'); gStage.say(pick(L.slam)); }
    else if (c === 2) { r.setMood('angry', 2.4); gStage.say(pick(kind === 'back' ? L.back : L.angry)); SFX.voice(G.def, 'angry'); gStage.fx('anger', h.x, h.y); }
    else { r.setMood('angry', 2); gStage.say(pick(kind === 'back' ? L.back : L.escape)); SFX.voice(G.def); }
  }

  /* tahan tiga detik untuk berhenti */
  let holding = false, holdStart = 0, holdRaf = 0, holdStep = 0;
  function holdBegin(e) {
    if (!G.on || G.leaving || G.done || holding) return;
    if (e && e.pointerId != null) { e.preventDefault(); try { exitBtn.setPointerCapture(e.pointerId); } catch (_) { /* abaikan */ } }
    holding = true; holdStart = performance.now(); holdStep = 0; activity();
    const r = gStage.rig; r.setMood('shock'); gStage.say(pick(G.def.lines.hold));
    const step = () => {
      if (!holding) return;
      const pct = Math.min(1, (performance.now() - holdStart) / 3000);
      fill.style.transform = `scaleX(${pct.toFixed(3)})`;
      if (pct > .5 && holdStep === 0) { holdStep = 1; r.setMood('sad'); }
      if (pct >= 1) { holding = false; fill.style.transform = 'scaleX(0)'; quitEarly(); return; }
      holdRaf = requestAnimationFrame(step);
    };
    holdRaf = requestAnimationFrame(step);
  }
  function holdEnd() {
    if (!holding) return;
    holding = false; cancelAnimationFrame(holdRaf); fill.style.transform = 'scaleX(0)';
    const r = gStage.rig; r.setMood(r.base); gStage.say(pick(G.def.lines.stay));
  }
  exitBtn.addEventListener('pointerdown', holdBegin);
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => exitBtn.addEventListener(ev, holdEnd));
  exitBtn.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat && !G.done) { e.preventDefault(); holdBegin(); } });
  exitBtn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') holdEnd(); });
  exitBtn.addEventListener('click', () => { if (G.done && !G.leaving) leaveGuard('done'); });
  gFs.addEventListener('click', requestFS);

  function quitEarly() {
    G.leaving = true;
    const r = gStage.rig; r.setBase('sad'); r.setMood('sad');
    gStage.say(pick(G.def.lines.quit)); SFX.voice(G.def, 'angry');
    setTimeout(() => leaveGuard('quit'), 1500);
  }
  function finish() {
    G.done = true; clearInterval(G.tick); clearInterval(G.idleT);
    if (G.sleeping) { G.sleeping = false; clearInterval(G.zzz); }
    guard.classList.add('done'); clock.textContent = 'Selesai'; gProg.style.transform = 'scaleX(1)';
    document.title = 'Selesai · ' + BASE_TITLE;
    const r = gStage.rig; r.moodUntil = 0; r.setBase('happy'); r.setMood('happy'); if (G.def.happyAct) r.doAct(G.def.happyAct);
    const line = pick(G.def.lines.done);
    gStage.say(line, 5200);
    SFX.play('chime'); setTimeout(() => SFX.voice(G.def), 520);
    const h = gStage.headPt(.5, .25); gStage.fx('spark', h.x, h.y, 9, 140);
    exitLabel.textContent = 'Kembali kerja'; who.textContent = `${G.def.name} selesai bertugas`;
    notify('Istirahat selesai', `${G.def.name}: ${line}`);
  }
  function leaveGuard(reason) {
    G.leaving = true;
    [G.tick, G.idleT, G.tipT, G.zzz].forEach(clearInterval); clearTimeout(G.greet);
    if (G.ac) G.ac.abort();
    gStage.hideBubble();
    const elapsed = Math.round((Date.now() - G.startAt) / 1000);
    gStage.rig.leave().then(() => {
      guard.classList.remove('on', 'done'); document.body.classList.remove('guarding');
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      gStage.active = false; gStage.unmount();
      for (const st of stages) if (st.group === 'setup') { st.active = true; if (st.rig) st.rig.measure(); }
      G.on = false; G.leaving = false; document.title = BASE_TITLE;
      if (reason === 'done') toast(G.attempts ? `Istirahat ${state.mins} menit selesai. Coba kabur ${G.attempts}×.` : `Istirahat ${state.mins} menit selesai, tanpa sekali pun coba kabur.`);
      else toast(`Berhenti setelah ${fmt(elapsed)}. ${G.def.name} sedikit kecewa.`);
      if (hero.rig) setTimeout(() => hero.say(reason === 'done' ? 'Selamat datang kembali.' : 'Lain kali sampai habis, ya.'), 400);
      if (state.every) startWaiting(false);
    });
  }

  /* =========================================================
     Jadwal otomatis
     ========================================================= */
  const W = { on: false, at: 0, int: 0 };
  function startWaiting(user) {
    const def = PETS[state.pet];
    W.on = true; W.at = Date.now() + state.every * 60000; waitbar.hidden = false; wbPet.textContent = def.name;
    clearInterval(W.int); W.int = setInterval(waitTick, 500); waitTick();
    if (user) {
      toast(`Oke. ${def.name} datang ${state.every} menit lagi.`);
      try {
        if ('Notification' in window && Notification.permission === 'default') { const p = Notification.requestPermission(); if (p && p.catch) p.catch(() => {}); }
      } catch (e) { /* abaikan */ }
    }
  }
  function waitTick() {
    if (!W.on) return;
    const left = Math.max(0, Math.ceil((W.at - Date.now()) / 1000));
    wbClock.textContent = fmt(left); document.title = `${fmt(left)} lagi · ${BASE_TITLE}`;
    if (left <= 0) { const def = PETS[state.pet]; notify('Waktunya istirahat', `${def.name} sudah duduk di layarmu.`); startGuard(true); }
  }
  function stopWaiting() { W.on = false; clearInterval(W.int); waitbar.hidden = true; if (!G.on) document.title = BASE_TITLE; }
  $('wbNow').onclick = () => { SFX.ensure(); startGuard(false); };
  $('wbCancel').onclick = () => { stopWaiting(); toast('Jadwal dibatalkan.'); };

  goBtn.onclick = () => {
    SFX.ensure();
    if (G.on) return;
    if (state.every) startWaiting(true); else startGuard(false);
  };

  /* ---------- mulai ---------- */
  setSound(state.sound);
  updateGo();
  showPanel(PETS[state.pet]);
  hero.mount(PETS[state.pet]);
  setTimeout(() => { if (!G.on && hero.rig) greet(hero); }, 1100);
  PI.startLoop();
})();
