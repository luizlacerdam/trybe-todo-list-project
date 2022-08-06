const LISTA_ORDENADA = document.getElementById('lista-tarefas');
const INPUT = document.getElementById('texto-tarefa');
const BUTTON = document.getElementById('criar-tarefa');

function criarTarefa() {
  BUTTON.addEventListener('click', function () {
    let novaLi = document.createElement('li');
    novaLi.innerText = INPUT.value;
    LISTA_ORDENADA.appendChild(novaLi);
    INPUT.value = ''
  });
}criarTarefa();