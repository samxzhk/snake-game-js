const {log, dir} = console;

//////////////// variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth*0.5;
canvas.height = canvas.width*(3/4);
//////////////////////////
class SnakePart
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}
const snakeParts = [];
let tailLength = 2;
// initial speed
let speed = 7;
const tileCount=20;
const tileSize = 20;
let headX = 10;
let headY = 10;

let xVelocity =0;
let yVelocity =0;
let appleX = 5;
let appleY =5;

let score = 0;
/* ---- FUNCTION ---- */
function drawScore()
{
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width-50, 10);
}

function clearScreen()
{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function checkAppleCollision()
{
    if(appleX == headX && appleY == headY)
    {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength+=1;
        score++;
    }
}

function drawSnake()
{
    ctx.fillStyle = "green";
   
    for(let i =0; i < snakeParts.length; i++)
    {
        let part = snakeParts[i];
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength)
    {
        snakeParts.shift(); // the first item will be the farthest away from the head :)
    }
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);
}

function isGameOver()
{
    let gameOver = false;
    if(yVelocity == 0 && xVelocity == 0) 
    {
        return false;
    }
    // walls
    if(headX< 0)
    {
        gameOver = true;
    }
    else if(headX*tileCount + tileSize*1.3 > canvas.width)
    {
        gameOver = true;
    }
    else if(headY < 0)
    {
        gameOver = true;
    }
    else if(headY*tileCount + tileSize*1.3 > canvas.height)
    {
        gameOver = true;
    }

  
     for(let i = 0; i < snakeParts.length; i++)
    {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY)
        {
            gameOver = true;
            break;
        }
    } 

    if(gameOver)
    {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
    }
    return gameOver;
}
function drawApple()
{
    ctx.fillStyle = "red";
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}

function drawGame()
{   
    changeSnakePosition();
    if(isGameOver()) return;
    clearScreen();
    checkAppleCollision();
    drawSnake();
    drawApple();
   
    drawScore();
    setTimeout(drawGame, 1000/speed);
}
function changeSnakePosition()
{
    headX+= xVelocity;
    headY+=yVelocity;
}

drawGame();


/* Event listener */

document.body.addEventListener('keydown', keyDown);

function keyDown(event)
{
    switch(event.keyCode)
    {
        // move up
        case 38:
            // if you are moving down, yout won't be 
            // able to move up
            // this will prevent the snake from crashing into
            // its own body
            if(yVelocity == 1) return;
            yVelocity = -1;
            xVelocity = 0;
            break;
        // move down  
        case 40:
            // if you are moving up, you won't be able
            // to move down
            // this will prevent the snake from crashing into its own body
            if(yVelocity == -1) return;
            yVelocity =1;
            xVelocity = 0;
            break;
        // move left
        case 37:
            // if you are moving right, you won't be able
            // to move left
            if(xVelocity == 1) return;
            yVelocity =0;
            xVelocity =-1;
            break;
        // move right
        case 39:
            // if you are moving left, you won't be able to move right
            if(xVelocity == -1) return;
            yVelocity = 0;
            xVelocity =1;
            break;
    }
}