var dificuldade = null;
var categoria = null;
var jogada = null;
var previousId = null;
var src = null;
var tries = null;
console.log(jogada);

//INICIALIZA O JOGO
var game = {
	getDificuldade: function() {
		for (var i = 0; i < components.selectDificuldade.length; i++) {
			if(components.selectDificuldade[i].checked) {
				dificuldade = components.selectDificuldade[i].value;
				console.log(components.selectDificuldade[i].value);
			}
		}	
		return dificuldade;
	},
	getCategoria: function() {
		for (var i = 0; i < components.selectCategoria.length; i++) {
			if(components.selectCategoria[i].checked) {
				categoria = components.selectCategoria[i].value;				
			}
		}	
		if (categoria == "natureza") {
			categoria = natureza;
			return natureza;
		}
		else {
			if(categoria == "carros") {
				categoria = carros;
				return carros;
			}
			else {
				categoria = desenhos;
				return desenhos;
			}
		}
	},
	start: function(dificuldade,categoria) {		
		jogada = null;
		this.trocaTela(components.telaDificuldade,components.telaJogo);	
		pieces.createAll(dificuldade);
		enumeratePieces();
		pieces.populateAll(categoria);		
		pieces.hideAll(dificuldade);
	},	
	trocaTela: function(current,next) {
		current.style.display = "none";
		next.style.display = "block";	
		imagensMisturadas = shuffle();
	},	

};
//EVENTOS REFERENTES ÀS PEÇAS 
console.log(categoria);

var pieces = {	
	hideWrong: function(pieceOne,pieceTwo) {
		setTimeout(function() {
			document.getElementById(pieceOne).src = defaultImage;
			document.getElementById(pieceTwo).src = defaultImage;
		},500);
	},
	
	hideAll: function(dificuldade) {
		var interval = dificuldade * 3000;
		var hideAll = setTimeout(function() {
			for (var i = 0; i < components.image.length; i++) {
				components.image[i].src = defaultImage;
			}	
			enableClick();	
		}, interval);

	},	
	populateAll: function(categoria) {	
			var numPieces = components.pieces.length;
			for(var i = 0; i < numPieces; i++) {
				var image = document.getElementById(i);
				src = categoria.indexOf(categoria[imagensMisturadas[i]]);
				image.src = categoria[src];				
			}	
			disableClick();
	},
	compare: function(pieceId,jogadaUsuario) {
		if (jogada == null) {
			jogada = jogadaUsuario;
			previousId = pieceId;
			document.getElementById(pieceId).src = categoria[jogadaUsuario];
			console.log(categoria[imagensMisturadas[jogadaUsuario]]);
			console.log(jogada);
			console.log(previousId);
		}
		else {
			console.log(jogadaUsuario);
			document.getElementById(pieceId).src = categoria[jogadaUsuario];
			if(jogada == jogadaUsuario) {				
				console.log("Você acertou");
				components.pieces[pieceId].removeAttribute("onclick");		
				components.pieces[previousId].removeAttribute("onclick");			
				jogada = null;
				previousId = null;
			}
			else {				
				console.log("Você errou");		
				this.hideWrong(previousId,pieceId);		
				jogada = null;	
				previousId = null;
			}
		}
	},		




	createAll: 	function(dificuldade) {
			for (var i = 0; i < dificuldade; i++) {
				for (var j = 0; j < 12; j++) {					
					var peca = document.createElement("div");
					peca.className = "pieces";
					components.telaJogo.appendChild(peca);				
					var img = document.createElement("IMG");
					peca.appendChild(img);
					img.name = "piece";		
				}			
			}
	},
	clearAll:	function() {
			while (components.telaJogo.firstChild) {
				components.telaJogo.removeChild(telaJogo.firstChild);
			}	
	}
}

function enableClick() {
	for (var i = 0; i < components.pieces.length; i++) {
		src = categoria.indexOf(categoria[imagensMisturadas[i]]);
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
	telaJogo: document.getElementById("telaJogo"),
	telaDificuldade: document.getElementById("telaDificuldade"),
	selectDificuldade: document.getElementsByName("dificuldade"),
	selectCategoria: document.getElementsByName("categoria"),
	buttonVoltar: document.getElementById("buttonVoltar")
}

function shuffle() {
		var array = [];
		while (array.length < ((categoria.length / 3) * dificuldade)) {
			var random = Math.floor(Math.random() * ((categoria.length / 3) * dificuldade));
			if (array.indexOf(random) == -1) {
				array.push(random);	
			}				
		}	
		for (var i = 0; i < ((categoria.length / 3) * dificuldade); i++) {
			array.push(array[i]);
		}
		for (var i = array.length; i; i--) {
        	var j = Math.floor(Math.random() * i);
       		[array[i - 1], array[j]] = [array[j], array[i - 1]];
   		}   	
   		console.log(array);	
   		return array;
};


