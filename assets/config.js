/* ============================================================
   CONFIGURAÇÃO DO CURSO

   O NOME e a IDADE da aluna NÃO ficam aqui: são perguntados na primeira
   vez que ela abre o curso e guardados no celular dela. Assim nada
   pessoal vai para o repositório nem para o servidor, e para trocar não
   precisa publicar de novo.

   Para mudar depois (aniversário, apelido): na tela inicial, toque no ✏️
   ao lado do "Bem-vinda".
   ============================================================ */
var CONFIG = {
  // Link aberto pelo botão "Abrir a IA" nas tarefas de escrita e fala.
  // Pode trocar por outro assistente (ex.: "https://claude.ai" ou "https://chatgpt.com").
  linkIA: "https://gemini.google.com/app",
  nomeIA: "Gemini",

  // Reserva: nome e idade são perguntados na tela de boas-vindas e ficam
  // no celular dela. Estes valores só entram em cena se ela abrir uma aula
  // direto pelo link, sem ter passado pelo índice.
  // A idade aqui também é a REFERÊNCIA DE PROJETO do curso: é o que orienta
  // a IA a escolher vocabulário e assuntos ao gerar as semanas.
  nomeAluna: "",
  idade: 11
};
