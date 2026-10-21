// Bintang dan kelopak dibuat dengan CSS/JS agar tidak perlu aset gambar tambahan.
const starField = document.getElementById("starField");
const petals = document.getElementById("petals");

for (let i = 0; i < 72; i++) {
  const star = document.createElement("span");
  star.className = "star";
  const size = Math.random() * 2.4 + 0.7;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.setProperty("--duration", `${2.5 + Math.random() * 5}s`);
  star.style.animationDelay = `${Math.random() * 5}s`;
  starField.appendChild(star);
}

for (let i = 0; i < 12; i++) {
  const petal = document.createElement("span");
  petal.className = "floating-petal";
  petal.textContent = Math.random() > 0.5 ? "✧" : "❀";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.fontSize = `${10 + Math.random() * 13}px`;
  petal.style.setProperty("--fall-duration", `${12 + Math.random() * 15}s`);
  petal.style.animationDelay = `${Math.random() * -25}s`;
  petals.appendChild(petal);
}

const letterSection = document.getElementById("letterSection");
document.getElementById("openLetter").addEventListener("click", () => {
  letterSection.classList.add("visible");
  letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("backTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Piano lembut dibuat menggunakan Web Audio API; tidak ada file musik eksternal.
// Browser baru memulai audio setelah pengguna menekan tombol.
let audioContext = null;
let musicTimer = null;
let musicPlaying = false;
let noteIndex = 0;
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const progression = [
  [261.63, 329.63, 392.00, 523.25],
  [220.00, 261.63, 329.63, 440.00],
  [174.61, 220.00, 261.63, 349.23],
  [196.00, 246.94, 293.66, 392.00]
];

function playNote(frequency, startAt, duration, volume = 0.035) {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  osc.type = "sine";
  osc.frequency.value = frequency;
  filter.type = "lowpass";
  filter.frequency.value = 1800;
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.04);
}

function playChord() {
  if (!musicPlaying || !audioContext) return;
  const chord = progression[noteIndex % progression.length];
  const now = audioContext.currentTime;
  chord.forEach((frequency, i) => playNote(frequency, now + i * 0.12, 2.8, i === 0 ? 0.025 : 0.014));
  const melody = [chord[2], chord[1], chord[3], chord[2], chord[1], chord[0]];
  melody.forEach((frequency, i) => playNote(frequency * 2, now + 0.45 + i * 0.55, 1.15, 0.012));
  noteIndex++;
}

async function toggleMusic() {
  try {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        musicLabel.textContent = "Audio tidak didukung";
        return;
      }
      audioContext = new AudioCtx();
    }
    if (musicPlaying) {
      musicPlaying = false;
      clearInterval(musicTimer);
      await audioContext.suspend();
      musicToggle.setAttribute("aria-pressed", "false");
      musicLabel.textContent = "Putar piano";
    } else {
      await audioContext.resume();
      musicPlaying = true;
      musicToggle.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Matikan musik";
      playChord();
      musicTimer = setInterval(playChord, 3200);
    }
  } catch (error) {
    musicLabel.textContent = "Musik tidak tersedia";
    console.error("Audio tidak dapat dijalankan:", error);
  }
}
musicToggle.addEventListener("click", toggleMusic);
