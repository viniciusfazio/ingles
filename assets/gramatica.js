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
 ]},

{semana:3, dia:2, modulo:1,
 titulo:"a / an — um e uma",
 resumo:"an só antes de som de vogal",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>a pen</code></td><td>uma caneta</td></tr>"+
 "<tr><td><code>a book</code></td><td>um livro</td></tr>"+
 "<tr><td><code>an eraser</code></td><td>uma borracha</td></tr>"+
 "<tr><td><code>an orange crayon</code></td><td>um giz de cera laranja</td></tr>"+
 "</table>"+
 "<p>Um e uma são a mesma palavra em inglês: <code>a</code>. Vira <code>an</code> quando a palavra seguinte começa com <b>som de vogal</b> (a, e, i, o, u), porque a boca não emenda.</p>"+
 "<p>Olhe para a palavra que vem <b>logo depois</b>: <code>an eraser</code>, mas <code>a blue eraser</code>.</p>"+
 "<p>No plural não existe <code>a</code> nem <code>an</code>: <code>two pens</code>, <code>ten crayons</code>.</p>",
 exemplos:[
  {en:"It's a pen.", pt:"É uma caneta."},
  {en:"It's an eraser.", pt:"É uma borracha."},
  {en:"I have a blue notebook.", pt:"Eu tenho um caderno azul."},
  {en:"She has an orange pencil case.", pt:"Ela tem um estojo laranja."},
  {en:"These are two green books.", pt:"Estes são dois livros verdes."}
 ]},

{semana:3, dia:3, modulo:1,
 titulo:"A cor vem antes — a red pen",
 resumo:"O adjetivo cola na frente da coisa e nunca tem -s",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>a red pen</code></td><td>uma caneta vermelha</td></tr>"+
 "<tr><td><code>a big backpack</code></td><td>uma mochila grande</td></tr>"+
 "<tr><td><code>my old notebook</code></td><td>o meu caderno velho</td></tr>"+
 "<tr><td><code>two green crayons</code></td><td>dois gizes de cera verdes</td></tr>"+
 "</table>"+
 "<p>Em português a cor vem depois da coisa; em inglês vem <b>antes</b>. Leia de trás para frente que encaixa: <code>a red pen</code> → <i>caneta</i>… <i>vermelha</i>.</p>"+
 "<p>O adjetivo <b>nunca</b> ganha -s no plural: <code>two green crayons</code> (e não <i>greens</i>). Quem ganha o -s é só a coisa.</p>"+
 "<p>Depois do verbo <code>is</code> ele fica sozinho: <code>My pen is red.</code> — dois jeitos de dizer o mesmo: <code>It's a red pen.</code> ou <code>The pen is red.</code></p>",
 exemplos:[
  {en:"It's a red pen.", pt:"É uma caneta vermelha."},
  {en:"My pen is red.", pt:"A minha caneta é vermelha."},
  {en:"This is a big blue backpack.", pt:"Esta é uma mochila azul grande."},
  {en:"These are two green crayons.", pt:"Estes são dois gizes de cera verdes."},
  {en:"My sister has an old notebook.", pt:"A minha irmã tem um caderno velho."}
 ]},

{semana:4, dia:2, modulo:1,
 titulo:"Idade com am / is — I'm eleven",
 resumo:"Em inglês a pessoa É a idade: nunca use have",
 html:"<table>"+
 "<tr><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td><code>I'm eleven.</code></td><td>Eu tenho onze anos.</td></tr>"+
 "<tr><td><code>I'm eleven years old.</code></td><td>Eu tenho onze anos.</td></tr>"+
 "<tr><td><code>She's twenty-one.</code></td><td>Ela tem vinte e um anos.</td></tr>"+
 "<tr><td><code>How old is he?</code></td><td>Quantos anos ele tem?</td></tr>"+
 "</table>"+
 "<p>O <code>years old</code> no fim é opcional. O erro clássico é traduzir o <i>tenho</i>: <i>I have eleven</i> está errado.</p>",
 exemplos:[
  {en:"How old are you?", pt:"Quantos anos você tem?"},
  {en:"I'm eleven years old.", pt:"Eu tenho onze anos."},
  {en:"My grandpa is eighty.", pt:"O meu avô tem oitenta anos."},
  {en:"How old is your sister?", pt:"Quantos anos a sua irmã tem?"}
 ]},

{semana:4, dia:3, modulo:1,
 titulo:"Números de ordem e datas — on May 5th",
 resumo:"first, second, third, depois -th; on com dia e data, in só com o mês",
 html:"<table>"+
 "<tr><th>Escreve</th><th>Fala</th><th>Português</th></tr>"+
 "<tr><td><code>1st</code></td><td><code>first</code></td><td>primeiro</td></tr>"+
 "<tr><td><code>2nd</code></td><td><code>second</code></td><td>segundo</td></tr>"+
 "<tr><td><code>3rd</code></td><td><code>third</code></td><td>terceiro</td></tr>"+
 "<tr><td><code>4th</code> … <code>10th</code></td><td><code>fourth</code> … <code>tenth</code></td><td>quarto … décimo</td></tr>"+
 "<tr><td><code>21st</code></td><td><code>twenty-first</code></td><td>vigésimo primeiro</td></tr>"+
 "</table>"+
 "<p>Os diferentes: <code>fifth</code>, <code>eighth</code>, <code>ninth</code>, <code>twelfth</code>, <code>twentieth</code>.</p>"+
 "<table>"+
 "<tr><th>Quando</th><th>Preposição</th><th>Exemplo</th></tr>"+
 "<tr><td>dia da semana</td><td><code>on</code></td><td><code>on Monday</code></td></tr>"+
 "<tr><td>data completa</td><td><code>on</code></td><td><code>on May 5th</code> (fala: May fifth)</td></tr>"+
 "<tr><td>só o mês</td><td><code>in</code></td><td><code>in May</code></td></tr>"+
 "</table>"+
 "<p>Na data em inglês americano o <b>mês vem primeiro</b>, e o dia é dito como número de ordem.</p>",
 exemplos:[
  {en:"When is your birthday?", pt:"Quando é o seu aniversário?"},
  {en:"My birthday is on May fifth.", pt:"O meu aniversário é no dia 5 de maio."},
  {en:"The party is on Saturday.", pt:"A festa é no sábado."},
  {en:"Her birthday is in March.", pt:"O aniversário dela é em março."},
  {en:"January is the first month.", pt:"Janeiro é o primeiro mês."}
 ]},

{semana:5, dia:2, modulo:1,
 titulo:"As horas — What time is it?",
 resumo:"It's seven o'clock / seven thirty; at + hora; in the morning, mas at night",
 html:"<table>"+
 "<tr><th>Relógio</th><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td>7:00</td><td><code>It's seven o'clock.</code></td><td>São sete horas.</td></tr>"+
 "<tr><td>7:30</td><td><code>It's seven thirty.</code></td><td>São sete e meia.</td></tr>"+
 "<tr><td>12:00</td><td><code>It's noon.</code></td><td>É meio-dia.</td></tr>"+
 "<tr><td>0:00</td><td><code>It's midnight.</code></td><td>É meia-noite.</td></tr></table>"+
 "<p><code>o'clock</code> só na hora cheia. <b>A que horas</b>: <code>at</code> + hora (<code>at seven</code> = às sete).</p>"+
 "<table><tr><th>Parte do dia</th><th>Inglês</th></tr>"+
 "<tr><td>de manhã</td><td><code>in the morning</code></td></tr>"+
 "<tr><td>de tarde</td><td><code>in the afternoon</code></td></tr>"+
 "<tr><td>à noitinha</td><td><code>in the evening</code></td></tr>"+
 "<tr><td>de noite</td><td><code>at night</code> (a exceção)</td></tr></table>",
 exemplos:[
  {en:"What time is it? It's eight o'clock.", pt:"Que horas são? São oito horas."},
  {en:"It's nine thirty.", pt:"São nove e meia."},
  {en:"I have lunch at noon.", pt:"Eu almoço ao meio-dia."},
  {en:"I play in the afternoon.", pt:"Eu brinco de tarde."},
  {en:"I read at night.", pt:"Eu leio de noite."}
 ]},

{semana:5, dia:3, modulo:1,
 titulo:"Present simple com I / you / we — I get up, I don't, Do you?",
 resumo:"A ação não muda com I, you e we; don't para negar; Do no começo para perguntar",
 html:"<table>"+
 "<tr><th></th><th>Inglês</th><th>Português</th></tr>"+
 "<tr><td>afirma</td><td><code>I / You / We walk to school.</code></td><td>Eu vou / Você vai / Nós vamos a pé para a escola.</td></tr>"+
 "<tr><td>nega</td><td><code>I / You / We don't walk.</code></td><td>Eu não vou / Você não vai / Nós não vamos a pé.</td></tr>"+
 "<tr><td>pergunta</td><td><code>Do you walk to school?</code></td><td>Você vai a pé para a escola?</td></tr>"+
 "<tr><td>responde</td><td><code>Yes, I do. / No, I don't.</code></td><td>Sim, vou. / Não, não vou.</td></tr>"+
 "<tr><td>que horas</td><td><code>What time do you get up?</code></td><td>A que horas você se levanta?</td></tr></table>"+
 "<p><code>don't</code> = <code>do not</code>. Com ação, pergunta com <code>Do</code>, nunca com <i>Are you walk…?</i> (Com he / she a ação muda: isso vem na semana 6.)</p>",
 exemplos:[
  {en:"We have breakfast at seven.", pt:"Nós tomamos café da manhã às sete."},
  {en:"I don't take the bus.", pt:"Eu não pego o ônibus."},
  {en:"Do you drink milk? Yes, I do.", pt:"Você bebe leite? Sim, bebo."},
  {en:"Do you watch TV in the morning? No, I don't.", pt:"Você vê TV de manhã? Não, não vejo."},
  {en:"What time do you go to bed?", pt:"A que horas você vai para a cama?"}
 ]},

{semana:5, dia:4, modulo:1,
 titulo:"at / on / in de tempo — o mapa completo",
 resumo:"at para a hora, on para o dia, in para os pedaços grandes",
 html:"<table>"+
 "<tr><th></th><th>Quando</th><th>Exemplos</th></tr>"+
 "<tr><td><code>at</code></td><td>hora certinha</td><td><code>at four</code>, <code>at seven thirty</code>, <code>at noon</code>, <code>at night</code></td></tr>"+
 "<tr><td><code>on</code></td><td>um dia</td><td><code>on Monday</code>, <code>on May 5th</code>, <code>on the weekend</code></td></tr>"+
 "<tr><td><code>in</code></td><td>pedaço grande</td><td><code>in the morning</code>, <code>in the afternoon</code>, <code>in May</code></td></tr></table>"+
 "<p>Juntando: <code>I swim on Tuesday at four.</code> Atalho americano: <code>on Saturday morning</code> (sem <i>in the</i>).</p>",
 exemplos:[
  {en:"I have a piano lesson on Monday at four.", pt:"Eu tenho aula de piano na segunda às quatro."},
  {en:"We play soccer on the weekend.", pt:"Nós jogamos futebol no fim de semana."},
  {en:"I swim in the afternoon.", pt:"Eu nado de tarde."},
  {en:"I'm free on Saturday morning.", pt:"Eu estou livre no sábado de manhã."}
 ]}


];
