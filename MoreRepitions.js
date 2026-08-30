const ball = document.getElementById("loopBall");
const scene = document.querySelector(".scene");

const state = {
  angle: 0,
  radius: 110,
  speed: 0.025,
  hue: 42,
};

function drawLoop() {
  const centerX = scene.clientWidth / 2;
  const centerY = scene.clientHeight / 2;
  const x = centerX + Math.cos(state.angle) * state.radius;
  const y = centerY + Math.sin(state.angle) * state.radius;

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
  ball.style.background = `hsl(${state.hue}, 95%, 60%)`;
  ball.style.boxShadow = `0 0 20px hsl(${state.hue}, 100%, 70%), 0 0 35px hsl(${state.hue}, 100%, 65%)`;

  state.angle += state.speed;
  if (state.angle > Math.PI * 2) {
    state.angle -= Math.PI * 2;
  }

  requestAnimationFrame(drawLoop);
}

function clickLoop() {
  state.hue = (state.hue + 52) % 360;
  state.speed = Math.min(state.speed + 0.006, 0.06);
  ball.style.setProperty("--pulse-scale", "1.6");

  setTimeout(() => {
    ball.style.setProperty("--pulse-scale", "1");
  }, 150);
}

ball.addEventListener("click", clickLoop);
ball.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    clickLoop();
  }
});

requestAnimationFrame(drawLoop);
