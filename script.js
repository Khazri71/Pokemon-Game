/*****Constants*****/
const GHOST_NUMBER = 50;
const POKEMON_BALL_NUMBER = 10;
const GHOST_CLASS = "the-ghost";
const POKEMON_BALL_CLASS = "the-pokemon-ball";
const PLAYER = document.querySelector(".the-player");
const SPEED = 1.8;
const START_POSITION = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

const AUDIO_WIN = document.getElementById("win");
const SCORE = document.querySelector(".the-score");

/*****Variables*****/
let playerPosition = {
  x: 0,
  y: 0,
};
let playerVelocity = {
  x: 0,
  y: 0,
};
let scoreCount = 0;

/****Generate Random Ghost And Generate Random Pokemon Ball****/
const generateRandomThing = (thingNumber, thingClass) => {
  for (let i = 0; i < thingNumber; i++) {
    thingName = document.createElement("div");
    thingName.classList.add(thingClass);
    thingName.style.left = Math.random() * 100 + "%";
    thingName.style.top = Math.random() * 100 + "%";
    document.body.appendChild(thingName);
  }
};

/****Move*****/
function move() {
  playerPosition.x += playerVelocity.x;
  playerPosition.y += playerVelocity.y;
  PLAYER.style.left = playerPosition.x + "px";
  PLAYER.style.top = playerPosition.y + "px";
  findPokemonBall();
  requestAnimationFrame(move);
}

/*****Animate Player*****/
const playerAnimation = () => {
  window.addEventListener("keydown", (e) => {
    PLAYER.classList.add("walk");
    if (e.key == "ArrowUp") {
      playerVelocity.y = -1 * SPEED;
      PLAYER.style.backgroundImage = "url('assets/player_front.png')";
    }
    if (e.key == "ArrowDown") {
      playerVelocity.y = 1 * SPEED;
      PLAYER.style.backgroundImage = "url('assets/player_back.png')";
    }
    if (e.key == "ArrowLeft") {
      playerVelocity.x = -1 * SPEED;
      PLAYER.style.backgroundImage = "url('assets/player_left.png')";
    }
    if (e.key == "ArrowRight") {
      playerVelocity.x = 1 * SPEED;
      PLAYER.style.backgroundImage = "url('assets/player_right.png')";
    }
  });

  window.addEventListener("keyup", (e) => {
    PLAYER.classList.remove("walk");
    playerVelocity.x = 0;
    playerVelocity.y = 0;
  });
};

/*****Start Game*****/
const startGame = () => {
  playerPosition.x = START_POSITION.x;
  playerPosition.y = START_POSITION.y;
  generateRandomThing(GHOST_NUMBER, GHOST_CLASS);
  generateRandomThing(POKEMON_BALL_NUMBER, POKEMON_BALL_CLASS);
};

/***** Check collision between 2 divs*****/
function collision($div1, $div2) {
  var x1 = $div1.getBoundingClientRect().left;
  var y1 = $div1.getBoundingClientRect().top;
  var h1 = $div1.clientHeight;
  var w1 = $div1.clientWidth;
  var b1 = y1 + h1;
  var r1 = x1 + w1;

  var x2 = $div2.getBoundingClientRect().left;
  var y2 = $div2.getBoundingClientRect().top;
  var h2 = $div2.clientHeight;
  var w2 = $div2.clientWidth;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

/*****Find Pokemon Ball*****/
const findPokemonBall = () => {
  let pokemonBalls = document.querySelectorAll(".the-pokemon-ball");
  pokemonBalls.forEach((pokemonBall) => {
    if (collision(pokemonBall, PLAYER)) {
      pokemonBall.style.top = Math.random() * 100 + "%";
      pokemonBall.style.left = Math.random() * 100 + "%";
      AUDIO_WIN.play();
      score();
    }
  });
};

/*****Score******/
const score = () => {
  scoreCount++;
  console.log(scoreCount);
  SCORE.innerHTML = scoreCount;
};

startGame();
playerAnimation();
move();
