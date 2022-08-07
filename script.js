const LISTA_ORDENADA = document.getElementById('lista-tarefas');
const INPUT = document.getElementById('texto-tarefa');
const BUTTON = document.getElementById('criar-tarefa');
const ITENS = document.getElementsByTagName('li');
const BTN_CLEAR_ALL = document.getElementById('apaga-tudo');
const BTN_CLEAR_DONE = document.getElementById('remover-finalizados');
const BTN_SALVAR = document.getElementById('salvar-tarefas');
const BTN_MOVER_CIMA = document.getElementById('mover-cima');
const BTN_MOVER_BAIXO = document.getElementById('mover-baixo');


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

function moverCima() {
  //mover para cima
  BTN_MOVER_CIMA.addEventListener('click', function () {
    //tem itens para ser movidos?
    if (LISTA_ORDENADA.children.length > 0) {
      for (let n = 0; n < LISTA_ORDENADA.children.length; n += 1) {
        //tem algum elemento com a classe selected?
        if (LISTA_ORDENADA.children[n].classList.contains('item-selected')) {
          //so executa o algoritimo se o primeiro não for o que está selecionado
          if (!LISTA_ORDENADA.firstElementChild.classList.contains('item-selected')) {
            let positionSelected;
            //encontrar item selecionado
            for (let i = 0; i < ITENS.length; i += 1) {
              if (ITENS[i].classList.contains('item-selected')) {
                positionSelected = i;
              }
            }
            //armazena item anterior
            let itemAnterior = {
              class: ITENS[positionSelected - 1].className,
              text: ITENS[positionSelected - 1].innerText
            };
            console.log(itemAnterior);
            //clonar item selecionado ao item anterior
            ITENS[positionSelected - 1].className = ITENS[positionSelected].className
            ITENS[positionSelected - 1].innerText = ITENS[positionSelected].innerText
            //transforma item anterior no item selecionado
            ITENS[positionSelected].className = itemAnterior.class;
            ITENS[positionSelected].innerText = itemAnterior.text;
          }
        }
      }
    }


  });
}
moverCima();

function moverBaixo() {
  //mover para baixo
  BTN_MOVER_BAIXO.addEventListener('click', function () {
    //tem itens para ser movidos?
    if (LISTA_ORDENADA.children.length > 0) {
      //invertido?
      for (let n = ITENS.length - 1; n >= 0; n -= 1) {
      //tem algum elemento com a classe selected?
        if (ITENS[n].classList.contains('item-selected')) {
          //so executa o algorimo se o ultimo elemento não for o selecionado
          if (!LISTA_ORDENADA.lastElementChild.classList.contains('item-selected')) {
            let positionSelected;
            //encontrar item selecionado
            for (let i = 0; i < ITENS.length; i += 1) {
              if (ITENS[i].classList.contains('item-selected')) {
                positionSelected = i;
              }
            }
            //armazena item posterior
            let itemPosterior = {
              class: ITENS[positionSelected + 1].className,
              text: ITENS[positionSelected + 1].innerText
            };
            //clonar item selecionado ao item posterior
            ITENS[positionSelected + 1].innerText = ITENS[positionSelected].innerText
            ITENS[positionSelected + 1].className = ITENS[positionSelected].className
            //transforma item posterior no item selecionado
            ITENS[positionSelected].className = itemPosterior.class;
            ITENS[positionSelected].innerText = itemPosterior.text;
          }
        }
      }
    }
  });
}
moverBaixo();