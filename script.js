//GLOBAIS
var dificuldade = null;
var nomeDificuldade = null;
var categoria = null;
var nomeCategoria = null;
var jogada = null;
var idAnterior = null;
var caminho = null;
var tentativas = null;
var pecasUsadas = null;
var imagensMisturadas = null;
var recordes = [];
var jogador = {};
var telas = {
	dificuldade: document.getElementById("telaDificuldade"),
	jogo: document.getElementById("telaJogo"),
	fimJogo: document.getElementById("telaFimJogo"),
	recordes: document.getElementById("telaRecordes")
}
//COMPONENTES
var components = {
	pecas: document.getElementsByClassName("pecas"),
	imagem: document.getElementsByName("imagem"),
	tentativas: document.getElementById("tentativas"),
	nomeJogador: document.getElementById("nomeJogador"),
	recordes: document.getElementById("recordes"),
	selecionarDificuldade: document.getElementsByName("dificuldade"),
	selecionarCategoria: document.getElementsByName("categoria"),
	buttonVoltar:document.getElementById("buttonVoltar")
}
//JOGO
var jogo = {
	dificuldade: function() {
		for (var i = 0; i < components.selecionarDificuldade.length; i++) {
			if(components.selecionarDificuldade[i].checked) {
				dificuldade = components.selecionarDificuldade[i].value;	
				switch(dificuldade) {
					case "1":
						nomeDificuldade = "Fácil";
					break;
					case "2":
						nomeDificuldade = "Médio";
					break;
					case "3":
						nomeDificuldade = "Difícil";
					break;
				}			
			}			
		}	
		
		return dificuldade;
	},
	categoria: function() {
		for (var i in components.selecionarCategoria) {
			if(components.selecionarCategoria[i].checked) {
				categoria = components.selecionarCategoria[i].value;				
			}
		}	
		if (categoria == "natureza") {
			categoria = natureza;
			nomeCategoria = "Natureza";
			return(natureza);
		}
		else {
			if(categoria == "carros") {
				categoria = carros;
				nomeCategoria = "Cxarros";
				return carros;
			}
			else {
				categoria = desenhos;
				nomeCategoria = "Desenhos";
				return desenhos;
			}
		}
	},
	iniciar: function(dificuldade,categoria) {	
		jogada = null;
		tentativas = null;
		imagensMisturadas = shuffle();
		trocaTela(telas.jogo);		
		pecas.criarTodas(dificuldade);
		numerarPecas();
		pecas.atribuirImagens(categoria);
		clearTimeout(pecas.virarTodas);		
		pecas.virarTodas(dificuldade);
		components.buttonVoltar.classList.add("show");
	},		
	finalizar: function() {
		components.tentativas.innerHTML = tentativas;
		trocaTela(tela.fimJogo);
	}

};
//EVENTOS REFERENTES ÀS PEÇAS 
var pecas = {	
	hideWrong: function(pecaOne,pecaTwo) {
		setTimeout(function() {
			document.getElementById(pecaOne).src = defaultImage;
			document.getElementById(pecaTwo).src = defaultImage;
		},500);
	},
	
	virarTodas: function(dificuldade) {		
		var interval = dificuldade * 3000;
		var virarTodas = setTimeout(function() {
			for (var i in components.imagem) {
				components.imagem[i].src = defaultImage;
			}	
			enableAllClick();	
		}, interval);

	},	
	atribuirImagens: function(categoria) {	
			for(var i = 0; i < components.pecas.length; i++) {
				var image = document.getElementById(i);
				caminho = categoria.indexOf(categoria[imagensMisturadas[i]]);
				image.src = categoria[caminho];				
			}
			disableAllClick();
	},
	comparaJogada: function(idPeca,jogadaUsuario) {
		if (jogada == null) {
			jogada = jogadaUsuario;
			idAnterior = idPeca;
			document.getElementById(idPeca).src = categoria[jogadaUsuario];	
			disableClick(idPeca);
		}
		else {
			document.getElementById(idPeca).src = categoria[jogadaUsuario];
			if(jogada == jogadaUsuario) {				
				console.log("Você acertou");
				disableClick(idAnterior);
				tentativas++;	
				console.log("Tentativas: " + tentativas);	
				jogada = null;
				idAnterior = null;
				pecasUsadas++;
				if (pecasUsadas >= (components.pecas.length/2)) {
					setTimeout(function() {
						pecasUsadas = null;
						jogo.end();
					}, 1000);					
				} 
			}
			else {				
				console.log("Você errou");				
				this.hideWrong(idAnterior,idPeca);	
				enableClick(idPeca);
				enableClick(idAnterior);
				tentativas++;	
				console.log("Tentativas: " + tentativas);
				jogada = null;	
				idAnterior = null;
			}
		}
	},	
	criarTodas: function(dificuldade) {
			for (var i = 0; i < dificuldade; i++) {
				for (var j = 0; j < 12; j++) {					
					var peca = document.createElement("div");
					peca.className = "pecas";
					telas.jogo.appendChild(peca);				
					var img = document.createElement("IMG");
					peca.appendChild(img);
					img.name = "imagem";		
				}			
			}
	},
	limparTelaJogo:	function() {
			while (telas.jogo.firstChild) {
				telas.jogo.removeChild(telas.jogo.firstChild);
			}	
	}
}

function trocaTela(tela) {
	for (var i in telas) {
		telas[i].classList.add("hide");
	}
	if (tela != telas.jogo) {
		components.buttonVoltar.classList.add("hide");
	}
	else {
		components.buttonVoltar.classList.remove("hide");
	}
	tela.classList.remove("hide");	
};	

//FUNÇÕES 
function adicionarRecorde() {	
	recordes = carregarRecordes();
	jogador = {
		name: components.nomeJogador.value,
		pontuacao: tentativas,
		dificuldade: nomeDificuldade,
		categoria: nomeCategoria
	};
	recordes.push(jogador);
	recordes = recordes.sort(function (a, b) {
		return a.pontuacao - b.pontuacao;
	});
	localStorage.setItem("recordes", JSON.stringify(recordes));
};
function mostrarRecordes(container) {
	recordes = carregarRecordes();
	container.innerHTML = "";
	for (var i in recordes) {
		var tr = document.createElement("tr");				
		tr.appendChild(gerarEstruturaRecordes(recordes[i], 'name'));
		tr.appendChild(gerarEstruturaRecordes(recordes[i], 'pontuacao'));
		tr.appendChild(gerarEstruturaRecordes(recordes[i], 'dificuldade'));
		tr.appendChild(gerarEstruturaRecordes(recordes[i], 'categoria'));	
		container.appendChild(tr);	
	}		
};
function carregarRecordes() {
	return JSON.parse(localStorage.getItem("recordes")) || [];	
}

function gerarEstruturaRecordes(jogadorItem, propriedade) {
	var td = document.createElement("td");
	if (jogadorItem.hasOwnProperty(propriedade)) {
		td.innerHTML =  jogadorItem[propriedade];			
	}
	return td;
};

function enableClick(peca) {
	caminho = categoria.indexOf(categoria[imagensMisturadas[peca]]);
	components.pecas[peca].setAttribute("onclick", "pecas.comparaJogada("+ peca + "," +caminho+")");
};
function disableClick(peca) {
	components.pecas[peca].removeAttribute("onclick");
};
function enableAllClick() {
	for (var i = 0; i < components.pecas.length; i++) {
		caminho = categoria.indexOf(categoria[imagensMisturadas[i]]);
		components.pecas[i].setAttribute("onclick", "pecas.comparaJogada(" + i + ","+ caminho +")");	
	}		
};
	
function disableAllClick(){
	for(var i = 0; i < components.pecas.length; i++) {
		components.pecas[i].removeAttribute("onclick");
	}
};

function numerarPecas() {
	for (var i = 0; i < components.imagem.length; i++) {
		components.imagem[i].id = i;
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
   		return array;
};


