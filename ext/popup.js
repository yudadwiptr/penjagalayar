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

  const state = { pet: order[0], mins: 5, every: 0, sound: true };
  let session = null, nextAt = null;

  const panel = $('panel'), petsEl = $('pets'), goBtn = $('go'), soundBtn = $('sound');
  const statusBox = $('statusBox'), stLabel = $('stLabel'), stClock = $('stClock'), stNow = $('stNow'), stStop = $('stStop');

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
    soundBtn.textContent = state.sound ? 'Suara: Nyala' : 'Suara: Mati';
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

  stStop.addEventListener('click', async () => {
    const type = session && session.active && Date.now() < session.endAt ? 'ended' : 'cancel';
    const res = await chrome.runtime.sendMessage({ type });
    session = res && res.session;
    nextAt = res && res.nextAt;
    tickStatus();
  });

  (async () => {
    const data = await chrome.storage.local.get(['settings', 'session', 'nextAt']);
    if (data.settings) Object.assign(state, data.settings);
    if (!PETS[state.pet]) state.pet = order[0];
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

