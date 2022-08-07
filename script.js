const LISTA_ORDENADA = document.getElementById('lista-tarefas');
const INPUT = document.getElementById('texto-tarefa');
const BUTTON = document.getElementById('criar-tarefa');
const ITENS = document.getElementsByTagName('li');
const BTN_CLEAR_ALL = document.getElementById('apaga-tudo');
const BTN_CLEAR_DONE = document.getElementById('remover-finalizados');
const BTN_SALVAR = document.getElementById('salvar-tarefas');

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

function clearAll() {
  BTN_CLEAR_ALL.addEventListener('click', function () {
    while (LISTA_ORDENADA.firstChild) {
      LISTA_ORDENADA.removeChild(LISTA_ORDENADA.firstChild)
    }
  });
}
clearAll();

function clearDone() {
  BTN_CLEAR_DONE.addEventListener('click', function () {
    for (let i = ITENS.length - 1; i >= 0; i -= 1) {
      if (ITENS[i].classList.contains('completed')) {
        LISTA_ORDENADA.removeChild(ITENS[i]);
      }
    }
  });
}
clearDone();

function salvarTarefas() {
  BTN_SALVAR.addEventListener('click', function () {
    localStorage.clear();
    for (let i = 0; i < ITENS.length; i += 1) {
      let novoObj = {
        item: i,
        classes: ITENS[i].className,
        text: ITENS[i].innerText
      }
      localStorage.setItem(i, JSON.stringify(novoObj));
    }
  });
}
salvarTarefas();

window.onload = function () {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i += 1) {
      let novaLi = document.createElement('li');
      let myObj = JSON.parse(localStorage.getItem(i))
      novaLi.innerText = myObj.text;
      novaLi.className = myObj.classes;
      LISTA_ORDENADA.appendChild(novaLi);
    }
  }  
}


