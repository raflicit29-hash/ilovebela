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

// Musik latar otomatis tanpa menu. Browser HP bisa memblokir autoplay bersuara;
// jika itu terjadi, musik akan dicoba lagi saat pengunjung menyentuh halaman.
const backgroundMusic = document.getElementById("backgroundMusic");
let musicStarted = false;

async function startBackgroundMusic() {
  if (!backgroundMusic || musicStarted) return;
  try {
    await backgroundMusic.play();
    musicStarted = true;
    document.removeEventListener("pointerdown", startBackgroundMusic);
    document.removeEventListener("keydown", startBackgroundMusic);
    document.removeEventListener("touchstart", startBackgroundMusic);
  } catch (_) {
    // Autoplay ditolak oleh browser; tunggu interaksi pertama, tanpa tombol khusus.
  }
}

startBackgroundMusic();
document.addEventListener("pointerdown", startBackgroundMusic, { passive: true });
document.addEventListener("touchstart", startBackgroundMusic, { passive: true });
document.addEventListener("keydown", startBackgroundMusic);


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
