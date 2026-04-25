class AudioManager {
    constructor() {
        this.bgmVolume = 0.5;
        this.sfxVolume = 0.8;
        
        this.bgmPlayer = new Audio();
        this.bgmPlayer.loop = true;
        this.ambientNodes = null;

        this.bgmTracks = {
            main: "", // Placeholder for main menu / hub
            investigation: "", // Placeholder for reading documents
            social: "", // Placeholder for phone
            trial: "" // Placeholder for courtroom
        };

        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    setBgmVolume(val) {
        this.bgmVolume = val;
        this.bgmPlayer.volume = val;
        if (this.ambientNodes) {
            this.ambientNodes.master.gain.setValueAtTime(val * 0.045, this.audioCtx.currentTime);
        }
    }

    setSfxVolume(val) {
        this.sfxVolume = val;
    }

    playBGM(trackName) {
        if (this.bgmVolume === 0) return;
        if (!this.bgmTracks[trackName]) {
            this.playAmbient(trackName);
            return;
        }
        this.stopAmbient();
        if (this.bgmPlayer.src !== this.bgmTracks[trackName]) {
            this.bgmPlayer.src = this.bgmTracks[trackName];
            this.bgmPlayer.play().catch(e => console.log("BGM play prevented by browser policy", e));
        }
    }

    stopBGM() {
        this.bgmPlayer.pause();
        this.stopAmbient();
    }

    // --- Web Audio API Synth SFX ---
    
    playSynthTone(frequency, type, duration, volMod = 1) {
        if (this.sfxVolume === 0 || !this.audioCtx) return;
        
        // Resume context if suspended (browser policy)
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        const gainNode = this.audioCtx.createGain();

        gainNode.gain.setValueAtTime(this.sfxVolume * volMod, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);

        if (type === 'noise') {
            const bufferSize = this.audioCtx.sampleRate * duration;
            const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
            const output = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
            const noise = this.audioCtx.createBufferSource();
            noise.buffer = buffer;
            noise.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);
            noise.start();
            noise.stop(this.audioCtx.currentTime + duration);
            return;
        }

        const osc = this.audioCtx.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
    }

    playAmbient(trackName) {
        if (!this.audioCtx || this.bgmVolume === 0) return;
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        this.stopAmbient();

        const presets = {
            main: [164.81, 196.00, 246.94],
            tutorial: [146.83, 185.00, 220.00],
            investigation: [130.81, 196.00, 261.63],
            social: [220.00, 277.18, 329.63],
            trial: [98.00, 146.83, 196.00],
            ending: [196.00, 246.94, 329.63]
        };
        const freqs = presets[trackName] || presets.main;
        const master = this.audioCtx.createGain();
        master.gain.setValueAtTime(this.bgmVolume * 0.045, this.audioCtx.currentTime);
        master.connect(this.audioCtx.destination);

        const oscillators = freqs.map((freq, idx) => {
            const osc = this.audioCtx.createOscillator();
            osc.type = idx === 0 ? 'sine' : 'triangle';
            osc.frequency.value = freq;
            osc.detune.value = idx * 4;
            osc.connect(master);
            osc.start();
            return osc;
        });

        this.ambientNodes = { master, oscillators };
    }

    stopAmbient() {
        if (!this.ambientNodes) return;
        this.ambientNodes.oscillators.forEach(osc => {
            try { osc.stop(); } catch(e) {}
        });
        this.ambientNodes.master.disconnect();
        this.ambientNodes = null;
    }

    playClick() {
        this.playSynthTone(600, 'sine', 0.1, 0.5);
    }

    playTypewriter() {
        this.playSynthTone(800 + Math.random() * 200, 'triangle', 0.05, 0.1);
    }

    playPageTurn() {
        this.playSynthTone(200, 'noise', 0.15, 0.3); // simple approximation
    }

    playEvidenceCollect() {
        // Two quick tones
        this.playSynthTone(880, 'sine', 0.1);
        setTimeout(() => this.playSynthTone(1100, 'sine', 0.2), 100);
    }

    playError() {
        this.playSynthTone(150, 'sawtooth', 0.3, 0.5);
    }

    playDialogOpen() {
        this.playSynthTone(392, 'sine', 0.08, 0.25);
        setTimeout(() => this.playSynthTone(523.25, 'sine', 0.12, 0.2), 70);
    }

    playCaseOpen() {
        this.playSynthTone(180, 'noise', 0.18, 0.22);
        setTimeout(() => this.playSynthTone(320, 'triangle', 0.16, 0.25), 120);
    }

    playTrialStart() {
        this.playSynthTone(98, 'sawtooth', 0.25, 0.24);
        setTimeout(() => this.playSynthTone(196, 'sawtooth', 0.22, 0.2), 180);
    }
    
    playSuccess() {
        this.playSynthTone(523.25, 'sine', 0.1); // C5
        setTimeout(() => this.playSynthTone(659.25, 'sine', 0.1), 100); // E5
        setTimeout(() => this.playSynthTone(783.99, 'sine', 0.3), 200); // G5
    }
}

window.audio = new AudioManager();
