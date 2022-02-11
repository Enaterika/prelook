"use strict";

window.onload = function () {
  console.log('Хорошего дня!');
  preloadImages();
  changeEnemy();
  changeDayNight();
  trololoActive();
  addDrugs();
};

var chicken = document.getElementById('chicken');
var farmer = document.getElementById('farmer');
var gameZone = document.querySelector('.game-zone');
var trololo = document.querySelector('.trololo'); //preload images

function preloadImages() {
  var images = ['chicken.png24', 'farmer.png24'];
  images.forEach(function (e) {
    return cache(e);
  });

  function cache(e) {
    for (var i = 1; i <= 2; i++) {
      var img = new Image();
      img.src = "./chicken/assets/svg/".concat(e);
    }
  }
} //change speed,enemy and day/night


function changeEnemy() {
  setInterval(function () {
    var img = new Image();
    img.src = "../../../assets/svg/macho.png";
    farmer.classList.toggle('macho');
    farmer.classList.toggle('enemy');
  }, 7950);
}

function changeDayNight() {
  setInterval(function () {
    gameZone.classList.toggle('night');
  }, 12000);
}

function addDrugs() {
  setInterval(function () {
    gameZone.classList.toggle('drug');
  }, 30000);
}

function trololoActive() {
  setTimeout(function () {
    trololo.classList.add('trololo_active');
    var trololoScream = new Audio('./chicken/assets/audio/trololo.mp3');
    trololoScream.play();
  }, 16000);
} //jump


document.addEventListener('keydown', function (e) {
  jump();
});

function jump() {
  if (chicken.classList != 'jump') {
    chicken.classList.add('jump');
    var jumpAudio = new Audio('./chicken/assets/audio/jump.mp3');
    jumpAudio.play();
  }

  setTimeout(function () {
    chicken.classList.remove('jump');
  }, 380);
} //score


var score = document.querySelector('.score');
var timerStart, timerEnd;
var isRunning = false;
var result = [];
var currentResult = '';
isRunning = true;
timerStart = new Date().valueOf(); //game over

var isAlive = setInterval(function () {
  var chickenTop = parseInt(window.getComputedStyle(chicken).getPropertyValue('top'));
  var farmerLeft = parseInt(window.getComputedStyle(farmer).getPropertyValue('left'));

  if (farmerLeft < 150 && farmerLeft > 0 && chickenTop >= 370) {
    var gameOverAudio = new Audio('./chicken/assets/audio/gameover2.mp3');
    gameOverAudio.play();
    var img = new Image();
    img.src = "../../../assets/svg/gameover1.png24.png";
    var gameover = document.querySelector('.gameover');
    gameover.classList.add('over');
    farmer.style.animation = "none";
    farmer.style.left = "1200px"; //score

    isRunning = false;
    timerEnd = new Date().valueOf();
    currentResult = timerEnd - timerStart;
    score.innerHTML = "score: ".concat(currentResult, " ");
    getLocalStorage();
  }
}, 10); //previous scores/local storage

function setLocalStorage() {
  result.length = 10;
  result.unshift(currentResult);
  localStorage.setItem('result', result);
}

window.addEventListener('beforeunload', setLocalStorage);
var pre = document.querySelector('.previous-score');

function getLocalStorage() {
  if (localStorage.getItem('result')) {
    result = localStorage.getItem('result').split(',');

    for (var i = 0; i <= 10; i++) {
      pre.innerHTML = "previous: <br/> ".concat(result.join('<br/>'), " ");
    }
  } else {
    console.log('noresult');
  }
}
//# sourceMappingURL=index.dev.js.map
