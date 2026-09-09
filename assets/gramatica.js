/* ============================================================
   REFERÊNCIA DE GRAMÁTICA — cresce a cada semana gerada.

   Uma entrada por REGRA ensinada (não uma por aula). É um RESUMO
   consultável, não uma cópia da aula: tabela enxuta + exemplos.
   A aula ensina; isto aqui relembra.

   Campos:
     semana, dia  -> de onde veio (vira link para a aula)
     modulo       -> 1 a 5
     titulo       -> o nome da regra
     resumo       -> uma linha, aparece com o item fechado
     html         -> a explicação curta (use <table>, <code>, <p>)
     exemplos     -> 3 a 6 frases com tradução (ganham áudio 🔊)
   ============================================================ */
var GRAMATICA = [

{semana:1, dia:1, modulo:1,
 titulo:"Dizer o seu nome",
 resumo:"My name is… ou I'm… — as duas estão certas",
 html:"<table><tr><th>Inglês</th><th>Português</th></tr>"+
      "<tr><td><code>My name is Ana.</code></td><td>Meu nome é Ana.</td></tr>"+
      "<tr><td><code>I'm Ana.</code></td><td>Eu sou a Ana.</td></tr></table>"+
      "<p><code>I'm</code> é a forma curta de <code>I am</code>. No inglês falado, quase sempre se usa a curta.</p>",
 exemplos:[
  {en:"What's your name?", pt:"Qual é o seu nome?"},
  {en:"My name is Sofia.", pt:"Meu nome é Sofia."},
  {en:"I'm Sofia.", pt:"Eu sou a Sofia."},
  {en:"Nice to meet you.", pt:"Prazer em conhecer você."}
 ]},

{semana:1, dia:3, modulo:1,
 titulo:"O verbo TO BE (ser / estar)",
 resumo:"am / is / are — uma palavra só para SER e ESTAR",
 html:"<table>"+
      "<tr><th>Inglês</th><th>Curta</th><th>Português</th></tr>"+
      "<tr><td>I <b>am</b></td><td><code>I'm</code></td><td>eu sou / eu estou</td></tr>"+
      "<tr><td>You <b>are</b></td><td><code>You're</code></td><td>você é / está</td></tr>"+
      "<tr><td>He / She / It <b>is</b></td><td><code>He's</code></td><td>ele(a) é / está</td></tr>"+
      "<tr><td>We <b>are</b></td><td><code>We're</code></td><td>nós somos / estamos</td></tr>"+
      "<tr><td>They <b>are</b></td><td><code>They're</code></td><td>eles(as) são / estão</td></tr>"+
      "</table>"+
      "<p>🎵 O truque: <b>I am, he is, she is, it is</b> — o resto é <b>are</b>!</p>"+
      "<p>Para negar, é só pôr <code>not</code> depois: <code>I am not tired.</code></p>"+
      "<p>⚠️ A idade usa TO BE, nunca <i>have</i>: <code>I am eleven years old.</code></p>",
 exemplos:[
  {en:"I'm Brazilian.", pt:"Eu sou brasileira."},
  {en:"She's my sister.", pt:"Ela é minha irmã."},
  {en:"It's a big dog.", pt:"É um cachorro grande."},
  {en:"We're happy today.", pt:"Nós estamos felizes hoje."},
  {en:"I'm not tired.", pt:"Eu não estou cansada."}
 ]},

{semana:1, dia:4, modulo:1,
 titulo:"Fazer perguntas com TO BE",
 resumo:"Inverte o verbo: You are → Are you…?",
 html:"<table><tr><th>Frase</th><th>Pergunta</th></tr>"+
      "<tr><td>You <b>are</b> Brazilian.</td><td><b>Are</b> you Brazilian?</td></tr>"+
      "<tr><td>She <b>is</b> happy.</td><td><b>Is</b> she happy?</td></tr></table>"+
      "<p>Respostas curtas: <code>Yes, I am.</code> / <code>No, I'm not.</code> · "+
      "<code>Yes, she is.</code> / <code>No, she isn't.</code></p>"+
      "<p>As palavras de pergunta vêm antes de tudo: <code>What</code> (o quê) · "+
      "<code>Where</code> (onde) · <code>Who</code> (quem) · <code>How old</code> (quantos anos).</p>",
 exemplos:[
  {en:"Where are you from?", pt:"De onde você é?"},
  {en:"How old are you?", pt:"Quantos anos você tem?"},
  {en:"Are you American?", pt:"Você é americana?"},
  {en:"No, I'm not. I'm Brazilian.", pt:"Não, não sou. Eu sou brasileira."},
  {en:"Who is she?", pt:"Quem é ela?"}
 ]},

{semana:2, dia:2, modulo:1,
 titulo:"O plural: mais de um",
 resumo:"Quase sempre é só pôr -s no fim (e quatro teimosas)",
 html:"<table><tr><th>Um</th><th>Mais de um</th></tr>"+
      "<tr><td><code>sister</code></td><td><code>sisters</code></td></tr>"+
      "<tr><td><code>friend</code></td><td><code>friends</code></td></tr>"+
      "<tr><td><code>box</code> (termina em s, x, ch, sh)</td><td><code>boxes</code></td></tr>"+
      "</table>"+
      "<p>As teimosas, que mudam por dentro e não ganham -s:</p>"+
      "<table><tr><th>Um</th><th>Mais de um</th></tr>"+
      "<tr><td><code>man</code> (homem)</td><td><code>men</code></td></tr>"+
      "<tr><td><code>woman</code> (mulher)</td><td><code>women</code></td></tr>"+
      "<tr><td><code>child</code> (criança)</td><td><code>children</code></td></tr>"+
      "<tr><td><code>person</code> (pessoa)</td><td><code>people</code></td></tr></table>"+
      "<p>🔊 O -s tem três sons: /s/ em <i>cats</i>, /z/ em <i>brothers</i>, /iz/ em <i>boxes</i>.</p>",
 exemplos:[
  {en:"one sister, two sisters", pt:"uma irmã, duas irmãs"},
  {en:"one box, two boxes", pt:"uma caixa, duas caixas"},
  {en:"one man, two men", pt:"um homem, dois homens"},
  {en:"one child, five children", pt:"uma criança, cinco crianças"},
  {en:"My cousins are here.", pt:"Os meus primos estão aqui."}
 ]},

{semana:2, dia:2, modulo:1,
 titulo:"This is / These are",
 resumo:"Um: This is. Mais de um: These are (e a palavra ganha -s)",
 html:"<table><tr><th>Um</th><th>Mais de um</th></tr>"+
      "<tr><td><code>This is my sister.</code></td><td><code>These are my sisters.</code></td></tr>"+
      "<tr><td><code>This is my cat.</code></td><td><code>These are my cats.</code></td></tr></table>"+
      "<p>👉 Mudam <b>três</b> pedaços de uma vez: <code>This</code> → <code>These</code>, "+
      "<code>is</code> → <code>are</code>, e a palavra ganha <code>-s</code>.</p>",
 exemplos:[
  {en:"This is my mother.", pt:"Esta é a minha mãe."},
  {en:"These are my grandparents.", pt:"Estes são os meus avós."},
  {en:"These are my two brothers.", pt:"Estes são os meus dois irmãos."},
  {en:"This is my cousin.", pt:"Este é o meu primo."}
 ]},

{semana:2, dia:3, modulo:1,
 titulo:"He / She e his / her",
 resumo:"ele e ela · dele e dela — e em inglês vêm ANTES da palavra",
 html:"<table><tr><th>Inglês</th><th>Português</th></tr>"+
      "<tr><td><code>He is my brother.</code></td><td>Ele é o meu irmão.</td></tr>"+
      "<tr><td><code>She is my mother.</code></td><td>Ela é a minha mãe.</td></tr>"+
      "<tr><td><code>his name</code></td><td>o nome dele</td></tr>"+
      "<tr><td><code>her name</code></td><td>o nome dela</td></tr></table>"+
      "<p>⚠️ Quem manda é o <b>dono</b>, não a coisa: <code>her father</code> é o pai <b>dela</b>, "+
      "e <code>his mother</code> é a mãe <b>dele</b>.</p>",
 exemplos:[
  {en:"This is my father. His name is Marcos.", pt:"Este é o meu pai. O nome dele é Marcos."},
  {en:"This is my sister. Her name is Bia.", pt:"Esta é a minha irmã. O nome dela é Bia."},
  {en:"She is my aunt. Her son is my cousin.", pt:"Ela é a minha tia. O filho dela é o meu primo."},
  {en:"He is my uncle. His daughter is my cousin.", pt:"Ele é o meu tio. A filha dele é a minha prima."}
 ]},

{semana:2, dia:4, modulo:1,
 titulo:"O possessivo com 's",
 resumo:"Anna's brother = o irmão da Anna (dono primeiro)",
 html:"<table><tr><th>Português</th><th>Inglês</th></tr>"+
      "<tr><td>o irmão da Anna</td><td><code>Anna's brother</code></td></tr>"+
      "<tr><td>a mãe da Emma</td><td><code>Emma's mother</code></td></tr>"+
      "<tr><td>o nome da minha tia</td><td><code>my aunt's name</code></td></tr></table>"+
      "<p>👉 Leia de trás para a frente: <code>Anna's brother</code> = irmão ... da Anna.</p>"+
      "<p>⚠️ Não confunda com o <code>'s</code> de <code>She's my sister</code>, que é "+
      "<code>is</code> encurtado. Depois do possessivo vem sempre uma coisa ou uma pessoa.</p>",
 exemplos:[
  {en:"Anna's brother is five.", pt:"O irmão da Anna tem cinco anos."},
  {en:"Emma's mother is very nice.", pt:"A mãe da Emma é muito legal."},
  {en:"My sister's cat is small.", pt:"O gato da minha irmã é pequeno."},
  {en:"My grandmother's name is Lia.", pt:"O nome da minha avó é Lia."}
 ]}

];
