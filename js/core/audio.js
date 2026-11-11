/* Suara sintetis lewat Web Audio. Tidak ada file audio: setiap suara dibangun dari osilator dan noise. */
(() => {
  'use strict';

  function env(g, t, a, peak, hold, rel) {
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.setValueAtTime(peak, t + a + hold);
    g.gain.exponentialRampToValueAtTime(.0001, t + a + hold + rel);
  }

  const SFX = {
    ctx: null, out: null, on: true,
    ensure() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        this.ctx = new AC();
        this.out = this.ctx.createGain(); this.out.gain.value = .45; this.out.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return this.ctx;
    },
    play(name) {
      if (!this.on || !this.ctx) return;
      try { VOICES[name] && VOICES[name](this.ctx, this.out, this.ctx.currentTime + .01); } catch (e) { /* abaikan */ }
    },
    /* Suara khas karakter. kind: 'voice' | 'angry' | 'happy'.
       Kalau ada file assets/suara/<kunci>.mp3 (voice), <kunci>-marah.mp3 (angry) atau <kunci>-senang.mp3 (happy),
       file itu yang diputar; kalau tidak ada, pakai suara sintetis def.sfx[kind]. */
    files: {},
    voice(def, kind = 'voice') {
      if (!this.on) return;
      const name = def.key + ({ voice: '', angry: '-marah', happy: '-senang' }[kind] || '');
      const synth = () => this.play(def.sfx[kind] || def.sfx.voice);
      const key = name;
      if (PI.soundFiles && !PI.soundFiles.includes(name)) return synth();
      if (this.files[key] === 'missing') return synth();
      let done = false;
      const miss = () => { if (done) return; done = true; this.files[key] = 'missing'; synth(); };
      try {
        const a = new Audio(`${PI.assetBase || ''}assets/suara/${name}.mp3`);
        a.volume = .85;
        a.addEventListener('error', miss, { once: true });
        const p = a.play();
        if (p && p.then) p.then(() => { done = true; this.files[key] = 'ok'; }).catch((e) => { if (e && e.name === 'NotAllowedError') done = true; else miss(); });
      } catch (e) { miss(); }
    },
    noise(c, dur) {
      const b = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const s = c.createBufferSource(); s.buffer = b; return s;
    }
  };

  /* helper: satu osilator → filter → gain */
  function tone(c, out, t, { type = 'sine', freqs, filter, q = 1, a = .02, peak = .3, hold = .1, rel = .1 }) {
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freqs[0][1], t);
    for (const [dt, f] of freqs.slice(1)) o.frequency.linearRampToValueAtTime(f, t + dt);
    let node = o;
    if (filter) { const f = c.createBiquadFilter(); f.type = filter[0]; f.frequency.value = filter[1]; f.Q.value = q; o.connect(f); node = f; }
    node.connect(g); g.connect(out); env(g, t, a, peak, hold, rel);
    o.start(t); o.stop(t + a + hold + rel + .05);
    return o;
  }

  const VOICES = {
    meow(c, out, t) {
      const o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
      o.type = 'sawtooth'; f.type = 'bandpass'; f.Q.value = 3; o.connect(f); f.connect(g); g.connect(out);
      o.frequency.setValueAtTime(380, t); o.frequency.linearRampToValueAtTime(720, t + .16); o.frequency.linearRampToValueAtTime(560, t + .42); o.frequency.linearRampToValueAtTime(430, t + .62);
      f.frequency.setValueAtTime(600, t); f.frequency.linearRampToValueAtTime(1800, t + .18); f.frequency.linearRampToValueAtTime(900, t + .62);
      env(g, t, .05, .4, .3, .28); o.start(t); o.stop(t + .7);
    },
    purr(c, out, t) {
      const n = SFX.noise(c, 1.7), f = c.createBiquadFilter(), am = c.createGain(), lfo = c.createOscillator(), lg = c.createGain(), g = c.createGain();
      f.type = 'lowpass'; f.frequency.value = 300; am.gain.value = .5; lfo.frequency.value = 24; lg.gain.value = .5;
      lfo.connect(lg); lg.connect(am.gain); n.connect(f); f.connect(am); am.connect(g); g.connect(out);
      env(g, t, .2, 1.2, 1.0, .4); n.start(t); lfo.start(t); n.stop(t + 1.7); lfo.stop(t + 1.7);
    },
    honk(c, out, t) {
      for (const [dt, p] of [[0, 1], [.26, .93]]) {
        const s = t + dt, o1 = c.createOscillator(), o2 = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
        o1.type = o2.type = 'sawtooth';
        for (const [o, k] of [[o1, 1], [o2, 1.02]]) { o.frequency.setValueAtTime(300 * p * k, s); o.frequency.linearRampToValueAtTime(345 * p * k, s + .06); o.frequency.linearRampToValueAtTime(250 * p * k, s + .22); }
        f.type = 'bandpass'; f.frequency.value = 1100; f.Q.value = 2.2;
        o1.connect(f); o2.connect(f); f.connect(g); g.connect(out); env(g, s, .02, .5, .12, .08);
        o1.start(s); o2.start(s); o1.stop(s + .26); o2.stop(s + .26);
      }
    },
    hiss(c, out, t) {
      const n = SFX.noise(c, .9), f = c.createBiquadFilter(), g = c.createGain();
      f.type = 'highpass'; f.frequency.value = 2600; n.connect(f); f.connect(g); g.connect(out);
      env(g, t, .06, .3, .45, .25); n.start(t); n.stop(t + .9);
    },
    bark(c, out, t) {
      for (const dt of [0, .2]) tone(c, out, t + dt, { type: 'sawtooth', freqs: [[0, 640], [.12, 260]], filter: ['bandpass', 1000], q: 1.4, a: .008, peak: .55, hold: .03, rel: .1 });
    },
    growl(c, out, t) {
      const o = c.createOscillator(), f = c.createBiquadFilter(), am = c.createGain(), lfo = c.createOscillator(), lg = c.createGain(), g = c.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(88, t); o.frequency.linearRampToValueAtTime(70, t + .9);
      f.type = 'lowpass'; f.frequency.value = 440; am.gain.value = .6; lfo.frequency.value = 18; lg.gain.value = .4;
      lfo.connect(lg); lg.connect(am.gain); o.connect(f); f.connect(am); am.connect(g); g.connect(out);
      env(g, t, .1, .7, .55, .3); o.start(t); lfo.start(t); o.stop(t + 1); lfo.stop(t + 1);
    },
    huff(c, out, t) {
      const n = SFX.noise(c, .45), f = c.createBiquadFilter(), g = c.createGain();
      f.type = 'lowpass'; f.frequency.value = 800; n.connect(f); f.connect(g); g.connect(out);
      env(g, t, .03, .5, .08, .28); n.start(t); n.stop(t + .45);
    },
    squeak(c, out, t) {
      [0, .13, .26].forEach((dt, i) => tone(c, out, t + dt, { freqs: [[0, 900 + i * 40], [.05, 1350 + i * 60], [.1, 1050]], a: .01, peak: .28, hold: .05, rel: .05 }));
    },
    bleat(c, out, t) {
      const o = c.createOscillator(), v = c.createOscillator(), vg = c.createGain(), f = c.createBiquadFilter(), g = c.createGain();
      o.type = 'triangle'; o.frequency.value = 360; v.frequency.value = 8; vg.gain.value = 28; v.connect(vg); vg.connect(o.frequency);
      f.type = 'lowpass'; f.frequency.value = 1600; o.connect(f); f.connect(g); g.connect(out);
      env(g, t, .04, .45, .25, .15); o.start(t); v.start(t); o.stop(t + .5); v.stop(t + .5);
    },
    ooh(c, out, t) {
      tone(c, out, t, { type: 'triangle', freqs: [[0, 200], [.18, 300], [.32, 280]], filter: ['lowpass', 900], a: .06, peak: .5, hold: .18, rel: .14 });
      tone(c, out, t + .38, { type: 'triangle', freqs: [[0, 240], [.16, 360], [.3, 330]], filter: ['lowpass', 1000], a: .06, peak: .5, hold: .16, rel: .16 });
    },
    hoot(c, out, t) {
      tone(c, out, t, { freqs: [[0, 340], [.2, 380]], filter: ['lowpass', 800], a: .07, peak: .5, hold: .12, rel: .14 });
      tone(c, out, t + .42, { freqs: [[0, 360], [.3, 320]], filter: ['lowpass', 800], a: .07, peak: .5, hold: .22, rel: .2 });
    },
    crow(c, out, t) {
      const o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
      o.type = 'sawtooth'; f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 1.6;
      o.connect(f); f.connect(g); g.connect(out);
      const seg = [[0, 560], [.13, 680], [.26, 620], [.39, 760]];
      g.gain.setValueAtTime(.0001, t);
      for (const [dt, fr] of seg) {
        o.frequency.setValueAtTime(fr, t + dt);
        g.gain.exponentialRampToValueAtTime(.45, t + dt + .02);
        g.gain.exponentialRampToValueAtTime(.12, t + dt + .11);
      }
      o.frequency.linearRampToValueAtTime(820, t + .55); o.frequency.linearRampToValueAtTime(520, t + .95);
      g.gain.exponentialRampToValueAtTime(.45, t + .56); g.gain.setValueAtTime(.45, t + .8); g.gain.exponentialRampToValueAtTime(.0001, t + 1.0);
      o.start(t); o.stop(t + 1.05);
    },
    cluck(c, out, t) {
      [0, .11, .24].forEach((dt) => tone(c, out, t + dt, { type: 'sawtooth', freqs: [[0, 720], [.06, 480]], filter: ['bandpass', 1200], q: 2, a: .005, peak: .4, hold: .02, rel: .05 }));
    },
    croak(c, out, t) {
      for (const dt of [0, .26]) {
        const s = t + dt, o = c.createOscillator(), f = c.createBiquadFilter(), am = c.createGain(), lfo = c.createOscillator(), lg = c.createGain(), g = c.createGain();
        o.type = 'sawtooth'; o.frequency.setValueAtTime(130, s); o.frequency.linearRampToValueAtTime(105, s + .18);
        f.type = 'lowpass'; f.frequency.value = 700; am.gain.value = .5; lfo.type = 'square'; lfo.frequency.value = 42; lg.gain.value = .5;
        lfo.connect(lg); lg.connect(am.gain); o.connect(f); f.connect(am); am.connect(g); g.connect(out);
        env(g, s, .02, .6, .12, .06); o.start(s); lfo.start(s); o.stop(s + .22); lfo.stop(s + .22);
      }
    },
    hmm(c, out, t) {
      tone(c, out, t, { freqs: [[0, 150], [.2, 172], [.45, 138]], filter: ['lowpass', 600], a: .06, peak: .55, hold: .3, rel: .15 });
      tone(c, out, t, { type: 'triangle', freqs: [[0, 300], [.2, 344], [.45, 276]], filter: ['lowpass', 700], a: .06, peak: .12, hold: .3, rel: .15 });
    },
    hmm2(c, out, t) {
      tone(c, out, t, { freqs: [[0, 230], [.2, 262], [.45, 214]], filter: ['lowpass', 900], a: .06, peak: .5, hold: .3, rel: .15 });
      tone(c, out, t, { type: 'triangle', freqs: [[0, 460], [.2, 524], [.45, 428]], filter: ['lowpass', 1000], a: .06, peak: .1, hold: .3, rel: .15 });
    },
    ahem(c, out, t) {
      const n = SFX.noise(c, .12), f = c.createBiquadFilter(), g = c.createGain();
      f.type = 'bandpass'; f.frequency.value = 700; n.connect(f); f.connect(g); g.connect(out);
      env(g, t, .005, .6, .03, .06); n.start(t); n.stop(t + .12);
      tone(c, out, t + .14, { freqs: [[0, 180], [.18, 140]], filter: ['lowpass', 700], a: .02, peak: .5, hold: .1, rel: .1 });
    },
    thud(c, out, t) {
      tone(c, out, t, { freqs: [[0, 140], [.25, 40]], a: .005, peak: 1, hold: .02, rel: .3 });
      const n = SFX.noise(c, .2), f = c.createBiquadFilter(), g2 = c.createGain();
      f.type = 'lowpass'; f.frequency.value = 600; n.connect(f); f.connect(g2); g2.connect(out);
      env(g2, t, .003, .45, .01, .12); n.start(t); n.stop(t + .2);
    },
    chime(c, out, t) {
      [660, 880, 1320].forEach((fq, i) => tone(c, out, t + i * .14, { freqs: [[0, fq]], a: .01, peak: .28, hold: .05, rel: .9 }));
    },
    pop(c, out, t) {
      tone(c, out, t, { freqs: [[0, 500], [.07, 1200]], a: .005, peak: .3, hold: .02, rel: .06 });
    }
  };

  PI.SFX = SFX;
})();
