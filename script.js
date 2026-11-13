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

for (let i = 0; i < 18; i++) {
  const petal = document.createElement("span");
  petal.className = "floating-petal";
  const ornaments = ["✧", "❀", "♡", "✿"];
  petal.textContent = ornaments[Math.floor(Math.random() * ornaments.length)];
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.fontSize = `${10 + Math.random() * 13}px`;
  petal.style.setProperty("--fall-duration", `${12 + Math.random() * 15}s`);
  petal.style.animationDelay = `${Math.random() * -25}s`;
  petals.appendChild(petal);
}

const memorySection = document.getElementById("memorySection");
const letterSection = document.getElementById("letterSection");
document.getElementById("openLetter").addEventListener("click", () => {
  memorySection.hidden = false;
  memorySection.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("continueLetter").addEventListener("click", () => {
  letterSection.classList.add("visible");
  letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("backTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Official YouTube player for A Thousand Years — user-controlled, no forced autoplay.
const musicPlayToggle = document.getElementById("musicPlayToggle");
const musicPlayerStatus = document.getElementById("musicPlayerStatus");
let belaSongPlayer = null;
let youtubeApiReady = false;

function setMusicStatus(message) {
  if (musicPlayerStatus) musicPlayerStatus.textContent = message;
}

function updateMusicButton(state) {
  if (!musicPlayToggle) return;
  const playing = state === 1;
  musicPlayToggle.textContent = playing ? "Jeda lagu Ⅱ" : "Putar lagu ▶";
  musicPlayToggle.setAttribute("aria-label", playing ? "Jeda lagu" : "Putar lagu");
  musicPlayToggle.classList.toggle("is-playing", playing);
  setMusicStatus(playing ? "Sedang diputar · A Thousand Years" : "Siap diputar kapan saja ♡");
}

function initBelaYouTubePlayer() {
  if (!youtubeApiReady || belaSongPlayer || !document.getElementById("youtubePlayer")) return;
  belaSongPlayer = new YT.Player("youtubePlayer", {
    videoId: "rtOvBOTyX00",
    playerVars: { playsinline: 1, controls: 0, rel: 0, modestbranding: 1, origin: window.location.origin },
    events: {
      onReady: () => {
        if (musicPlayToggle) musicPlayToggle.disabled = false;
        if (musicPlayToggle) musicPlayToggle.textContent = "Putar lagu ▶";
        setMusicStatus("Siap menemani cerita kalian ♡");
      },
      onStateChange: event => updateMusicButton(event.data),
      onError: () => {
        setMusicStatus("Lagu tidak dapat dimuat. Coba buka video resmi di YouTube.");
        if (musicPlayToggle) musicPlayToggle.disabled = true;
      }
    }
  });
}

window.onYouTubeIframeAPIReady = () => {
  youtubeApiReady = true;
  initBelaYouTubePlayer();
};

if (musicPlayToggle) {
  musicPlayToggle.addEventListener("click", () => {
    if (!belaSongPlayer || typeof belaSongPlayer.getPlayerState !== "function") return;
    const state = belaSongPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      belaSongPlayer.pauseVideo();
    } else {
      belaSongPlayer.playVideo();
    }
  });
}

const youtubeApiScript = document.createElement("script");
youtubeApiScript.src = "https://www.youtube.com/iframe_api";
youtubeApiScript.async = true;
document.head.appendChild(youtubeApiScript);

// Secret message interaction: reveals only when Bela chooses to open it.
const secretNoteButton = document.getElementById("secretNoteButton");
const secretNote = document.getElementById("secretNote");
secretNoteButton.addEventListener("click", () => {
  const isOpening = secretNote.hidden;
  secretNote.hidden = !isOpening;
  secretNoteButton.setAttribute("aria-expanded", String(isOpening));
  secretNoteButton.textContent = isOpening ? "Tutup pesan ♡" : "Buka pesan kecil ♡";
});


// Cinematic reveal on scroll; gracefully falls back when IntersectionObserver is unavailable.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scene-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll(".memory-card, .apology-moment, .secret-note-wrap, .letter-card, .ending").forEach((scene) => {
    scene.classList.add("scene-reveal");
    revealObserver.observe(scene);
  });
}


// I LOVE BELA 2.0 — optional comfort space. Existing story, letter and music stay intact.
const comfortSection = document.getElementById("comfortSection");
const openComfortButton = document.getElementById("openComfort");
const closeComfortButton = document.getElementById("closeComfort");
const hugButton = document.getElementById("hugButton");
const hugFeedback = document.getElementById("hugFeedback");
const comfortTeddy = document.getElementById("comfortTeddy");
const comfortLetterButton = document.getElementById("comfortLetterButton");
const comfortLetter = document.getElementById("comfortLetter");

if (openComfortButton && comfortSection) {
  openComfortButton.addEventListener("click", () => {
    comfortSection.hidden = false;
    comfortSection.scrollIntoView({ behavior: "smooth", block: "start" });
    if (closeComfortButton) closeComfortButton.focus({ preventScroll: true });
  });
}
if (closeComfortButton && comfortSection) {
  closeComfortButton.addEventListener("click", () => {
    comfortSection.hidden = true;
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
    openComfortButton?.focus({ preventScroll: true });
  });
}
if (hugButton && hugFeedback && comfortTeddy) {
  let hugCount = 0;
  hugButton.addEventListener("click", () => {
    hugCount += 1;
    hugFeedback.hidden = false;
    hugFeedback.textContent = hugCount === 1
      ? "Peluk hangat buat kamu, Bel. Kamu nggak sendirian. ♡"
      : "Satu peluk lagi, yang lebih erat. Semoga hatimu terasa lebih ringan. ♡";
    hugButton.textContent = "Peluk lagi 🩷";

    // Restart the embrace animation on every press, including repeated presses.
    comfortTeddy.classList.remove("is-hugging");
    void comfortTeddy.offsetWidth;
    comfortTeddy.classList.add("is-hugging");

    // Add a fresh burst of floating hearts for every hug.
    const burst = document.createElement("span");
    burst.className = "hug-heart-burst";
    burst.setAttribute("aria-hidden", "true");
    burst.textContent = "♡  ♥  ♡";
    comfortTeddy.appendChild(burst);
    burst.addEventListener("animationend", () => burst.remove(), { once: true });
    window.setTimeout(() => burst.remove(), 1800);
  });
}
if (comfortLetterButton && comfortLetter) {
  comfortLetterButton.addEventListener("click", () => {
    const opening = comfortLetter.hidden;
    comfortLetter.hidden = !opening;
    comfortLetterButton.setAttribute("aria-expanded", String(opening));
    comfortLetterButton.textContent = opening ? "Tutup surat kecil ♡" : "Buka surat kecil untukmu ✉";
  });
}
