//Auteur: KATCHALA MELE Daouda
//Date: 19/03/2018

var canvas = document.getElementById('canvas'); // recuperation de la balise canvas
var ctx = canvas.getContext('2d');
//ctx.strokeStyle = 'black';
var L = 200, H = 400; // largeur et hauteur du canvas

//cette fonction dessine un carré au point x,y
function dessineCarre(x,y){
  var lcarre = L/COLONNES, hcarre = H/LIGNES;
  //ctx.strokeRect(lcarre*x, hcarre*y, lcarre-1, hcarre-1);
  ctx.fillRect(lcarre*x, hcarre*y, lcarre-1, hcarre-1);
}

//cette fonction affiche la grille de tetris ou la met à jour
function affiche(){
  ctx.clearRect(0,0,L,H);
  for(var y=0; y<LIGNES; y++){
    for(var x=0; x<COLONNES; x++){
      if(grille[y][x] != 0){
        ctx.fillStyle = 'black';
        dessineCarre(x,y);
      }else{
        ctx.fillStyle = 'rgba(127,127,127,0.5)';
        dessineCarre(x,y);
      }
    }
  }
  for(var y=0; y<4;y++){
    for(var x=0; x<4; x++){
      if(lebloc[y][x] != 0){
        ctx.fillStyle = 'red';
        dessineCarre(positionX+x, positionY+y);
      }
    }
  }
}
setInterval(affiche, 30);
