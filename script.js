//constIÁVEIS GLOBAIS
let categoria = null;
let nomeCategoria = '';
let jogada = null;
let idPecaSelecionadaAnterior = null;
let tentativas = null;
let paresIdentificados = null;
let imagensMisturadas = [];
let jogador = {};
let caminhoImagem = null;
let intervalo = null;

const DIFICULDADES = [
    {descricao: 'Fácil', codigo: 1, intervalo:3000},
    {descricao: 'Médio', codigo:2, intervalo:6000},
    {descricao: 'Difícil', codigo:3, intervalo:9000}
]

const COMPONENTES = { 
    pecas: document.getElementsByClassName("pecas"),
    imagem: document.getElementsByName("imagem"),
    campoTentativas: document.getElementById("campoTentativas"),
    campoNomeJogador: document.getElementById("campoNomeJogador"),
    campoRecordes: document.getElementsByName("campoRecordes"),
    selecionarDificuldade: document.getElementsByName("dificuldade"),
    selecionarCategoria: document.getElementsByName("categoria"),
    botaoVoltar: document.getElementById("botaoVoltar")
}
const TELAS = { 
    dificuldade: document.getElementById("telaDificuldade"),
    jogo: document.getElementById("telaJogo"),
    fimJogo: document.getElementById("telaFimJogo"),
    recordes: document.getElementById("telaRecordes")
}
const JOGO = { 
    dificuldade: {},
    iniciar: function(dificuldade, categoria) {
        clearTimeout(intervalo);
        this.zerarJogada();
        this.zerarTentativas();
        imagensMisturadas = gerarArrayImagensAleatorias();
        trocarTela(TELAS.jogo);
        pecas.criarTodas(JOGO.dificuldade.codigo);
        pecas.numerar();
        pecas.atribuirImagens(categoria);
        pecas.virarTodas(dificuldade);
        pecas.atribuirImagens(categoria);
    },
    finalizar: function() {
        COMPONENTES.campoTentativas.innerHTML = tentativas;
        trocarTela(TELAS.fimJogo);
    },
    zerarJogada: function () {
        jogada = null;
    },    
    zerarTentativas: function() {
         tentativas = null;
    },
};
function selecionarDificuldade () {
    for (let i in COMPONENTES.selecionarDificuldade) {
        if (COMPONENTES.selecionarDificuldade[i].checked) {
            JOGO.dificuldade = DIFICULDADES[i];
        }
    }   
}
function selecionarCategoria () {
    for (let i in COMPONENTES.selecionarCategoria) {
        if (COMPONENTES.selecionarCategoria[i].checked) {
            categoria = COMPONENTES.selecionarCategoria[i].value;
        }
    }
    if (categoria == "natureza") {
        categoria = NATUREZA;
        nomeCategoria = "Natureza";
        return NATUREZA;
    } else {
        if (categoria == "carros") {
            categoria = CARROS;
            nomeCategoria = "Carros";
            return CARROS;
        } else {
            categoria = DESENHOS;
            nomeCategoria = "Desenhos";
            return DESENHOS;
        }
    }    
}   
function trocarTela(tela) { 
    limparTelaJogo();
    campoNomeJogador.value = '';  
    for (let i in TELAS) {
        TELAS[i].classList.add("hide");
    }
    if (tela != TELAS.jogo && tela != TELAS.recordes) {
        COMPONENTES.botaoVoltar.className = "hide";
    } 
    else {
        COMPONENTES.botaoVoltar.className = "show";
    }  
    if (tela == TELAS.recordes) mostrarTodosRecordes();     
    tela.classList.remove("hide");
};
function limparTelaJogo() { 
    while (TELAS.jogo.firstChild) {
        TELAS.jogo.removeChild(TELAS.jogo.firstChild);
    }
}
function validarJogada(idPecaSelecionada, jogadaUsuario) { 
   if (jogada == null) {
        jogada = jogadaUsuario;
        idPecaSelecionadaAnterior = idPecaSelecionada;
        document.getElementById(idPecaSelecionada).src = categoria[jogadaUsuario];
        pecas.desabilitarClique(idPecaSelecionada);
    } else {
        document.getElementById(idPecaSelecionada).src = categoria[jogadaUsuario];
        if (jogada == jogadaUsuario) {
            pecas.desabilitarClique(idPecaSelecionadaAnterior);
            pecas.desabilitarClique(idPecaSelecionada);
            paresIdentificados++;
            tentativas++;
            JOGO.zerarJogada();
            idPecaSelecionadaAnterior = null;
            if (paresIdentificados >= (COMPONENTES.pecas.length / 2)) {
                setTimeout(function() {
                    paresIdentificados = '';
                    JOGO.finalizar();
                }, 400);
            }
        } else {
            pecas.esconderErradas(idPecaSelecionadaAnterior, idPecaSelecionada);
            pecas.habilitarClique(idPecaSelecionada);
            pecas.habilitarClique(idPecaSelecionadaAnterior);
            tentativas++;
            JOGO.zerarJogada();
            idPecaSelecionadaAnterior = null;
        }
    }
};
const pecas =  {
    atribuirImagens: function(categoria)  {
        let alturaDinamica = 0;
        let larguraDinamica = 0;
        if (JOGO.dificuldade.codigo == 1) {
            TELAS.jogo.style.width = "62vw";
            alturaDinamica = 28;
            larguraDinamica = 15;
        } else {
            if (JOGO.dificuldade.codigo == 2) {
                TELAS.jogo.style.width = "75vw";
                alturaDinamica = 21;
                larguraDinamica = 12.0;
            } else {
                TELAS.jogo.style.width = "88vw";
                alturaDinamica = 20;
                larguraDinamica = 9.4;
            }
        }
        for (let i = 0; i < COMPONENTES.pecas.length; i++) {
            COMPONENTES.pecas[i].style.height = alturaDinamica + "vh";
            COMPONENTES.pecas[i].style.width = larguraDinamica + "vw";
            let image = document.getElementById(i);
            caminhoImagem = categoria.indexOf(categoria[imagensMisturadas[i]]);
            image.src = categoria[caminhoImagem];
        }
        pecas.desabilitarCliqueTodas();    
    },
    esconderErradas: function(pecaUm, pecaDois) { 
        setTimeout(function() {
            document.getElementById(pecaUm).src = IMAGEMPADRAO;
            document.getElementById(pecaDois).src = IMAGEMPADRAO;
        }, 300);
    },
    virarTodas: function() { 
        intervalo = setTimeout(function() {
            for (let i in COMPONENTES.imagem) {
                COMPONENTES.imagem[i].src = IMAGEMPADRAO;
            }
            pecas.habilitarCliqueTodas();
        }, JOGO.dificuldade.intervalo); 
    },
    criarTodas: function() { // Cria todas as peças baseando-se na dificuldade do jogo (dificuldade * 12)
        for (let i = 0; i < JOGO.dificuldade.codigo; i++) {
            for (let j = 0; j < 12; j++) {
                let peca = document.createElement("div");
                peca.className = "pecas";
                TELAS.jogo.appendChild(peca);
                let img = document.createElement("IMG");
                peca.appendChild(img);
                img.name = "imagem";
            }
        }
    },
    habilitarClique: function(peca) { 
        caminhoImagem = categoria.indexOf(categoria[imagensMisturadas[peca]]);
        COMPONENTES.pecas[peca].setAttribute("onclick", "validarJogada(" + peca + "," + caminhoImagem + ")");
    },

    desabilitarClique: function(peca) {
        COMPONENTES.pecas[peca].removeAttribute("onclick");    
    },

    habilitarCliqueTodas: function() { 
        for (let i = 0; i < COMPONENTES.pecas.length; i++) {
            caminhoImagem = categoria.indexOf(categoria[imagensMisturadas[i]]);
            COMPONENTES.pecas[i].setAttribute("onclick", "validarJogada(" + i + "," + caminhoImagem + ")");
        }
    },
    desabilitarCliqueTodas: function() { 
        for (let i = 0; i < COMPONENTES.pecas.length; i++) {
            COMPONENTES.pecas[i].removeAttribute("onclick");
        }
    },
    numerar: function() { // Numera todas as peças com um ID único, para eventos posteriores
        for (let i = 0; i < COMPONENTES.imagem.length; i++) {
            COMPONENTES.imagem[i].id = i;
        }
    },
};
function adicionarRecorde() { // ADICIONA O NOME, PONTUAÇÃO, CATEGORIA E DIFICULDADE NO RANKING
    recordes = carregarRecordes(JOGO.dificuldade.descricao);
    jogador = {
        nome: COMPONENTES.campoNomeJogador.value || 'Anônimo' ,
        pontuacao: tentativas,
        dificuldade: JOGO.dificuldade.descricao,
        categoria: nomeCategoria
    };
    recordes.push(jogador);
    recordes = recordes.sort(function(a, b) {
        return a.pontuacao - b.pontuacao;
    });
    localStorage.setItem("recordes" + JOGO.dificuldade.descricao, JSON.stringify(recordes));
};
function carregarRecordes(nomeDificuldade) { // CARREGA TODOS OS RECORDES PARA QUE SEJAM MOSTRADOS NA TELA
    return JSON.parse(localStorage.getItem("recordes" + nomeDificuldade)) || [];
}
function mostrarRecordes(container,nomeDificuldade) { //MOSTRA TODAS AS DIFICULDADES DE UMA SÓ VEZ, CHAMANDO TODAS AS FUNÇÕES
    recordes = carregarRecordes(nomeDificuldade);
    container.innerHTML = "";
    for (let i in recordes) {
        const tr = document.createElement("tr");
        tr.appendChild(gerarEstruturaRecordes(recordes[i], 'nome'));
        tr.appendChild(gerarEstruturaRecordes(recordes[i], 'pontuacao'));
        tr.appendChild(gerarEstruturaRecordes(recordes[i], 'categoria'));
        container.appendChild(tr);
    }
}
function mostrarTodosRecordes () {
    mostrarRecordes(COMPONENTES.campoRecordes[0], DIFICULDADES[0].descricao);
    mostrarRecordes(COMPONENTES.campoRecordes[1], DIFICULDADES[1].descricao);
    mostrarRecordes(COMPONENTES.campoRecordes[2], DIFICULDADES[2].descricao);
}
function gerarEstruturaRecordes(jogadorItem, propriedade) { //GERA A ESTRUTURA PARA CADA ITEM DO RANKING
    let td = document.createElement("td");
    if (jogadorItem.hasOwnProperty(propriedade)) {
        td.innerHTML = jogadorItem[propriedade];
    }
    return td;
};
function gerarArrayImagensAleatorias() {
    const array = [];
    while (array.length < ((categoria.length / 3) * JOGO.dificuldade.codigo)) {
        const random = Math.floor(Math.random() * ((categoria.length / 3) * JOGO.dificuldade.codigo));
        if (array.indexOf(random) == -1) {
            array.push(random);
        }
    }
    for (let i = 0; i < ((categoria.length / 3) * JOGO.dificuldade.codigo); i++) {
        array.push(array[i]);
    }
    for (let i = array.length; i; i--) {
        const j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
    return array;
};
const NATUREZA = ['images/natureza/1.jpg',
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
const CARROS = [
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
const DESENHOS = [
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
const IMAGEMPADRAO = ['images/default.jpg'];
