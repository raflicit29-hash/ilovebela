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
  musicLabel.textContent = "Putar Talking to the Moon";
}

musicToggle.addEventListener("click", () => {
  if (musicPanel.hidden) openMusic();
  else stopMusic();
});
closeMusic.addEventListener("click", stopMusic);
