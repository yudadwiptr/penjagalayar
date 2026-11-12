/* Pawang Layar — popup extension */
(() => {
  'use strict';
  PI.assetBase = chrome.runtime.getURL('');
  const { pick, fmt, $ } = PI.util;
  const { chars: PETS, order, Stage, SFX, interact } = PI;
  const { boop } = interact;

  const DURS = [1, 5, 10, 15, 20, 30];
  const WHENS = [
    { v: 0, label: 'Sekarang' },
    { v: 25, label: 'Tiap 25m' },
    { v: 45, label: 'Tiap 45m' },
    { v: 60, label: 'Tiap 60m' }
  ];

  const state = { pet: order[0], mins: 5, every: 0, sound: true, pinHash: '' };
  let session = null, nextAt = null;

  const panel = $('panel'), petsEl = $('pets'), goBtn = $('go'), soundBtn = $('sound'), pinEl = $('pin');
  const statusBox = $('statusBox'), stLabel = $('stLabel'), stClock = $('stClock'), stNow = $('stNow'), stStop = $('stStop');

  /* ---------- sandi: tombol kunci membuka editor di baris yang sama ---------- */
  const actions = $('actions'), lockBtn = $('lockBtn'), lockLbl = $('lockLbl');
  const pinEdit = $('pinEdit'), pinEye = $('pinEye'), pinBack = $('pinBack'), pinOk = $('pinOk');
  function renderLock() {
    const on = !!state.pinHash;
    lockBtn.setAttribute('aria-pressed', String(on));
    lockLbl.textContent = on ? 'Terkunci' : 'Sandi';
  }
  function setReveal(show) {
    pinEl.classList.toggle('reveal', show);
    pinEye.setAttribute('aria-pressed', String(show));
    pinEye.setAttribute('aria-label', show ? 'Sembunyikan sandi' : 'Tampilkan sandi');
    pinEye.title = show ? 'Sembunyikan sandi' : 'Tampilkan sandi';
  }
  /* Yang disimpan hanya hash sandi, jadi sandi lama tidak pernah ditampilkan: kolomnya selalu mulai kosong.
     Selama penjaga bertugas dengan sandi, editor baru terbuka setelah sandi itu dimasukkan ('verify'). */
  const sessHash = () => (session && (session.pinHash || PI.util.pinHash(session.pin))) || '';
  let pinMode = 'edit';
  function renderPinEdit() {
    const typed = !!pinEl.value.trim();
    if (pinMode === 'verify') {
      pinEl.placeholder = 'Sandi saat ini'; pinOk.textContent = 'Lanjut';
    } else if (state.pinHash) {
      pinEl.placeholder = 'Sandi baru'; pinOk.textContent = typed ? 'Ganti' : 'Hapus';
    } else {
      pinEl.placeholder = 'Sandi untuk berhenti'; pinOk.textContent = 'Simpan';
    }
    pinEl.setAttribute('aria-label', pinEl.placeholder);
  }
  function pinError() {
    pinEdit.classList.remove('err'); void pinEdit.offsetWidth; pinEdit.classList.add('err');
    pinEl.value = ''; renderPinEdit(); pinEl.placeholder = 'Sandi salah, coba lagi'; pinEl.focus();
  }
  function openPin() {
    pinMode = isBreak() && sessHash() ? 'verify' : 'edit';
    actions.hidden = true; pinEdit.hidden = false; pinEdit.classList.remove('err');
    pinEl.value = ''; setReveal(false); renderPinEdit();
    pinEl.focus();
  }
  /* × kembali tanpa mengubah apa pun */
  function closePin() {
    pinEl.value = '';
    pinEdit.hidden = true; actions.hidden = false;
    lockBtn.focus();
  }
  function submitPin() {
    if (pinMode === 'verify') {
      if (PI.util.pinHash(pinEl.value) !== sessHash()) { pinError(); return; }
      pinMode = 'edit'; pinEl.value = ''; pinEdit.classList.remove('err'); setReveal(false); renderPinEdit(); pinEl.focus();
      return;
    }
    state.pinHash = PI.util.pinHash(pinEl.value);   // kosong = tanpa sandi
    saveSettings(); renderLock(); closePin();
  }
  lockBtn.addEventListener('click', openPin);
  pinEl.addEventListener('input', () => { pinEdit.classList.remove('err'); renderPinEdit(); });
  pinEye.addEventListener('click', () => { setReveal(!pinEl.classList.contains('reveal')); pinEl.focus(); });
  pinBack.addEventListener('click', closePin);
  pinEdit.addEventListener('submit', (e) => { e.preventDefault(); submitPin(); });

  /* ---------- sandi untuk mengakhiri penjaga yang sedang bertugas ---------- */
  const unlock = $('unlock'), unlockIn = $('unlockIn');
  function askUnlock(show) {
    statusBox.classList.toggle('asking', show);
    unlock.hidden = !show; unlock.classList.remove('err');
    unlockIn.value = '';
    if (show) unlockIn.focus();
  }
  $('unlockCancel').addEventListener('click', () => askUnlock(false));
  unlockIn.addEventListener('input', () => unlock.classList.remove('err'));
  unlock.addEventListener('submit', (e) => {
    e.preventDefault();
    if (PI.util.pinHash(unlockIn.value) === sessHash()) { askUnlock(false); stopNow(); return; }
    unlock.classList.remove('err'); void unlock.offsetWidth; unlock.classList.add('err');
    unlockIn.value = ''; unlockIn.placeholder = 'Sandi salah, coba lagi'; unlockIn.focus();
  });

  const hero = new Stage(panel, {
    slot: $('hSlot'), bubble: $('hBubble'), fx: $('hFx'),
    pettable: true, onBoop: (st, e) => { SFX.ensure(); boop(st, e); }
  });

  const cards = {};
  for (const key of order) {
    const def = PETS[key];
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'pet';
    b.title = `${def.name} — ${def.species}`;
    b.innerHTML = `<div class="pet-art"></div><b>${def.name}</b>`;
    petsEl.appendChild(b);
    new Stage(b, { slot: b.firstElementChild, viewBox: def.crop, align: 'mid' }).mount(def, true);
    b.addEventListener('click', () => { SFX.ensure(); selectPet(key, true); });
    cards[key] = b;
  }

  function saveSettings() {
    return chrome.storage.local.set({ settings: { ...state } });
  }

  function renderMeta() {
    const def = PETS[state.pet] || PETS[order[0]];
    panel.style.setProperty('--accent', def.accent);
    $('pName').textContent = def.name;
    $('pSpecies').textContent = def.species;
    $('pTag').textContent = def.tag;
    for (const k in cards) cards[k].setAttribute('aria-pressed', String(k === state.pet));
    goBtn.textContent = state.every ? `Jadwalkan ${def.name}` : `Mulai jaga (${state.mins}m)`;
    soundBtn.setAttribute('aria-pressed', String(state.sound));
    soundBtn.title = state.sound ? 'Suara nyala (klik untuk mematikan)' : 'Suara mati (klik untuk menyalakan)';
  }

  function selectPet(key, user) {
    if (!PETS[key]) return;
    const def = PETS[key];
    state.pet = key;
    saveSettings();
    renderMeta();
    hero.mount(def);
    if (user) {
      hero.say(pick(def.lines.greet));
      SFX.voice(def);
    }
  }

  function mkChips(el, items, get, set) {
    el.innerHTML = '';
    for (const it of items) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = it.label;
      b.setAttribute('aria-pressed', String(it.v === get()));
      b.addEventListener('click', () => {
        set(it.v);
        [...el.children].forEach((c) => c.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
      });
      el.appendChild(b);
    }
  }

  function renderChips() {
    mkChips($('dur'), DURS.map((m) => ({ v: m, label: m + 'm' })), () => state.mins, (v) => {
      state.mins = v; saveSettings(); renderMeta();
    });
    mkChips($('when'), WHENS, () => state.every, (v) => {
      state.every = v; saveSettings(); renderMeta();
    });
  }

  function tickStatus() {
    const now = Date.now();
    if (session && session.active && now < session.endAt) {
      const def = PETS[session.pet] || PETS[state.pet];
      statusBox.hidden = false;
      stNow.hidden = true;
      stStop.textContent = 'Akhiri';
      stLabel.textContent = `${def.name} sedang menjaga`;
      stClock.textContent = fmt(Math.max(0, Math.ceil((session.endAt - now) / 1000)));
    } else if (nextAt && now < nextAt) {
      const def = PETS[state.pet];
      statusBox.hidden = false;
      stNow.hidden = false;
      stStop.textContent = 'Batal';
      stLabel.textContent = `${def.name} datang dalam`;
      stClock.textContent = fmt(Math.max(0, Math.ceil((nextAt - now) / 1000)));
    } else {
      statusBox.hidden = true;
    }
    if (!unlock.hidden && !isBreak()) askUnlock(false);
  }

  soundBtn.addEventListener('click', async () => {
    state.sound = !state.sound;
    SFX.on = state.sound;
    if (state.sound) SFX.ensure();
    renderMeta();
    await saveSettings();
    chrome.runtime.sendMessage({ type: 'sound', on: state.sound }).catch(() => {});
  });

  goBtn.addEventListener('click', async () => {
    await saveSettings();
    if (state.every) {
      const res = await chrome.runtime.sendMessage({ type: 'schedule' });
      session = res && res.session;
      nextAt = res && res.nextAt;
      tickStatus();
    } else {
      await chrome.runtime.sendMessage({ type: 'start' });
      window.close();
    }
  });

  stNow.addEventListener('click', async () => {
    await saveSettings();
    await chrome.runtime.sendMessage({ type: 'start' });
    window.close();
  });

  const isBreak = () => !!(session && session.active && Date.now() < session.endAt);
  async function stopNow() {
    const res = await chrome.runtime.sendMessage({ type: isBreak() ? 'ended' : 'cancel' });
    session = res && res.session;
    nextAt = res && res.nextAt;
    tickStatus();
  }
  stStop.addEventListener('click', () => {
    if (isBreak() && sessHash()) askUnlock(true); else stopNow();
  });

  (async () => {
    const data = await chrome.storage.local.get(['settings', 'session', 'nextAt']);
    if (data.settings) Object.assign(state, data.settings);
    if (!PETS[state.pet]) state.pet = order[0];
    if (typeof state.pinHash !== 'string') state.pinHash = '';
    if ('pin' in state) {   // versi lama menyimpan sandi apa adanya: ganti dengan hash
      if (state.pin && !state.pinHash) state.pinHash = PI.util.pinHash(state.pin);
      delete state.pin; saveSettings();
    }
    renderLock();
    session = data.session || null;
    nextAt = data.nextAt || null;
    SFX.on = !!state.sound;

    renderChips();
    renderMeta();
    hero.mount(PETS[state.pet]);
    tickStatus();
    setInterval(tickStatus, 500);
    PI.startLoop();
  })();
})();

