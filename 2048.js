var dimension;
var grille_jeu;

/*
Fonction appelée au démarrage de la page.
*/
function main(){

	//obtenir les dimensions du navigateur.
	/*
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    */

    startNewGame();

};


function startNewGame(){
    
    grille_jeu=[];
    
    //Demander à l'utilisateur de choisir les dimensions.
	do{
		dimension = prompt("Veuillez entrer un chiffre (3 et +) afin de choisir la dimension du jeu (Par exemple, 4 pour un jeu 4X4)");
	}while(isNaN(dimension)|| dimension=="" || dimension<3);

	document.getElementById("dimensions_jeu").innerHTML = "Le jeu 2048 avec en dimensions "+dimension+"X"+dimension;

	initialSetup(dimension);
}

/*
Fonction appelée pour créer le tableau initial
*/
function initialSetup(dimension) {
    
    var body = document.getElementsByTagName('body')[0];
	var tbl = document.createElement('table');
	var tbdy = document.createElement('tbody');

	//Création de la représentation 2D de la grille de jeu
	//Pour faciliter les manipulations
	
	for (var i = 0 ; i < dimension ; i++, grille_jeu.push(temp)){
		var temp = [];
        var tr = document.createElement('tr');
		
        for(var j = 0 ; j < dimension ; j++){
			temp.push(0);
            var td = document.createElement('td');
			tr.appendChild(td);
		}
        tbdy.appendChild(tr);
	}
	tbl.appendChild(tbdy);
	body.appendChild(tbl);

	for (var nombre = 0; nombre < 2; nombre ++){
        generate_random_number();
    }
    
	update_screen();
};


/*
Fonction qui permet de générer aléatoirement un 2 ou un 4 dans une case vide du jeu.
*/
function generate_random_number(){
	var empty_cell = false;
	var found_cells = [];

	//Vérifier s'il reste une case vide.
	for(var i = 0; i<dimension;i++){
		for(var j = 0 ; j<dimension;j++){
			if(grille_jeu[i][j]==0){
				empty_cell=true;
				found_cells.push([i,j]);
			}
		}
	}
    
    if (empty_cell){
        var tds = document.getElementsByTagName("td");
        var length = tds.length;
        var two_or_four = Math.random() > 0.5? 4: 2;

        //On choisit une cellule non-vide au hasard.
        //Math.floor pour obtenir une fourchette exclusive [0,found_cells.length[
        var random = Math.floor(found_cells.length*Math.random());
        grille_jeu[found_cells[random][0]][found_cells[random][1]]=two_or_four;
    }
    return empty_cell;
}

function upArrowPressed(){
    var hasMoved = moveValuesUp();
//    moveValuesUp();

    //On additionne les cases de même valeur
    for(var i = 1 ; i<dimension;i++){
        for(var j = 0 ; j<dimension;j++){
            if(grille_jeu[i][j]==grille_jeu[i-1][j] && grille_jeu[i][j]!=0){
                grille_jeu[i-1][j]+=grille_jeu[i][j];
                grille_jeu[i][j]=0;
                hasMoved = true;
            }
        }
    }
    if (moveValuesUp() || hasMoved)
        updateGame();
//    moveValuesUp();

}


function downArrowPressed(){
    var hasMoved = moveValuesDown();
//    moveValuesDown();

    //Additionner les cases de même valeur
    for(var i = dimension-1 ; i>0;i--){
        for(var j = 0 ; j<dimension;j++){
            if(grille_jeu[i][j]==grille_jeu[i-1][j] && grille_jeu[i][j]!=0){
                grille_jeu[i][j]+=grille_jeu[i-1][j];
                grille_jeu[i-1][j]=0;
                hasMoved = true;
            }
        }
    }
    if (moveValuesDown() || hasMoved)
        updateGame();
//    moveValuesDown();
}

function leftArrowPressed(){
    var hasMoved = moveValuesToLeft();
//    moveValuesToLeft();
    
    //Additionner les cases de même valeur
    for(var i = 0 ; i<dimension;i++){
        for(var j = 1 ; j<dimension;j++){
            if(grille_jeu[i][j-1]==grille_jeu[i][j] && grille_jeu[i][j]!=0){
                grille_jeu[i][j-1]+=grille_jeu[i][j];
                grille_jeu[i][j]=0;
                hasMoved = true;

            }
        }
    }
    if (moveValuesToLeft() || hasMoved)
        updateGame();
//    moveValuesToLeft();
}

function rightArrowPressed(){
    var hasMoved = moveValuesToRight();
//    moveValuesToRight();
    
    //Additionner les cases de même valeur
    for(var i = 0 ; i<dimension;i++){
        for(var j = dimension-1 ; j>=0;j--){
            if(grille_jeu[i][j]==grille_jeu[i][j-1] && grille_jeu[i][j]!=0){
                grille_jeu[i][j]+=grille_jeu[i][j-1];
                grille_jeu[i][j-1]=0;
                hasMoved = true;
            }
        }
    }
    if (moveValuesToRight() || hasMoved)
        updateGame();

        
//    moveValuesToRight();

}

function updateGame(){
    if(generate_random_number()==false){
        if (gameIsOver()){
            alert("Le jeu est plein!!");
            startNewGame();
        }
   	}
   	update_screen();
}

function moveValuesUp(){
    var hasMoved = false;
    for(var i = 1 ; i<dimension;i++){
        for(var j = 0 ; j<dimension;j++){
            var k = i;
            while(k > 0){
                if(grille_jeu[k-1][j]==0 && grille_jeu[k][j] != 0){
                    grille_jeu[k-1][j]=grille_jeu[k][j];
                    grille_jeu[k][j]=0;
                    hasMoved = true;
                }
                k--;
            }        		
        }
    }
    return hasMoved;
}

function moveValuesDown(){
    var hasMoved = false;
    for(var i = dimension-1 ; i>=0;i--){
        for(var j = 0 ; j<dimension;j++){
            var k = i;
            while(k<dimension-1){
                if(grille_jeu[k+1][j]==0 && grille_jeu[k][j] != 0){
                    grille_jeu[k+1][j]=grille_jeu[k][j];
                    grille_jeu[k][j]=0;
                    hasMoved = true;
                }
                k++;
                
            }
        }
    }	
    return hasMoved;
}


function moveValuesToLeft(){
    var hasMoved = false;
    for(var i = 0 ; i<dimension;i++){
        for(var j = 1 ; j<dimension;j++){
            var k = j;
            while(k > 0){
                if(grille_jeu[i][k-1]==0 && grille_jeu[i][k] != 0){
                    grille_jeu[i][k-1]=grille_jeu[i][k];
                    grille_jeu[i][k]=0;
                    hasMoved = true;
                }
                k--;	
            }        		
        }
    }
    return hasMoved;
}


function moveValuesToRight(){
    var hasMoved = false;
    for(var i = 0 ; i<dimension;i++){
        for(var j = dimension-1 ; j>=0;j--){
            var k = j;
            while(k<dimension-1){
                if(grille_jeu[i][k+1]==0 && grille_jeu[i][k] != 0){
                    grille_jeu[i][k+1]=grille_jeu[i][k];
                    grille_jeu[i][k]=0;
                    hasMoved = true;
                }
                k++;
            }       		
        }
    }
    return hasMoved;
}


//Fonction appelée pour mettre à jour l'affichage du jeu
//à partir de la variable globale grille_jeu
function update_screen(){
	var tds = document.getElementsByTagName("td");
	for (var i = 0; i < grille_jeu.length ; i++) {
		for(var j = 0; j< grille_jeu.length;j++){
			if(grille_jeu[i][j]==""){
				tds[dimension*i+j].innerHTML="";
				tds[dimension*i+j].style.backgroundColor='white';
			}else{
				tds[dimension*i+j].innerHTML=grille_jeu[i][j];


				//Gestion des couleurs pour faciliter la visibilité
				if(grille_jeu[i][j]>8){
					tds[dimension*i+j].style.backgroundColor='orange';
				}else if(grille_jeu[i][j]>16){
					tds[dimension*i+j].style.backgroundColor='red';
				}else{
					tds[dimension*i+j].style.backgroundColor='yellow';
				}
				
			};
		};
	}
}

//Lorsque le jeu est plein, vérifie s'il existe encore des déplacements possibles
function gameIsOver(){
    
    for(var i = 0 ; i < dimension; i++){
        for(var j = 1 ; j < dimension; j++){
            if(grille_jeu[i][j-1]==grille_jeu[i][j] && grille_jeu[i][j]!=0){
                return false;

            }
        }
    }
    
    //On additionne les cases de même valeur
    for(var i = 1 ; i < dimension;i++){
        for(var j = 0 ; j < dimension;j++){
            if(grille_jeu[i][j]==grille_jeu[i-1][j] && grille_jeu[i][j]!=0){
                return false;
            }
        }
    }
    
    return true;
}


//Listener pour écouter les actions de l'utilisateur.
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 38:
            upArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        case 40:
            downArrowPressed();
            break;
        default:
            break;
    }
};