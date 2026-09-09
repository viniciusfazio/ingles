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

{semana:1, dia:2, modulo:1,
 titulo:"I am / I'm — falando de você",
 resumo:"Com I, a palavrinha é sempre am (e I'm é a forma curta)",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>I am</code></td><td>eu sou / eu estou</td></tr>"+
 "<tr><td><code>I'm</code></td><td>a mesma coisa, curtinho</td></tr>"+
 "</table>"+
 "<p>Em inglês, <b>ser</b> e <b>estar</b> são a mesma palavra. <code>I am fine</code> = eu estou bem; <code>I am a student</code> = eu sou aluna.</p>"+
 "<p>O <code>I</code> é sempre maiúsculo, mesmo no meio da frase.</p>",
 exemplos:[
  {en:"I am Anna.", pt:"Eu sou a Anna."},
  {en:"I'm a student.", pt:"Eu sou aluna."},
  {en:"I am from Brazil.", pt:"Eu sou do Brasil."},
  {en:"I'm here!", pt:"Eu estou aqui!"},
  {en:"I'm tired.", pt:"Eu estou cansada."}
 ]},

{semana:1, dia:3, modulo:1,
 titulo:"Are you...? — perguntar e responder",
 resumo:"Para perguntar, o are pula para a frente da frase",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>You are my friend.</code></td><td>Você é minha amiga.</td></tr>"+
 "<tr><td><code>Are you my friend?</code></td><td>Você é minha amiga?</td></tr>"+
 "<tr><td><code>Yes, I am.</code></td><td>Sim, sou / estou.</td></tr>"+
 "<tr><td><code>No, I'm not.</code></td><td>Não, não sou / não estou.</td></tr>"+
 "</table>"+
 "<p>Não existe nada parecido com \"você faz\": é só trocar <code>You are</code> por <code>Are you</code>.</p>"+
 "<p>A resposta volta para o <code>I am</code> — e responder só <i>yes</i> ou <i>no</i> soa seco.</p>",
 exemplos:[
  {en:"Are you happy?", pt:"Você está feliz?"},
  {en:"Yes, I am.", pt:"Sim, estou."},
  {en:"Are you a student?", pt:"Você é aluna?"},
  {en:"No, I'm not. I am a teacher.", pt:"Não, não sou. Eu sou professora."},
  {en:"Are you tired?", pt:"Você está cansada?"}
 ]},

{semana:1, dia:4, modulo:1,
 titulo:"Where are you from? — de onde você é",
 resumo:"A palavra de pergunta (where = onde) entra na frente de are you",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>Are you from Brazil?</code></td><td>Você é do Brasil?</td></tr>"+
 "<tr><td><code>Where are you from?</code></td><td>De onde você é?</td></tr>"+
 "<tr><td><code>I'm from Brazil.</code></td><td>Eu sou do Brasil.</td></tr>"+
 "</table>"+
 "<p>É a pergunta <code>Are you...?</code> com um <code>where</code> (onde) na frente. O <code>from</code> (de) fica no fim da pergunta e volta na resposta: <code>I'm from...</code></p>",
 exemplos:[
  {en:"Where are you from?", pt:"De onde você é?"},
  {en:"I'm from Brazil.", pt:"Eu sou do Brasil."},
  {en:"Are you from New York?", pt:"Você é de Nova York?"},
  {en:"No, I'm not. I am from Miami.", pt:"Não, não sou. Eu sou de Miami."}
 ]},

{semana:2, dia:2, modulo:1,
 titulo:"Plural: o -s no fim",
 resumo:"Mais de um? Cola um -s (e -es depois de s, x, ch, sh)",
 html:"<table>"+
 "<tr><th>Um</th><th>Mais de um</th></tr>"+
 "<tr><td><code>one sister</code></td><td><code>two sisters</code></td></tr>"+
 "<tr><td><code>one dog</code></td><td><code>two dogs</code></td></tr>"+
 "<tr><td><code>one box</code></td><td><code>two boxes</code></td></tr>"+
 "<tr><td><code>one child</code></td><td><code>two children</code></td></tr>"+
 "</table>"+
 "<p>Regra geral: <b>+s</b>. Se a palavra termina em <b>s, x, ch ou sh</b>, entra <b>-es</b> (<code>boxes</code>, <code>classes</code>), porque o -s sozinho não caberia na boca.</p>"+
 "<p>Duas teimosas: <code>child</code> vira <code>children</code>, e <code>people</code> já quer dizer <i>pessoas</i>.</p>"+
 "<p>O som do -s muda: <i>cats</i> tem s soprado, <i>dogs</i> e <i>brothers</i> têm z zumbindo, <i>boxes</i> ganha uma sílaba inteira.</p>",
 exemplos:[
  {en:"I have two sisters.", pt:"Eu tenho duas irmãs."},
  {en:"My cousins are twins.", pt:"Os meus primos são gêmeos."},
  {en:"Three boxes and two photos.", pt:"Três caixas e duas fotos."},
  {en:"One child, two children.", pt:"Uma criança, duas crianças."}
 ]},

{semana:2, dia:2, modulo:1,
 titulo:"This / These — este e estes",
 resumo:"Uma coisa é this; várias são these (e o is vira are)",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>This is my sister.</code></td><td>Esta é a minha irmã. (uma)</td></tr>"+
 "<tr><td><code>These are my sisters.</code></td><td>Estas são as minhas irmãs. (várias)</td></tr>"+
 "</table>"+
 "<p>Com <code>these</code> tudo vira plural junto: o <code>is</code> vira <code>are</code> e a palavra ganha <b>-s</b>. Nunca <i>These is</i>.</p>",
 exemplos:[
  {en:"This is my cat.", pt:"Este é o meu gato."},
  {en:"These are my cats.", pt:"Estes são os meus gatos."},
  {en:"This is my grandmother.", pt:"Esta é a minha avó."},
  {en:"These are my two cousins.", pt:"Estes são os meus dois primos."}
 ]},

{semana:2, dia:3, modulo:1,
 titulo:"He is / She is — falando de outra pessoa",
 resumo:"Ele e ela pedem sempre is (nunca am, nunca are)",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>He is my brother.</code></td><td>Ele é o meu irmão.</td></tr>"+
 "<tr><td><code>She is my sister.</code></td><td>Ela é a minha irmã.</td></tr>"+
 "<tr><td><code>He's / She's</code></td><td>a mesma coisa, curtinho</td></tr>"+
 "</table>"+
 "<p>Já são três: <code>I am</code>, <code>you are</code>, <code>he is</code> / <code>she is</code>. Para coisas e bichos, o mesmo <code>is</code> com <code>it</code>.</p>",
 exemplos:[
  {en:"He is my father.", pt:"Ele é o meu pai."},
  {en:"She is my grandmother.", pt:"Ela é a minha avó."},
  {en:"She is not here.", pt:"Ela não está aqui."},
  {en:"He is tall and funny.", pt:"Ele é alto e engraçado."}
 ]},

{semana:2, dia:3, modulo:1,
 titulo:"His / Her — dele e dela",
 resumo:"Vem ANTES da coisa, e quem manda é o dono",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>his dog</code></td><td>o cachorro dele</td></tr>"+
 "<tr><td><code>her dog</code></td><td>o cachorro dela</td></tr>"+
 "<tr><td><code>his name</code></td><td>o nome dele</td></tr>"+
 "<tr><td><code>her name</code></td><td>o nome dela</td></tr>"+
 "</table>"+
 "<p>Em português vem depois (<i>o gato <b>dela</b></i>); em inglês vem antes (<code>her cat</code>). Leia de trás para frente que encaixa.</p>"+
 "<p>Olhe sempre para o <b>dono</b>, não para a coisa: tudo do Leo é <code>his</code> (his cat, his dog, his mother), tudo da Emma é <code>her</code>.</p>",
 exemplos:[
  {en:"His name is Tom.", pt:"O nome dele é Tom."},
  {en:"Her name is Mia.", pt:"O nome dela é Mia."},
  {en:"This is her dog.", pt:"Este é o cachorro dela."},
  {en:"His sister is tall.", pt:"A irmã dele é alta."}
 ]},

{semana:2, dia:4, modulo:1,
 titulo:"O 's de posse — Anna's brother",
 resumo:"O dono vem na frente, com um 's grudado",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>Anna's brother</code></td><td>o irmão da Anna</td></tr>"+
 "<tr><td><code>Emma's family</code></td><td>a família da Emma</td></tr>"+
 "<tr><td><code>my sister's cat</code></td><td>o gato da minha irmã</td></tr>"+
 "<tr><td><code>my father's mother</code></td><td>a mãe do meu pai</td></tr>"+
 "</table>"+
 "<p>Leia <b>de trás para frente</b>: <code>Anna's brother</code> → <i>irmão</i>… <i>da Anna</i>.</p>"+
 "<p>É o irmão de <code>his</code>/<code>her</code>: usa-se <code>his</code>/<code>her</code> quando já se sabe de quem se fala, e o <code>'s</code> quando você diz o nome do dono.</p>",
 exemplos:[
  {en:"This is Anna's brother.", pt:"Este é o irmão da Anna."},
  {en:"Emma's mother is a teacher.", pt:"A mãe da Emma é professora."},
  {en:"Leo's cousins are twins.", pt:"Os primos do Leo são gêmeos."},
  {en:"Her grandmother's name is Ruth.", pt:"O nome da avó dela é Ruth."}
 ]}

];
