(() => {
  let numArray = [];
  let count = 0;
  let timer;
  const min = 0,
        timeLineStartForm = gsap.timeline(),
        timeLineStartGame = gsap.timeline();


  function createList() {
    const list = document.createElement('ul');
    list.classList.add('list-reset');
    return list;
  }

  function createForm() {
    let timeout;
    const MILLISECONDS = 300;

    const form = document.createElement('form'),
          inputVertical = document.createElement('input'),
          inputHorizontal = document.createElement('input'),
          button = document.createElement('button');

    inputHorizontal.placeholder = 'Количество карточек по горизонтали(кратно 2, но не более 10)';
    inputVertical.placeholder = 'Количество карточек по вертикали(кратно 2, но не более 10)';

    button.disabled = true;
    button.textContent = 'Начать игру';
    button.classList.add('btn-reset', 'btn');

    inputVertical.addEventListener('input', changeDisabled);
    inputHorizontal.addEventListener('input', changeDisabled);

    function changeDisabled() {
      if (inputVertical.value != '' && inputHorizontal.value != '') {
        clearTimeout(timeout);
        button.disabled = false;
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => { button.disabled = true; }, MILLISECONDS);
      }
    }

    form.append(inputVertical);
    form.append(inputHorizontal);
    form.append(button);

    return {
      form,
      inputVertical,
      inputHorizontal,
      button
    };
  }

  function createFieldElements(num) {
    const item = document.createElement('li'),
          text = document.createElement('div'),
          image = document.createElement('img'),
          wrap = document.createElement('div');

    item.classList.add('item');
    image.src = 'img/card.png';
    image.classList.add('img');
    text.textContent = num;
    text.classList.add('text');
    wrap.classList.add('card-wrapper')


    wrap.append(image);
    wrap.append(text);
    item.append(wrap);


    item.addEventListener('click', (e) => {
      if (e.target.closest('.card-wrapper') && !e.target.closest('.card-wrapper').classList.contains('is-active') && !e.target.closest('.card-wrapper').classList.contains('.is-opened')) {
        e.target.closest('.card-wrapper').classList.add('is-active');
        count++;
        if (count >= 2) {
          count = 0;
          let actEl = document.querySelectorAll('.card-wrapper.is-active > .text');
          if (actEl[0].textContent !== actEl[1].textContent) {
            setTimeout(() => {
              actEl.forEach((e) => {
                e.closest('.card-wrapper').classList.remove('is-active');
              });
            }, 1000);
          } else {
            setTimeout(() => {
              actEl.forEach((e) => {
                e.closest('.card-wrapper').classList.remove('is-active');
                e.closest('.card-wrapper').classList.add('is-opened');
                checkIsEnd(numArray);
              });
            }, 1000);
          }
        }
      }
    });

    return item;
  }

  function createTimer() {
    const blockTimer = document.createElement('div'),
          titleTimer = document.createElement('h2'),
          wrapTimer = document.createElement('div');

    titleTimer.textContent = 'Таймер';

    wrapTimer.style.display = 'none';
    wrapTimer.classList.add('timer');
    blockTimer.textContent = ' ';

    wrapTimer.append(titleTimer);
    wrapTimer.append(blockTimer);

    return wrapTimer;
  }

  function createRestartButton() {
    const restartBtn = document.createElement('button');

    restartBtn.style.display = 'none';
    restartBtn.classList.add('restart-btn', 'btn');
    restartBtn.textContent = 'Начать заново';

    restartBtn.addEventListener('click', restartGame);

    return restartBtn;
  }

  function shuffle(array) {
    let m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  function fillArray(num) {
    for (let i = 0; i < num / 2; i++) {
      numArray.push(i, i);
    };
  }

  function drawGame(appForm, list, container, items, timer) {
    timeLineStartForm.reverse();
    let img = document.querySelectorAll('.img');
    img.forEach((e) => {
      e.style.width = `${((innerHeight-(15*(appForm.inputHorizontal.value-1)))/appForm.inputHorizontal.value)-30}px`;
      e.style.height = `${((innerHeight-(15*(appForm.inputHorizontal.value-1)))/appForm.inputHorizontal.value)-30}px`;
    })
    setTimeout(() => {
      appForm.form.style.display = 'none';
      container.classList.add('is-playing');
      list.style.gridTemplateColumns = `repeat(${appForm.inputHorizontal.value}, ${((innerHeight-(15*(appForm.inputHorizontal.value-1)))/appForm.inputHorizontal.value)-30}px`;
      list.style.gridTemplateRows = `repeat(${appForm.inputHorizontal.value}, ${((innerHeight-(15*(appForm.inputHorizontal.value-1)))/appForm.inputHorizontal.value)-30}px`;
      timeLineStartGame.from(document.querySelectorAll('.item'), 3, {scale: 0, y: 60, yoyo:true, ease: "power1.inOut" });
    }, 2000);

    startTimer(60)
  }

  function startTimer(sec) {
    setTimeout(() => {
      timer = setInterval(() => {
        if (sec <= -1) {
          clearInterval(timer);
          document.querySelector('.restart-btn').style.display = 'block';
        } else {
          document.querySelector('.timer > div').textContent = sec;
        }
        --sec;
      }, 1000);
    }, 4000);
  }

  function restartGame() {
    document.querySelectorAll('.card-wrapper').forEach((e) => {
      e.classList.remove('is-active');
      e.classList.remove('is-opened');
    })

    let length = numArray.length;
    numArray = [];
    fillArray(length);
    shuffle(numArray);
    timeLineStartGame.from(document.querySelectorAll('.item'), 3, {scale: 0, y: 60, yoyo:true, ease: "power1.inOut" });
    clearInterval(timer);
    startTimer(60);
  }

  function checkIsEnd (numArray) {
    let countIsEnd = 0;
    document.querySelectorAll('.card-wrapper').forEach((e) => {
      if (e.classList.contains('is-opened')) {
        countIsEnd++;
        if (countIsEnd > numArray.length - 1) {
          document.querySelector('.restart-btn').style.display = 'block';
        }
      }
    })
  }

  function App() {
    const container = document.getElementById('container');

    let appForm = createForm();
    let list = createList();
    let timer = createTimer();
    let restartBtn = createRestartButton();

    container.append(appForm.form);
    container.append(list);
    container.append(timer);
    container.append(restartBtn);

    timeLineStartForm.from(appForm.inputVertical, 1, { opacity: 0, scale: 0, y: 500, ease: "power3.out" })
                     .from(appForm.inputHorizontal, 0.8, { opacity: 0, scale: 0, y: 500, ease: "power3.out" }, "-=0.8")
                     .from(appForm.button, 0.6, { opacity: 0, scale: 0, ease: "power1.out" }, "-=0.4") // animation start form

    appForm.form.addEventListener('submit', (e) => {
      e.preventDefault();

      (parseInt(appForm.inputVertical.value) % 2 !== 0
      &&
      parseInt(appForm.inputHorizontal.value) % 2 !== 0)
      ||
      (parseInt(appForm.inputVertical.value) < 4 || parseInt(appForm.inputHorizontal.value) < 4) ?
      fillArray(16)
      :
      fillArray(parseInt(appForm.inputVertical.value) * parseInt(appForm.inputVertical.value));

      shuffle(numArray);

      let items,
          itemsArr = [];

      for (let i = 0; i < numArray.length; i++) {
        items = createFieldElements(numArray[i]);
        itemsArr.push(items);
        list.append(items);
      }

      drawGame(appForm, list, container, itemsArr, timer);
    });
  }

  window.App = App;
})();
