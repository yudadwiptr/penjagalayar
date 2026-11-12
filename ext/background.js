/* Pawang Layar — service worker extension.
   - Menyimpan pengaturan & sesi istirahat di chrome.storage.local
   - Jadwal otomatis pakai chrome.alarms (tetap jalan walau tidak ada tab Pawang Layar)
   - Saat istirahat: menyisipkan overlay transparan ke tab yang aktif, dan ikut pindah kalau pengguna ganti tab */

const CORE = ['js/core/util.js', 'js/core/audio.js', 'assets/suara/daftar.js', 'js/core/rig.js', 'js/core/stage.js'];
const TAIL = ['js/core/guard.js', 'ext/content.js'];
const DEFAULTS = { pet: 'oyen', mins: 5, every: 0, sound: true, pinHash: '' };
const A_NEXT = 'pawang-next', A_EXPIRE = 'pawang-expire', A_BADGE = 'pawang-badge';

/* rumus yang sama dengan PI.util.pinHash di js/core/util.js */
async function hashPin(pin) {
  const p = String(pin || '').trim();
  if (!p) return '';
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('pawang-layar:' + p));
  return [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
async function getSettings() {
  const { settings } = await chrome.storage.local.get('settings');
  const s = { ...DEFAULTS, ...(settings || {}) };
  if ('pin' in s) {   // versi lama menyimpan sandi apa adanya: ganti dengan hash
    if (s.pin && !s.pinHash) s.pinHash = await hashPin(s.pin);
    delete s.pin;
    await chrome.storage.local.set({ settings: s });
  }
  return s;
}
async function getSession() {
  const { session } = await chrome.storage.local.get('session');
  return session && session.active ? session : null;
}

/* ---------- menyisipkan overlay ---------- */
async function inject(tabId, sess, escaped) {
  try {
    const [probe] = await chrome.scripting.executeScript({
      target: { tabId }, injectImmediately: true,
      func: (pet) => ({ pi: !!window.PI, ov: !!window.PawangOverlay, ch: !!(window.PI && PI.chars && PI.chars[pet]) }),
      args: [sess.pet]
    });
    const st = probe.result || {};
    const files = [];
    if (!st.pi) files.push(...CORE);
    if (!st.ch) files.push(`js/characters/${sess.pet}.js`);
    if (!st.ov) files.push(...TAIL);
    if (files.length) await chrome.scripting.executeScript({ target: { tabId }, files, injectImmediately: true });
    await chrome.scripting.executeScript({
      target: { tabId }, injectImmediately: true,
      func: (cfg) => window.PawangOverlay && window.PawangOverlay.show(cfg),
      args: [{ pet: sess.pet, startAt: sess.startAt, endAt: sess.endAt, sound: sess.sound, pinHash: sess.pinHash || '', escaped: !!escaped }]
    });
    return true;
  } catch (e) {
    return false; // halaman khusus (chrome://, Web Store, PDF, dll.) tidak bisa disisipi
  }
}

async function hideAll(exceptTabId) {
  const tabs = await chrome.tabs.query({});
  await Promise.all(tabs.filter((t) => t.id !== exceptTabId).map((t) =>
    chrome.scripting.executeScript({ target: { tabId: t.id }, func: () => window.PawangOverlay && window.PawangOverlay.hide() }).catch(() => {})));
}

/* ---------- sesi istirahat ---------- */
async function startBreak() {
  const s = await getSettings(), now = Date.now();
  const sess = { active: true, pet: s.pet, mins: s.mins, sound: s.sound, pinHash: s.pinHash || '', startAt: now, endAt: now + s.mins * 60000 };
  await chrome.storage.local.set({ session: sess, nextAt: null });
  await chrome.alarms.clear(A_NEXT);
  chrome.alarms.create(A_EXPIRE, { when: sess.endAt + 90000 });
  const tabs = await chrome.tabs.query({ active: true });
  let ok = false;
  for (const t of tabs) ok = (await inject(t.id, sess)) || ok;
  if (!ok) {
    // tidak ada tab yang bisa disisipi (misalnya sedang di chrome://newtab): buka halaman jaga milik extension
    await chrome.tabs.create({ url: chrome.runtime.getURL('ext/jaga.html') });
  }
  updateBadge();
}

async function endBreak(fromTabId) {
  const sess = await getSession();
  await chrome.storage.local.set({ session: { ...(sess || {}), active: false } });
  await chrome.alarms.clear(A_EXPIRE);
  await hideAll(fromTabId);
  const s = await getSettings();
  if (s.every) await scheduleNext(s.every); else updateBadge();
}

async function scheduleNext(every) {
  const when = Date.now() + every * 60000;
  await chrome.storage.local.set({ nextAt: when });
  chrome.alarms.create(A_NEXT, { when });
  updateBadge();
}
async function cancelSchedule() {
  await chrome.alarms.clear(A_NEXT);
  await chrome.storage.local.set({ nextAt: null });
  updateBadge();
}

/* ---------- lencana di ikon: menit menuju istirahat berikutnya ---------- */
async function updateBadge() {
  const sess = await getSession();
  const { nextAt } = await chrome.storage.local.get('nextAt');
  let text = '';
  if (sess && Date.now() < sess.endAt) text = '●';
  else if (nextAt) text = Math.max(1, Math.ceil((nextAt - Date.now()) / 60000)) + 'm';
  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color: '#F06A1E' });
}

/* ---------- event ---------- */
chrome.alarms.onAlarm.addListener(async (a) => {
  if (a.name === A_NEXT) startBreak();
  else if (a.name === A_EXPIRE) {
    // tidak ada tab yang melapor selesai (misalnya semua tab ditutup): anggap selesai
    const sess = await getSession();
    if (sess) endBreak();
  } else if (a.name === A_BADGE) updateBadge();
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const sess = await getSession();
  if (sess && Date.now() < sess.endAt) inject(tabId, sess, true);
});
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  /* sisipkan sejak halaman mulai dimuat supaya tidak ada jeda yang bisa dipakai;
     'complete' mengulang sekali lagi kalau sisipan pertama kena dokumen lama */
  if ((info.status !== 'loading' && info.status !== 'complete') || !tab.active) return;
  const sess = await getSession();
  if (sess && Date.now() < sess.endAt) inject(tabId, sess, info.status === 'loading');
});

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  (async () => {
    switch (msg && msg.type) {
      case 'start': await startBreak(); break;
      case 'schedule': { const s = await getSettings(); if (s.every) await scheduleNext(s.every); break; }
      case 'cancel': await cancelSchedule(); break;
      case 'ended': await endBreak(sender.tab && sender.tab.id); break;
      case 'sound': {
        const s = await getSettings();
        await chrome.storage.local.set({ settings: { ...s, sound: !!msg.on } });
        const sess = await getSession();
        if (sess) await chrome.storage.local.set({ session: { ...sess, sound: !!msg.on } });
        break;
      }
    }
    const [session, { nextAt }] = await Promise.all([getSession(), chrome.storage.local.get('nextAt')]);
    reply({ session, nextAt: nextAt || null });
  })();
  return true; // balasan asinkron
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(A_BADGE, { periodInMinutes: 1 });
  updateBadge();
});
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create(A_BADGE, { periodInMinutes: 1 });
  updateBadge();
});
