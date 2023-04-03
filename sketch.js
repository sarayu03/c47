var bg, bgImg
var zombie, zombieImg, zombiesGroup
var shooter, shooterImg, shooter3Img

var bullets = 70
var score = 0
var life = 3

var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img
var gameState = "fight"


function preload(){
  bgImg = loadImage("bg.jpeg")
  shooterImg = loadImage("shooter_2.png")
  shooter3Img = loadImage("shooter_3.png")
  zombieImg = loadImage("zombie.png")

  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")
}


function setup() 
{
  createCanvas(800,600);
  bg = createSprite(500,400,1,1)
  bg.addImage(bgImg)
  bg.scale = 0.8

  player = createSprite(200,400, 30,30)
  player.addAnimation("shooter", shooterImg)
  player.scale = 0.4
  player.debug = true
  player.setCollider("rectangle", 0,0,300,300)

  heart1 = createSprite(displayWidth-150,500,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,500,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,500,20,20)
  heart3.addImage("heart2",heart3Img)
  heart3.scale = 0.4

  zombiesGroup = new Group()
  bulletGroup = new Group()


  
  
}



function draw() 
{
  background(51);
 
  if(gameState ==="fight"){

    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }

    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }

    if(life===0){
      gameState = "lost"
    }

    if(score==100){
      gameState = "won"
      winning.play();
    }


    if(keyIsDown(UP_ARROW)||touches.length>0){
      player.y = player.y - 30
    }

    if(keyIsDown(DOWN_ARROW)){
      player.y = player.y+30
    }
    
    if(keyWentDown("space")||touches.length>0){
      bullet = createSprite(displayWidth-1150, player.y-30, 20,10)
      bullet.velocityX = 20
      bulletGroup.add(bullet)
      player.depth = bullet.depth
      player.depth = player.depth+2
      player.addImage(shooter3Img)
      bullets= bullets-1

    }

    else if(keyWentUp("space")){
      player.addImage(shooterImg)
    }

    if (bullets==0){
      gameState = "bullet"
      

    }

    if(zombiesGroup.isTouching(bulletGroup)){
      for(var i=0;i<zombiesGroup.length;i++){

        if(zombiesGroup[i].isTouching(bulletGroup)){
          zombiesGroup[i].destroy()
          bulletGroup.destroyEach()

          score = score+2
        }
      }
    }

    if(zombiesGroup.isTouching(player)){


      for(var i=0;i<zombiesGroup.length;i++){
        if(zombiesGroup[i].isTouching(player)){
          zombiesGroup[i].destroy()
          life=life-1
        }
      }
    }
  }
  
zombies()
 drawSprites()

 textSize(20)
 fill("white")
 text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

if(gameState == "lost"){
textSize(100)
fill("red")
text("You Lost",400,400)
zombiesGroup.destroyEach()
player.destroy()}

else if(gameState == "won"){
  textSize(100)
  fill("yellow")
  text("You Won", 400,400)
  zombiesGroup.destroyEach()
  player.destroy()
}

else if(gameState === "bullet"){
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!",470,410)
  zombie.Group.destroyEach()
  player.destroy()
  bulletGroup.destroyEach
}




}
   


function zombies(){
  if(frameCount%100===0){
  zombie = createSprite(800,300)
  zombie.y = Math.round(random(100,500))
  zombie.velocityX = -3
  zombie.addImage(zombieImg)
  zombiesGroup.add(zombie)
  zombie.scale = 0.17
}
}