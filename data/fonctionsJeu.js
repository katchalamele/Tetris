//Auteur: KATCHALA MELE Daouda
//Date: 20/03/2018

var grille = [];//grille de 20 carrés sur 10
var blocs = [ //tableau qui contient une représentation des different blocs de tetris
  [ 1, 1, 1, 1 ],
  [ 1, 1, 1, 0,
    1 ],
  [ 1, 1, 1, 0,
    0, 0, 1 ],
  [ 1, 1, 0, 0,
    1, 1 ],
  [ 1, 1, 0, 0,
    0, 1, 1 ],
  [ 0, 1, 1, 0,
    1, 1 ],
  [ 0, 1, 0, 0,
    1, 1, 1 ]
];
var LIGNES = 20, COLONNES = 10;
var positionX, positionY, lebloc; // le bloc descendant et ses positions
var perdu, interval;

//cette fonction renvoie un nouveau bloc
function newBloc(){
  var i = Math.floor(Math.random() * blocs.length); //choix d'un type de bloc aléatoire
  var bloc = blocs[i];
  lebloc = [];
  for(var y=0; y<4; y++){
    lebloc[y] = [];
    for (var x=0; x<4; x++){
      var a = y*4 + x
      if(typeof bloc[a] != 'undefined' && bloc[a] != 0){
        lebloc[y][x] = 1;
      }else{
        lebloc[y][x] = 0;
      }
    }
  }
  positionX = 3;
  positionY = 0;
}

//cette fonction renvoie le bloc descendant tourné
function tourne(){
  var lebloc2 = [];
  for(var y=0; y<4; y++){
    lebloc2[y] = [];
    for(var x=0; x<4; x++){
      lebloc2[y][x] = lebloc[((-1)*x)+3][y]; // tourne le bloc dans son carré de 4x4
    }
  }
  return lebloc2;
}

//cette fonction initialise la grille
function initialiseGrille(){
  for(var y=0; y<LIGNES;y++){
    grille[y] = [];
    for(var x=0; x<COLONNES; x++){
      grille[y][x] = 0;
    }
  }
}

//cette fonction verifie si un deplacement ou une rotation
//du bloc descendant est possible
function possible(dx, dy, lebloc2){
  dx = dx || 0;
  dy = dy || 0;
  lebloc2 = lebloc2 || lebloc;
  dx = positionX + dx;
  dy = positionY + dy;
  for(var y=0; y<4; y++){
      for(var x=0; x<4; x++){
          if(lebloc2[y][x]){
              if(typeof grille[y + dy] == 'undefined'
                || typeof grille[y + dy][x + dx] == 'undefined'
                || grille[y + dy][x + dx]
                || x + dx < 0
                || y + dy >= LIGNES
                || x + dx >= COLONNES){
                if (dy==1){
                    perdu = true;
                }
                return false;
              }
          }
      }
  }
  return true;
}

//cette fonction s'occupe de decendre le bloc descendant
function deplaceBas(){
  if(possible(0,1)){
    positionY++;
  }else{
    fixer();
    mangeLignes();
    if(perdu){
      nouveauJeu();
      return; //sort de la fonction
    }
    newBloc();
  }
}

//cette fonction fixe le bloc descendant
//quand il atteint le sol ou un autre bloc
function fixer(){
  for(var y=0; y<4; y++){
    for(var x=0; x<4; x++){
      if(lebloc[y][x] != 0){
        grille[positionY+y][positionX+x] = 1;
      }
    }
  }
}

//cette fonction mange les lignes completéelse
function mangeLignes(){
  //TODO
}

//cette fonction interprete les touches directionels
function interpreteDirection(direction){
  if(direction == "gauche" && possible(-1)){
    positionX--;
  }else if(direction == "droite" && possible(1)){
    positionX++;
  }else if(direction == "bas" && possible(0,1)){
    positionY++;
  }else if(direction == "haut"){//dans ce cas le bloc est tourné si possible
    var btourne = tourne();
    if(possible(0,0,btourne)){
      lebloc = btourne;
    }
  }
}

//cette fonction s'execute à chaque fois qu'un bouton est appuyé
//elle execute la fonction interpreteDirection si le bouton appuyé est une direction
document.body.onkeydown = function(event){
  var directions = {
      37: 'gauche',
      38: 'haut',
      39: 'droite',
      40: 'bas',
  };
  if(typeof directions[event.keyCode] != 'undefined'){
    interpreteDirection(directions[event.keyCode]);
    affiche();
  }
}

//cette fonction lance un nouveauJeu
function nouveauJeu(){
  initialiseGrille();
  perdu = false;
  clearInterval(interval);
  newBloc();
  interval = setInterval(deplaceBas, 300);
}
nouveauJeu();
