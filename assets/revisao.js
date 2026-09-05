/* ============================================================
   REVISÃO — repetição espaçada do vocabulário (flashcards).

   Por que existe: uma palavra vista uma vez na aula e revisada só na
   semana seguinte some em poucas semanas. Aqui cada palavra volta em
   intervalos crescentes (1, 3, 7, 15 dias...), mais cedo se ela errar.
   É a peça que transforma 40 semanas de aulas em vocabulário que fica.

   Deck: site/assets/vocabulario.js (gerado pelo validar.sh a partir dos
   blocos "vocab"). Só entram palavras de aulas que ela JÁ ABRIU — nada
   de cobrar palavra que ainda não foi ensinada.

   Estado: localStorage "ingles.srs" (entra no backup).
   ============================================================ */
(function (global) {
'use strict';

var CHAVE='ingles.srs';
var NOVAS_POR_DIA=12;        /* quantas palavras novas entram por dia, no máximo */

function hoje(){ return global.Curso ? Curso.hojeLocal() : new Date().toISOString().slice(0,10); }
function somarDias(iso,n){
  var p=iso.split('-'); var d=new Date(+p[0],+p[1]-1,+p[2]); d.setDate(d.getDate()+n);
  return global.Curso ? Curso.hojeLocal(d) : d.toISOString().slice(0,10);
}

function carregar(){
  var e={cartas:{}, dia:{data:'', novas:0, feitas:0}};
  try{ var g=JSON.parse(localStorage.getItem(CHAVE)||'null'); if(g&&g.cartas) e=g; }catch(x){}
  if(!e.dia || e.dia.data!==hoje()) e.dia={data:hoje(), novas:0, feitas:0};
  return e;
}
function salvar(e){ try{ localStorage.setItem(CHAVE, JSON.stringify(e)); }catch(x){} }

function progresso(){
  try{ return JSON.parse(localStorage.getItem('ingles.progresso')||'{}'); }catch(x){ return {}; }
}

/* as cartas que ela pode ver: só de aulas que já começou */
function deck(){
  var v=(typeof VOCABULARIO!=='undefined')?VOCABULARIO:[];
  var p=progresso();
  return v.filter(function(c){ return !!p[c.s+'-'+c.d]; });
}

function chaveDe(c){ return String(c.en).toLowerCase(); }

/* resumo para o índice: o que espera por ela hoje */
function resumo(){
  var e=carregar(), d=deck(), h=hoje();
  var vencidas=0, novas=0, aprendidas=0;
  d.forEach(function(c){
    var s=e.cartas[chaveDe(c)];
    if(!s){ novas++; return; }
    aprendidas++;
    if(s.d<=h) vencidas++;
  });
  var novasHoje=Math.max(0, Math.min(novas, NOVAS_POR_DIA-e.dia.novas));
  return {vencidas:vencidas, novas:novas, novasHoje:novasHoje, aprendidas:aprendidas,
          total:d.length, pendentes:vencidas+novasHoje, feitasHoje:e.dia.feitas};
}

/* a fila da sessão de hoje: vencidas primeiro, depois novas (na ordem das aulas) */
function fila(){
  var e=carregar(), d=deck(), h=hoje();
  var venc=[], novas=[];
  d.forEach(function(c){
    var s=e.cartas[chaveDe(c)];
    if(!s) novas.push(c); else if(s.d<=h) venc.push(c);
  });
  var limite=Math.max(0, NOVAS_POR_DIA-e.dia.novas);
  venc.sort(function(a,b){ return (e.cartas[chaveDe(a)].d<e.cartas[chaveDe(b)].d)?-1:1; });
  return venc.concat(novas.slice(0,limite));
}

/* nota: 0 = não lembrei · 1 = lembrei · 2 = fácil  (SM-2 simplificado) */
function responder(carta,nota){
  var e=carregar(), k=chaveDe(carta), h=hoje();
  var s=e.cartas[k];
  if(!s){ s={i:0,e:2.5,r:0,l:0,d:h}; e.dia.novas++; }
  if(nota===0){
    s.i=0; s.r=0; s.l=(s.l||0)+1; s.e=Math.max(1.3,(s.e||2.5)-0.2); s.d=h;   /* volta hoje mesmo */
  }else if(nota===1){
    s.i = s.r===0?1 : s.r===1?3 : Math.round(s.i*s.e);
    s.r++; s.d=somarDias(h,s.i);
  }else{
    s.i = s.r===0?3 : Math.round(s.i*s.e*1.3);
    s.e=Math.min(3.2,(s.e||2.5)+0.15); s.r++; s.d=somarDias(h,s.i);
  }
  s.v=h;
  e.cartas[k]=s; e.dia.feitas++;
  salvar(e);
  return s;
}

/* direção da carta: as primeiras vezes ela vê o inglês e lembra o português
   (reconhecer); depois vê o português e tem que produzir o inglês (falar). */
function direcao(carta){
  var e=carregar(), s=e.cartas[chaveDe(carta)];
  return (s && s.r>=2) ? 'pt-en' : 'en-pt';
}

/* ---------------- a página ---------------- */
function montarPagina(){
  var esc=Curso.esc;
  var painel=document.getElementById('rev');
  var r=resumo();
  var q=fila();
  var feitasSessao=0, pendentesInicio=q.length;

  function cabecalho(){
    document.getElementById('contagem').textContent=
      r.aprendidas+' de '+r.total+' palavras em revisão';
  }
  cabecalho();

  if(!r.total){
    painel.innerHTML='<div class="card" style="text-align:center"><b>Ainda não tem palavra para revisar.</b>'+
      '<p class="ajuda">As palavras entram aqui conforme você faz as aulas. Faça a primeira aula e volte! 💜</p>'+
      '<a class="btn" style="text-decoration:none" href="index.html">← Ir para as aulas</a></div>';
    return;
  }

  function fim(){
    var r2=resumo();
    painel.innerHTML='<div class="card final"><h2>🎉 Revisão de hoje feita!</h2>'+
      '<div class="estrelas">🃏</div>'+
      '<p>Você revisou <b>'+feitasSessao+'</b> palavra'+(feitasSessao===1?'':'s')+' hoje.</p>'+
      '<p class="ajuda">'+r2.aprendidas+' palavras em revisão · a próxima leva chega amanhã.</p>'+
      '<a class="btn" style="text-decoration:none" href="index.html">← Voltar às aulas</a></div>';
  }

  function mostrar(){
    if(!q.length){ fim(); return; }
    var c=q[0], dir=direcao(c), virada=false;
    var frente = dir==='en-pt' ? c.en : c.pt;
    var verso  = dir==='en-pt' ? c.pt : c.en;
    painel.innerHTML=
      '<div class="progresso-rev">'+feitasSessao+' feita'+(feitasSessao===1?'':'s')+' · '+q.length+' na fila</div>'+
      '<div class="carta" id="carta">'+
        (c.emoji?'<div class="emoji">'+c.emoji+'</div>':'')+
        '<div class="lado">'+(dir==='en-pt'?'o que significa?':'como se diz em inglês?')+'</div>'+
        '<div class="frente">'+esc(frente)+'</div>'+
        (dir==='en-pt'&&c.ipa?'<div class="ipa">'+esc(c.ipa)+'</div>':'')+
        '<div class="verso" id="verso" hidden>'+esc(verso)+(dir==='pt-en'&&c.ipa?'<div class="ipa">'+esc(c.ipa)+'</div>':'')+'</div>'+
        '<div id="som"></div>'+
      '</div>'+
      '<div id="acoes"></div>';
    var acoes=document.getElementById('acoes');
    if(dir==='en-pt') Curso.falar(c.en);

    var btVirar=document.createElement('button');
    btVirar.className='btn'; btVirar.style.width='100%';
    btVirar.textContent='👀 Virar a carta';
    acoes.appendChild(btVirar);
    var dica=document.createElement('p'); dica.className='ajuda'; dica.style.textAlign='center';
    dica.textContent = dir==='en-pt' ? 'Pense na resposta (fale em voz alta!) e depois vire.' : 'Fale a palavra em inglês em voz alta e depois vire.';
    acoes.appendChild(dica);

    btVirar.onclick=function(){
      if(virada) return; virada=true;
      document.getElementById('verso').hidden=false;
      document.getElementById('som').innerHTML='<button class="som" data-say="'+esc(c.en)+'" aria-label="Ouvir">&#128266;</button>';
      Curso.falar(c.en);
      acoes.innerHTML=
        '<div class="notas">'+
          '<button class="btn vermelho" data-n="0">😅 Não lembrei<small>volta já já</small></button>'+
          '<button class="btn verde" data-n="1">🙂 Lembrei<small>volta em uns dias</small></button>'+
          '<button class="btn amarelo" data-n="2">😎 Fácil<small>volta bem depois</small></button>'+
        '</div>';
      var bts=acoes.querySelectorAll('button[data-n]');
      for(var i=0;i<bts.length;i++)(function(bt){
        bt.onclick=function(){
          var n=parseInt(bt.dataset.n,10);
          responder(c,n);
          q.shift();
          if(n===0) q.push(c);        /* errou: volta no fim da fila de hoje */
          else feitasSessao++;
          mostrar();
        };
      })(bts[i]);
    };
  }
  mostrar();
}

global.Revisao={resumo:resumo, fila:fila, responder:responder, deck:deck, montarPagina:montarPagina};
})(window);
