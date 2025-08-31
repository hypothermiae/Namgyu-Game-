// --- Namlings data ---
let namlings = [];
let namlingElements = [];

// Example: start with one hatched Namling (later you’ll unlock more via eggs)
function spawnNamling(id) {
  const namling = {
    id: id,
    x: Math.random() * (window.innerWidth - 80),
    y: Math.random() * (window.innerHeight - 80),
    dx: (Math.random() * 2 - 1) * 2,
    dy: (Math.random() * 2 - 1) * 2,
    happiness: 100
  };

  const el = document.createElement("img");
  el.src = `namling${id}.png`; // 👈 filenames like namling1.png
  el.className = "namling";
  el.id = "namling-" + id;       // for fights
  el.dataset.id = id;            // for dragging/panic
  el.style.position = "absolute";
  el.style.width = "100px";
  el.style.height = "100px";
  el.style.left = namling.x + "px";
  el.style.top = namling.y + "px";

  document.body.appendChild(el);

  namlings.push(namling);
  namlingElements.push(el);

  // make draggable right away
  makeDraggable(el, namling);
}

// --- Animate loop (movement) ---
function animate() {
  namlings.forEach((n, i) => {
    n.x += n.dx;
    n.y += n.dy;

    // Bounce off edges (80px size)
    if (n.x < 0) { n.x = 0; n.dx *= -1; }
    if (n.x > window.innerWidth - 80) { n.x = window.innerWidth - 80; n.dx *= -1; }
    if (n.y < 0) { n.y = 0; n.dy *= -1; }
    if (n.y > window.innerHeight - 80) { n.y = window.innerHeight - 80; n.dy *= -1; }

    const el = namlingElements[i];
    el.style.left = n.x + "px";
    el.style.top = n.y + "px";

    // Flip + panic scaling
    let scale = n.dx > 0 ? 1 : -1;
    if (el.classList.contains("panic")) scale *= 1.2;
    el.style.transform = `scaleX(${scale})`;
  });

  requestAnimationFrame(animate);
}

// --- Draggable system ---
let dragging = null;
let offsetX = 0;
let offsetY = 0;

function makeDraggable(el, namling) {
  el.addEventListener("mousedown", (e) => {
    dragging = { el, namling };
    offsetX = e.clientX - namling.x;
    offsetY = e.clientY - namling.y;

    // Stop moving while dragging
    namling.dx = 0;
    namling.dy = 0;

    // Squish effect
    el.style.transition = "transform 0.1s";
    el.style.transform = "scale(0.9, 0.8)";
  });
}

document.addEventListener("mousemove", (e) => {
  if (dragging) {
    const { el, namling } = dragging;
    namling.x = e.clientX - offsetX;
    namling.y = e.clientY - offsetY;
    el.style.left = namling.x + "px";
    el.style.top = namling.y + "px";
  }
});

document.addEventListener("mouseup", () => {
  if (dragging) {
    // Give new random movement
    dragging.namling.dx = (Math.random() * 2 - 1) * 2;
    dragging.namling.dy = (Math.random() * 2 - 1) * 2;

    // Bounce back
    dragging.el.style.transform = "scale(1,1)";
    dragging = null;
  }
});

// --- Panic run on click ---
document.addEventListener("click", e => {
  if (e.target.classList.contains("namling") && !dragging) {
    const id = parseInt(e.target.dataset.id);
    const n = namlings.find(n => n.id === id);

    // Panic mode: fast random direction
    n.dx = (Math.random() * 2 - 1) * 6;
    n.dy = (Math.random() * 2 - 1) * 6;

    e.target.classList.add("panic");

    // Stop panic after 1.2s
    setTimeout(() => {
      n.dx = (Math.random() * 2 - 1) * 2;
      n.dy = (Math.random() * 2 - 1) * 2;
      e.target.classList.remove("panic");
    }, 1200);
  }
});

// --- Start game ---
spawnNamling(1);
animate();
