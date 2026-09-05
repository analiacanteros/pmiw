let fondo; 
 //declaro mis arreglos
let sonicA = []; // sonic cae  (son 4 imagenes)
let sonicB = []; // sonic rebota(son 3 imagenes)
let sonicC = []; // sonic corre(son 7 imagenes)

let a, b, c;     // Contadores  para cada arreglo
let estado = 0;  
let posX, posY;  //variable para la posicion de sonic
let ultimoTiempo = 0;
let velocidadAnimacion = 70; // Tiempo en milisegundos entre cambios de fotograma

  //cargo mis imagenes
  function preload() {
  fondo = loadImage('assets/escenario.jpg');

  for (let i = 0; i <= 3; i++) {
    sonicA.push(loadImage('/assets/sonic_'+i+'.png'));
  }
  for (let i = 4; i <= 6; i++) {
    sonicB.push(loadImage('/assets/sonic_'+i+'.png'));
  }
  for (let i = 7; i <= 13; i++) {
    sonicC.push(loadImage('/assets/sonic_'+i+'.png'));
   }
 }

  function setup() {
  createCanvas(800, 600);
  
  a = b = c = 0; //inicializo mis contadores 
  cambiarEstado(0);//llamo a mi funcion 
  
}

  function draw() {
  image(fondo, 0, 0);

  let escala = 1; // creo variable para cambiar el tamaño de sonic 
  let piso = 450; 
  let spriteActual;

   if (estado === 0) { //cae
   spriteActual = dibujar(sonicA, a, posX, posY, escala);//dibujo el fotograma actual de cuando cae y calculo la nueva posicion
   posY = actualizarPosicion(posY, 8);

   if (posY + (spriteActual.height * escala) >= piso) {
   cambiarEstado(1);
    }

  } else if (estado === 1) { //rebota
    spriteActual = dibujar(sonicB, b, posX, posY, escala);
    posX = actualizarPosicion(posX, 2); 
    posY = piso - (spriteActual.height * escala);

    if (b >= 2) {
    cambiarEstado(2);
    }
     
  } else if (estado === 2) { //corre sonic
    spriteActual = dibujar(sonicC, c, posX, posY, escala);
    posX = actualizarPosicion(posX, 8);
    posY = piso - (spriteActual.height * escala);
    
    // si sonic sale por el borde derecho de la pantalla, reinicio todo el ciclo
    if (posX > width) {
      cambiarEstado(0);
    }
  }
   // si la diferencia entre el tiempo actual y el último tiempo es mayor a 70 millis
  if (millis() - ultimoTiempo > velocidadAnimacion) {
      if (estado === 0) {
      a++;
      if (a >= 4) a = 0;
    } else if (estado === 1) {
      b++;
    } else if (estado === 2) {
      c++;
      if (c >= 7) c = 0;
    }
     ultimoTiempo = millis(); //guardo el tiempo actual para marcar el inicio del siguiente fps
  }
}

//funcion  con parametros que retorna valor 
  function dibujar(lista, i, x, y, esc) {
  let sprite = lista[i];
  image(sprite, x, y, sprite.width * esc, sprite.height * esc);
  return sprite;
}


//funcion con parametros para cambiar de estado y reiniciar mis variables
  function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;
  a = b = c = 0; // reinicio los contadores
  
  if (estado === 0) {
   posX = 40;
   posY = -50;
  }
 }
  
  function actualizarPosicion(posicionActual, velocidad) {
  return posicionActual + velocidad;
  }
