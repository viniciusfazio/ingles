/* ============================================================
   OS 5 MÓDULOS DO CURSO (o caminho até a fluência).
   Detalhes em PLANO-GERAL.md, na pasta de trabalho.
   Ao começar um módulo novo, mude o "atual" para ele.
   ============================================================ */
var MODULOS = [
 {n:1, titulo:"Primeiros passos",        idade:"11 anos", nivel:"do zero ao A2",
  resumo:"Cumprimentos, família, casa, comida, rotina, passado e futuro — e toda a gramática essencial.", atual:true},
 {n:2, titulo:"Conversando de verdade",  idade:"12 anos", nivel:"A2 → B1",
  resumo:"De frases soltas a conversa contínua: contar histórias, dar motivos, phrasal verbs."},
 {n:3, titulo:"Opinião e argumento",     idade:"13 anos", nivel:"B1 → limiar do B2",
  resumo:"Para de traduzir na cabeça: discordar, supor, justificar. Material real, sem adaptação."},
 {n:4, titulo:"Precisão e naturalidade", idade:"14 anos", nivel:"B2",
  resumo:"O tom certo em cada situação: formal, casual, irônico. Séries sem legenda."},
 {n:5, titulo:"Autonomia",               idade:"15–16 anos", nivel:"B2+ → C1",
  resumo:"O inglês vira ferramenta: romance inteiro, humor, sotaques, apresentação em público."}
];

/* ============================================================
   MÓDULO 1 — 40 semanas (8 a 10 meses, de segunda a sexta)
   Ao gerar uma semana nova, mude "pronta" para true e preencha
   "dias" com os títulos dos 5 dias. NADA MAIS muda aqui.
   "versao" (1 se não houver) sobe quando uma semana é REGERADA — quem
   faz isso é o ./limpar.sh, nunca a IA. O celular compara e apaga o
   progresso antigo da semana, avisando no índice.
   ============================================================ */
var SEMANAS = [
/* ---------- BLOCO 1 — Primeiras palavras (A0 → A1) ---------- */
{n:1, bloco:"Bloco 1 — Primeiras palavras", titulo:"Hello! Nice to meet you", tema:"Cumprimentos, alfabeto, números 0–20, verbo TO BE (I / you)", versao:2, pronta:true,
 dias:["Hello! Nice to meet you","A, B, C... one, two, three!","Are you happy?","Where are you from?","Revisão + projeto"]},
{n:2, bloco:"Bloco 1 — Primeiras palavras", titulo:"My family", tema:"Família, this/these, plural, He is / She is, his/her, possessivo com 's", versao:2, pronta:true,
 dias:["My family","One sister, two sisters","He is my brother","Max's family","Revisão + projeto"]},
{n:3, bloco:"Bloco 1 — Primeiras palavras", titulo:"Colors and my school things", tema:"Cores, material escolar, a/an, adjetivos, What's this?", pronta:false},
{n:4, bloco:"Bloco 1 — Primeiras palavras", titulo:"How old are you?", tema:"Números 21–100, ordinais (first, second…), idade, dias da semana, meses, aniversário (on May 5th)", pronta:false},
{n:5, bloco:"Bloco 1 — Primeiras palavras", titulo:"My day", tema:"Rotina, present simple (I/you/we), que horas são, preposições de tempo (at 7, on Monday, in the morning)", pronta:false},
{n:6, bloco:"Bloco 1 — Primeiras palavras", titulo:"She likes, he plays", tema:"Present simple na 3ª pessoa (-s), advérbios de frequência", pronta:false},
{n:7, bloco:"Bloco 1 — Primeiras palavras", titulo:"My house, my room", tema:"Cômodos, móveis, there is / there are, preposições de lugar", pronta:false},
{n:8, bloco:"Bloco 1 — Primeiras palavras", titulo:"Yummy! Food and drinks", tema:"Comidas, contáveis/incontáveis, some/any, I like / I don't like", pronta:false},
{n:9, bloco:"Bloco 1 — Primeiras palavras", titulo:"Animals and nature", tema:"Animais, can / can't (habilidade), plurais irregulares", pronta:false},
{n:10, bloco:"Bloco 1 — Primeiras palavras", titulo:"REVISÃO 1 + Projeto", tema:"Revisão das semanas 1–9 + projeto 'All About Me' (vídeo)", pronta:false, revisao:true},

/* ---------- BLOCO 2 — Falando do dia a dia (A1) ---------- */
{n:11, bloco:"Bloco 2 — O dia a dia", titulo:"What are you wearing?", tema:"Roupas, present continuous (I am wearing), this/that/these/those", pronta:false},
{n:12, bloco:"Bloco 2 — O dia a dia", titulo:"Right now!", tema:"Present continuous x present simple, What are you doing?", pronta:false},
{n:13, bloco:"Bloco 2 — O dia a dia", titulo:"In my city", tema:"Lugares da cidade, como chegar, imperativos, preposições de movimento", pronta:false},
{n:14, bloco:"Bloco 2 — O dia a dia", titulo:"Let's go shopping", tema:"Compras, preços, how much / how many, pedidos educados", pronta:false},
{n:15, bloco:"Bloco 2 — O dia a dia", titulo:"Hobbies and sports", tema:"Hobbies, love/like/hate + -ing, pronomes objeto (me, him, her), sugestões (Let's… / Why don't we…?)", pronta:false},
{n:16, bloco:"Bloco 2 — O dia a dia", titulo:"What's the weather like?", tema:"Clima, estações, roupas por estação, introdução ao going to", pronta:false},
{n:17, bloco:"Bloco 2 — O dia a dia", titulo:"Yesterday", tema:"Passado do verbo TO BE (was / were), expressões de tempo passado", pronta:false},
{n:18, bloco:"Bloco 2 — O dia a dia", titulo:"I played, I watched", tema:"Past simple regular (-ed) e a pronúncia do -ed", pronta:false},
{n:19, bloco:"Bloco 2 — O dia a dia", titulo:"I went, I saw, I ate", tema:"Past simple irregular, contar uma história", pronta:false},
{n:20, bloco:"Bloco 2 — O dia a dia", titulo:"REVISÃO 2 + Projeto", tema:"Revisão das semanas 11–19 + projeto 'My Best Day' (história no passado)", pronta:false, revisao:true},

/* ---------- BLOCO 3 — Contando histórias (A1 → A2) ---------- */
{n:21, bloco:"Bloco 3 — Contando histórias", titulo:"Did you go?", tema:"Passado negativo e perguntas: didn't / Did you...?", pronta:false},
{n:22, bloco:"Bloco 3 — Contando histórias", titulo:"I'm going to...", tema:"Futuro com going to, planos, férias", pronta:false},
{n:23, bloco:"Bloco 3 — Contando histórias", titulo:"I think it will rain", tema:"Futuro com will, previsões, maybe / probably", pronta:false},
{n:24, bloco:"Bloco 3 — Contando histórias", titulo:"Bigger, faster, better", tema:"Comparativos (-er / more ... than)", pronta:false},
{n:25, bloco:"Bloco 3 — Contando histórias", titulo:"The best in the world", tema:"Superlativos (the biggest / the most...), quiz de curiosidades", pronta:false},
{n:26, bloco:"Bloco 3 — Contando histórias", titulo:"I don't feel well", tema:"Corpo, saúde, no médico, should / shouldn't (conselhos)", pronta:false},
{n:27, bloco:"Bloco 3 — Contando histórias", titulo:"Rules", tema:"must / mustn't, have to, can / can't (permissão), regras da escola", pronta:false},
{n:28, bloco:"Bloco 3 — Contando histórias", titulo:"Travel time", tema:"Aeroporto, hotel, transportes, frases de sobrevivência em viagem", pronta:false},
{n:29, bloco:"Bloco 3 — Contando histórias", titulo:"Online", tema:"Tecnologia, celular, internet, phrasal verbs comuns", pronta:false},
{n:30, bloco:"Bloco 3 — Contando histórias", titulo:"REVISÃO 3 + Projeto", tema:"Revisão das semanas 21–29 + projeto 'My Dream Trip'", pronta:false, revisao:true},

/* ---------- BLOCO 4 — Conversando de verdade (A2) ---------- */
{n:31, bloco:"Bloco 4 — Conversando de verdade", titulo:"Have you ever...?", tema:"Present perfect: experiências de vida", pronta:false},
{n:32, bloco:"Bloco 4 — Conversando de verdade", titulo:"I want to… Is this yours?", tema:"want to / would like / need to, possessivos (mine, yours, hers), Whose…?", pronta:false},
{n:33, bloco:"Bloco 4 — Conversando de verdade", titulo:"Movies, books and music", tema:"Opiniões, because, conectivos (and / but / so / because)", pronta:false},
{n:34, bloco:"Bloco 4 — Conversando de verdade", titulo:"At the restaurant", tema:"Pedir comida, inglês educado, Could I...? / I'd like...", pronta:false},
{n:35, bloco:"Bloco 4 — Conversando de verdade", titulo:"Friends and feelings", tema:"Personalidade, descrever pessoas, adjetivos de sentimento", pronta:false},
{n:36, bloco:"Bloco 4 — Conversando de verdade", titulo:"School and dreams", tema:"Matérias, profissões, I want to be..., planos de futuro", pronta:false},
{n:37, bloco:"Bloco 4 — Conversando de verdade", titulo:"Save the planet", tema:"Meio ambiente, animais em risco, leitura mais longa", pronta:false},
{n:38, bloco:"Bloco 4 — Conversando de verdade", titulo:"If...", tema:"Condicional zero e primeiro (If it rains, I will...)", pronta:false},
{n:39, bloco:"Bloco 4 — Conversando de verdade", titulo:"All the tenses", tema:"Revisão geral de todos os tempos verbais + conversação livre", pronta:false},
{n:40, bloco:"Bloco 4 — Conversando de verdade", titulo:"REVISÃO FINAL + Projeto", tema:"Teste final nível A2 + projeto 'My English Vlog'", pronta:false, revisao:true}
];
