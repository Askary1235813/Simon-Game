let isGameStarted = false;
let currentLevel = 1;
let currentIndex = 0;
let levelSequence = [];

// register events
$(document).keydown(function (e) {
    if (isGameStarted === false) {
        startGame();
    }
});

$('.btn').click(function (e) {
    e.preventDefault();

    let clickedSquareIndex = Array.from(document.querySelectorAll('.btn')).indexOf(this);
    animateSquare(clickedSquareIndex);
    checkClickedSquare(clickedSquareIndex);
});
// ----------------------------------------

function startGame() {
    isGameStarted = true;
    let firstSquareNumber = getRandomNumber();

    // initiate game level 1
    levelSequence.push(firstSquareNumber);
    animateSquare(firstSquareNumber);

    // update level title
    $('#level-title').text('Level ' + currentLevel);
}

function getRandomNumber() {
    return Math.floor(Math.random() * document.querySelectorAll('.btn').length);
}

function animateSquare(squareNumber) {
    let selectedSquare = document.querySelectorAll('.btn')[squareNumber];

    $('#' + selectedSquare.id).addClass("pressed");
    setTimeout(function () {
        $('#' + selectedSquare.id).removeClass("pressed");
    }, 111)

    let audio = new Audio("sounds/" + selectedSquare.id + ".mp3");
    audio.play();
}

function checkClickedSquare(clickedSquareIndex) {
    if (levelSequence[currentIndex] === clickedSquareIndex) {
        console.log('Correct');

        // check level sequence if current index + 1 == array length --> go to next level
        // if not increment current index by 1

        if (currentIndex + 1 === levelSequence.length) {
            levelUp();
        } else {
            currentIndex++;
        }
    } else {
        lose();
    }
}

function levelUp() {
    currentIndex = 0; // set current index to zero
    let newIndex = getRandomNumber(); // get random number to add
    levelSequence.push(newIndex); // add number to level sequence array

    setTimeout(() => {
        animateSquare(newIndex); // animate added square
    }, 500);

    currentLevel++; // increment level number by one
    $('#level-title').text('Level ' + currentLevel); // update level title
}

function lose() {
    playLoseAnimation();
    restartGame();
}

function playLoseAnimation() {
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 500);

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function restartGame() {
    currentIndex = 0;
    currentLevel = 1;
    levelSequence = []
    
    isGameStarted = false;
    $('#level-title').text('Game Over, Press Any Key to Restart'); // update level title
}