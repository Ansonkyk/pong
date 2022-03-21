// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle element
const computerPaddle = document.querySelector('.computer-paddle');
const playerPaddle = document.querySelector('.player-paddle');
const ball = document.querySelector('.ball');
const easier = document.querySelector('.Auto');
const tracker = document.querySelector('h1.score');
const maxTracker = document.querySelector('h1.highScore');


// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 1;
let playerPaddleYPosition = 100;
let playerPaddleYVelocity = 30;
let Auto = false
let ballYPosition = 0;
let ballXPosition = 0;
let ballYVelocity = 3;
let ballXVelocity = 3;
let score = 0
let highScore = 0
let opacityValue = 1.2

// Update the pong world
function update() {
    
    // Update the computer paddle's position tracking ball
    computerPaddleYPosition = ballYPosition -50 + BALL_SIZE;
    if(computerPaddleYPosition >400){
        computerPaddleYPosition = 400;
    }
    else if(computerPaddleYPosition < 0){
        computerPaddleYPosition = 0;
    }
    if (Auto==true){
        playerPaddleYPosition = ballYPosition -50 + BALL_SIZE;
        if(playerPaddleYPosition >400){
            playerPaddleYPosition = 400;
        }
        else if(playerPaddleYPosition < 0){
            playerPaddleYPosition = 0;
        }
        playerPaddle.style.top = `${playerPaddleYPosition}px`;
    }

    // Apply the y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    
    
    if(ballYPosition > playerPaddleYPosition -5 && ballYPosition < playerPaddleYPosition +99 && ballXPosition < 20){
        ballXPosition = 20
        ballXVelocity = ballXVelocity*-1
        
        score++
        if(highScore < score){
            highScore = score
        }
    }
    
        
    
    else if(ballXPosition > 700-40){
        ballXVelocity = ballXVelocity*-1
    }
    else if(ballYPosition > 500-18){
        ballYPosition -= 2
        ballYVelocity = ballYVelocity*-1
    }
    else if(ballXPosition < 0){
        ballXVelocity = ballXVelocity*-1
        ballXPosition = 350 -BALL_SIZE
        ballYPosition = 250 -BALL_SIZE
        alert('Game Over!! Click "OK" to try again.')
        ballYVelocity = 3;
        ballXVelocity = 3;
        score = 0
    }
    else if(ballYPosition <1 ){
        ballYPosition += 2
        ballYVelocity = ballYVelocity*-1
    }
 
    //ball 1`
    ballXPosition = ballXPosition + ballXVelocity
    ballYPosition = ballYPosition + ballYVelocity
    ball.style.top =`${ballYPosition}px`;
    ball.style.left =`${ballXPosition}px`;
    //other
    tracker.innerText = `Score: ${score}`
    maxTracker.innerText = `Highscore: ${highScore}`
    tracker.style.color = 'white'
    maxTracker.style.color = 'lime'
    tracker.style.margin = '10px'
    maxTracker.style.margin = '10px'
}
//User contral

document.addEventListener('keydown', function(event){
    const spacer = 5
    // player paddle down
    if(event.keyCode == 40 && Auto==false){
        if(playerPaddleYPosition > 400 - spacer){
            playerPaddleYPosition = playerPaddleYPosition + 0;
        }
        else{
            playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity;
            playerPaddle.style.top =`${playerPaddleYPosition}px`;
        }
    }
    // player paddle up
    else if(event.keyCode == 38 && Auto==false){
        if(playerPaddleYPosition < 0 + spacer){
            playerPaddleYPosition = playerPaddleYPosition + 0;
        }
        else{
            playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity*-1;
            playerPaddle.style.top =`${playerPaddleYPosition}px`;
        }
    }
})




easier.addEventListener('click', function(){
    if (Auto===true){
        Auto=false;
    }else{
        Auto=true
    }
})


// Game!!!!
setInterval(update, 20);