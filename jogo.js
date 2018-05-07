var timerId = null;
var situcaoFinal = null;
function iniciaJogo()
{

	var url = window.location.search;
	var nivelJogo = url.replace("?" , "");	
	var tempoSegundo = 0;
	if(nivelJogo == 1)
	{
		tempoSegundo = 45;		
	}
	if(nivelJogo == 2)
	{
		tempoSegundo = 30;
	}
	if(nivelJogo == 3)
	{
		tempoSegundo = 15;
	}
	document.getElementById('cronometro').innerHTML = tempoSegundo;
	var quantidadeBaloes = 80;

	criarBaloes(quantidadeBaloes);
	document.getElementById('baloesInteiros').innerHTML = quantidadeBaloes;
	document.getElementById('baloesEstourados').innerHTML = 0;

	contagemTempo(tempoSegundo + 1)
}

function contagemTempo(segundos)
{
	segundos = segundos - 1;
	if(segundos == -1)
	{
		clearTimeout(timerId); //parar a execução da função do set time out
		alert("Fim de jogo, você não conseguiu estourar todos os balões.");
		situcaoFinal = 0;
		telaInicial(situcaoFinal);
		return false;
	}
	document.getElementById('cronometro').innerHTML = segundos;
	timerId = setTimeout("contagemTempo("+segundos+")", 1000);
}

function criarBaloes(quantidadeBaloes)
{
	for(var i = 0; i < quantidadeBaloes; i++)
	{
		var balao = document.createElement("img")
		balao.src = 'imagens/balao_azul_pequeno.png'
		balao.style.margin = '10px';
		balao.id = 'b' + i;
		balao.onclick = function(){ estourar(this);};
		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e)
{
	var idBalao = e.id;
	document.getElementById(idBalao).setAttribute("onclick","");
	document.getElementById(idBalao).src = "imagens/balao_azul_pequeno_estourado.png";
	var audio1 = new Audio();
    audio1.src = "sample/sample.mp3";
    audio1.play();
    pontuacao(-1);
}

function pontuacao(acao)
{
	var baloesI = document.getElementById('baloesInteiros').innerHTML;
	var baloesE = document.getElementById('baloesEstourados').innerHTML;

	baloesI = parseInt(baloesI);
	baloesE = parseInt(baloesE);

	baloesI = baloesI + acao;
	baloesE = baloesE - acao;

	document.getElementById('baloesInteiros').innerHTML = baloesI;
	document.getElementById('baloesEstourados').innerHTML = baloesE;
	situacaoJogo(baloesI);
}

function situacaoJogo(baloesInteiros)
{
	if(baloesInteiros == 0)
	{
		alert("Parabens, você conseguiu eliminar todos os balões.");
		situcaoFinal = 1;
		pararJogo();
		telaInicial(situcaoFinal);
	}
}

function pararJogo()
{
	clearTimeout(timerId);
}

function remove_eventos_baloes() 
{
    var i = 1; //contador para recuperar balões por id    
    //percorre o elementos de acordo com o id e só irá sair da repetição quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) 
    {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function telaInicial(situcaoFinal)
{	
	var baloesEn = document.getElementById('baloesEstourados').innerHTML;
	window.location.href = "pontuacao.html?" + baloesEn + ","+(timerId - 1) + "," + situcaoFinal;	
}
