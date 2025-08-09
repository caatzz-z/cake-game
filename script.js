const screens = [
  "screenMenu",
  "screenBase",
  "screenIcing",
  "screenToppings",
  "screenPlate",
];
let currentStep = 0;
let toppingsChosen = [];

const cakeParts = {
  base: "",
  icing: "",
  toppings: ["", ""],
  plate: "",
};

function showScreen(index) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(screens[index]).classList.add("active");
}

function transitionTo(index) {
  const trans = document.getElementById("slideTransition");
  trans.classList.add("active");
  setTimeout(() => {
    showScreen(index);
    trans.classList.remove("active");
  }, 500);
}

function setupOptions(id, items, type, limit = 1) {
  const container = document.getElementById(id);
  container.innerHTML = "";
  items.forEach((src) => {
    const img = document.createElement("img");
    img.src = `images/${src}`;
    img.alt = src;
    img.addEventListener("click", () => {
      if (type === "topping") {
        if (toppingsChosen.includes(src)) {
          toppingsChosen = toppingsChosen.filter((t) => t !== src);
          img.classList.remove("selected");
        } else if (toppingsChosen.length < limit) {
          toppingsChosen.push(src);
          img.classList.add("selected");
        }
        cakeParts.toppings = [...toppingsChosen, ""].slice(0, 2);
        updateCake();
        document.getElementById("btnNext3").disabled =
          toppingsChosen.length === 0;
      } else {
        cakeParts[type] = src;
        [...container.querySelectorAll("img")].forEach((i) =>
          i.classList.remove("selected")
        );
        img.classList.add("selected");

        updateCake();

        if (type === "plate") {
          document.getElementById("btnDone").disabled = false;
        } else {
          document.getElementById(`btnNext${currentStep}`).disabled = false;
        }
      }
    });
    container.appendChild(img);
  });
}

function updateCake() {
  const baseImgs = document.querySelectorAll("#cakeBase");
  baseImgs.forEach((img) => {
    if (cakeParts.base) {
      img.src = `images/${cakeParts.base}`;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });

  const icingImgs = document.querySelectorAll("#cakeIcing");
  icingImgs.forEach((img) => {
    if (cakeParts.icing) {
      img.src = `images/${cakeParts.icing}`;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });

  const topping1Imgs = document.querySelectorAll("#cakeTopping1");
  topping1Imgs.forEach((img) => {
    if (cakeParts.toppings[0]) {
      img.src = `images/${cakeParts.toppings[0]}`;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });

  const topping2Imgs = document.querySelectorAll("#cakeTopping2");
  topping2Imgs.forEach((img) => {
    if (cakeParts.toppings[1]) {
      img.src = `images/${cakeParts.toppings[1]}`;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });

  const plateImgs = document.querySelectorAll("#cakePlate");
  plateImgs.forEach((img) => {
    if (cakeParts.plate) {
      img.src = `images/${cakeParts.plate}`;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });
}

setupOptions(
  "optionsBase",
  ["base_choco.png", "base_strawb.png", "base_vanilla.png"],
  "base"
);
setupOptions(
  "optionsIcing",
  ["icing_choco.png", "icing_strawb.png", "icing_vanilla.png"],
  "icing"
);
setupOptions(
  "optionsToppings",
  [
    "topping1.png",
    "topping2.png",
    "topping3.png",
    "topping4.png",
    "topping5.png",
  ],
  "topping",
  2
);
setupOptions(
  "optionsPlate",
  ["plate_regular.png", "plate_floral.png", "plate_wood.png"],
  "plate"
);

document.getElementById("btnStart").addEventListener("click", () => {
  currentStep = 1;
  transitionTo(currentStep);
});
document.getElementById("btnNext1").addEventListener("click", () => {
  currentStep = 2;
  transitionTo(currentStep);
});
document.getElementById("btnNext2").addEventListener("click", () => {
  currentStep = 3;
  transitionTo(currentStep);
});
document.getElementById("btnNext3").addEventListener("click", () => {
  currentStep = 4;
  transitionTo(currentStep);
});
document.getElementById("btnDone").addEventListener("click", () => {
  startConfetti();
});

// Confetti function
function startConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let pieces = [];
  for (let i = 0; i < 200; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 200,
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "pink";
    pieces.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    update();
  }
  function update() {
    pieces.forEach((p) => {
      p.y += Math.cos(p.d) + 1;
      p.x += Math.sin(p.d);
      if (p.y > canvas.height) p.y = 0;
    });
  }
  setInterval(draw, 20);
}
