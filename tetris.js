const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');


//context.scale (20,20);
const blockSize = 40;

//play intro
introSound = new Audio('audio/tetrismf.mp3');
loopSound = new Audio('audio/tetrisloop.mp3');
collideSound = new Audio('audio/tetriscollide.mp3')
rotateSound = new Audio('audio/tetrisrotate.mp3')
sweepSound = new Audio('audio/tetrissweep.mp3') 
pauseSound = new Audio('audio/tetrispause.mp3') 
gameoverSound = new Audio('audio/tetrisgameover.mp3') 
highspinsSound = new Audio('audio/tetrishighspins.mp3') 
levelupSound = new Audio('audio/tetrislevelup.mp3') 
introSound.volume = .03
loopSound.volume = .015
collideSound.volume = .04
rotateSound.volume = .015
sweepSound.volume = .25
pauseSound.volume = .1
gameoverSound.volume = .03
highspinsSound.volume = .02
levelupSound.volume = .1



CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}
function levelUp(){
    player.level++
    levelupSound.pause()
    levelupSound.currentTime = 0;
    levelupSound.play()
}
function arenaSweep(){
    let rowCount = 1;
    
    outer: for (let y = arena.length -1; y > 0; --y) {
        for(x = 0; x < arena[y].length; ++x){
            if(arena[y][x] == 0){
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        player.lines ++
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2

        // handle level ups
        if(player.lines >= 5 && player.level == 1){
            levelUp()
        } else if(player.lines >= 10 && player.level == 2){
            levelUp()
        } else if(player.lines >= 20 && player.level == 3){
            levelUp()
        } else if(player.lines >= 40 && player.level == 4){
            levelUp()
        } else if(player.lines >= 80 && player.level == 5){
            levelUp()
        } else if(player.lines >= 160 && player.level == 6){
            levelUp()
        } else if(player.lines >= 320 && player.level == 7){
            levelUp()
        } else if(player.lines >= 640 && player.level == 8){
            levelUp()
        } else {
            sweepSound.pause()
            sweepSound.currentTime = 0;
            sweepSound.play()
        }

    }
}

function collide(arena, player){
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y ){
        for (let x = 0; x < m[y].length; ++x){
            if(m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0 ){
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--){
        matrix.push(new Array(w).fill(0))
    }
    return matrix
} 

const pieces = 'ILJOTSZ'

function createPiece(type){
    switch (type){
        case "T":
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ]
        case "O":
            return [
                [2, 2],
                [2, 2]
            ]
        case "L":
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ]
        case "J":
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ]
        
        case "I":
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
            ]
        case "S":
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ]
        case "Z":
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0],
            ]
        default:
    }
}

function drawGame(){
    //draw matrix
    context.fillStyle='#000'
    context.fillRect(0,100, canvas.width, canvas.height)
    drawMatrix(arena, {x:0, y:0})
    drawMatrix(player.matrix, player.pos);

    //draw scoreboard
    context.fillStyle='#111'
    context.fillRect(0,0, canvas.width, 100)

    context.textAlign = "center"
    context.fillStyle='#888'
    context.font = '24px Russo One';
    context.fillText("Score:", canvas.width /8, 30)
    context.fillStyle='#fff'
    context.font = '40px Russo One';
    context.fillText(player.score, canvas.width /8, 70)

    context.textAlign = "center"
    context.fillStyle='#888'
    context.font = '24px Russo One';
    context.fillText("Lines:", canvas.width /5 * 2, 30)
    context.fillStyle='#fff'
    context.font = '40px Russo One';
    context.fillText(player.lines, canvas.width /5 * 2, 70)

    context.textAlign = "center"
    context.fillStyle='#888'
    context.font = '24px Russo One';
    context.fillText("Level:", canvas.width /5 * 3, 30)
    context.fillStyle='#fff'
    context.font = '40px Russo One';
    context.fillText(player.level, canvas.width /5 * 3, 70)

    context.textAlign = "left"
    drawNextMatrix(player.nextMatrix, {x: canvas.width /5 * 4 , y: 10})
}

function drawPausedScreen(){
    context.fillStyle='#333'
    context.fillRect(0,0, canvas.width, canvas.height)
    context.fillStyle='white'
    context.font = '32px Russo One';
    context.textAlign = "center";
    context.fillText("Paused", canvas.width /2, canvas.height /2)
    context.font = '18px Russo One';
    context.fillText("Space to resume, Escape to exit", canvas.width /2, canvas.height /1.8)
}

function drawGameOverScreen(){
    context.fillStyle = 'rgba(30,25,25,0.075)';
    context.fillRect(0,100, canvas.width, canvas.height)
    context.fillStyle='white'
    context.font = '32px Russo One';
    context.textAlign = "center";
    context.fillText("GameOver", canvas.width /2, canvas.height /2)
    context.font = '18px Russo One';
    context.fillText("tetris.bsord.dev", canvas.width /2, canvas.height /1.8)
    
}

function drawMainMenu(){
    context.fillStyle='#303040'
    context.fillRect(0,0, canvas.width, canvas.height)
    context.fillStyle='green'
    context.font = '32px Russo One';
    context.textAlign = "center";
    context.fillText("Lets Play..", canvas.width /2, canvas.height /2)

    if(window.localStorage.getItem('highscore') !== null){
        context.font = '18px Russo One';
        context.fillText("Highscore: " + window.localStorage.getItem('highscore'), canvas.width /2, canvas.height /3)
    };
    
    context.font = '18px Russo One';
    context.fillText("Press Space to begin", canvas.width /2, canvas.height /1.8)
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                context.fillStyle = colors[value];
                context.roundRect(x * blockSize + offset.x * blockSize, 100 + y * blockSize + offset.y * blockSize, 1 * blockSize, 1 * blockSize, 5).fill()
                context.strokeStyle = "black"
                context.strokeRect(x * blockSize + offset.x * blockSize, 100 + y * blockSize + offset.y * blockSize, 1 * blockSize, 1 * blockSize)
            }
        });
    });
}

function drawNextMatrix(matrix, offset) {
    const scale = 20
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                context.fillStyle = colors[value];
                context.roundRect(x * scale + offset.x,  y * scale + offset.y, 1 * scale, 1 * scale, 5).fill()
                
                context.strokeStyle = "black"
                context.strokeRect(x * scale + offset.x , y * scale + offset.y , 1 * scale, 1 * scale)
            }
        });
    });
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function merge (arena, player){
    player.matrix.forEach((row, y)=>{
        row.forEach((value,x)=>{
            if(value !== 0){
                arena[y + player.pos.y][x + player.pos.x] = value
            }
            
        })
    })
}

function playerDrop(){
    player.pos.y++
    if(collide(arena,player)){
        player.pos.y--
        merge(arena, player);
        playerReset();
        arenaSweep();
        collideSound.pause()
        collideSound.currentTime = 0;
        collideSound.play()
    }
    dropCounter = 0
}

function playerMove(dir){
    player.pos.x += dir
    if(collide(arena, player)){
        player.pos.x -= dir;
    }
}

function playerReset(){
    player.matrix = player.nextMatrix
    player.nextMatrix=(createPiece(pieces[pieces.length * Math.random() | 0]))
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    if(collide(arena, player)){
        arena.forEach(row => row.fill(0));
        if(window.localStorage.getItem('highscore') !== null){
            if(player.score > window.localStorage.getItem('highscore')){
                window.localStorage.setItem('highscore', player.score);
            }
        }
        
        endGame()
    }
}

function playerRotate(dir){
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir)
    while(collide(arena, player)){
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if(offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos
            return;
        }
    }



    if(!player.crazySpins){
        rotateSound.pause()
        rotateSound.currentTime = 0;
        rotateSound.play()
        player.spins++
    }
    if(player.spins > 25){
        player.crazySpins = true
        loopSound.pause()
        highspinsSound.pause()
        highspinsSound.currentTime = 0;
        highspinsSound.play()
        player.spins = 0

        highspinsSound.addEventListener('ended', function() {

            player.crazySpins = false
            if (typeof loopSound.loop == 'boolean')
            {
                loopSound.loop = true;
            }
            else
            {
                loopSound.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }
            loopSound.play();
        }, false);
    }


}

function rotate(matrix, dir){
    for(let y = 0; y < matrix.length; ++y){
        for(let x = 0; x < y; ++x){
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]]
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }

}

function update(time = 0){
    if(gameState.initialized){
        if(gameState.paused){
            //game paused
            drawPausedScreen()
        } else if (gameState.over){
            drawGameOverScreen()
        } else {
            //initialized not paused, draw game
            const deltaTime = time - lastTime;
            lastTime = time;
            dropCounter += deltaTime;
  
            if(dropCounter > dropInterval - (player.level * 150)){
                playerDrop()
                
            }
            
            drawGame();
        }

    } else {
        //not initialized draw main screen
        drawMainMenu()
    }

    requestAnimationFrame(update);
    
}

const arena = createMatrix(12,20);

const player = {
    pos: {x: 5, y: 0},
    matrix: (createPiece(pieces[pieces.length * Math.random() | 0])),
    nextMatrix: (createPiece(pieces[pieces.length * Math.random() | 0])),
    score: 0,
    spins: 0,
    crazySpins: false,
    level: 1,
    lines: 0
}

const gameState = {
    initalized: false,
    paused: false,
    introSongPlayed: false,
    gameOver: false
}

const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
]

document.addEventListener('keydown', event => {
    switch(event.code){
        case "ArrowLeft":
            playerMove(-1)
            break;
        case "ArrowRight":
            playerMove(+1)
            break;           
        case "ArrowDown":
            playerDrop();
            break;
        case "ArrowUp":
            playerRotate(-1);
            break;
        case "KeyW":
            playerRotate(-1);
            break;
        case "KeyS":
            playerDrop();
            break;
        case "KeyA":
            playerMove(-1)
            break;
        case "KeyD":
            playerMove(+1)
            break;
        case "Escape":
            endGame()
            break;
        case "Space":
            startPauseResume();
            break; 
        default:
    }
})

function initAudio() {
    
    if(gameState.introSongPlayed){
        loopSound.play();
    } else {
        loopSound.pause();
        loopSound.currentTime = 0;
        introSound.play()
    }
    //play loop when intro ends
    introSound.addEventListener('ended', function() {
        gameState.introSongPlayed = true
        
        if (typeof loopSound.loop == 'boolean')
        {
            loopSound.loop = true;
        }
        else
        {
            loopSound.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        loopSound.play();
    }, false);
}

function pauseGame(){
    introSound.pause();
    loopSound.pause();
    gameState.paused=true
    pauseSound.pause()
    pauseSound.currentTime = 0;
    pauseSound.play()

}


function resumeGame(){
    initAudio();
    gameState.paused=false
    update();
    pauseSound.pause()
    pauseSound.currentTime = 0;
    pauseSound.play()
}

function startGame(){
    gameoverSound.pause()
    gameoverSound.currentTime = 0;
    arena.forEach(row => row.fill(0));
    player.score = 0;
    player.lines = 0;
    player.level = 1;
    gameState.paused = false;
    playerReset();
    initAudio();
    update();
    gameState.initialized = true
    
}

function stopSounds(){
    introSound.pause()
    introSound.currentTime = 0;
    loopSound.pause();
    loopSound.currentTime = 0;
    highspinsSound.pause();
    highspinsSound.currentTime = 0;
}
function homeScreen() {
    gameState.initialized = false
    gameState.introSongPlayed = false;
    gameState.over = false;
    gameoverSound.pause()
    gameoverSound.currentTime = 0;
    arena.forEach(row => row.fill(0));
    player.score = 0;
    player.level = 1;
    player.lines = 0;
    player.spins = 0;
    player.matrix = []
}

function endGame(){
    stopSounds()
    
    gameoverSound.pause()
    gameoverSound.currentTime = 0;
    gameoverSound.play()
    gameState.over = true;
    update()
}

function startPauseResume(){
    if(gameState.initialized){
        if(gameState.paused){
            resumeGame()
        } else if (gameState.over){
            homeScreen()
        } else{
            pauseGame()
        }
    } else{
        startGame()
    }
}

document.getElementById('tetris').addEventListener('click', function(){
    startPauseResume()
});

update();




