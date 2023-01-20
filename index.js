const ctx= canvas.getContext('2d')

class SnakePart{
    constructor(x,y){
        this.x =x 
        this.y=y
    }
}


let speed = 7
let tileCount=20 //numbers of tiles, 20 vertical and 20 horizontal
let tileSize= canvas.width / tileCount -2; // size of the tile
let headX =10 // position of the head snake
let headY=10

let xVelocity=0
let yVelocity=0

let appleX=5
let appleY=5

const SnakeParts=[]
let tailLength=2
// create a draw fonction that show the new animation on every screen refresh 
function draw(){
    clearScreen()
    changeSnakePosition() // fonction qui s'incremente seul , par rapport a la touche appuyee
    checkAppleColision()
    drawApple()// pour dessiner la nourriture sur l'ecran

    drawSnake() // pour dessiner le serpent 
    setTimeout(draw,1000/speed) //pour le speed du serpent

}

function clearScreen(){
    ctx.fillStyle='black'
    ctx.fillRect(0,0, canvas.width, canvas.height)
}

function drawSnake(){
  

    ctx.fillStyle='green'
    for(let i=0; i<SnakeParts.length; i++){
        let part = SnakeParts[i]
        ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize)
    }

    SnakeParts.push(new SnakePart(headX,headY)) // put a item at the end of the list next to the head then
    if(SnakeParts.length > tailLength){
        SnakeParts.shift() //we remove the furthers item fron the snake parts if we have more than our tail size
    }

      
    ctx.fillStyle='orange'
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize)
}



function changeSnakePosition(){
    headX=headX + xVelocity
    headY= headY +yVelocity
}

function drawApple(){
    ctx.fillStyle='red'
    ctx.fillRect(appleX*tileCount ,appleY*tileCount ,tileSize,tileSize)
}

function checkAppleColision(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random()*tileCount)
        appleY = Math.floor(Math.random()*tileCount)
        tailLength++
        
    }
    
}
// les evenements du clavier
//up
document.body.addEventListener('keydown',(event)=>{
    if(event.keyCode ==38){
        if(yVelocity==1){return;}
       yVelocity=-1
       xVelocity=0 
    }
// down
    if(event.keyCode ==40){
        if(yVelocity==-1){return;}
        yVelocity= 1
        xVelocity=0 
     }

     //left
     if(event.keyCode ==37){
        if(xVelocity==1){return}
        yVelocity=0
        xVelocity=-1 
     }
 // right
     if(event.keyCode ==39){
        if(xVelocity==-1){return}
         yVelocity= 0
         xVelocity=1
      }
      
})


draw() 