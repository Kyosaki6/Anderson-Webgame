/* ==============================================================
   RPG MAKER HORROR AUDIO ENGINE
   ============================================================== */
let isAudioMuted = false;
let currentBGMType = null;
let currentAudioElement = null;

// Audio track mapping
const bgmTracks = {
    'ambient': 'assets/audio/bgm_horror_ambient.mp3',
    'house': 'assets/audio/bgm_horror_house.mp3',
    'chase': 'assets/audio/bgm_horror_chase.mp3',
    'dojo': 'assets/audio/bgm_horror_dojo.mp3',
    'boss': 'assets/audio/bgm_horror_boss.mp3',
    'death': 'assets/audio/bgm_death.mp3',
    'victory': 'assets/audio/bgm_victory_cinematic.mp3'
};

const loadedAudioObjects = {};

function playBGM(type) {
    currentBGMType = type;
    if (isAudioMuted) return;

    const trackFile = bgmTracks[type];
    if (!trackFile) return;

    if (currentAudioElement) {
        try {
            currentAudioElement.pause();
            currentAudioElement.currentTime = 0;
        } catch(e) {}
    }

    if (!loadedAudioObjects[type]) {
        const audio = new Audio(trackFile);
        audio.loop = true;
        audio.volume = 0.65;
        loadedAudioObjects[type] = audio;
    }

    currentAudioElement = loadedAudioObjects[type];
    currentAudioElement.currentTime = 0;
    currentAudioElement.play().catch(e => {
        // Autoplay blocked until user interaction
    });
}

function stopBGM() {
    if (currentAudioElement) {
        try {
            currentAudioElement.pause();
        } catch(e) {}
    }
}

function toggleAudio() {
    isAudioMuted = !isAudioMuted;
    const btn = document.getElementById('audio-btn');
    if (isAudioMuted) {
        btn.innerText = 'ÂM THANH: TẮT';
        btn.style.color = '#888';
        stopBGM();
    } else {
        btn.innerText = 'ÂM THANH: BẬT';
        btn.style.color = '#fff';
        if (currentBGMType) {
            playBGM(currentBGMType);
        }
    }
}

/* Web Audio API & Audio File Engine for SFX */
const sfxTracks = {
    'slash': 'assets/audio/sword_slash.mp3',
    'sword_slash': 'assets/audio/sword_slash.mp3',
    'kunai': 'assets/audio/kunai_throw.mp3',
    'kunai_throw': 'assets/audio/kunai_throw.mp3',
    'dragon': 'assets/audio/dragon_roar.mp3',
    'dragon_roar': 'assets/audio/dragon_roar.mp3',
    'heal': 'assets/audio/heal.mp3',
    'rend': 'assets/audio/anderson_rend.mp3',
    'anderson_rend': 'assets/audio/anderson_rend.mp3',
    'roar': 'assets/audio/anderson_roar.mp3',
    'anderson_roar': 'assets/audio/anderson_roar.mp3',
    'bite': 'assets/audio/bite.mp3',
    'devour': 'assets/audio/bite.mp3',
    'desperation': 'assets/audio/desperation.mp3',
    'annihilation': 'assets/audio/annihilation.flac',
    'vanish': 'assets/audio/annihilation.flac'
};

const loadedSfxObjects = {};

function preloadSFX() {
    Object.values(sfxTracks).forEach(path => {
        if (!loadedSfxObjects[path]) {
            const audio = new Audio(path);
            audio.preload = 'auto';
            loadedSfxObjects[path] = audio;
        }
    });
}

let sfxCtx = null;
function initSFX() {
    preloadSFX();
    if (!sfxCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        sfxCtx = new AudioContext();
    }
    if (sfxCtx.state === 'suspended') {
        sfxCtx.resume();
    }
}

function playSFX(type) {
    if (isAudioMuted) return;

    if (sfxTracks[type]) {
        const trackFile = sfxTracks[type];
        try {
            const audio = new Audio(trackFile);
            audio.volume = 0.85;
            audio.currentTime = 0;
            audio.play().catch(e => {
                playSynthSFX(type);
            });
            return;
        } catch (e) {
            playSynthSFX(type);
            return;
        }
    }

    playSynthSFX(type);
}

function playSynthSFX(type) {
    initSFX();
    if (!sfxCtx) return;
    const now = sfxCtx.currentTime;

    if (type === 'slash' || type === 'sword_slash' || type === 'rend' || type === 'anderson_rend') {
        const osc = sfxCtx.createOscillator();
        const gain = sfxCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.16);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
        osc.connect(gain);
        gain.connect(sfxCtx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
    } else if (type === 'kunai' || type === 'kunai_throw') {
        const osc = sfxCtx.createOscillator();
        const gain = sfxCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(sfxCtx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
    } else if (type === 'hit' || type === 'bite' || type === 'devour') {
        const osc = sfxCtx.createOscillator();
        const gain = sfxCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.22);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain);
        gain.connect(sfxCtx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
    } else if (type === 'dodge') {
        const osc = sfxCtx.createOscillator();
        const gain = sfxCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(850, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(sfxCtx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    } else if (type === 'heal') {
        [330, 440, 554, 659].forEach((freq, idx) => {
            const osc = sfxCtx.createOscillator();
            const gain = sfxCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.2, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);
            osc.connect(gain);
            gain.connect(sfxCtx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.25);
        });
    } else if (type === 'dragon' || type === 'dragon_roar') {
        const osc = sfxCtx.createOscillator();
        const gain = sfxCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.45);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(sfxCtx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
    } else if (type === 'jump') {
        const osc = sfxCtx.createOscillator();
        const gain = sfxCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(460, now + 0.16);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.connect(gain);
        gain.connect(sfxCtx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
    } else if (type === 'screech' || type === 'roar' || type === 'anderson_roar' || type === 'desperation') {
        const osc = sfxCtx.createOscillator();
        const gain = sfxCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.4);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(sfxCtx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
    }
}
