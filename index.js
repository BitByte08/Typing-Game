var menu_btn = document.getElementsByClassName("menu_btn");
var game_tab = document.getElementById("game");
var game_tab2 = document.getElementsByTagName("body");
const input = document.querySelector('#answer');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
let wordDisplay = document.querySelector('.q');
var Hide = document.getElementById('Hide').checked;
var Low_t = document.getElementById('Low_t').checked;
var Handi = document.getElementById('Handi').checked;
let words = [];
let score = 0;
let isPlaying = false;
let GAME_TIME = 7;
let currentTime;

fetch('https://random-word-api.herokuapp.com/word?number=100').then((res) => {
    res.json().then((data) => {
        data.forEach((word) => {
            words.push(word);
        });
    });
});

wordDisplay.addEventListener('click',setGame);

function numset(){
    isPlaying = true;
    GAME_TIME = 7;
    if(Low_t){
        GAME_TIME-=3;
    }
    if(Handi){
        GAME_TIME+=2;
    }
    score = 0;
}

function showInput(){
    if(Hide){
        document.getElementById('answer').type="password";
    }
}
function setGame(){
    opt();
    if(!isPlaying){
        document.getElementById('opt').style.display='none';
        numset();
        showInput();
        currentTime = GAME_TIME;
        timeDisplay.innerText = currentTime;
        scoreDisplay.innerText = score;
        showWord();
        remaining();
        isPlayingGame();
        isEndingG();
    }
    
}

function showWord() {
    wordDisplay.innerText = words[Math.floor(Math.random() * words.length)];
}

var rem;
function remaining(){
    rem = setInterval(remainingTime,1000);
}
function remainingTime() {
    timeDisplay.innerText = currentTime;
    timeDisplay.innerText > 0 ? currentTime-- : false;
}

var end;
function isEndingG(){
    end = setInterval(isEndingGame,100);
}   
function isEndingGame(){
    wordMatch();
    if((currentTime==0||score==10)){
        endGame();
    }
}

function isPlayingGame() {
    if (isPlaying) {
        input.focus();
    }
}

function scoreCale(){
    var res = (score*10)+(currentTime*2);
    if(Handi){
        console.log('a');
        res=res*0.5;
    }
    if(Hide){
        console.log('a');
        res=res*2;
    }
    if(Low_t){
        console.log('a');
        res=res*3;
    }
    return res;
}

function endGame(){
    isPlaying=false;
    var res = scoreCale();
    
    wordDisplay.innerText = "Restart?\n"+"Score : "+res;
    remainingTime();
    clearInterval(end);
    clearInterval(rem);
    document.getElementById('answer').type="text";
    document.getElementById('opt').style.display='block';
    document.getElementById('inp').style.display='block';
}

function wordMatch() {
    console.log(input.value.toLowerCase()===wordDisplay.innerText.toLowerCase());
    input.addEventListener('input', () => {
        if (isPlaying) {
            if (wordDisplay.innerText.toLowerCase() == input.value.toLowerCase()) {
                score += 1;
                scoreDisplay.innerText = score;
                input.value = '';
                currentTime += GAME_TIME;
                showWord();
            }
        }
    });
}

function opt(){
    Hide = document.getElementById('Hide').checked;
    Low_t = document.getElementById('Low_t').checked;
    Handi = document.getElementById('Handi').checked;
}