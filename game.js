var pid,
  score = 0,
  themissile,
  theufo,
  ufo_hstep = 5,
  gameOver = false,
  time = localStorage.getItem('time') || 0,
  launchedMissile = false;

function UFOlaunch() {
  //Supress comment signs in next line
  setInterval(MoveUFO, 25); //25 milisegundos
}

function MoveUFO() {
  var Rlimit = window.innerWidth;

  var hpos_ufo = parseInt(theufo.style.left),
    width_ufo = parseInt(theufo.style.width);

  if (hpos_ufo + width_ufo + 8 > Rlimit || hpos_ufo < 0) {
    ufo_hstep = ufo_hstep * -1;
  }

  hpos_ufo = hpos_ufo + ufo_hstep;
  hpos_ufo = hpos_ufo + "px";
  theufo.style.left = hpos_ufo;
}

function pullTrigger() {
  pid = setInterval(launch, 10);
}

function checkforaHit() {
  var hpos_ufo = parseInt(theufo.style.left),
    vpos_ufo = parseInt(theufo.style.bottom),
    width_ufo = parseInt(theufo.style.width),
    vpos_m = parseInt(themissile.style.bottom),
    hpos_m = parseInt(themissile.style.left),
    width_m = parseInt(themissile.style.width),
    height_m = parseInt(themissile.style.height),
    hit = false;
  // detect here if missile hits ufo
  hit =
    vpos_m + height_m >= vpos_ufo &&
    hpos_m >= hpos_ufo &&
    hpos_m <= hpos_ufo + width_ufo;
  return hit;
}

function launch() {
  var uLimit = window.innerHeight - 56,
    vpos_m,
    vstep = 5;
  vpos_m = parseInt(themissile.style.bottom);
  if (checkforaHit()) {
    clearInterval(pid);
    launchedMissile = false;
    vpos_m = 0;
    score = score + 100;
    document.getElementById("points").innerHTML = score;
    theufo.src = "imgs/explosion.gif";
    setTimeout(() => {
      theufo.src = "imgs/ufo.png";
    }, 10000);
  }
  if (vpos_m > uLimit) {
    clearInterval(pid);
    launchedMissile = false;
    vpos_m = 0;
  }
  vpos_m = vpos_m + vstep;
  vpos_m = vpos_m + "px";
  themissile.style.bottom = vpos_m;
}

function moveMissileRight() {
  var rLimit = window.innerWidth,
    hpos_m,
    misWidth,
    hstep = 5; //hpos_m = posicion horizontal del misil
  // alert ("hey, I'm working"); //prueba para ver que funciona
  hpos_m = parseInt(themissile.style.left);
  misWidth = parseInt(themissile.style.width); //Tienes que asignarle el ancho abajo para que lo pueda pillar aquí
  if (hpos_m + misWidth + 8 < rLimit) {
    //8 es el margen que le pone el navegador por defecto y si no lo pones sale scroll horizontal
    hpos_m = hpos_m + hstep;
    hpos_m = hpos_m + "px"; //Concatenar para poner las unidades
    themissile.style.left = hpos_m;
  }
}

function moveMissileLeft() {
  var hpos_m,
    hstep = 5;
  hpos_m = parseInt(themissile.style.left);
  if (hpos_m > 0) {
    hpos_m = hpos_m - hstep;
    hpos_m = hpos_m + "px";
    themissile.style.left = hpos_m;
  }
}

function keyboardController(theEvent) {
  let interval = 15;
  let code = theEvent.key; //Coge la tecla que estás pulsando
  switch (code) {
    case "ArrowRight":
      moveMissileRight();
      break;
    case "ArrowLeft":
      moveMissileLeft();
      break;
    case " ":
      if (!launchedMissile) {
        //para que no puedas darle muchas veces a la barra espaciadora y el misil empiece a ir rápido sin parar
        launchedMissile = true;
        pid = setInterval(launch, interval);
      }
      break;
  }
}

function timerStart() {
    var timeleft = localStorage.getItem("time");
    var downloadTimer = setInterval(function () {
        document.getElementById("countdown").innerText = time--;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            gameOver = true;
        }
    }, 1000);   
}


window.onload = function () {
  //No es la mejor manera de hacerlo, es mejor que la referencia esté cada vez que se use
  document.getElementById("timer").innerText = localStorage.getItem("time");
  themissile = document.getElementById("missile");
  theufo = document.getElementById("ufo");
  document.onkeydown = keyboardController;
  timerStart();
  if (!gameOver) {
    UFOlaunch();
  }
};
