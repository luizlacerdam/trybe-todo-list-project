const LISTA_ORDENADA = document.getElementById('lista-tarefas');
const INPUT = document.getElementById('texto-tarefa');
const BUTTON = document.getElementById('criar-tarefa');
const ITENS = document.getElementsByTagName('li');

function criarTarefa() {
  BUTTON.addEventListener('click', function () {
    let novaLi = document.createElement('li');
    novaLi.innerText = INPUT.value;
    LISTA_ORDENADA.appendChild(novaLi);
    INPUT.value = ''
  });
}criarTarefa();

function alterarCorItem() {
  LISTA_ORDENADA.addEventListener('click', function (event) {
    if (event.target.localName === 'li') {
      event.target.classList.add('item-selected');
    } 
  });
}
alterarCorItem();