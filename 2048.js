var dimension;
var grille_jeu;
var score = 0;

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

    var scorebox = document.getElementById('scorebox');
    scorebox.innerHTML="Score = "+score;
        
    //Demander à l'utilisateur de choisir les dimensions.
	do{
		dimension = prompt("Veuillez entrer un chiffre (3 et +) afin de choisir la dimension du jeu (Par exemple, 4 pour un jeu 4X4)");
	}while(dimension!=null&&(isNaN(dimension)|| dimension=="" || dimension<3));

    if(dimension==null){
        alert("Vous avez choisi de ne pas jouer au jeu ; honete à vous!");
        window.close();
    }else{
        document.getElementById("dimensions_jeu").innerHTML = "Le jeu 2048 avec en dimensions "+dimension+"X"+dimension;
        initialSetup(dimension);        
    }
	
}


/*
fonction appelée pour nettoyer le jeu.
*/
function clearGame(){
    

    var vieille_partie = document.getElementById("table");
    var parent = vieille_partie.parentElement;
    parent.removeChild(vieille_partie);
    //Réinitialiser les variables globales.
    grille_jeu=[];
    dimension=0;
    score=0;

    startNewGame();
}


/*
Fonction appelée pour créer le tableau initial
*/
function initialSetup(dimension) {
    
    var body = document.getElementsByTagName('body')[0];
	var tbl = document.createElement('table');
    tbl.id = "table";
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


//Fonction appelée lors d'une entrée de l'utilisateur.
function upArrowPressed(){
    var hasMoved = moveValuesUp();

    //On additionne les cases de même valeur
    for(var i = 1 ; i<dimension;i++){
        for(var j = 0 ; j<dimension;j++){
            if(grille_jeu[i][j]==grille_jeu[i-1][j] && grille_jeu[i][j]!=0){
                grille_jeu[i-1][j]+=grille_jeu[i][j];
                grille_jeu[i][j]=0;
                hasMoved = true;
                score+=grille_jeu[i-1][j];
            }
        }
    }
    if (moveValuesUp() || hasMoved){
        updateGame();
    }else{
        checkIfGameIsOver();

    }
}

//Fonction appelée lors d'une entrée de l'utilisateur.
function downArrowPressed(){
    var hasMoved = moveValuesDown();

    //Additionner les cases de même valeur
    for(var i = dimension-1 ; i>0;i--){
        for(var j = 0 ; j<dimension;j++){
            if(grille_jeu[i][j]==grille_jeu[i-1][j] && grille_jeu[i][j]!=0){
                grille_jeu[i][j]+=grille_jeu[i-1][j];
                grille_jeu[i-1][j]=0;
                hasMoved = true;
                score+=grille_jeu[i][j];
            }
        }
    }
    if (moveValuesDown() || hasMoved){
        updateGame();
    }else{
        checkIfGameIsOver();

    }
}

//Fonction appelée lors d'une entrée de l'utilisateur.
function leftArrowPressed(){
    var hasMoved = moveValuesToLeft();
    
    //Additionner les cases de même valeur
    for(var i = 0 ; i<dimension;i++){
        for(var j = 1 ; j<dimension;j++){
            if(grille_jeu[i][j-1]==grille_jeu[i][j] && grille_jeu[i][j]!=0){
                grille_jeu[i][j-1]+=grille_jeu[i][j];
                grille_jeu[i][j]=0;
                hasMoved = true;
                score+=grille_jeu[i][j-1];

            }
        }
    }
    if (moveValuesToLeft() || hasMoved){
        updateGame();
    }else{
        checkIfGameIsOver();

    }
}

//Fonction appelée lors d'une entrée de l'utilisateur.
function rightArrowPressed(){
    var hasMoved = moveValuesToRight();
    
    //Additionner les cases de même valeur
    for(var i = 0 ; i<dimension;i++){
        for(var j = dimension-1 ; j>=0;j--){
            if(grille_jeu[i][j]==grille_jeu[i][j-1] && grille_jeu[i][j]!=0){
                grille_jeu[i][j]+=grille_jeu[i][j-1];
                grille_jeu[i][j-1]=0;
                hasMoved = true;
                score+= grille_jeu[i][j];
            }
        }
    }
    if (moveValuesToRight() || hasMoved){
        updateGame();
    } else{
        checkIfGameIsOver();

    }
}

/*
Fonction appelée pour mettre à jour la boîte de score, 
appelle la méthode pour générer un nouveau chiffre et appelle
la méthode pour mettre à jour l'affichage.
*/
function updateGame(){
    var scorebox = document.getElementById('scorebox');
    scorebox.innerHTML="Score = "+score;
    generate_random_number();
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
				if(grille_jeu[i][j]<8){
					tds[dimension*i+j].style.backgroundColor="#ffffe6";
				}else if(grille_jeu[i][j]<16){
					tds[dimension*i+j].style.backgroundColor="#ffff4d";
				}else if(grille_jeu[i][j]<32){
                    tds[dimension*i+j].style.backgroundColor="#e6e600";
                }else if(grille_jeu[i][j]<64){
                    tds[dimension*i+j].style.backgroundColor="#999900";
                }else if(grille_jeu[i][j]<92){
					tds[dimension*i+j].style.backgroundColor="#ffbf80";
				}else if(grille_jeu[i][j]<128){
                    tds[dimension*i+j].style.backgroundColor="#ff8000";
                }else if(grille_jeu[i][j]<256){
                    tds[dimension*i+j].style.backgroundColor="#ff8080";
                }else if(grille_jeu[i][j]<512){
                    tds[dimension*i+j].style.backgroundColor="#ff0000";
                }else if(grille_jeu[i][j]<1024){
                    tds[dimension*i+j].style.backgroundColor="#b3ff99";
                }else{
                    tds[dimension*i+j].style.backgroundColor="#40ff00";
                }
				
			};
		};
	}
}

//Lorsque le jeu est plein, vérifie s'il existe encore des déplacements possibles
function checkIfGameIsOver(){
    var gameIsOver = true;
    var victory = false;
    for(var i = 0 ; i < dimension; i++){
        for(var j = 0 ; j < dimension; j++){
            if(grille_jeu[i][j]==2048){
                victory=true;
                break;
            }

            if (j > 0 && grille_jeu[i][j-1]==grille_jeu[i][j]){
                gameIsOver = false;
                break;
            }
            if (i > 0 && grille_jeu[i][j]==grille_jeu[i-1][j]){
                gameIsOver = false;
                break;
            }
            if(grille_jeu[i][j]==0){
                gameIsOver=false;
                break;
            }
        }
    }
    if (gameIsOver && !victory){
        alert("Le jeu est plein!");
        clearGame();
    }
    if(victory){
        alert("Une case 2048 a été créée ; vous êtes un Champion!!");
        clearGame();
    }
}


//Listener pour écouter les actions de l'utilisateur.
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 65:
            leftArrowPressed();
            break;
        case 38:
            upArrowPressed();
            break;
        case 87:
            upArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        case 68:
            rightArrowPressed();
            break;
        case 40 :
            downArrowPressed();
            break;
        case 83:
            downArrowPressed();
            break;
        default:
            break;
    }
};