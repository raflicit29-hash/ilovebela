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

// Pemutar resmi YouTube: dimuat hanya setelah pengunjung menekan tombol.
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const musicPanel = document.getElementById("musicPanel");
const closeMusic = document.getElementById("closeMusic");
const riskItAllPlayer = document.getElementById("riskItAllPlayer");
const officialVideoUrl = riskItAllPlayer.dataset.src;

function openMusic() {
  musicPanel.hidden = false;
  // Muat video setelah klik agar tidak memulai audio tanpa interaksi pengguna.
  if (riskItAllPlayer.src === "about:blank" || riskItAllPlayer.getAttribute("src") === "about:blank") {
    riskItAllPlayer.src = officialVideoUrl;
  }
  musicToggle.setAttribute("aria-pressed", "true");
  musicLabel.textContent = "Tutup pemutar";
}

function stopMusic() {
  musicPanel.hidden = true;
  // Menghapus src menghentikan pemutaran saat panel ditutup.
  riskItAllPlayer.src = "about:blank";
  musicToggle.setAttribute("aria-pressed", "false");
  musicLabel.textContent = "Putar When I Was Your Man";
}

musicToggle.addEventListener("click", () => {
  if (musicPanel.hidden) openMusic();
  else stopMusic();
});
closeMusic.addEventListener("click", stopMusic);


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
