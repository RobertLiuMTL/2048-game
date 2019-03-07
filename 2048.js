var dimension;

var grille_jeu;

var fin_partie = false;
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


	//Demander à l'utilisateur de choisir les dimensions.
	do{
		dimension = prompt("Veuillez entrer un chiffre (3 et +) afin de choisir la dimension du jeu (Par exemple, 4 pour un jeu 4X4)");
	}while(isNaN(dimension) || dimension=="" || dimension<3);

	document.getElementById("dimensions_jeu").innerHTML = "Le jeu 2048 avec en dimensions "+dimension+"X"+dimension;

	tableCreate(dimension);

};

/*
Fonction appelée pour créer le tableau initial
*/
function tableCreate(dimension) {
	var nombre = 2;

	//Création de la représentation 2D de la grille de jeu
	//Pour faciliter les manipulations
	grille_jeu=[];
	for (var i = 0 ; i < dimension ; i++, grille_jeu.push(temp)){
		var temp = [];
		for(var j = 0 ; j < dimension ; j++){
			temp.push(0);
		}
	}

	var body = document.getElementsByTagName('body')[0];
	var tbl = document.createElement('table');
	var tbdy = document.createElement('tbody');
	for (var i = 0; i < dimension; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < dimension; j++) {

			var td = document.createElement('td');
			tr.appendChild(td);
		}
		tbdy.appendChild(tr);
	}
	tbl.appendChild(tbdy);
	body.appendChild(tbl);

	initialSetup();

};

//Fonction plutôt laide pour initialiser le jeu.
function initialSetup(){
	
	var nombre = 2;
	

	while(nombre>0){
		if(generate_random_number()==true){
			nombre--;
		}
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

	if(empty_cell==false){
		return false;
	}

	var tds = document.getElementsByTagName("td");
	var length = tds.length;
	
	var two_or_four = Math.random();
	if (two_or_four>0.5){
		two_or_four=4;
	}else{
		two_or_four=2;
	}

	//On choisit une cellule non-vide au hasard.
	//Math.floor pour obtenir une fourchette exclusive [0,found_cells.length[
	var random = Math.floor(found_cells.length*Math.random());

	grille_jeu[found_cells[random][0]][found_cells[random][1]]=two_or_four;
	return true;
	
}


/*Fonction responsable de la vérification des coups
Paramètre : key = la touche appuyée par l'utilisateur.
*/
function update_game(key){
	//alert("Updated!");
	//var tds = document.getElementsByTagName("td");
	if (event.key == 'w' || event.keyCode == '38') {
        // up arrow
        //alert(event.key);

        //Tenter de déplacer les chiffres vers le haut
        for(var i = 1 ; i<dimension;i++){
        	for(var j = 0 ; j<dimension;j++){
        		var k = i;
        		while(k > 0){
        			if(grille_jeu[k-1][j]==0){
        				grille_jeu[k-1][j]=grille_jeu[k][j];
        				grille_jeu[k][j]=0;
        			}
        			k--;	
        		}        		
        	}
        }


        for(var i = 1 ; i<dimension;i++){
        	for(var j = 0 ; j<dimension;j++){
        		if(grille_jeu[i][j]==grille_jeu[i-1][j] && grille_jeu[i][j]!=0){
        			grille_jeu[i-1][j]+=grille_jeu[i][j];
        			grille_jeu[i][j]=0;

        		}
        	}
        }

        //Tenter de déplacer les chiffres vers le haut
        for(var i = 1 ; i<dimension;i++){
        	for(var j = 0 ; j<dimension;j++){
        		var k = i;
        		while(k > 0){
        			if(grille_jeu[k-1][j]==0){
        				grille_jeu[k-1][j]=grille_jeu[k][j];
        				grille_jeu[k][j]=0;
        			}
        			k--;	
        		}        		
        	}
        }
    }
    //vérifier depuis le bas
    else if (event.key== 's' || event.keyCode == '40') {
        // down arrow
        //alert(event.key);

        //tenter de bouger les chiffres vers le bas
        if(dimension>2){
        	for(var i = dimension-1 ; i>=0;i--){
        		for(var j = 0 ; j<dimension;j++){
        			var k = i;
        			while(k<dimension-1){
        				if(grille_jeu[k+1][j]==0){
        					grille_jeu[k+1][j]=grille_jeu[k][j];
        					grille_jeu[k][j]=0;
        				}
        				k++;
        			}
        		}
        	}	
        }
        

        for(var i = dimension-1 ; i>0;i--){
        	for(var j = 0 ; j<dimension;j++){
        		if(grille_jeu[i][j]==grille_jeu[i-1][j] && grille_jeu[i][j]!=0){
        			grille_jeu[i][j]+=grille_jeu[i-1][j];
        			grille_jeu[i-1][j]=0;

        		}
        	}
        }

        //tenter de bouger les chiffres vers le bas
        if(dimension>2){
        	for(var i = dimension-1 ; i>=0;i--){
        		for(var j = 0 ; j<dimension;j++){
        			var k = i;
        			while(k<dimension-1){
        				if(grille_jeu[k+1][j]==0){
        					grille_jeu[k+1][j]=grille_jeu[k][j];
        					grille_jeu[k][j]=0;
        				}
        				k++;
        			}
        		}
        	}	
        }
    }
    //vérifier depuis la gauche
    else if (event.key == 'a' || event.keyCode == '37') {
       	// left arrow
       	//alert(event.key);


       	//Tenter de déplacer les chiffres vers la gauche
       	for(var i = 0 ; i<dimension;i++){
       		for(var j = 1 ; j<dimension;j++){
       			var k = j;
       			while(k > 0){
	       			if(grille_jeu[i][k-1]==0){
	       				grille_jeu[i][k-1]=grille_jeu[i][k];
	       				grille_jeu[i][k]=0;
	       			}
	       			k--;	
	       		}        		
	       	}
       }

       	for(var i = 0 ; i<dimension;i++){
	       	for(var j = 1 ; j<dimension;j++){
	       		if(grille_jeu[i][j-1]==grille_jeu[i][j] && grille_jeu[i][j]!=0){
	       			grille_jeu[i][j-1]+=grille_jeu[i][j];
	       			grille_jeu[i][j]=0;

	       		}
	       	}
       	}

       	//Tenter de déplacer les chiffres vers la gauche
       	for(var i = 0 ; i<dimension;i++){
	       	for(var j = 1 ; j<dimension;j++){
	       		var k = j;
	       		while(k > 0){
	       			if(grille_jeu[i][k-1]==0){
	       				grille_jeu[i][k-1]=grille_jeu[i][k];
	       				grille_jeu[i][k]=0;
	       			}
	       			k--;	
	       		}        		
       		}
       	}
   }
   //il faudra vérifier par la droite en premier
   else if (event.key == 'd' || event.keyCode == '39') {
       	// right arrow
       	//alert(event.key);

       	//Tenter de déplacer les chiffres vers la droite
       	if(dimension>2){
	       	for(var i = 0 ; i<dimension;i++){
	       		for(var j = dimension-1 ; j>=0;j--){
	       			var k = j;
	       			while(k<dimension-1){
	       				if(grille_jeu[i][k+1]==0){
	       					grille_jeu[i][k+1]=grille_jeu[i][k];
	       					grille_jeu[i][k]=0;
	       				}
	       				k++;
	       			}       		
	       		}
       		}
       	}


       	for(var i = 0 ; i<dimension;i++){
	       	for(var j = dimension-1 ; j>=0;j--){
	       		if(grille_jeu[i][j]==grille_jeu[i][j-1] && grille_jeu[i][j]!=0){
	       			grille_jeu[i][j]+=grille_jeu[i][j-1];
	       			grille_jeu[i][j-1]=0;

	       		}
	       	}
       	}

       	//Tenter de déplacer les chiffres vers la droite
       	if(dimension>2){
       		for(var i = 0 ; i<dimension;i++){
	       		for(var j = dimension-1 ; j>=0;j--){
	       			var k = j;
	       			while(k<dimension-1){
	       				if(grille_jeu[i][k+1]==0){
	       					grille_jeu[i][k+1]=grille_jeu[i][k];
	       					grille_jeu[i][k]=0;
	       				}
	       				k++;
	       			}       		
	       		}
	       	}
       	}
   	}

   	if(generate_random_number()==false){
   		//alert("Le jeu est plein!!");
   	}
   	update_screen();

}

/*
Fonction qui est appelée à chaque entrée de l'utilisateur. Vérifie si les cases peuvent être déplacées.
Si oui, ajouter un nombre aléatoire sur la grille.
*/
function check_validity(move){
	if(move=="up"){

	}else if(move=="down"){

	}else if(move=="left"){

	}else if(move=="right"){

	}
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


//Listener pour écouter les actions de l'utilisateur.
document.addEventListener('keydown', function(event){

	update_game(event);
} );