//VARIÁVEIS GLOBAIS
var categoria = null;
var nomeCategoria = '';
var jogada = null;
var idPecaSelecionadaAnterior = null;
var tentativas = null;
var paresIdentificados = null;
var imagensMisturadas = [];
var recordesFacil = [];
var recordesMedio = [];
var recordesDificil = [];
var jogador = {};
var caminhoImagem = null;
var intervalo = null;

const dificuldades = [
    {descricao: 'Fácil', codigo: 1, intervalo:3000},
    {descricao: 'Médio', codigo:2, intervalo:6000},
    {descricao: 'Difícil', codigo:3, intervalo:9000}
]

const componentes = { //COMPONENTES 
    pecas: document.getElementsByClassName("pecas"),
    imagem: document.getElementsByName("imagem"),
    campoTentativas: document.getElementById("campoTentativas"),
    campoNomeJogador: document.getElementById("campoNomeJogador"),
    campoRecordes: document.getElementsByName("campoRecordes"),
    selecionarDificuldade: document.getElementsByName("dificuldade"),
    selecionarCategoria: document.getElementsByName("categoria"),
    buttonVoltar: document.getElementById("buttonVoltar")
}
const telas = { //TELAS 
    dificuldade: document.getElementById("telaDificuldade"),
    jogo: document.getElementById("telaJogo"),
    fimJogo: document.getElementById("telaFimJogo"),
    recordes: document.getElementById("telaRecordes")
}


var jogo = { //PROPRIEDADES DO JOGO 
    dificuldade: {},
    iniciar: function(dificuldade, categoria) {
        clearTimeout(intervalo);
        jogada = null; 
        tentativas = null;
        imagensMisturadas = gerarArrayImagensAleatorias();
        trocarTela(telas.jogo);
        criarTodasPecas(jogo.dificuldade.codigo);
        numerarPecas();
        atribuirImagens(categoria);
        virarTodasPecas(dificuldade);
    },
    finalizar: function() {
        componentes.campoTentativas.innerHTML = tentativas;
        trocarTela(telas.fimJogo);
    }

};
function selecionarDificuldade () {
    for (var i = 0; i < componentes.selecionarDificuldade.length; i++) {
        if (componentes.selecionarDificuldade[i].checked) {
            jogo.dificuldade = dificuldades[i];
        }
    }       
}
function selecionarCategoria () {
    for (var i in componentes.selecionarCategoria) {
        if (componentes.selecionarCategoria[i].checked) {
            categoria = componentes.selecionarCategoria[i].value;
        }
    }
    if (categoria == "natureza") {
        categoria = natureza;
        nomeCategoria = "Natureza";
        return natureza;
    } else {
        if (categoria == "carros") {
            categoria = carros;
            nomeCategoria = "Carros";
            return carros;
        } else {
            categoria = desenhos;
            nomeCategoria = "Desenhos";
            return desenhos;
        }
    }    
}
function trocarTela(tela) { // RECEBE A TELA A SER EXIBIDA E ESCONDE TODAS AS OUTRAS
    limparTelaJogo();
    for (var i in telas) {
        telas[i].classList.add("hide");
    }
    if (tela != telas.jogo && tela != telas.recordes) {
        componentes.buttonVoltar.className = "hide";
    } else {
        componentes.buttonVoltar.className = "show";
    }  
    if (tela == telas.recordes) {
        mostrarTodosRecordes();
    }
    campoNomeJogador.value = '';    
    tela.classList.remove("hide");
};

function limparTelaJogo() { // LIMPA TODAS AS PEÇAS DA TELA, UTILIZADO AO SAIR DO JOGO OU TROCAR DE TELA
    while (telas.jogo.firstChild) {
        telas.jogo.removeChild(telas.jogo.firstChild);
    }
}
//EVENTOS DAS JOGADAS
function validarJogada(idPecaSelecionada, jogadaUsuario) { // VALIDA SE DUAS JOGADAS SÃO IGUAIS E FAZ AS AÇÕES NECESSÁRIAS
    if (jogada == null) {
        jogada = jogadaUsuario;
        idPecaSelecionadaAnterior = idPecaSelecionada;
        document.getElementById(idPecaSelecionada).src = categoria[jogadaUsuario];
        desabilitarClique(idPecaSelecionada);
    } else {
        document.getElementById(idPecaSelecionada).src = categoria[jogadaUsuario];
        if (jogada == jogadaUsuario) {
            desabilitarClique(idPecaSelecionadaAnterior);
            desabilitarClique(idPecaSelecionada);
            paresIdentificados++;
            tentativas++;
            jogada = null;
            idPecaSelecionadaAnterior = null;
            if (paresIdentificados >= (componentes.pecas.length / 2)) {
                setTimeout(function() {
                    paresIdentificados = '';
                    jogo.finalizar();
                }, 400);
            }
        } else {
            esconderPecasErradas(idPecaSelecionadaAnterior, idPecaSelecionada);
            habilitarClique(idPecaSelecionada);
            habilitarClique(idPecaSelecionadaAnterior);
            tentativas++;
            jogada = null;
            idPecaSelecionadaAnterior = null;
        }
    }
};
//EVENTOS DAS PEÇAS
function atribuirImagens() { // ATRIBUI IMAGENS ÁS PEÇAS GERADAS
    var alturaDinamica = 0;
    var larguraDinamica = 0;
    if (jogo.dificuldade.codigo == 1) {
        telas.jogo.style.width = "62vw";
        alturaDinamica = 28;
        larguraDinamica = 15;
    } else {
        if (jogo.dificuldade.codigo == 2) {
            telas.jogo.style.width = "75vw";
            alturaDinamica = 21;
            larguraDinamica = 12.0;
        } else {
            telas.jogo.style.width = "88vw";
            alturaDinamica = 20;
            larguraDinamica = 9.4;
        }
    }
    for (var i = 0; i < componentes.pecas.length; i++) {
        componentes.pecas[i].style.height = alturaDinamica + "vh";
        componentes.pecas[i].style.width = larguraDinamica + "vw";
        var image = document.getElementById(i);
        caminhoImagem = categoria.indexOf(categoria[imagensMisturadas[i]]);
        image.src = categoria[caminhoImagem];
    }
    desabilitarCliqueTodos(); //ATRIBUI IMAGENS A CADA PEÇA CRIADA 
};

function esconderPecasErradas(pecaUm, pecaDois) { // ESCONDE AS PEÇAS QUE O JOGADOR ERRAR
    setTimeout(function() {
        document.getElementById(pecaUm).src = defaultImage;
        document.getElementById(pecaDois).src = defaultImage;
    }, 300);
};

function virarTodasPecas() { // VIRA TODAS AS PEÇAS PARA QUE SE INICIE O PROPÓSITO DO JOGO	
    intervalo = setTimeout(function() {
        for (var i in componentes.imagem) {
            componentes.imagem[i].src = defaultImage;
        }
        habilitarCliqueTodos();
    }, jogo.dificuldade.intervalo); 
};

function criarTodasPecas() { // CRIA TODAS AS PEÇAS BASEANDO-SE NA DIFICULDADE DO JOGO (12 * DIFICULDADE)
    for (var i = 0; i < jogo.dificuldade.codigo; i++) {
        for (var j = 0; j < 12; j++) {
            var peca = document.createElement("div");
            peca.className = "pecas";
            telas.jogo.appendChild(peca);
            var img = document.createElement("IMG");
            peca.appendChild(img);
            img.name = "imagem";
        }
    }
};

function habilitarClique(peca) { // HABILITA O CLIQUE PARA UMA PEÇA
    caminhoImagem = categoria.indexOf(categoria[imagensMisturadas[peca]]);
    componentes.pecas[peca].setAttribute("onclick", "validarJogada(" + peca + "," + caminhoImagem + ")");
};

function desabilitarClique(peca) { // DESABILITA O CLIQUE PARA UMA PEÇA
    componentes.pecas[peca].removeAttribute("onclick");
};

function habilitarCliqueTodos() { // HABILITA O CLIQUE PARA TODAS AS PEÇAS
    for (var i = 0; i < componentes.pecas.length; i++) {
        caminhoImagem = categoria.indexOf(categoria[imagensMisturadas[i]]);
        componentes.pecas[i].setAttribute("onclick", "validarJogada(" + i + "," + caminhoImagem + ")");
    }
};


function desabilitarCliqueTodos() { // DESABILITA O CLIQUE PARA TODAS AS PEÇAS
    for (var i = 0; i < componentes.pecas.length; i++) {
        componentes.pecas[i].removeAttribute("onclick");
    }
};

function numerarPecas() { // NUMERA AS PEÇAS COM UMA IDENTIFIÇÃO ÚNICA PARA EVENTOS POSTERIORES
    for (var i = 0; i < componentes.imagem.length; i++) {
        componentes.imagem[i].id = i;
    }
};



//EVENTOS DOS RECORDES(ADICIONAR,MOSTRAR,GERAR) 
function adicionarRecorde() { // ADICIONA O NOME, PONTUAÇÃO, CATEGORIA E DIFICULDADE NO RANKING
    recordes = carregarRecordes(jogo.dificuldade.descricao);
    jogador = {
        nome: componentes.campoNomeJogador.value || 'Anônimo' ,
        pontuacao: tentativas,
        dificuldade: jogo.dificuldade.descricao,
        categoria: nomeCategoria
    };
    recordes.push(jogador);
    recordes = recordes.sort(function(a, b) {
        return a.pontuacao - b.pontuacao;
    });
    localStorage.setItem("recordes" + jogo.dificuldade.descricao, JSON.stringify(recordes));
};
function carregarRecordes(nomeDificuldade) { // CARREGA TODOS OS RECORDES PARA QUE SEJAM MOSTRADOS NA TELA
    return JSON.parse(localStorage.getItem("recordes" + nomeDificuldade)) || [];
}
function mostrarRecordes(container,nomeDificuldade) { //MOSTRA TODAS AS DIFICULDADES DE UMA SÓ VEZ, CHAMANDO TODAS AS FUNÇÕES
    recordes = carregarRecordes(nomeDificuldade);
    container.innerHTML = "";
    for (var i in recordes) {
        var tr = document.createElement("tr");
        tr.appendChild(gerarEstruturaRecordes(recordes[i], 'nome'));
        tr.appendChild(gerarEstruturaRecordes(recordes[i], 'pontuacao'));
        tr.appendChild(gerarEstruturaRecordes(recordes[i], 'categoria'));
        container.appendChild(tr);
    }
}
function mostrarTodosRecordes () {
    mostrarRecordes(componentes.campoRecordes[0], dificuldades[0].descricao);
    mostrarRecordes(componentes.campoRecordes[1], dificuldades[1].descricao);
    mostrarRecordes(componentes.campoRecordes[2], dificuldades[2].descricao);
}
function gerarEstruturaRecordes(jogadorItem, propriedade) { //GERA A ESTRUTURA PARA CADA ITEM DO RANKING
    var td = document.createElement("td");
    if (jogadorItem.hasOwnProperty(propriedade)) {
        td.innerHTML = jogadorItem[propriedade];
    }
    return td;
};


//FUNÇÕES E IMAGENS POSSÍVEIS PARA CADA CATEGORIA (NOME DA VARIÁVEL = CATEGORIA, defaultImage = IMAGEM PADRÃO AO VIRAR AS PEÇAS)

function gerarArrayImagensAleatorias() {
    var array = [];
    while (array.length < ((categoria.length / 3) * jogo.dificuldade.codigo)) {
        var random = Math.floor(Math.random() * ((categoria.length / 3) * jogo.dificuldade.codigo));
        if (array.indexOf(random) == -1) {
            array.push(random);
        }
    }
    for (var i = 0; i < ((categoria.length / 3) * jogo.dificuldade.codigo); i++) {
        array.push(array[i]);
    }
    for (var i = array.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
    return array;
};
const natureza = ['images/natureza/1.jpg',
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
const carros = [
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
const desenhos = [
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
