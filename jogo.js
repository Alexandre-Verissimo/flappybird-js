console.log('[DevSoutinho] Flappy Bird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');



function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura
  const chaoY = chao.y
  console.log(flappyBirdY)
  if(flappyBirdY >= chaoY) {
    return true;
  }
    return false;
}

function criaFlappyBird() {
  
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      flappyBird.velocidade = -flappyBird.pulo;
    },
    gravidade: 0.25,
    velocidade: 0,
    desenha() {
      contexto.drawImage(
      // pra que essa função de desenhar possa fazer sprite ficar visivel
      // é necessário definir o fps dela com RequestAnimationFrame
      sprites, 
      flappyBird.spriteX, flappyBird.spriteY, // coordenada do sprite x e y 
      flappyBird.largura, flappyBird.altura, // tamanho recorte do pedaço na sprite
      flappyBird.x, flappyBird.y, // posição do sprite na tela
      flappyBird.largura, flappyBird.altura // tamanho a ser usado
      );
    },
  
    atualiza() {
      if(fazColisao(flappyBird, chao)) {
  
        mudaParaTela(telas.INICIO)
        som_HIT.play();
        return;
      }
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
      flappyBird.y = flappyBird.y + flappyBird.velocidade
    }
  }

  return flappyBird;
}


const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height -112,
  desenha() {
    contexto.drawImage(
      // pra que essa função de desenhar possa fazer sprite ficar visivel
      // é necessário definir o fps dela com RequestAnimationFrame
      sprites, 
      chao.spriteX, chao.spriteY, // coordenada do sprite x e y 
      chao.largura, chao.altura, // tamanho recorte do pedaço na sprite
      chao.x, chao.y, // posição do sprite na tela
      chao.largura, chao.altura // tamanho a ser usado
      );

    contexto.drawImage(
      sprites, 
      chao.spriteX, chao.spriteY, 
      chao.largura, chao.altura,
      (chao.x + 96), chao.y,
      chao.largura, chao.altura 
      );
  }
}

// Plano de Fundo
const fundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 276,
  altura: 204,
  x: 0,
  y: canvas.height -204,
  desenho() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)
    contexto.drawImage(
      sprites,
      fundo.spriteX, fundo.spriteY,
      fundo.largura, fundo.altura,
      fundo.x, fundo.y,
      fundo.largura, fundo.altura
    );

    contexto.drawImage(
      sprites,
      fundo.spriteX, fundo.spriteY,
      fundo.largura, fundo.altura,
      (fundo.x + 44), fundo.y,
      fundo.largura, fundo.altura
    );
  } 

}

// Tela de Inicio

const msgGameReady = {
  spriteX: 134,
  spriteY: 0,
  largura: 175,
  altura: 152,
  x: 73,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      msgGameReady.spriteX, msgGameReady.spriteY,
      msgGameReady.largura, msgGameReady.altura,
      msgGameReady.x, msgGameReady.y,
      msgGameReady.largura, msgGameReady.altura
    )
  }
}
const globais = {}
let telaAtiva = {}
function mudaParaTela(novaTela) {
  telaAtiva = novaTela

  if(telaAtiva.inicializa()) {
    inicializa()
  }
}
const telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
    },
    desenha() {
      fundo.desenho(),
      chao.desenha(),
      globais.flappyBird.desenha()
      msgGameReady.desenha()
    },
    click(){
      mudaParaTela(telas.JOGO)
    },
    atualiza() {

    } 
  },
  JOGO: {
    desenha() {
      fundo.desenho(),
      chao.desenha(),
      globais.flappyBird.desenha()
    },
    click() {
      globais.flappyBird.pula()
    },
    atualiza() {
      globais.flappyBird.atualiza()
    }
  }
}

//Loop
function loop() { 

    telaAtiva.desenha(),
    telaAtiva.atualiza()
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
  telaAtiva.click()
})

mudaParaTela(telas.INICIO);
loop();



