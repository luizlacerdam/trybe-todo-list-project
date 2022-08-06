const LISTA_ORDENADA = document.getElementById('lista-tarefas');
const INPUT = document.getElementById('texto-tarefa');
const BUTTON = document.getElementById('criar-tarefa');
const ITENS = document.getElementsByTagName('li');
const BTN_CLEAR = document.getElementById('apaga-tudo');

function criarTarefa() {
  BUTTON.addEventListener('click', function () {
    let novaLi = document.createElement('li');
    novaLi.innerText = INPUT.value;
    LISTA_ORDENADA.appendChild(novaLi);
    INPUT.value = ''
  });
} criarTarefa();

function alterarCorItem() {
  LISTA_ORDENADA.addEventListener('click', function (event) {
    if (event.target.localName === 'li') {
      for (let i = 0; i < ITENS.length; i += 1) {
        if (ITENS[i].classList.contains('item-selected')) {
          ITENS[i].classList.remove('item-selected');
        }
      }
      event.target.classList.add('item-selected');
    }
  });
}
alterarCorItem();

function completed() {
  LISTA_ORDENADA.addEventListener('dblclick', function (event) {
    if (event.target.localName === 'li' && !event.target.classList.contains('completed')) {
      event.target.classList.add('completed');
    } else {
      event.target.classList.remove('completed');
    }

  });
}
completed();

function clear() {
  BTN_CLEAR.addEventListener('click', function () {
    while (LISTA_ORDENADA.firstChild) {
      LISTA_ORDENADA.removeChild(LISTA_ORDENADA.firstChild)
    }
  });
}
clear();