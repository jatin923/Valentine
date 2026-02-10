const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const hearts = document.querySelector(".hearts");
const yesSound = document.getElementById("yesSound");
const buttons = document.querySelector(".buttons");

let noCount = 0;
let yesScale = 1;

/* utils */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* 💖 hearts burst */
function burstHearts(count = 16) {
  const emojis = ["💖", "💗", "💘", "💕", "💞"];
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = emojis[rand(0, emojis.length - 1)];
    h.style.left = rand(0, 100) + "vw";
    h.style.animationDuration = rand(3, 6) + "s";
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 6000);
  }
}

/* 🌹 Rose Petal Rain */
function startPetalRain() {
  const petals = ["🌹", "🌸", "🌺", "💮"];

  const rain = setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.textContent = petals[rand(0, petals.length - 1)];
    petal.style.left = rand(0, 100) + "vw";
    petal.style.animationDuration = rand(4, 7) + "s";
    petal.style.fontSize = rand(18, 28) + "px";

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 8000);
  }, 200);

  // stop rain after 6 sec
  setTimeout(() => clearInterval(rain), 6000);
}

/* ❌ NO movement + YES grow */
function moveNoButton() {
  const container = document.querySelector(".container");
  const cRect = container.getBoundingClientRect();
  const bRect = noBtn.getBoundingClientRect();

  noBtn.style.position = "absolute";

  const x = rand(20, cRect.width - bRect.width - 20);
  const y = rand(80, 160);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  yesScale += 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;
}

/* ✅ YES click */
yesBtn.addEventListener("click", () => {
  result.classList.add("show");

  buttons.style.display = "none";

  burstHearts(30);
  startPetalRain(); // 🌹 ROSE PETAL RAIN STARTS HERE

  yesSound.currentTime = 0;
  yesSound.play();
});

/* ❌ NO hover / click (TEXT NEVER CHANGES) */
noBtn.addEventListener("mouseenter", () => {
  noCount++;
  moveNoButton();
  burstHearts(5);
});

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

/* 💕 ambient hearts */
setInterval(() => {
  if (!result.classList.contains("show")) {
    burstHearts(2);
  }
}, 1200);
