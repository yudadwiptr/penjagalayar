/* Pawang Layar — halaman jaga cadangan (dipakai saat tab aktif adalah chrome:// atau halaman khusus). */
(async () => {
  'use strict';
  PI.assetBase = chrome.runtime.getURL('');
  const { session, settings } = await chrome.storage.local.get(['session', 'settings']);
  const cfg = (session && session.active) ? session : {
    pet: (settings && settings.pet) || 'oyen',
    sound: settings ? settings.sound !== false : true,
    startAt: Date.now(),
    endAt: Date.now() + ((settings && settings.mins) || 5) * 60000
  };
  const def = PI.chars[cfg.pet] || PI.chars.oyen;

  PI.Guard.create({
    host: document.body,
    def,
    startAt: cfg.startAt,
    endAt: cfg.endAt,
    sound: cfg.sound,
    setTitle: true,
    onSound: (on) => chrome.runtime.sendMessage({ type: 'sound', on }).catch(() => {}),
    onLeave: (reason, stats) => {
      chrome.runtime.sendMessage({ type: 'ended', reason, attempts: stats.attempts }).catch(() => {});
      window.close();
    }
  });
})();

