/* Pawang Layar — overlay di atas halaman web (disisipkan oleh ext/background.js).
   Penjaga dan timernya dipasang di dalam Shadow DOM supaya CSS situs tidak ikut campur,
   dengan latar transparan: halaman tetap terlihat, tapi tidak bisa diklik/di-scroll sampai istirahat selesai. */
(() => {
  if (window.PawangOverlay) return;
  PI.assetBase = chrome.runtime.getURL('');

  let host = null, guard = null, cssText = null, mounting = false;

  async function loadCss() {
    if (cssText !== null) return cssText;
    try { cssText = await (await fetch(chrome.runtime.getURL('css/guard.css'))).text(); } catch (e) { cssText = ''; }
    return cssText;
  }

  async function show(cfg) {
    if (guard && !guard.closed) { if (cfg.escaped) guard.attempt('back'); return; }
    if (mounting) return;
    const def = PI.chars[cfg.pet];
    if (!def || Date.now() >= cfg.endAt) return;

    mounting = true;
    try {
      const css = await loadCss();
      if (guard && !guard.closed) return;
      cleanup();
      host = document.createElement('pawang-layar');
      host.style.cssText = 'all:initial;position:fixed;inset:0;z-index:2147483647;display:block;';
      const root = host.attachShadow({ mode: 'open' });
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css + '\n:host{all:initial}');
      root.adoptedStyleSheets = [sheet];
      (document.body || document.documentElement).appendChild(host);

      guard = PI.Guard.create({
        host: root, def, startAt: cfg.startAt, endAt: cfg.endAt, sound: cfg.sound, pinHash: cfg.pinHash || '',
        transparent: true, blockInput: true, escaped: cfg.escaped,
        onSound: (on) => chrome.runtime.sendMessage({ type: 'sound', on }).catch(() => {}),
        onLeave: (reason, stats) => {
          chrome.runtime.sendMessage({ type: 'ended', reason, attempts: stats.attempts }).catch(() => {});
          cleanup();
        }
      });
    } finally {
      mounting = false;
    }
  }

  function hide() { if (guard) guard.stop(); cleanup(); }
  function cleanup() { if (host) host.remove(); host = null; guard = null; }

  window.PawangOverlay = { show, hide };
})();
