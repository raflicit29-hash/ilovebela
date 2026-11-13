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

// A Thousand Years — mencoba diputar otomatis saat halaman dibuka.
const musicPlayerStatus = document.getElementById("musicPlayerStatus");
const musicPlayButton = document.getElementById("musicPlayButton");
let belaSongPlayer = null;
let youtubeApiReady = false;

function setMusicStatus(message) {
  if (musicPlayerStatus) musicPlayerStatus.textContent = message;
}

function initBelaYouTubePlayer() {
  if (!youtubeApiReady || belaSongPlayer || !document.getElementById("youtubePlayer")) return;
  belaSongPlayer = new YT.Player("youtubePlayer", {
    videoId: "rtOvBOTyX00",
    playerVars: { autoplay: 1, playsinline: 1, controls: 1, rel: 0, modestbranding: 1, origin: window.location.origin },
    events: {
      onReady: event => {
        setMusicStatus("A Thousand Years — semoga lagu ini menemani kamu, Bel. ♡");
        event.target.playVideo();
      },
      onStateChange: event => {
        if (event.data === YT.PlayerState.PLAYING) {
          setMusicStatus("Sedang diputar · A Thousand Years ♡");
          if (musicPlayButton) { musicPlayButton.textContent = "♫ Lagu sedang diputar"; musicPlayButton.classList.add("is-playing"); }
        } else if (event.data === YT.PlayerState.PAUSED) {
          setMusicStatus("Lagu dijeda. Sentuh tombol untuk memutar lagi ♡");
          if (musicPlayButton) { musicPlayButton.textContent = "▶ Putar lagu kita ♡"; musicPlayButton.classList.remove("is-playing"); }
        } else if (event.data === YT.PlayerState.ENDED) {
          setMusicStatus("Terima kasih sudah mendengarkan sampai selesai. ♡");
          if (musicPlayButton) { musicPlayButton.textContent = "↻ Putar lagi ♡"; musicPlayButton.classList.remove("is-playing"); }
        }
      },
      onAutoplayBlocked: () => {
        setMusicStatus("Browser mungkin menahan putar otomatis. Ketuk video sekali untuk mulai mendengarkan, ya. ♡");
      },
      onError: () => {
        setMusicStatus("Lagu tidak dapat dimuat. Coba buka video resmi di YouTube.");
      }
    }
  });
}

musicPlayButton?.addEventListener("click", () => {
  if (!belaSongPlayer || typeof belaSongPlayer.playVideo !== "function") {
    setMusicStatus("Pemutar sedang disiapkan. Coba sentuh sekali lagi sebentar ya. ♡");
    return;
  }
  belaSongPlayer.playVideo();
  setMusicStatus("Memulai A Thousand Years... ♡");
});

window.onYouTubeIframeAPIReady = () => {
  youtubeApiReady = true;
  initBelaYouTubePlayer();
};

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
const hugScreen = document.getElementById("hugScreen");
const hugScreenBear = document.getElementById("hugScreenBear");
const hugScreenAgain = document.getElementById("hugScreenAgain");
const closeHugScreen = document.getElementById("closeHugScreen");

function replayBigHug() {
  if (!hugScreenBear) return;
  hugScreenBear.classList.remove("big-hugging");
  void hugScreenBear.offsetWidth;
  hugScreenBear.classList.add("big-hugging");
}
function openBigHug() {
  if (!hugScreen) return;
  hugScreen.hidden = false;
  document.body.classList.add("hug-screen-open");
  replayBigHug();
  closeHugScreen?.focus({ preventScroll: true });
}
function closeBigHug() {
  if (!hugScreen) return;
  hugScreen.hidden = true;
  document.body.classList.remove("hug-screen-open");
  hugButton?.focus({ preventScroll: true });
}
hugScreenAgain?.addEventListener("click", replayBigHug);
closeHugScreen?.addEventListener("click", closeBigHug);
hugScreen?.addEventListener("click", event => {
  if (event.target === hugScreen) closeBigHug();
});


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

    // Restart the hug animation reliably on every press.
    const teddyFace = comfortTeddy.querySelector("span");
    comfortTeddy.classList.remove("is-hugging");
    teddyFace?.classList.remove("is-hugging");
    void comfortTeddy.offsetWidth;
    comfortTeddy.classList.add("is-hugging");
    teddyFace?.classList.add("is-hugging");

    const burst = document.createElement("span");
    burst.className = "hug-heart-burst";
    burst.setAttribute("aria-hidden", "true");
    burst.textContent = "♡  ♥  ♡";
    comfortTeddy.appendChild(burst);
    burst.addEventListener("animationend", () => burst.remove(), { once: true });
    window.setTimeout(() => burst.remove(), 1900);

    // Clear the temporary class after the embrace so it can replay next time.
    window.setTimeout(() => {
      comfortTeddy.classList.remove("is-hugging");
      teddyFace?.classList.remove("is-hugging");
    }, 1250);

    // Open a dedicated full-screen bear hug so it is clear on small phone screens.
    openBigHug();
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


// Bela chooses her own little comfort gift.
const giftResult = document.getElementById("belaGiftResult");
const giftArt = document.getElementById("belaGiftArt");
const giftTitle = document.getElementById("belaGiftTitle");
const giftMessage = document.getElementById("belaGiftMessage");
const giftOptions = {
  flower: {
    art: "💐", title: "Bunga cantik untuk Bela",
    message: "Bunga ini memang virtual, tapi rasa sayangku beneran. Semoga ada satu hal kecil hari ini yang bikin kamu tersenyum, ya. 🌷"
  },
  hearts: {
    art: "💗", title: "Seribu hati buat kamu",
    message: "Kalau satu hati belum cukup, aku kirim banyak! Kamu spesial banget buat aku, Bel. ♡"
  },
  letter: {
    art: "💌", title: "Surat rahasia untuk perempuan hebatku",
    message: "Bel, ada satu hal yang mau aku bisikin: aku bangga sama kamu. Bukan karena kamu harus selalu kuat atau berhasil dalam semua hal, tapi karena kamu tetap berusaha, bahkan saat hari-harimu nggak mudah. Perlakuan orang lain nggak menentukan seberapa berharganya kamu. Kamu berhak bahagia, didengarkan, dan disayang dengan baik. Kalau capek, istirahat dulu. Kalau mau cerita, aku dengerin. Aku mungkin nggak selalu punya jawaban, tapi aku akan terus berusaha ada buat kamu. Dan kalau hari ini kamu belum bisa tersenyum, nggak apa-apa. Aku tetap sayang kamu, Bela. ♡"
  }
};
document.querySelectorAll(".bela-gift-choice").forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.gift;
    if (type === "hug") {
      openBigHug();
      return;
    }
    const gift = giftOptions[type];
    if (!gift || !giftResult) return;
    giftArt.textContent = gift.art;
    giftTitle.textContent = gift.title;
    giftMessage.textContent = gift.message;
    giftResult.hidden = false;
    giftResult.classList.remove("gift-pop");
    void giftResult.offsetWidth;
    giftResult.classList.add("gift-pop");
    if (type === "hearts") {
      for (let i = 0; i < 24; i++) {
        const heart = document.createElement("span");
        heart.className = "bela-gift-floating-heart";
        heart.textContent = i % 2 ? "♡" : "♥";
        heart.style.left = (5 + Math.random() * 90) + "%";
        heart.style.animationDelay = (Math.random() * .65) + "s";
        giftResult.appendChild(heart);
        heart.addEventListener("animationend", () => heart.remove(), {once:true});
      }
    }
    giftResult.scrollIntoView({behavior:"smooth",block:"nearest"});
  });
});
document.getElementById("belaGiftClose")?.addEventListener("click", () => {
  if (giftResult) giftResult.hidden = true;
});
