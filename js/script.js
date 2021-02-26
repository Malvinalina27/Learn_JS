window.addEventListener('DOMContentLoaded', () => {

  const hi = document.querySelector('.hi');
  const today = document.querySelector('.today');
  const now = document.querySelector('.now');
  const newYear = document.querySelector('.new-year');

  function countTimer() {
    const dateNow = new Date();
    // 1 строка
    function time() {
      const hello = ['Доброе утро!', 'Добрый день!', 'Добрый вечер!', 'Доброй ночи!'];
      const hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      // перевожу в строку минуты
      if (minutes < 10) {
        minutes = minutes.toString();
        minutes = '0' + minutes;
      }
      //конкатенирую часы и минуты
      const hour = parseInt(hours.toString() + minutes);
      if (hour >= 400 && hour < 1100) {
        hi.textContent = hello[0];
      } else if (hour >= 1100 && hour < 1700) {
        hi.textContent = hello[1];
      } else if (hour >= 1700 && hour < 2300) {
        hi.textContent = hello[2];
      } else {
        hi.textContent = hello[3];
      }
      return hi.textContent;
    }
    hi.innerHTML = time();

    // 2 строка
    const timeMas = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    today.innerHTML = `Сегодня: ${timeMas[dateNow.getDay()]}`;

    //3 строка
    const getNowTime = dateNow.toLocaleTimeString('en');
    now.innerHTML = `Текущее время: ${getNowTime}`;

    // 4 строка
    const  dateStop = new Date('01 January 2022').getTime(),
      timeRemaining = (dateStop - dateNow.getTime()) / 1000,
      day = Math.floor(timeRemaining / 60 / 60 / 24);

    if (timeRemaining < 0) {
      newYear.innerHTML = 'С Новым годом!';
    } else {
      newYear.innerHTML = `До нового года осталось ${day} дней`;
    }

  }

  setInterval(countTimer, 1000);

});
