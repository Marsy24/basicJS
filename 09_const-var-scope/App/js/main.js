import Card from './card.js';
(() => {

})()

function game(container, cardsCount = "") {
  let cardsNumArray = [],
    cardsArray = [],
    firstCard = null,
    secondCard = null,
    gameBlock = document.getElementById('game'),
    mainTitle = document.querySelector('.main__title'),
  // Animation
    modal = document.getElementById('modal_01'),
    modalContainer = modal.querySelector('.pop-up__container'),
    modalTitle = modal.querySelector('.pop-up__title'),
    modalLabel = modal.querySelector('.pop-up__label'),
    modalInput = modal.querySelector('.pop-up__input'),
    modalBtn = modal.querySelector('.pop-up__btn');
    const timeLineStartFrom = gsap.timeline(),
      startGameAni = gsap.timeline();
  if (cardsCount == "") {
    timeLineStartFrom.from(modalContainer, 1, { opacity: 0, scale: 0, y: 400, ease: "power3.out" })
      .from(modalTitle, 1, { opacity: 0, scale: 0, y: 400, ease: "power3.out" }, "-=0.9")
      .from(modalLabel, 0.6, { opacity: 0, scale: 0, y: 400, ease: "power3.out" }, "-=0.6")
      .from(modalInput, 0.6, { opacity: 0, scale: 0, y: 400, ease: "power3.out" }, "-=0.6")
      .from(modalBtn, 0.4, { opacity: 0, scale: 0, y: 400, ease: "power1.out" }, "-=0.2")
  }
  //---------------------------------------------------------------------------------------------------End Animation
  let timer = document.querySelector('.timer');
  let timerText = document.querySelector('.timer__text');
  modalBtn.addEventListener('click', function () { // Событие на клик кнопки "Старт!"
    modalInput.value < 6 ? modalInput.value = 6 : false; // Если значение меньше 12, то задаем значение 12
    timer.style.display = 'block';
    let seconds = parseInt(document.getElementById("sec").value);
    console.log(seconds);
    setTimeout(() => {
      timerText.textContent = seconds;
    }, 2000);

    let timerInterval = setInterval(() => {
      seconds--;
      timerText.textContent = seconds;
      if (!seconds > 0) {
        alert('Время вышло');
        location.reload();
      }
    }, 1000);

    cardsCount = modalInput.value;
    for (let i = 1; i <= cardsCount / 2; i++) {
      cardsNumArray.push(i, i);
    }

    cardsNumArray = cardsNumArray.sort(() => Math.random() - 0.5);

    for (const cardNum of cardsNumArray) {
      cardsArray.push(new Card(container, cardNum, flip))
    }

    timeLineStartFrom.reverse();
    setTimeout(() => {
      modal.style.display = 'none'; // скрываем модалку с настройками
      gameBlock.style.display = 'flex'; // показываем игровое поле
      mainTitle.style.display = 'block';
      startGameAni.from(document.getElementById('game'), 1, { opacity: 0, scale: 0, y: 400, ease: "power3.out" }); // анимация появления игрового поля
    }, 1000);
  });



  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;

        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else {
      secondCard == null ? secondCard = card : false;
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;

        firstCard = null;
        secondCard = null;
      }
    }

    if (document.querySelectorAll('.card.success').length == cardsNumArray.length) {
      firstCard = null;
      secondCard = null;
      alert('Победа');
      location.reload();
      /*startGameAni.reverse();
      setTimeout(() => {
        container.innerHTML = "";
        cardsNumArray = [];
        cardsArray = [];
        modal.style.display = 'flex';
        timeLineStartFrom.from(modalContainer, 1, { opacity: 0, scale: 1, y: 400, ease: "power3.out" })
                     .from(modalTitle, 1, { opacity: 0, scale: 1, y: 400, ease: "power3.out" }, "-=0.9")
                     .from(modalLabel, 0.6, { opacity: 0, scale: 1, y: 400, ease: "power3.out" }, "-=0.6")
                     .from(modalInput, 0.6, { opacity: 0, scale: 1, y: 400, ease: "power3.out" }, "-=0.6")
                     .from(modalBtn, 0.4, { opacity: 0, scale: 1, y: 400, ease: "power1.out" }, "-=0.2");

        console.log(cardsNumArray, cardsArray, firstCard, secondCard);
        game(container, cardsCount);
      }, 2000);*/


    }
  }
}

game(document.getElementById('game'));
