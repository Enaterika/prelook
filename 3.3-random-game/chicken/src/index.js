
window.onload = function () {
    console.log('Хорошего дня!')
    preloadImages()
    changeEnemy ()
    changeDayNight()
    trololoActive()
    addDrugs()
}


const chicken = document.getElementById('chicken')
const farmer = document.getElementById('farmer')
const gameZone = document.querySelector('.game-zone')
const trololo =  document.querySelector('.trololo')

//preload images
function preloadImages() {
    const images = ['chicken.png24', 'farmer.png24'];
    images.forEach((e) => cache(e));
    function cache(e) {
      for (let i = 1; i <= 2; i++) {
        const img = new Image();
        img.src = `./chicken/assets/svg/${e}`;
      }
    }
  }

//change speed,enemy and day/night

    function changeEnemy () {
        setInterval(function(){
            let img  = new Image();
            img.src = "../../../assets/svg/macho.png"
            farmer.classList.toggle('macho')
            farmer.classList.toggle('enemy')
        },7950)
    }
    function changeDayNight() {
        setInterval(function(){
            gameZone.classList.toggle('night')
        },12000)
    }

    function addDrugs() {
        setInterval(function(){
            gameZone.classList.toggle('drug')
        },30000)
    }

    function trololoActive() {
        setTimeout(function(){
            trololo.classList.add('trololo_active')
            const trololoScream = new Audio('./chicken/assets/audio/trololo.mp3');
            trololoScream.play();
        },16000)
    }

//jump
document.addEventListener('keydown', function(e){
    jump();
})

function jump() {
    if (chicken.classList !='jump') {
        chicken.classList.add('jump')
        const jumpAudio = new Audio('./chicken/assets/audio/jump.mp3');
        jumpAudio.play();
    }
    setTimeout(function(){
        chicken.classList.remove('jump')
    },380)
}

 

//score
const score = document.querySelector('.score');
let timerStart, timerEnd;
let isRunning = false;
let result = []
let currentResult = ''
isRunning = true;
timerStart = new Date().valueOf();

 //game over

 let isAlive = setInterval( function(){
     let chickenTop = parseInt(window.getComputedStyle(chicken).getPropertyValue('top'));
     let farmerLeft = parseInt(window.getComputedStyle(farmer).getPropertyValue('left'));

     if  (farmerLeft < 150 && farmerLeft > 0 && chickenTop >= 370) {
        let gameOverAudio = new Audio('./chicken/assets/audio/gameover2.mp3');
        gameOverAudio.play();
        let img  = new Image();
            img.src = "../../../assets/svg/gameover1.png24.png"
        let gameover =  document.querySelector('.gameover');
         gameover.classList.add('over')
         farmer.style.animation = "none"
         farmer.style.left="1200px"
         //score
            isRunning = false;
            timerEnd = new Date().valueOf();
            currentResult = timerEnd - timerStart
            score.innerHTML = `score: ${currentResult} `;
            getLocalStorage()
            
     }  
 },10)

 //previous scores/local storage
 function setLocalStorage() {
    result.length = 10
    result.unshift(currentResult)
    localStorage.setItem('result', result);
  }
  window.addEventListener('beforeunload', setLocalStorage)



const pre = document.querySelector('.previous-score');
  function getLocalStorage() {
    if(localStorage.getItem('result')) {
     result = localStorage.getItem('result').split(',');

      

      for (let i =0; i<=10; i++){
        pre.innerHTML =  `previous: <br/> ${result.join('<br/>')} `
    }
    } else{
        console.log('noresult')
    }
  }

