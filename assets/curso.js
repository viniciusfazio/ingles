/* ============================================================
   Curso de Inglês — motor das aulas.
   NÃO precisa ser editado para criar novas semanas.
   Cada aula chama:  Curso.montar({ ...dados da aula... })
   ============================================================ */
(function (global) {
'use strict';

var C = (global.CONFIG || {});
var LINK_IA = C.linkIA || 'https://gemini.google.com/app';
var NOME_IA = C.nomeIA || 'IA';

/* ---------------- quem está estudando ----------------
   O NOME não fica no código: é perguntado na primeira vez que ela abre o
   curso e guardado no celular dela. Assim nada pessoal vai para o
   repositório nem para o servidor, e trocar não exige publicar de novo.
   O config.js entra só como reserva, se ela abrir uma aula sem ter passado
   pela tela de boas-vindas. */
var CHAVE_ALUNA = 'ingles.aluna';

function aluna(){
  var a={};
  try{ a=JSON.parse(localStorage.getItem(CHAVE_ALUNA)||'{}')||{}; }catch(e){ a={}; }
  return {
    nome:  a.nome  || C.nomeAluna || 'Aluna',
    idade: a.idade || C.idade     || 11
  };
}
function definirAluna(nome,idade){
  var dados={
    nome:  String(nome||'').replace(/\s+/g,' ').trim().slice(0,30),
    idade: Math.min(18, Math.max(5, parseInt(idade,10)||C.idade||11))
  };
  try{ localStorage.setItem(CHAVE_ALUNA, JSON.stringify(dados)); }catch(e){}
  return dados;
}
function temAluna(){
  try{ return !!(JSON.parse(localStorage.getItem(CHAVE_ALUNA)||'{}')||{}).nome; }
  catch(e){ return false; }
}

/* ---------------- utilidades ---------------- */
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function norm(s){return String(s==null?'':s).toLowerCase().replace(/[’']/g,"'").replace(/[.,!?;:"“”]/g,'').replace(/\s+/g,' ').trim();}
function baralhar(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function novo(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}

/* data de HOJE no fuso do celular (AAAA-MM-DD). toISOString() daria a data
   em UTC: no Brasil, uma aula feita depois das 21h cairia no dia seguinte,
   e a contagem de dias seguidos ficaria errada. */
function hojeLocal(d){
  d=d||new Date();
  var m=d.getMonth()+1, dia=d.getDate();
  return d.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(dia<10?'0':'')+dia;
}

/* O texto parece inglês? Serve para NÃO ler com a voz americana uma
   resposta que está em português (ex.: um quiz de "o que significa...").
   Acentos e palavrinhas comuns do português denunciam a língua. */
var PALAVRAS_PT=/(^|\s)(eu|não|nao|é|um|uma|uns|umas|com|de|do|da|dos|das|ela|ele|elas|eles|está|estou|são|meu|minha|meus|minhas|você|voce|seu|sua|para|por|que|em|no|na|nos|nas|se|lê|até|sim|ou|mas|também|muito|muita|obrigada|obrigado|tchau|olá|oi|bom|boa|dia|tarde|noite|casa|gato|cachorro|amigo|amiga|anos|tenho|sou|quem|onde|qual|como)(\s|$|[.,!?])/i;
function pareceIngles(s){
  s=String(s==null?'':s).trim();
  if(!s) return false;
  if(/[áéíóúãõçêôâàü]/i.test(s)) return false;
  if(PALAVRAS_PT.test(s)) return false;
  return true;
}

/* distância de edição (quantas letras diferem). Um erro de digitação em
   uma frase inteira não deveria zerar o ditado de uma criança. */
function distancia(a,b){
  a=String(a);b=String(b);
  if(a===b) return 0;
  if(!a.length) return b.length;
  if(!b.length) return a.length;
  var prev=[],cur=[],i,j;
  for(j=0;j<=b.length;j++) prev[j]=j;
  for(i=1;i<=a.length;i++){
    cur=[i];
    for(j=1;j<=b.length;j++){
      cur[j]=Math.min(prev[j]+1, cur[j-1]+1, prev[j-1]+(a[i-1]===b[j-1]?0:1));
    }
    prev=cur;
  }
  return prev[b.length];
}
/* "quase certo": no máximo 1 letra errada, e só em respostas com 5+ letras */
function quaseIgual(a,b){
  a=norm(a); b=norm(b);
  if(a===b) return 0;
  if(b.length>=5 && distancia(a,b)<=1) return 1;
  return -1;
}

/* ---------------- áudio (Web Speech API) ---------------- */
var vozEN=null;
var velocidade=parseFloat(localStorage.getItem('ingles.velocidade')||'0.85');

function pegarVoz(){
  if(!global.speechSynthesis) return null;
  var vs=speechSynthesis.getVoices()||[];
  if(!vs.length) return null;
  function ache(fn){for(var i=0;i<vs.length;i++){if(fn(vs[i]))return vs[i];}return null;}
  return ache(function(v){return v.name==='Google US English';})
      || ache(function(v){return v.lang==='en-US'&&/samantha|aria|zira|ava|jenny|female/i.test(v.name);})
      || ache(function(v){return v.lang==='en-US';})
      || ache(function(v){return (v.lang||'').replace('_','-').slice(0,2)==='en';});
}
if(global.speechSynthesis){
  speechSynthesis.onvoiceschanged=function(){vozEN=pegarVoz();};
  setTimeout(function(){vozEN=pegarVoz();},250);
}
function falar(texto,taxa){
  if(!global.speechSynthesis){alert('Este navegador não tem áudio. Abra no Google Chrome.');return;}
  try{speechSynthesis.cancel();}catch(e){}
  var u=new SpeechSynthesisUtterance(String(texto));
  if(!vozEN)vozEN=pegarVoz();
  if(vozEN)u.voice=vozEN;
  u.lang='en-US'; u.rate=taxa||velocidade; u.pitch=1.05;
  speechSynthesis.speak(u);
}
/* fala várias frases em sequência, com uma pausa entre elas (para a
   história longa). Uma frase por vez evita o corte que o Chrome dá em
   falas compridas, e permite parar no meio. */
var seqAtual=0;
function falarSequencia(textos,aoTerminar,aoComecarItem){
  if(!global.speechSynthesis){alert('Este navegador não tem áudio. Abra no Google Chrome.');return;}
  var minha=++seqAtual, i=0;
  try{speechSynthesis.cancel();}catch(e){}
  function proxima(){
    if(minha!==seqAtual) return;
    if(i>=textos.length){ if(aoTerminar) aoTerminar(); return; }
    var u=new SpeechSynthesisUtterance(String(textos[i]));
    if(!vozEN)vozEN=pegarVoz();
    if(vozEN)u.voice=vozEN;
    u.lang='en-US'; u.rate=velocidade; u.pitch=1.05;
    if(aoComecarItem) aoComecarItem(i);
    i++;
    u.onend=function(){ setTimeout(proxima, 450); };
    u.onerror=function(){ setTimeout(proxima, 200); };
    speechSynthesis.speak(u);
  }
  proxima();
}
function pararFala(){ seqAtual++; try{speechSynthesis.cancel();}catch(e){} }

function botaoSom(texto,pequeno){
  return '<button class="som'+(pequeno?' pequeno':'')+'" data-say="'+esc(texto)+'" aria-label="Ouvir em inglês">&#128266;</button>';
}
document.addEventListener('click',function(ev){
  var alvo=ev.target;
  while(alvo&&alvo!==document){ if(alvo.hasAttribute&&alvo.hasAttribute('data-say')) break; alvo=alvo.parentNode; }
  if(alvo&&alvo!==document&&alvo.hasAttribute&&alvo.hasAttribute('data-say')) falar(alvo.getAttribute('data-say'));
});

/* ---------------- diagnóstico de áudio ----------------
   Serve para descobrir, no celular dela, se a voz e o microfone funcionam
   NESTE navegador — em vez de adivinhar. Brave, Firefox e algumas WebViews
   restringem essas APIs de formas diferentes. */
function infoAudio(){
  var vs=[];
  try{ vs=(global.speechSynthesis&&speechSynthesis.getVoices)?(speechSynthesis.getVoices()||[]):[]; }catch(e){}
  var en=[];
  for(var i=0;i<vs.length;i++){
    var lg=(vs[i].lang||'').replace('_','-').slice(0,2).toLowerCase();
    if(lg==='en') en.push(vs[i]);
  }
  if(!vozEN) vozEN=pegarVoz();
  return {
    vozes: vs.length,
    ingles: en.length,
    voz: vozEN?(vozEN.name+' — '+vozEN.lang):null,
    temSintese: !!global.speechSynthesis,
    temReconhecimento: !!Rec,
    seguro: !!global.isSecureContext,
    compartilha: podeCompartilhar()
  };
}

/* ---------------- pontuação e memória da aula ----------------
   Cada exercício respondido é gravado NA HORA no celular dela, com um id
   estável (bloco-item). Ao reabrir a aula, o que ela já fez volta marcado.
   Assim ela pode parar no meio, fechar, e continuar depois. */
var total=0, acertos=0, respondidas=0, barraEl=null, placarEl=null;
var EST={r:{}};                       /* r = respostas já dadas, por id */

function chaveAula(){ return 'ingles.aula.'+AULA.semana+'-'+AULA.dia; }

function carregarEstado(){
  EST={r:{}};
  try{
    var g=JSON.parse(localStorage.getItem(chaveAula())||'null');
    if(g&&g.r) EST=g;
  }catch(e){}
}
function gravar(){
  /* 1) o detalhe da aula, para restaurar exercício por exercício */
  try{ localStorage.setItem(chaveAula(), JSON.stringify(EST)); }catch(e){}
  /* 2) o resumo, que o índice lê para montar o painel */
  try{
    var p=JSON.parse(localStorage.getItem('ingles.progresso')||'{}');
    p[AULA.semana+'-'+AULA.dia]={
      pct: total?Math.round(acertos/total*100):0,
      acertos: acertos, total: total, respondidas: respondidas,
      concluida: (total>0 && respondidas>=total),
      data: hojeLocal()
    };
    localStorage.setItem('ingles.progresso',JSON.stringify(p));
  }catch(e){}
}

/* registra uma resposta. valor = o que ela marcou/escreveu (para restaurar).
   restaurando = true quando estamos redesenhando algo já respondido antes. */
function registrar(certo,id,valor,restaurando){
  if(!restaurando){
    if(EST.r[id]) return;             /* nunca conta duas vezes */
    EST.r[id]={c:!!certo, v:(valor===undefined?1:valor)};
  }
  respondidas++;
  if(certo)acertos++;
  atualizarPlacar();
  if(!restaurando){
    gravar();
    if(respondidas>=total&&total>0) finalizar();
  }
}
function atualizarPlacar(){
  if(barraEl)barraEl.style.width=(total?Math.round(respondidas/total*100):0)+'%';
  if(placarEl)placarEl.textContent=acertos+' / '+total+' ✅';
}
function finalizar(){
  var alvo=document.getElementById('fim');
  if(!alvo||alvo.dataset.pronto)return;
  alvo.dataset.pronto='1';
  var pct=Math.round(acertos/total*100);
  var estrelas = pct>=90?'⭐⭐⭐⭐⭐' : pct>=75?'⭐⭐⭐⭐' : pct>=60?'⭐⭐⭐' : pct>=40?'⭐⭐' : '⭐';
  var msg = pct>=90?'Perfeito! You are amazing!' : pct>=75?'Muito bom! Great job!' : pct>=50?'Bom trabalho! Keep going!' : 'Tudo bem! Refaça a aula amanhã, você vai conseguir. 💪';
  alvo.innerHTML='<h2>🎉 Aula terminada!</h2><div class="estrelas">'+estrelas+'</div>'+
    '<p><b>'+acertos+' de '+total+'</b> exercícios certos.</p><p>'+esc(msg)+'</p>'+
    '<a class="btn menta" style="text-decoration:none;display:inline-block;margin:4px 0 8px" href="../../revisao.html">🃏 Revisar as palavras de hoje</a><br>'+
    '<button class="btn secundario pequeno" id="refazer" style="margin-top:6px">🔄 Fazer esta aula de novo</button>';
  var bt=document.getElementById('refazer');
  if(bt) bt.onclick=function(){
    try{ localStorage.removeItem(chaveAula()); }catch(e){}
    location.reload();
  };
  alvo.scrollIntoView({behavior:'smooth',block:'center'});
}

/* ---------------- backup e restauração ----------------
   Tudo o que o curso guarda no celular fica sob o prefixo "ingles.".
   O backup é um JSON com essas chaves; a restauração MISTURA com o que
   já existe (nunca apaga o que está mais adiantado). */
function exportarTudo(){
  var itens={}, n=0;
  try{
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      /* "ingles.local.*" é do aparelho (não dela): fica fora do backup */
      if(k && k.indexOf('ingles.')===0 && k.indexOf('ingles.local.')!==0){
        itens[k]=localStorage.getItem(k); n++;
      }
    }
  }catch(e){}
  var eu=aluna();
  return {
    app:'curso-ingles', versao:1,
    gerado:new Date().toISOString(),
    aluna:eu.nome, chaves:n,
    itens:itens
  };
}

function _resumo(txt){ try{ return JSON.parse(txt)||{}; }catch(e){ return {}; } }
function _quantasRespostas(txt){
  var g=_resumo(txt); var c=0;
  if(g && g.r) for(var k in g.r) if(g.r.hasOwnProperty(k)) c++;
  return c;
}

function _semAcento(x){
  x=String(x||'').trim().toLowerCase();
  return x.normalize? x.normalize('NFD').replace(/[\u0300-\u036f]/g,'') : x;
}

/* lê e valida o backup SEM aplicar nada */
function _lerBackup(texto){
  var d;
  try{ d=JSON.parse(texto); }
  catch(e){ throw new Error('Não consegui ler o backup: o conteúdo está incompleto ou corrompido.'); }
  if(!d || d.app!=='curso-ingles' || !d.itens || typeof d.itens!=='object')
    throw new Error('Este arquivo não é um backup deste curso.');
  return d;
}

/* o que tem dentro do backup, para poder perguntar antes de restaurar */
function inspecionarBackup(texto){
  var d=_lerBackup(texto);
  var prog=_resumo(d.itens['ingles.progresso']||'{}');
  var chaves=Object.keys(prog), feitas=0;
  chaves.forEach(function(k){ if(prog[k]&&prog[k].concluida) feitas++; });
  var doBackup=d.aluna||'';
  var nesteCelular=temAluna()?aluna().nome:'';
  return {
    aluna: doBackup,
    nomeAtual: nesteCelular,
    /* só é "outra pessoa" se este celular já tiver um nome e ele for diferente */
    outraPessoa: !!(nesteCelular && doBackup && _semAcento(doBackup)!==_semAcento(nesteCelular)),
    gerado: d.gerado||'',
    concluidas: feitas,
    aulas: chaves.length
  };
}

/* apaga tudo o que este curso guardou neste celular */
function _limparTudo(){
  var mortas=[];
  try{
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      if(k && k.indexOf('ingles.')===0) mortas.push(k);
    }
    mortas.forEach(function(k){ localStorage.removeItem(k); });
  }catch(e){}
  return mortas.length;
}

/* substituir=true  -> apaga o que está aqui e instala o backup (crianças diferentes)
   substituir=false -> mistura, mantendo sempre o mais adiantado (mesma pessoa) */
function importarTudo(texto,substituir){
  var d=_lerBackup(texto);

  if(substituir) _limparTudo();

  var aulasRestauradas=0, textosRestaurados=0;

  for(var k in d.itens){
    if(!d.itens.hasOwnProperty(k) || k.indexOf('ingles.')!==0) continue;
    var novoV=d.itens[k], atualV=null;
    try{ atualV=localStorage.getItem(k); }catch(e){}

    if(atualV===null){                              /* não existe aqui: entra direto */
      guardar(k,novoV);
      if(k==='ingles.progresso') aulasRestauradas=Object.keys(_resumo(novoV)).length;
      else if(k.indexOf('ingles.escrita.')===0) textosRestaurados++;
      continue;
    }

    if(k==='ingles.progresso'){
      /* aula por aula, vence a mais adiantada */
      var a=_resumo(atualV), n2=_resumo(novoV);
      for(var aula in n2){
        if(!n2.hasOwnProperty(aula)) continue;
        var atual=a[aula], vindo=n2[aula];
        var pontos=function(e){ return e?((e.concluida?10000:0)+(e.respondidas||0)):-1; };
        if(pontos(vindo)>pontos(atual)){ a[aula]=vindo; aulasRestauradas++; }
      }
      guardar(k,JSON.stringify(a));
    }
    else if(k.indexOf('ingles.aula.')===0){
      if(_quantasRespostas(novoV)>_quantasRespostas(atualV)) guardar(k,novoV);
    }
    else if(k.indexOf('ingles.escrita.')===0){
      /* texto dela: nunca perder o mais longo */
      if(String(novoV||'').length>String(atualV||'').length){ guardar(k,novoV); textosRestaurados++; }
    }
    else if(k==='ingles.srs'){
      /* revisão espaçada: carta por carta, vence a revisada por último;
         o contador do dia fica o de hoje, se houver */
      var sa=_resumo(atualV), sn=_resumo(novoV);
      var cartas=sa.cartas||{}, vindas=sn.cartas||{};
      for(var carta in vindas){
        if(!vindas.hasOwnProperty(carta)) continue;
        var ca=cartas[carta], cn=vindas[carta];
        if(!ca || String(cn.v||'')>String(ca.v||'') || (String(cn.v||'')===String(ca.v||'') && (cn.r||0)>(ca.r||0))) cartas[carta]=cn;
      }
      var dia=(sa.dia&&sa.dia.data>=(sn.dia?sn.dia.data:''))?sa.dia:sn.dia;
      guardar(k,JSON.stringify({cartas:cartas, dia:dia||{data:'',novas:0,feitas:0}}));
    }
    else guardar(k,novoV);                          /* aluna, velocidade */
  }

  return {aulas:aulasRestauradas, textos:textosRestaurados, gerado:d.gerado, aluna:d.aluna,
          modo: substituir?'substituido':'misturado'};

  function guardar(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
}

function nomeDoBackup(){
  var eu=aluna();
  var apelido=String(eu.nome||'aluna').normalize?
      eu.nome.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]/g,''):'aluna';
  return 'ingles-'+(apelido||'aluna')+'-'+hojeLocal()+'.json';
}

/* ---- compartilhar pelo menu nativo do celular (WhatsApp, Drive, e-mail…) ----
   O Chrome só compartilha arquivos de uma lista de tipos permitidos, e
   application/json não está garantido nela. Então tentamos .json e, se o
   navegador recusar, mandamos o mesmo conteúdo como .txt (sempre aceito).
   O conteúdo é idêntico: a restauração lê o texto e interpreta o JSON. */
function _arquivoBackup(nome,tipo){
  try{ return new File([JSON.stringify(exportarTudo(),null,1)], nome, {type:tipo}); }
  catch(e){ return null; }
}
function _tentativasBackup(){
  var base=nomeDoBackup().replace(/\.json$/,'');
  return [[base+'.json','application/json'], [base+'.txt','text/plain']];
}
/* Compartilhar arquivo é frágil entre navegadores. Duas decisões aqui:
   1) mandamos SEMPRE como text/plain — é o único tipo que toda implementação
      aceita. A extensão não importa: a restauração lê o texto e interpreta o
      JSON. Tentar .json antes só criava um jeito extra de falhar.
   2) o pacote é só {files}: alguns navegadores recusam files+title. */
function _nomeTxt(){ return nomeDoBackup().replace(/\.json$/,'')+'.txt'; }

function _pacoteBackup(){
  var f=_arquivoBackup(_nomeTxt(),'text/plain');
  return f?{files:[f]}:null;
}

/* Quando o navegador recusa de forma definitiva, guardamos isso NESTE aparelho
   para não oferecer de novo um botão que não funciona. A chave começa com
   "ingles.local." e por isso fica fora do backup: é do aparelho, não dela. */
var CHAVE_SEM_SHARE='ingles.local.semCompartilhar';
function marcarSemCompartilhar(){ try{ localStorage.setItem(CHAVE_SEM_SHARE,'1'); }catch(e){} }
function semCompartilharMarcado(){
  try{ return localStorage.getItem(CHAVE_SEM_SHARE)==='1'; }catch(e){ return false; }
}
/* volta atrás: uma falha passageira não pode esconder o botão para sempre */
function limparSemCompartilhar(){ try{ localStorage.removeItem(CHAVE_SEM_SHARE); }catch(e){} }

function podeCompartilhar(){
  try{ if(localStorage.getItem(CHAVE_SEM_SHARE)==='1') return false; }catch(e){}
  if(!global.navigator || !navigator.share || typeof File!=='function') return false;
  if(!navigator.canShare) return true;                    /* sem canShare: vale tentar */
  try{
    var teste=new File(['x'],_nomeTxt(),{type:'text/plain'});
    return !!navigator.canShare({files:[teste]});
  }catch(e){ return false; }
}

/* Precisa ser chamada DENTRO do clique: o navegador exige o gesto do usuário.
   Nada de trabalho assíncrono antes daqui, ou o gesto expira. */
function compartilharBackup(){
  if(!global.navigator || !navigator.share)
    return Promise.reject(new Error('Este navegador não tem o menu de compartilhar.'));
  var pacote=_pacoteBackup();
  if(!pacote) return Promise.reject(new Error('Não consegui montar o arquivo do backup.'));
  return navigator.share(pacote).then(function(){ return pacote.files[0].name; });
}

function baixarBackup(){
  var texto=JSON.stringify(exportarTudo(),null,1);
  var blob=new Blob([texto],{type:'application/json'});
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a');
  a.href=url; a.download=nomeDoBackup();
  document.body.appendChild(a); a.click();
  setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); },1500);
  return a.download;
}

/* ---------------- prompts para a IA ---------------- */
function promptEscrita(instrucao,resposta,semana,gabarito){
  var eu=aluna();
  return 'Você é uma professora de inglês simpática e paciente. Sua aluna é uma menina brasileira de '+eu.idade+
' anos chamada '+eu.nome+'. Ela está na semana '+semana+' de um curso de inglês do zero (nível iniciante).\n\n'+
'TAREFA QUE ELA FEZ:\n'+instrucao+'\n\nA RESPOSTA DELA FOI:\n"""\n'+(resposta||'(ela ainda não escreveu nada)')+'\n"""\n\n'+
(gabarito?'SÓ PARA VOCÊ SE GUIAR (nunca mostre isto como resposta pronta): uma resposta completa cobriria '+gabarito+
'\nSe faltou alguma dessas partes, diga em uma frase o que faltou e peça para ela completar.\n\n':'')+
'CORRIJA ASSIM:\n'+
'1) Comece com um elogio curto e sincero, em português.\n'+
'2) Escreva a versão corrigida completa em inglês.\n'+
'3) Mostre no máximo 3 erros, cada um no formato: ❌ o que ela escreveu → ✅ o certo → explicação bem simples em português.\n'+
'4) Não use termos gramaticais difíceis nem vocabulário avançado.\n'+
'5) Termine com UMA pergunta bem fácil em inglês (com a tradução entre parênteses) para ela responder.\n'+
'Responda em português, menos os exemplos em inglês. Seja carinhosa e encorajadora.';
}
function promptFala(instrucao,frases,semana){
  var eu=aluna();
  return 'Você é uma professora de inglês simpática e paciente. Sua aluna é uma menina brasileira de '+eu.idade+
' anos chamada '+eu.nome+', na semana '+semana+' de um curso de inglês do zero (nível iniciante).\n\n'+
'ATIVIDADE DE FALA:\n'+instrucao+'\n\nFRASES/PERGUNTAS DA AULA DE HOJE:\n- '+frases.join('\n- ')+'\n\n'+
'COMO CONDUZIR:\n'+
'1) Peça para ela falar (por áudio) uma frase de cada vez, na ordem acima. Só passe para a próxima depois que ela responder.\n'+
'2) Depois de cada áudio dela: diga se entendeu bem, elogie, e corrija a pronúncia e a gramática em português, de forma simples e carinhosa.\n'+
'3) Se a pronúncia de alguma palavra ficou difícil, escreva como se lê "à brasileira" (ex.: "name" = "neim").\n'+
'4) Use frases curtas e fale devagar. Nunca use inglês difícil.\n'+
'5) No final, dê uma nota de 1 a 5 estrelas e uma dica para melhorar.';
}
/* ---- MISSÃO: jogo de conversa com objetivo ----
   A IA vira um personagem que SÓ fala e SÓ entende inglês. Ela precisa
   conseguir algo (comprar a camisa amarela, descobrir a idade da amiga).
   O português só volta em duas situações: uma dica de narrador quando ela
   trava, e o fechamento, quando a missão é cumprida. A dificuldade cresce
   com o bloco do curso (tamanho das frases e da cena). */
function nivelMissao(semana){
  if(semana<=10) return {palavras:6,  falas:8};
  if(semana<=20) return {palavras:8,  falas:10};
  if(semana<=30) return {palavras:10, falas:12};
  return {palavras:12, falas:14};
}
function promptMissao(b,semana){
  var eu=aluna(), n=nivelMissao(semana);
  var objetivos=(b.objetivos||[]).map(function(o){return '- '+o;}).join('\n');
  return 'Vamos fazer um JOGO DE CONVERSA em inglês. A jogadora é uma menina brasileira de '+eu.idade+
' anos chamada '+eu.nome+', na semana '+semana+' de um curso de inglês para iniciantes. Ela vai responder digitando ou falando (o áudio chega para você como texto).\n\n'+
'SEU PERSONAGEM: '+(b.personagem||'um personagem simpático')+'.\n'+
'A CENA: '+strip(b.cenario)+'\n'+
'O personagem SÓ FALA E SÓ ENTENDE INGLÊS. Não sabe uma palavra de português.\n\n'+
'A MISSÃO DELA (não revele esta lista; use-a para julgar se ela conseguiu):\n'+objetivos+'\n'+
'Ela cumpre a missão quando tiver feito TODOS os itens, mesmo com erros pequenos.\n\n'+
'O QUE ELA JÁ SABE (o personagem usa SÓ isto, nada mais avançado):\n'+(b.instrucaoIA||'')+'\n\n'+
'REGRAS DO JOGO:\n'+
'1) Comece JÁ em cena, em inglês, com uma fala curta do personagem (no máximo 8 palavras). Depois ESPERE a resposta dela. Uma fala por vez; nunca duas perguntas na mesma fala.\n'+
'2) Frases do personagem: de 3 a '+n.palavras+' palavras. Inglês simples, americano, do nível dela.\n'+
'3) Se ela escrever em português, ou algo que o personagem não entenderia, o personagem responde em inglês que não entendeu ("Sorry, I don\'t understand.") e repete de um jeito mais simples, ou faz um gesto descrito em inglês entre asteriscos (ex.: *points to the yellow shirt*).\n'+
'4) Se ela travar por 2 falas seguidas (repetir português, não avançar, pedir ajuda), acrescente UMA linha de NARRADOR em português, entre parênteses e em itálico, com uma dica do que dizer — SEM dar a frase inteira em inglês. Depois volte à cena, em inglês.\n'+
'5) Não corrija erros durante a cena. Se dá para entender, o personagem entende. Anote os erros para o final.\n'+
'6) A cena termina quando ela cumprir a missão, ou em no máximo '+n.falas+' falas do personagem. Se acabar sem cumprir, o personagem se despede com simpatia e você faz o fechamento mesmo assim.\n'+
(b.imprevisto?'7) IMPREVISTO: no meio da cena, '+b.imprevisto+' Ela precisa resolver isso em inglês para cumprir a missão.\n':'')+
'FECHAMENTO (só quando a missão for cumprida ou a cena acabar): saia do personagem e escreva em PORTUGUÊS:\n'+
'- "🎉 Missão cumprida!" se ela conseguiu, ou "Quase! Faltou: ..." dizendo em uma linha o que faltou.\n'+
'- Um elogio específico sobre algo que ela disse bem.\n'+
'- No máximo 3 correções, cada uma no formato: ❌ o que ela disse → ✅ o certo → explicação bem simples em português.\n'+
'- UMA frase em inglês que ela poderia ter usado, com a tradução.\n'+
'- Termine perguntando se ela quer jogar de novo.\n\n'+
'Tudo o que o personagem diz é em INGLÊS. Português só na dica do narrador (regra 4) e no fechamento. Comece agora.';
}

function copiar(texto,botao){
  function ok(){var t=botao.textContent;botao.textContent='✅ Copiado!';setTimeout(function(){botao.textContent=t;},1800);}
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(texto).then(ok,function(){caixa(texto);});
  }else caixa(texto);
  function caixa(t){
    var ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy');ok();}catch(e){alert('Copie o texto manualmente:\n\n'+t);}
    document.body.removeChild(ta);
  }
}

/* ---------------- microfone (opcional) ---------------- */
var Rec = global.SpeechRecognition || global.webkitSpeechRecognition || null;
function ouvirMicrofone(alvoTexto,botao,saida){
  if(!global.isSecureContext){
    saida.innerHTML='O microfone só funciona quando o site está aberto pelo endereço <b>https</b>. '+
                    'Use o '+esc(NOME_IA)+' para praticar a fala. 😉';return;
  }
  if(!Rec){
    saida.innerHTML='Este navegador não tem o microfone de ditado. Abra pelo <b>Chrome</b> ou pratique a fala com o '+esc(NOME_IA)+'. 😉';return;
  }
  var r=new Rec(); r.lang='en-US'; r.interimResults=false; r.maxAlternatives=3;
  botao.classList.add('gravando'); saida.innerHTML='🎤 Pode falar...';
  r.onresult=function(e){
    var melhor='',bateu=false;
    for(var i=0;i<e.results[0].length;i++){
      var t=e.results[0][i].transcript;
      if(!melhor)melhor=t;
      if(norm(t)===norm(alvoTexto)){bateu=true;melhor=t;break;}
    }
    saida.innerHTML=(bateu?'✅ Perfeito! ':'🤔 Eu ouvi: ')+'<b>'+esc(melhor)+'</b>'+(bateu?'':' — tente de novo, ouça o 🔊 primeiro.');
  };
  r.onerror=function(e){
    var erro=(e&&e.error)||'';
    if(erro==='not-allowed'||erro==='service-not-allowed')
      saida.innerHTML='Você precisa <b>permitir o microfone</b>: toque no 🔒 do lado do endereço, '+
                      'escolha Permissões e libere o microfone. Depois toque no 🎤 de novo.';
    else if(erro==='no-speech')
      saida.innerHTML='Não ouvi nada. 🤫 Toque no 🎤 e fale mais perto do celular.';
    else if(erro==='network')
      saida.innerHTML='O microfone precisa de internet para funcionar. Sem sinal, pratique a fala com o '+esc(NOME_IA)+'.';
    else
      saida.innerHTML='Não consegui ouvir agora. Tente de novo tocando no 🎤.';
  };
  r.onend=function(){botao.classList.remove('gravando');};
  try{r.start();}catch(e){botao.classList.remove('gravando');}
}

/* ================= BLOCOS ================= */
var blocos = {};

blocos.nota = function(b){
  var c=novo('section','card nota');
  c.innerHTML='<h2>'+esc(b.titulo||'💡 Dica')+'</h2>'+(b.html||'');
  return c;
};

blocos.vocab = function(b){
  var c=novo('section','card');
  c.innerHTML='<h2>📚 '+esc(b.titulo||'Palavras novas')+'</h2><p class="ajuda">Toque no 🔊 para ouvir. Repita em voz alta!</p>';
  var lista=novo('div','vocab');
  b.itens.forEach(function(it){
    lista.appendChild(novo('div','item',
      '<span class="emoji">'+(it.emoji||'🔤')+'</span>'+
      '<span class="txt"><span class="en">'+esc(it.en)+'</span>'+
      (it.ipa?'<span class="ipa">'+esc(it.ipa)+'</span>':'')+
      '<span class="pt">'+esc(it.pt)+'</span></span>'+botaoSom(it.en)));
  });
  c.appendChild(lista);
  var tudo=novo('div',null,'<button class="btn menta pequeno" style="margin-top:12px" data-say="'+esc(b.itens.map(function(i){return i.en;}).join('. '))+'">🔊 Ouvir todas</button>');
  c.appendChild(tudo);
  return c;
};

blocos.dialogo = function(b){
  var c=novo('section','card dialogo');
  c.innerHTML='<h2>💬 '+esc(b.titulo||'Diálogo')+'</h2><p class="ajuda">Ouça, depois leia em voz alta fazendo as duas vozes.</p>';
  b.linhas.forEach(function(l){
    c.appendChild(novo('div','linha',
      '<span class="quem">'+esc(l.quem)+'</span>'+
      '<span class="bolha"><span class="en">'+esc(l.en)+'</span><span class="pt">'+esc(l.pt)+'</span></span>'+
      botaoSom(l.en,true)));
  });
  c.appendChild(novo('div',null,'<button class="btn menta pequeno" data-say="'+esc(b.linhas.map(function(l){return l.en;}).join('. '))+'">🔊 Ouvir o diálogo todo</button>'));
  return c;
};

blocos.texto = function(b){
  var c=novo('section','card leitura');
  c.innerHTML='<h2>📖 '+esc(b.titulo||'Leitura')+'</h2>';
  b.paragrafos.forEach(function(p){
    c.appendChild(novo('p',null,'<span class="en">'+esc(p.en)+' '+botaoSom(p.en,true)+'</span><span class="pt">'+esc(p.pt)+'</span>'));
  });
  return c;
};

blocos.gramatica = function(b){
  var c=novo('section','card gramatica');
  c.innerHTML='<h2>🧩 '+esc(b.titulo||'Como funciona')+'</h2>'+(b.html||'');
  if(b.exemplos&&b.exemplos.length){
    var ex=novo('div','exemplos');
    b.exemplos.forEach(function(e){
      ex.appendChild(novo('div','ex',botaoSom(e.en,true)+'<div><b>'+esc(e.en)+'</b><span>'+esc(e.pt)+'</span></div>'));
    });
    c.appendChild(ex);
  }
  return c;
};

blocos.quiz = function(b,bi){
  var c=novo('section','card');
  c.innerHTML='<h2>❓ '+esc(b.titulo||'Escolha a resposta certa')+'</h2>';
  b.questoes.forEach(function(q,i){
    total++;
    var id=bi+'-'+i;
    var ex=novo('div','exercicio');
    ex.appendChild(novo('div','pergunta','<span class="num">'+(i+1)+'</span>'+esc(q.pergunta)+(q.audio?' '+botaoSom(q.audio,true):'')));
    var ops=novo('div','opcoes');
    var fb=novo('div','feedback');

    function aplicar(escolhida,restaurando){
      var todos=ops.querySelectorAll('.opcao');
      for(var k=0;k<todos.length;k++)todos[k].disabled=true;
      var certo=(escolhida===q.correta);
      if(todos[escolhida]) todos[escolhida].classList.add(certo?'certa':'errada');
      if(!certo&&todos[q.correta]) todos[q.correta].classList.add('certa');
      fb.className='feedback '+(certo?'ok':'nok');
      fb.innerHTML=(certo?'✅ Isso mesmo!':'❌ A resposta certa é: '+esc(q.opcoes[q.correta]))+
                   (q.explicacao?'<span class="porque">'+esc(q.explicacao)+'</span>':'');
      /* só lê a resposta se ela for inglês: uma opção em português lida
         com voz americana soa errado e ensina pronúncia errada */
      if(!restaurando && q.audioResposta!==false && pareceIngles(q.opcoes[q.correta])) falar(q.opcoes[q.correta]);
      registrar(certo,id,escolhida,restaurando);
    }
    q.opcoes.forEach(function(op,jj){
      var bt=novo('button','opcao',esc(op));
      bt.onclick=function(){ aplicar(jj,false); };
      ops.appendChild(bt);
    });
    ex.appendChild(ops); ex.appendChild(fb);
    c.appendChild(ex);
    if(EST.r[id]) aplicar(EST.r[id].v,true);
  });
  return c;
};

blocos.completar = function(b,bi){
  var c=novo('section','card');
  c.innerHTML='<h2>✏️ '+esc(b.titulo||'Complete as frases')+'</h2><p class="ajuda">'+esc(b.ajuda||'Escreva a palavra que falta no espaço.')+'</p>';
  b.itens.forEach(function(it,i){
    total++;
    var id=bi+'-'+i;
    var ex=novo('div','exercicio');
    ex.appendChild(novo('div','pergunta','<span class="num">'+(i+1)+'</span>'+esc(it.frase)+(it.pt?' <span style="font-weight:400;color:#6E6A80;font-size:14px">('+esc(it.pt)+')</span>':'')));
    var fb=novo('div','feedback');
    var ops=null, inp=null, btV=null;

    function aplicar(valor,restaurando){
      var certo=norm(valor)===norm(it.resposta);
      if(ops){
        var todos=ops.querySelectorAll('.opcao');
        for(var k=0;k<todos.length;k++){
          todos[k].disabled=true;
          if(norm(todos[k].textContent)===norm(it.resposta)) todos[k].classList.add('certa');
          else if(norm(todos[k].textContent)===norm(valor)) todos[k].classList.add('errada');
        }
      }else{
        inp.value=valor; inp.disabled=true; btV.disabled=true;
        inp.classList.add(certo?'certa':'errada');
      }
      fb.className='feedback '+(certo?'ok':'nok');
      fb.innerHTML=(certo?'✅ Muito bem!':'❌ O certo é: <b>'+esc(it.resposta)+'</b>')+
                   (it.explicacao?'<span class="porque">'+esc(it.explicacao)+'</span>':'');
      if(!restaurando) falar(it.frase.replace(/_+/g,it.resposta));
      registrar(certo,id,valor,restaurando);
    }

    if(it.opcoes&&it.opcoes.length){
      ops=novo('div','opcoes');
      it.opcoes.forEach(function(op){
        var bt=novo('button','opcao',esc(op));
        bt.onclick=function(){ aplicar(op,false); };
        ops.appendChild(bt);
      });
      ex.appendChild(ops);
    }else{
      var linha=novo('div','linha-inline');
      inp=novo('input','resposta-txt'); inp.type='text'; inp.placeholder='digite aqui';
      inp.setAttribute('autocapitalize','off'); inp.setAttribute('autocomplete','off');
      btV=novo('button','btn pequeno','Verificar');
      btV.onclick=function(){ aplicar(inp.value,false); };
      inp.addEventListener('keydown',function(e){ if(e.key==='Enter') btV.click(); });
      linha.appendChild(inp); linha.appendChild(btV);
      ex.appendChild(linha);
    }
    ex.appendChild(fb);
    c.appendChild(ex);
    if(EST.r[id]) aplicar(EST.r[id].v,true);
  });
  return c;
};

blocos.ligar = function(b,bi){
  var c=novo('section','card');
  c.innerHTML='<h2>🔗 '+esc(b.titulo||'Ligue o inglês ao português')+'</h2><p class="ajuda">Toque em uma palavra em inglês e depois na tradução dela.</p>';
  var grade=novo('div','ligar');
  var colE=novo('div','col'), colD=novo('div','col');
  var selecionado=null, errou={}, esq={}, dir={};

  b.pares.forEach(function(p,i){ total++; });

  baralhar(b.pares).forEach(function(p){
    var bt=novo('button','chip',esc(p.en)); bt.dataset.k=p.en; esq[p.en]=bt;
    bt.onclick=function(){
      if(bt.classList.contains('ok'))return;
      var atuais=colE.querySelectorAll('.chip');
      for(var i=0;i<atuais.length;i++)atuais[i].classList.remove('sel');
      bt.classList.add('sel'); selecionado=bt; falar(p.en);
    };
    colE.appendChild(bt);
  });
  baralhar(b.pares).forEach(function(p){
    var bt=novo('button','chip',esc(p.pt)); bt.dataset.k=p.en; dir[p.en]=bt;
    bt.onclick=function(){
      if(!selecionado||bt.classList.contains('ok'))return;
      if(bt.dataset.k===selecionado.dataset.k){
        var k=bt.dataset.k; selecionado.classList.remove('sel'); selecionado=null;
        fechar(k, !errou[k], false);
      }else{
        bt.classList.add('nok');
        errou[selecionado.dataset.k]=true;   /* só o par que ela tentou perde o ponto */
        var mau=bt, sel=selecionado;
        setTimeout(function(){mau.classList.remove('nok');sel.classList.remove('sel');},400);
        selecionado=null;
      }
    };
    colD.appendChild(bt);
  });

  /* fecha um par: usado tanto no acerto quanto ao restaurar a aula */
  function fechar(k,certo,restaurando){
    if(esq[k]) esq[k].classList.add('ok');
    if(dir[k]) dir[k].classList.add('ok');
    registrar(certo, bi+'-'+chaveDe(k), k, restaurando);
  }
  function chaveDe(k){                 /* id estável mesmo com as colunas embaralhadas */
    for(var i=0;i<b.pares.length;i++) if(b.pares[i].en===k) return i;
    return k;
  }

  grade.appendChild(colE); grade.appendChild(colD); c.appendChild(grade);

  b.pares.forEach(function(p,i){
    var g=EST.r[bi+'-'+i];
    if(g) fechar(p.en, g.c, true);
  });
  return c;
};

blocos.ditado = function(b,bi){
  var c=novo('section','card');
  c.innerHTML='<h2>👂 '+esc(b.titulo||'Escute e escreva')+'</h2><p class="ajuda">Toque no 🔊, ouça quantas vezes quiser e escreva o que ouviu em inglês.</p>';
  b.itens.forEach(function(it,i){
    total++;
    var id=bi+'-'+i;
    var ex=novo('div','exercicio');
    ex.appendChild(novo('div','pergunta','<span class="num">'+(i+1)+'</span>'+botaoSom(it.en)+' <span style="font-weight:400;font-size:14px;color:#6E6A80">'+(it.dica?esc(it.dica):'')+'</span>'));
    var linha=novo('div','linha-inline');
    var inp=novo('input','resposta-txt'); inp.type='text'; inp.placeholder='escreva em inglês';
    inp.setAttribute('autocapitalize','off'); inp.setAttribute('autocomplete','off');
    var bt=novo('button','btn pequeno','Verificar');
    var fb=novo('div','feedback');

    function aplicar(valor,restaurando){
      var grau=quaseIgual(valor,it.en);          /* 0 = exato, 1 = uma letra, -1 = errado */
      var certo=grau>=0;
      inp.value=valor; inp.disabled=true; bt.disabled=true;
      inp.classList.add(certo?'certa':'errada');
      fb.className='feedback '+(certo?'ok':'nok');
      fb.innerHTML=(grau===0?'✅ Você ouviu certinho!':
                    grau===1?'✅ Quase perfeito! Só uma letrinha: o certo é <b>'+esc(it.en)+'</b>':
                    '❌ Era: <b>'+esc(it.en)+'</b>')+'<span class="porque">'+esc(it.pt||'')+'</span>';
      registrar(certo,id,valor,restaurando);
    }
    bt.onclick=function(){ aplicar(inp.value,false); };
    inp.addEventListener('keydown',function(e){ if(e.key==='Enter') bt.click(); });
    linha.appendChild(inp); linha.appendChild(bt);
    ex.appendChild(linha); ex.appendChild(fb);
    c.appendChild(ex);
    if(EST.r[id]) aplicar(EST.r[id].v,true);
  });
  return c;
};

blocos.ordenar = function(b,bi){
  var c=novo('section','card');
  c.innerHTML='<h2>🧱 '+esc(b.titulo||'Monte a frase')+'</h2><p class="ajuda">Toque nas palavras na ordem certa. Toque de novo para tirar.</p>';
  b.itens.forEach(function(it,i){
    total++;
    var id=bi+'-'+i;
    var palavras=it.frase.split(/\s+/);
    var ex=novo('div','exercicio');
    ex.appendChild(novo('div','pergunta','<span class="num">'+(i+1)+'</span>'+esc(it.pt)));
    var montagem=novo('div','montagem');
    var banco=novo('div','banco');
    var mistas=baralhar(palavras);
    if(mistas.join(' ')===palavras.join(' ')&&palavras.length>2)mistas=baralhar(mistas);
    mistas.forEach(function(pal){
      var bp=novo('button','palavra',esc(pal));
      bp.onclick=function(){
        if(bp.parentNode===banco){montagem.appendChild(bp);falar(pal);}
        else banco.appendChild(bp);
      };
      banco.appendChild(bp);
    });
    var fb=novo('div','feedback');
    var bt=novo('button','btn pequeno','Verificar');

    function aplicar(frase,restaurando){
      var certo=norm(frase)===norm(it.frase);
      if(restaurando){
        /* remonta a frase dela na área de montagem */
        montagem.innerHTML=''; banco.innerHTML='';
        frase.split(/\s+/).forEach(function(pal){
          montagem.appendChild(novo('button','palavra',esc(pal)));
        });
      }
      bt.disabled=true;
      var todas=ex.querySelectorAll('.palavra');
      for(var k=0;k<todas.length;k++)todas[k].disabled=true;
      fb.className='feedback '+(certo?'ok':'nok');
      fb.innerHTML=(certo?'✅ Frase perfeita!':'❌ O certo é: <b>'+esc(it.frase)+'</b>');
      if(!restaurando) falar(it.frase);
      registrar(certo,id,frase,restaurando);
    }
    bt.onclick=function(){
      var feito=[]; var ps=montagem.querySelectorAll('.palavra');
      for(var k=0;k<ps.length;k++)feito.push(ps[k].textContent);
      if(!feito.length){
        fb.className='feedback nok';
        fb.innerHTML='Toque nas palavras para montar a frase primeiro. 🙂';
        return;                        /* não gasta a tentativa */
      }
      aplicar(feito.join(' '),false);
    };
    ex.appendChild(montagem); ex.appendChild(banco); ex.appendChild(bt); ex.appendChild(fb);
    c.appendChild(ex);
    if(EST.r[id]) aplicar(EST.r[id].v,true);
  });
  return c;
};

/* ---- as tarefas com a IA CONTAM no progresso ----
   Escrita e fala são a parte da aula que produz fluência, então a aula só
   fica "concluída" quando as duas foram feitas. Cada uma vale 1 no placar
   (é tarefa, não prova: feita = certa). Marca como feita quando ela manda
   o texto para a IA (compartilhar/copiar com conteúdo) ou toca em
   "✅ Já fiz". Ao reabrir a aula, a marca volta. */
function podeCompartilharTexto(){
  return !!(global.navigator && navigator.share);
}
function compartilharTexto(texto){
  return navigator.share({text:texto});
}
/* botões comuns às duas tarefas: mandar direto (um toque), copiar, abrir a IA */
function acoesIA(gerarPrompt,aoEnviar){
  var acoes=novo('div','acoes');
  if(podeCompartilharTexto()){
    var btS=novo('button','btn','📤 Mandar para a '+esc(NOME_IA));
    btS.onclick=function(){
      var p=gerarPrompt(); if(p===null) return;
      compartilharTexto(p).then(function(){ aoEnviar('enviado'); },function(e){
        if(e&&e.name==='AbortError') return;          /* ela cancelou o menu */
        copiar(p,btS); aoEnviar('copiado');            /* sem menu: copia */
      });
    };
    acoes.appendChild(btS);
  }
  var btC=novo('button','btn'+(podeCompartilharTexto()?' secundario':''),'📋 Copiar');
  btC.onclick=function(){ var p=gerarPrompt(); if(p===null) return; copiar(p,btC); aoEnviar('copiado'); };
  var btA=novo('a','btn secundario','🤖 Abrir '+esc(NOME_IA));
  btA.href=LINK_IA;btA.target='_blank';btA.rel='noopener';btA.style.textDecoration='none';
  acoes.appendChild(btC);acoes.appendChild(btA);
  return acoes;
}
/* a linha "✅ Já fiz" + o selo de feito */
function marcadorFeito(id,textoBotao,textoFeito){
  var wrap=novo('div','feito-wrap');
  var bt=novo('button','btn secundario pequeno',textoBotao);
  var selo=novo('span','selo-feito','✅ '+textoFeito);
  selo.hidden=true;
  wrap.appendChild(bt); wrap.appendChild(selo);
  function marcar(restaurando){
    if(!restaurando && EST.r[id]) return;
    bt.hidden=true; selo.hidden=false;
    registrar(true,id,1,restaurando);
  }
  bt.onclick=function(){ marcar(false); };
  if(EST.r[id]) marcar(true);
  return {el:wrap, marcar:function(){ marcar(false); }};
}

blocos.escrita = function(b,bi){
  total++;
  var id=bi+'-tarefa';
  var c=novo('section','card tarefa-ia');
  c.innerHTML='<h2>📝 '+esc(b.titulo||'Hora de escrever')+'</h2><p>'+(b.instrucao||'')+'</p>'+
    (b.dica?'<div class="dica-tarefa"><b>A sua resposta precisa ter:</b>'+b.dica+'</div>':'');
  var ta=novo('textarea');ta.placeholder='Escreva sua resposta em inglês aqui...';
  var chave='ingles.escrita.'+AULA.semana+'-'+AULA.dia+'-'+(b.id||'1');
  try{ ta.value=localStorage.getItem(chave)||''; }catch(e){}
  ta.oninput=function(){try{localStorage.setItem(chave,ta.value);}catch(e){}};
  c.appendChild(ta);

  /* Ajuda opcional: só aparece se ela pedir, e nunca traz a resposta pronta.
     Vem depois do campo de escrever, de propósito: primeiro ela tenta. */
  var apoio=b.andaime||b.exemplo;
  if(apoio){
    var det=novo('details','ajudinha');
    det.innerHTML='<summary>💡 Estou travada — me dá um empurrão</summary><div>'+apoio+'</div>';
    c.appendChild(det);
  }

  var aviso=novo('div','feedback');
  var feito=marcadorFeito(id,'✅ Já mandei e li a correção','Tarefa de escrita feita');
  function gerarPrompt(){
    if(ta.value.replace(/\s/g,'').length<5){
      aviso.className='feedback nok'; aviso.innerHTML='Escreva a sua resposta primeiro. 🙂';
      ta.focus(); return null;
    }
    aviso.className='feedback'; aviso.innerHTML='';
    return promptEscrita(b.instrucaoIA||b.instrucaoTexto||strip(b.instrucao),ta.value,AULA.semana,b.gabarito);
  }
  c.appendChild(acoesIA(gerarPrompt,function(){ feito.marcar(); }));
  c.appendChild(aviso);
  c.appendChild(novo('p','ajuda',(podeCompartilharTexto()?'Toque em <b>Mandar</b> e escolha a '+esc(NOME_IA)+' no menu — ou copie e cole no app. ':'Copie, abra a '+esc(NOME_IA)+', cole e envie. ')+
    'Ela vai corrigir e explicar em português. 💜'));
  c.appendChild(feito.el);
  return c;
};
function strip(html){var d=document.createElement('div');d.innerHTML=html||'';return (d.textContent||'').trim();}

blocos.missao = function(b,bi){
  total++;
  var id=bi+'-tarefa';
  var c=novo('section','card tarefa-ia missao');
  c.innerHTML='<h2>🎯 '+esc(b.titulo||'Missão')+'</h2>'+
    '<div class="cenario">'+(b.cenario||'')+'</div>'+
    '<div class="dica-tarefa"><b>Sua missão:</b><ul>'+
      (b.objetivos||[]).map(function(o){return '<li>'+esc(o)+'</li>';}).join('')+
    '</ul><span class="ajuda">O personagem <b>só entende inglês</b>. Quando você conseguir, a '+esc(NOME_IA)+
    ' volta a falar português para contar como foi. 🏁</span></div>';
  if(b.andaime){
    var det=novo('details','ajudinha');
    det.innerHTML='<summary>💡 Estou travada — me dá um empurrão</summary><div>'+b.andaime+'</div>';
    c.appendChild(det);
  }
  var feito=marcadorFeito(id,'✅ Missão feita','Missão feita');
  c.appendChild(acoesIA(function(){ return promptMissao(b,AULA.semana); }, function(){ feito.marcar(); }));
  c.appendChild(novo('p','ajuda','Mande para a '+esc(NOME_IA)+' e responda <b>falando</b> (microfone do app) ou escrevendo. '+
    'Se travar, ela dá uma dica em português. Ao terminar, volte aqui e marque a missão. 🎮'));
  c.appendChild(feito.el);
  return c;
};

blocos.fala = function(b,bi){
  total++;
  var id=bi+'-tarefa';
  var c=novo('section','card tarefa-ia');
  c.innerHTML='<h2>🎤 '+esc(b.titulo||'Hora de falar')+'</h2><p>'+(b.instrucao||'')+'</p>'+
    (b.foco?'<div class="foco"><b>🔊 Foco de pronúncia:</b> '+b.foco+'</div>':'');
  var lista=novo('div','frases-fala');
  (b.frases||[]).forEach(function(f){
    var texto=typeof f==='string'?f:f.en;
    var pt=typeof f==='string'?'':f.pt;
    var linha=novo('div','f',botaoSom(texto,true)+'<span class="txt"><b>'+esc(texto)+'</b>'+(pt?'<span class="pt">'+esc(pt)+'</span>':'')+'</span>');
    var mic=novo('button','mic','🎤'); mic.setAttribute('aria-label','Testar a pronúncia');
    var saida=novo('div','ouvido');
    mic.onclick=function(){ouvirMicrofone(texto,mic,saida);};
    linha.appendChild(mic);
    var caixa=novo('div');caixa.style.gridColumn='1';caixa.appendChild(linha);caixa.appendChild(saida);
    lista.appendChild(caixa);
  });
  c.appendChild(lista);
  var frasesTxt=(b.frases||[]).map(function(f){return typeof f==='string'?f:f.en;});
  var feito=marcadorFeito(id,'✅ Já pratiquei com a '+esc(NOME_IA),'Prática de fala feita');
  c.appendChild(acoesIA(function(){ return promptFala(b.instrucaoIA||strip(b.instrucao),frasesTxt,AULA.semana); },
                        function(){ feito.marcar(); }));
  c.appendChild(novo('p','ajuda','Na '+esc(NOME_IA)+', responda <b>falando</b> (o microfone do app). Ela conduz a conversa e corrige em português. 🎧'));
  c.appendChild(feito.el);
  return c;
};

/* ---- HISTÓRIA: escuta longa ----
   Primeiro ela OUVE (sem ler), depois lê com o áudio, e a tradução fica
   escondida até ela tocar. É o bloco que constrói compreensão de ouvido —
   a parte que nenhum exercício de gramática constrói. Não vale ponto: a
   compreensão é medida pelo quiz que vem logo depois. */
blocos.historia = function(b){
  var c=novo('section','card historia');
  c.innerHTML='<h2>🎧 '+esc(b.titulo||'Ouça a história')+'</h2>'+
    '<p class="ajuda">1) Ouça <b>sem ler</b>, de olhos fechados, pelo menos duas vezes. '+
    '2) Depois mostre o texto e ouça lendo. 3) Só toque na tradução se precisar.</p>';
  var acoes=novo('div','acoes');
  var btOuvir=novo('button','btn menta','▶ Ouvir a história');
  var btTexto=novo('button','btn secundario','📖 Mostrar o texto');
  acoes.appendChild(btOuvir); acoes.appendChild(btTexto);
  c.appendChild(acoes);

  var corpo=novo('div','leitura oculto');
  var pars=[];
  (b.paragrafos||[]).forEach(function(p){
    var el=novo('p','par','<span class="en">'+esc(p.en)+' '+botaoSom(p.en,true)+'</span>'+
      '<span class="pt escondida" title="toque para ver">'+esc(p.pt)+'</span>');
    el.querySelector('.pt').onclick=function(){ this.classList.toggle('escondida'); };
    corpo.appendChild(el); pars.push(el);
  });
  var btTrad=novo('button','btn secundario pequeno','🌐 Mostrar todas as traduções');
  btTrad.onclick=function(){
    var esc_=corpo.querySelectorAll('.pt');
    var alguma=false;
    for(var i=0;i<esc_.length;i++) if(esc_[i].classList.contains('escondida')) alguma=true;
    for(var j=0;j<esc_.length;j++) esc_[j].classList.toggle('escondida',!alguma);
    btTrad.textContent=alguma?'🌐 Esconder as traduções':'🌐 Mostrar todas as traduções';
  };
  corpo.appendChild(btTrad);
  c.appendChild(corpo);

  var vezes=0, tocando=false;
  var textos=(b.paragrafos||[]).map(function(p){return p.en;});
  function limpar(){ for(var i=0;i<pars.length;i++) pars[i].classList.remove('agora'); }
  btOuvir.onclick=function(){
    if(tocando){ pararFala(); tocando=false; limpar(); btOuvir.textContent='▶ Ouvir a história'; return; }
    tocando=true; btOuvir.textContent='⏹ Parar';
    falarSequencia(textos,function(){
      tocando=false; limpar(); vezes++;
      btOuvir.textContent=vezes<2?'▶ Ouvir de novo ('+vezes+'×)':'▶ Ouvir de novo';
    },function(i){ limpar(); if(pars[i]) pars[i].classList.add('agora'); });
  };
  btTexto.onclick=function(){
    var aberto=!corpo.classList.contains('oculto');
    corpo.classList.toggle('oculto',aberto);
    btTexto.textContent=aberto?'📖 Mostrar o texto':'🙈 Esconder o texto';
  };
  return c;
};

/* ================= MONTAGEM DA PÁGINA ================= */
var AULA={semana:0,dia:0};

function montar(aula){
  AULA=aula;
  carregarEstado();
  document.title='Semana '+aula.semana+' · Dia '+aula.dia+' — '+aula.titulo;

  var topo=novo('header','topo');
  topo.innerHTML=
    '<div class="linha"><a class="voltar" href="../../index.html">← Aulas</a>'+
    '<span style="font-size:13px;opacity:.9">Semana '+aula.semana+' · Dia '+aula.dia+' de 5</span>'+
    '<span><a class="voltar" href="../../revisao.html" title="Revisar palavras">🃏</a> '+
    '<a class="voltar" href="../../gramatica.html" title="Gramática">📘</a></span></div>'+
    '<h1>'+esc(aula.titulo)+'</h1>'+
    (aula.subtitulo?'<div class="sub">'+esc(aula.subtitulo)+'</div>':'')+
    '<div class="velocidade"><span>Áudio:</span>'+
      '<button data-v="0.6">🐢 Lento</button>'+
      '<button data-v="0.85">🙂 Normal</button>'+
      '<button data-v="1">🐇 Rápido</button></div>';
  document.body.appendChild(topo);
  var bts=topo.querySelectorAll('.velocidade button');
  function marcar(){for(var i=0;i<bts.length;i++)bts[i].classList.toggle('ativo',parseFloat(bts[i].dataset.v)===velocidade);}
  for(var i=0;i<bts.length;i++)(function(bt){
    bt.onclick=function(){velocidade=parseFloat(bt.dataset.v);try{localStorage.setItem('ingles.velocidade',velocidade);}catch(e){}marcar();falar('Hello!');};
  })(bts[i]);
  marcar();

  var main=novo('main');
  document.body.appendChild(main);

  if(aula.objetivos&&aula.objetivos.length){
    var obj=novo('section','card objetivos');
    obj.innerHTML='<h2>🎯 O que você vai aprender hoje</h2><ul>'+
      aula.objetivos.map(function(o){return '<li>'+esc(o)+'</li>';}).join('')+'</ul>';
    main.appendChild(obj);
  }

  (aula.blocos||[]).forEach(function(b,bi){
    var fn=blocos[b.tipo];
    if(!fn){console.warn('Bloco desconhecido:',b.tipo);return;}
    main.appendChild(fn(b,bi));
  });

  main.appendChild(novo('section','card final')).id='fim';
  document.getElementById('fim').style.display='none';
  var fimEl=document.getElementById('fim');
  fimEl.style.display='';fimEl.innerHTML='<h2>🏁 Termine os exercícios</h2><p>Complete tudo para ver sua nota!</p>';

  if(aula.proximo!==false){
    var nav=novo('div',null,'');
    nav.style.cssText='display:flex;gap:10px;justify-content:space-between;margin-top:6px';
    if(aula.dia>1)nav.innerHTML+='<a class="btn secundario" style="text-decoration:none" href="dia-'+(aula.dia-1)+'.html">← Dia '+(aula.dia-1)+'</a>';
    else nav.innerHTML+='<span></span>';
    if(aula.dia<5)nav.innerHTML+='<a class="btn" style="text-decoration:none" href="dia-'+(aula.dia+1)+'.html">Dia '+(aula.dia+1)+' →</a>';
    else nav.innerHTML+='<a class="btn" style="text-decoration:none" href="../../index.html">Voltar às aulas →</a>';
    main.appendChild(nav);
  }

  var placar=novo('div','placar','<span class="txt">0 / '+total+' ✅</span><span class="barra"><i></i></span>');
  document.body.appendChild(placar);
  placarEl=placar.querySelector('.txt');
  barraEl=placar.querySelector('.barra i');
  if(total===0)placar.style.display='none';

  /* o placar nasce depois dos blocos, então agora refletimos o que foi restaurado */
  atualizarPlacar();
  if(total>0 && respondidas>=total) finalizar();
  else if(respondidas>0){
    var av=novo('section','card nota');
    av.innerHTML='<h2>👋 Bem-vinda de volta!</h2><p>Você já tinha respondido <b>'+respondidas+
      ' de '+total+'</b> exercícios desta aula. O que você fez está marcado — continue de onde parou. 💜</p>';
    var m=document.querySelector('main');
    m.insertBefore(av, m.firstChild.nextSibling);
  }
}

global.Curso={
  montar:montar, falar:falar, falarSequencia:falarSequencia, pararFala:pararFala,
  ouvirMicrofone:ouvirMicrofone, infoAudio:infoAudio,
  hojeLocal:hojeLocal, esc:esc, norm:norm, baralhar:baralhar, quaseIgual:quaseIgual,
  aluna:aluna, definirAluna:definirAluna, temAluna:temAluna,
  exportarTudo:exportarTudo, importarTudo:importarTudo, inspecionarBackup:inspecionarBackup,
  baixarBackup:baixarBackup, nomeDoBackup:nomeDoBackup,
  podeCompartilhar:podeCompartilhar, compartilharBackup:compartilharBackup,
  marcarSemCompartilhar:marcarSemCompartilhar,
  semCompartilharMarcado:semCompartilharMarcado,
  limparSemCompartilhar:limparSemCompartilhar
};
})(window);
