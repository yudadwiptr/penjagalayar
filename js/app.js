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
  const state = { pet: order[0], mins: 5, every: 0, sound: true, pinHash: '' };
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* abaikan */ }
  if (!PETS[state.pet]) state.pet = order[0];
  if (!DURS.includes(state.mins)) state.mins = 5;
  if (!WHENS.some((w) => w.v === state.every)) state.every = 0;
  if (typeof state.pinHash !== 'string') state.pinHash = '';
  if (state.pin) state.pinHash = PI.util.pinHash(state.pin);   // pindahkan sandi lama (teks biasa) ke hash
  const hadPlain = 'pin' in state; delete state.pin;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* abaikan */ } };
  SFX.on = !!state.sound;

  const panel = $('panel'), goBtn = $('go'), goNote = $('goNote'), soundBtn = $('sound'), pinEl = $('pin');
  if (hadPlain) save();
  if (pinEl) {
    /* yang disimpan hanya hash, jadi kolomnya selalu kosong saat dibuka */
    const ph = () => { pinEl.placeholder = state.pinHash ? 'Sandi sudah diatur · ketik untuk mengganti' : 'Kosongkan jika tanpa sandi…'; };
    ph();
    pinEl.addEventListener('input', () => { state.pinHash = PI.util.pinHash(pinEl.value); save(); });
    pinEl.addEventListener('blur', () => { if (state.pinHash) pinEl.value = ''; ph(); });
  }
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
    soundBtn.setAttribute('aria-pressed', String(on));
    if (on) SFX.ensure();
  }
  soundBtn.onclick = () => setSound(!state.sound);

  /* =========================================================
     Mode jaga (logikanya ada di js/core/guard.js)
     ========================================================= */
  const G = { on: false, ctl: null };
  function notify(title, body) {
    if (!document.hidden || !('Notification' in window) || Notification.permission !== 'granted') return;
    try { new Notification(title, { body }); } catch (e) { /* abaikan */ }
  }
  const isTauri = () => !!(window.__TAURI_INTERNALS__ && window.__TAURI_INTERNALS__.invoke);
  const tauriGuard = (active) => {
    if (!isTauri()) return;
    document.documentElement.classList.toggle('tauri-transparent', active);
    window.__TAURI_INTERNALS__.invoke('set_guard_mode', { active }).catch(() => {});
  };

  function startGuard(auto) {
    if (G.on) return;
    stopWaiting();
    const def = PETS[state.pet], now = Date.now(), desktop = isTauri();
    G.on = true;
    for (const st of stages) if (st.group === 'setup') st.active = false;
    hero.hideBubble();
    document.body.classList.add('guarding');
    tauriGuard(true);
    G.ctl = PI.Guard.create({
      host: document.body, def, startAt: now, endAt: now + state.mins * 60000, sound: state.sound, pinHash: state.pinHash,
      fullscreen: !desktop, transparent: desktop, blockInput: desktop, autoStart: !!auto, setTitle: true,
      onSound: (on) => setSound(on),
      onFinish: (line) => notify('Istirahat selesai', `${def.name}: ${line}`),
      onLeave: (reason, s) => {
        tauriGuard(false);
        document.body.classList.remove('guarding');
        for (const st of stages) if (st.group === 'setup') { st.active = true; if (st.rig) st.rig.measure(); }
        G.on = false; G.ctl = null; document.title = BASE_TITLE;
        if (reason === 'done') toast(s.attempts ? `Istirahat ${state.mins} menit selesai. Coba kabur ${s.attempts}×.` : `Istirahat ${state.mins} menit selesai, tanpa sekali pun coba kabur.`);
        else toast(`Berhenti setelah ${fmt(s.elapsed)}. ${def.name} sedikit kecewa.`);
        if (hero.rig) setTimeout(() => hero.say(reason === 'done' ? 'Selamat datang kembali.' : 'Lain kali sampai habis, ya.'), 400);
        if (state.every) startWaiting(false);
      }
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
