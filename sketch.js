//aprender a mexer no stile
var trex, img_trex,img_dead;
var solo,img_solo;
var solo2;
var nuvem,img_nuvem;
var cacto,c1,c2,c3,c4,c5,c6;
var g_cactos;
var g_nuvens;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var furacao;
var img_botao,botao;
var img_game_Over,game_Over;


function preload(){
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle3.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  img_trex = loadAnimation("trex1.png","trex3.png","trex4.png");
  img_solo = loadImage("ground2.png");
  img_nuvem = loadImage("cloud.png");
  img_botao = loadImage("restart.png");
  img_dead = loadImage("trex_collided.png");
  img_game_Over = loadImage("gameOver.png");
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", img_trex);
  trex.addImage("collided", img_dead);
  trex.scale = 0.5;

  solo = createSprite(200,180,400,20);
  solo.addImage("ground",img_solo);
  

  solo2  = createSprite(200,190,400,10);
  solo2.visible = false;

  g_cactos = new Group();
  g_nuvens = new Group();

  botao = createSprite(300,140);
  botao.addImage(img_botao);
  botao.scale = 0.5;

  game_Over = createSprite(300,100);
  game_Over.addImage(img_game_Over);
  game_Over.scale = 0.7;

  furacao = 0;
}


function draw(){
  //definir a cor do plano de fundo 
  background(200);

  text("pontuação: " + furacao,500,50);
  
  
  if(gameState == PLAY){

    furacao = furacao + Math.round(getFrameRate()/60);
    
    game_Over.visible = false;
    botao.visible = false;

    //pular quando tecla de espaço for pressionada
    if(keyDown("space")&& trex.y >= 155){
      trex.velocityY = -10;
    }
    //criando a gravidade
    trex.velocityY = trex.velocityY + 0.5

    if(solo.x < 0){
    solo.x = solo.width/2;
    }
    solo.velocityX = -4;
    gerarCactos();
  
    gerarNuvens();

    if(g_cactos.isTouching(trex)){
      gameState = END;
    }
  }
  else if(gameState == END){
    game_Over.visible = true;
    botao.visible = true;
    solo.velocityX = 0;
    trex.velocityY = 0;

    trex.changeImage("collided",img_dead);

    g_nuvens.setVelocityXEach(0);
    g_cactos.setVelocityXEach(0);

    g_nuvens.setLifetimeEach(-1);
    g_cactos.setLifetimeEach(-1);

    if(mousePressedOver(botao)){
      reset();
    }

  }
 //impedir que o trex caia
  trex.collide(solo2);

  drawSprites();
}


function gerarNuvens(){  
  if(frameCount%60 == 0){
    nuvem = createSprite(600,random(10,100),40,10,);
    nuvem.addImage(img_nuvem);
    nuvem.velocityX = -3;
    nuvem.scale = 0.7;
    nuvem.depth = trex.depth ;
    trex.depth = trex.depth + 1;
    nuvem.lifetime = 250;

    g_nuvens.add(nuvem);
  }
}


function gerarCactos(){  
  if(frameCount%60 === 0){
    cacto = createSprite(600,165,10,40);
    cacto.velocityX = -5;

    var rand = Math.round(random(1,6));

      switch(rand) {
        case 1: cacto.addImage(c1);
        break;

        case 2: cacto.addImage(c2); 
        break;
        
        case 3: cacto.addImage(c3); 
        break;

        case 4: cacto.addImage(c4);
        break;

        case 5: cacto.addImage(c5);
        break;

        case 6: cacto.addImage(c6);
        break;
        default:break;  
      }

    cacto.scale = 0.5;
    cacto.lifetime = 1300;
    g_cactos.add(cacto);
  }
}

function reset(){
  gameState = PLAY;
  
  g_cactos.destroyEach();
  g_nuvens.destroyEach();

  trex.changeAnimation("running", img_trex);
  furacao = 0;


}
