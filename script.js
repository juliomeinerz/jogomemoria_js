//INICIALIZA O JOGO
var game = {
	getDificuldade: function() {
		var dificuldade = 0;
		for (var i = 0; i < components.selectDificuldade.length; i++) {
			if(components.selectDificuldade[i].checked) {
				dificuldade = components.selectDificuldade[i].value;
				console.log(components.selectDificuldade[i].value);
			}
		}	
		return dificuldade;
	},
	getCategoria: function() {
		var categoria = 0;
		for (var i = 0; i < components.selectCategoria.length; i++) {
			if(components.selectCategoria[i].checked) {
				categoria = components.selectCategoria[i].value;				
			}
		}	
		if (categoria == "natureza") {
			return natureza;
		}
		else {
			if(categoria == "carros") {
				return carros;
			}
			else {
				return desenhos;
			}
		}
	},
	start: function(dificuldade,categoria) {	
		this.trocaTela(components.telaDificuldade,components.telaJogo);	
		pecas.createAll(dificuldade);
		pecas.showAll(categoria);
		pecas.hideAll(dificuldade);
	},	
	trocaTela: function(current,next) {
		current.style.display = "none";
		next.style.display = "block";	
	},	

};
//EVENTOS REFERENTES ÀS PEÇAS 
var pecas = {
	showSelected: function(peca) {
		alert(peca);
	},
	hideAll: function(dificuldade) {
		var interval = dificuldade * 3000;
		var hideAll = setTimeout(function() {
			for (var i = 0; i < components.image.length; i++) {
				components.image[i].src = defaultImage;
			}	
		}, interval);
	},	
	showAll: function(categoria) {				
				shuffle();		
				var numPecas = components.peca.length;
				var pecasMisturadas = shuffle();	
				for(var i = 0; i < numPecas/2; i++) {		
					components.image[pecasMisturadas[i]].src = categoria[i];				
				}	
				for(var i = 0; i < numPecas/2; i++) {		
					components.image[pecasMisturadas[i+(numPecas/2)]].src = categoria[i];				
				}			
	},
	createAll: 	function(dificuldade) {
			for (var i = 0; i < dificuldade; i++) {
				for (var j = 0; j < 12; j++) {
					var peca = document.createElement("div");
					peca.className = "peca";
					peca.id = j;
					peca.setAttribute("onclick", "pecas.showSelected(" + j + ")");				
					components.telaJogo.appendChild(peca);				
					var img = document.createElement("IMG");
					peca.appendChild(img);
					img.name = "peca";				
				}			
			}
	},
	clearAll:	function() {
			while (components.telaJogo.firstChild) {
				components.telaJogo.removeChild(telaJogo.firstChild);
			}	
	}
}



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
	peca: document.getElementsByClassName("peca"),
	image: document.getElementsByName("peca"),
	telaJogo: document.getElementById("telaJogo"),
	telaDificuldade: document.getElementById("telaDificuldade"),
	selectDificuldade: document.getElementsByName("dificuldade"),
	selectCategoria: document.getElementsByName("categoria"),
	buttonVoltar: document.getElementById("buttonVoltar")
}

function shuffle() {
		var array = [];
		for (var i = 0; i < components.peca.length; i++) {
			array.push(i);
		}		
		for (var i = array.length; i; i--) {
        	var j = Math.floor(Math.random() * i);
       		[array[i - 1], array[j]] = [array[j], array[i - 1]];
   		}
   		console.log(array);
   		return array;
};