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
 ]}

];
