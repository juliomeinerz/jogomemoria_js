var difficulty = null;
var category = null;
var jogada = null;
var previousId = null;
var src = null;
var tries = null;

//INICIALIZA O JOGO
var game = {
	getDifficulty: function() {
		for (var i = 0; i < components.selectDifficulty.length; i++) {
			if(components.selectDifficulty[i].checked) {
				difficulty = components.selectDifficulty[i].value;				
			}
		}	
		return difficulty;
	},
	getCategory: function() {
		for (var i = 0; i < components.selectCategory.length; i++) {
			if(components.selectCategory[i].checked) {
				category = components.selectCategory[i].value;				
			}
		}	
		if (category == "natureza") {
			category = natureza;
			return natureza;
		}
		else {
			if(category == "carros") {
				category = carros;
				return carros;
			}
			else {
				category = desenhos;
				return desenhos;
			}
		}
	},
	start: function(difficulty,category) {		
		jogada = null;
		this.trocaTela(components.difficultyScreen,components.gameScreen);	
		pieces.createAll(difficulty);
		enumeratePieces();
		pieces.populateAll(category);		
		pieces.hideAll(difficulty);
	},	
	trocaTela: function(current,next) {
		current.style.display = "none";
		next.style.display = "block";	
		imagensMisturadas = shuffle();
	},	

};
//EVENTOS REFERENTES ÀS PEÇAS 
var pieces = {	
	hideWrong: function(pieceOne,pieceTwo) {
		setTimeout(function() {
			document.getElementById(pieceOne).src = defaultImage;
			document.getElementById(pieceTwo).src = defaultImage;
		},500);
	},
	
	hideAll: function(difficulty) {
		var interval = difficulty * 3000;
		var hideAll = setTimeout(function() {
			for (var i = 0; i < components.image.length; i++) {
				components.image[i].src = defaultImage;
			}	
			enableClick();	
		}, interval);

	},	
	populateAll: function(category) {	
			var numPieces = components.pieces.length;
			for(var i = 0; i < numPieces; i++) {
				var image = document.getElementById(i);
				src = category.indexOf(category[imagensMisturadas[i]]);
				image.src = category[src];				
			}	
			disableClick();
	},
	compare: function(pieceId,jogadaUsuario) {
		if (jogada == null) {
			jogada = jogadaUsuario;
			previousId = pieceId;
			document.getElementById(pieceId).src = category[jogadaUsuario];			
		}
		else {
			document.getElementById(pieceId).src = category[jogadaUsuario];
			if(jogada == jogadaUsuario) {				
				console.log("Você acertou");
				components.pieces[pieceId].removeAttribute("onclick");		
				components.pieces[previousId].removeAttribute("onclick");	
				tries++;	
				console.log("Tentativas: " + tries);	
				jogada = null;
				previousId = null;
			}
			else {				
				console.log("Você errou");		
				this.hideWrong(previousId,pieceId);	
				tries++;	
				console.log("Tentativas: " + tries);
				jogada = null;	
				previousId = null;
			}
		}
		
			
	},		




	createAll: 	function(difficulty) {
			for (var i = 0; i < difficulty; i++) {
				for (var j = 0; j < 12; j++) {					
					var peca = document.createElement("div");
					peca.className = "pieces";
					components.gameScreen.appendChild(peca);				
					var img = document.createElement("IMG");
					peca.appendChild(img);
					img.name = "piece";		
				}			
			}
	},
	clearAll:	function() {
			while (components.gameScreen.firstChild) {
				components.gameScreen.removeChild(gameScreen.firstChild);
			}	
	}
}

function enableClick() {
	for (var i = 0; i < components.pieces.length; i++) {
		src = category.indexOf(category[imagensMisturadas[i]]);
		components.pieces[i].setAttribute("onclick", "pieces.compare(" + i + ","+ src +")");	
	}		
};
	
function disableClick(){
	for(var i = 0; i < components.pieces.length; i++) {
		components.pieces[i].removeAttribute("onclick");
	}
};

function enumeratePieces() {
	for (var i = 0; i < components.image.length; i++) {
		components.image[i].id = i;
	}
};	


//ARRAYS DE POSSÍVEIS IMAGENS
var natureza = ['images/natureza/1.jpg',
				'images/natureza/2.jpg',
				'images/natureza/3.jpg',
				'images/natureza/4.jpg',
				'images/natureza/5.jpg',
				'images/natureza/6.jpg',
				'images/natureza/7.jpg',
				'images/natureza/8.jpg',
				'images/natureza/9.jpg',
				'images/natureza/10.jpg',
				'images/natureza/11.jpg',
				'images/natureza/12.jpg',
				'images/natureza/13.jpg',
				'images/natureza/14.jpg',
				'images/natureza/15.jpg',
				'images/natureza/16.jpg',
				'images/natureza/17.jpg',
				'images/natureza/18.jpg',
				];
var carros =  [
			'images/carros/1.jpg',
			'images/carros/2.jpg',
			'images/carros/3.jpg',
			'images/carros/4.jpg',
			'images/carros/5.jpg',
			'images/carros/6.jpg',
			'images/carros/7.jpg',
			'images/carros/8.jpg',
			'images/carros/9.jpg',
			'images/carros/10.jpg',
			'images/carros/11.jpg',
			'images/carros/12.jpg',
			'images/carros/13.jpg',
			'images/carros/14.jpg',
			'images/carros/15.jpg',
			'images/carros/16.jpg',
			'images/carros/17.jpg',
			'images/carros/18.jpg',					
	];
var desenhos =  [
			'images/desenhos/1.jpg',
			'images/desenhos/2.jpg',
			'images/desenhos/3.jpg',
			'images/desenhos/4.jpg',
			'images/desenhos/5.jpg',
			'images/desenhos/6.jpg',
			'images/desenhos/7.jpg',
			'images/desenhos/8.jpg',
			'images/desenhos/9.jpg',
			'images/desenhos/10.jpg',
			'images/desenhos/11.jpg',
			'images/desenhos/12.jpg',
			'images/desenhos/13.jpg',
			'images/desenhos/14.jpg',
			'images/desenhos/15.jpg',
			'images/desenhos/16.jpg',
			'images/desenhos/17.jpg',
			'images/desenhos/18.jpg',
];
var defaultImage = ['images/default.jpg'];



//COMPONENTES
var components = {
	pieces: document.getElementsByClassName("pieces"),
	image: document.getElementsByName("piece"),
	gameScreen: document.getElementById("gameScreen"),
	difficultyScreen: document.getElementById("difficultyScreen"),
	selectDifficulty: document.getElementsByName("difficulty"),
	selectCategory: document.getElementsByName("category"),
	buttonVoltar: document.getElementById("buttonVoltar")
}

function shuffle() {
		var array = [];
		while (array.length < ((category.length / 3) * difficulty)) {
			var random = Math.floor(Math.random() * ((category.length / 3) * difficulty));
			if (array.indexOf(random) == -1) {
				array.push(random);	
			}				
		}	
		for (var i = 0; i < ((category.length / 3) * difficulty); i++) {
			array.push(array[i]);
		}
		for (var i = array.length; i; i--) {
        	var j = Math.floor(Math.random() * i);
       		[array[i - 1], array[j]] = [array[j], array[i - 1]];
   		}   	
   		return array;
};


