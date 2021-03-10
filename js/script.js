window.addEventListener('DOMContentLoaded', () => {


  //Timer
  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return { dateStop, timeRemaining, hours, minutes, seconds };
    }

    function updateClock() {
      const timer = getTimeRemaining();

      if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(1);
      } else {
        timerHours.textContent = timer.hours;
        if (timer.hours < 10) timerHours.textContent = '0' + timer.hours;
        timerMinutes.textContent = timer.minutes;
        if (timer.minutes < 10) timerMinutes.textContent = '0' + timer.minutes;
        timerSeconds.textContent = timer.seconds;
        if (timer.seconds < 10) timerSeconds.textContent = '0' + timer.seconds;
      }
    }

    updateClock();

    setInterval(updateClock, 1000);


  }
  countTimer('28 March 2021 15:00');

  // Menu
  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'); // кнопка .menu
    const menu = document.querySelector('menu'); // само меню

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    // btnMenu
    btnMenu.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.menu');

      if (target) {
        handlerMenu();
      }
    });

    // closeBtn & menuItems
    menu.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('close-btn')) {
        handlerMenu();
      } else {
        target = target.closest('li>a');
        if (target) {
          handlerMenu();
        }
      }
    });

  };
  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupContent = document.querySelector('.popup-content');
    const width = document.documentElement.clientWidth; //ширина экрана

    //animation popupContent
    function animate({ duration, timing, draw }) {
      const start = performance.now();

      requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;

        if (timeFraction > 1) timeFraction = 1;

        const progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    }

    //click on popupBtn
    popupBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (width < 768) {
          cancelAnimationFrame(animate);
        } else {
          animate({
            duration: 500,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
              popupContent.style.left = progress * (width / 2.5) + 'px';
            },
          });
        }
      });
    });

    //popup
    popup.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }

    });

  };
  togglePopUp();

  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };


    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');


      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });

  };
  tabs();

  //Slider
  const slider = () => {
    const slider = document.querySelector('.portfolio-content');
    const slide = document.querySelectorAll('.portfolio-item');
    const portfolioDots = document.querySelector('.portfolio-dots');
    //const btn = document.querySelectorAll('.portfolio-btn');

    // создание dots в portfolioDots
    const getListContent = () => {
      const result = [];

      for (let i = 1; i <= slide.length; i++) {
        const li = document.createElement('li');
        li.className = 'dot';
        if (li === slide.length) {
          li.className = 'dot dot-active';
        }
        result.push(li);
      }
      return result;
    };
    portfolioDots.append(...getListContent());
    const dot = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length)  {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();

      // eslint-disable-next-line prefer-const
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);


  };
  slider();

  //calc +
  const calc = (price = 100) => {
    const calcItem = document.querySelectorAll(['.calc-square', '.calc-count', '.calc-day']);

    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');
    const totalValue = document.getElementById('total');


    calcItem.forEach(elem => {
      elem.addEventListener('blur', () => {
        elem.value = elem.value.replace(/\D/g, '');
      });
    });


    calcBlock.addEventListener('change', event => {
      const target = event.target;

      const countSum = () => {
        let total = 0;
        let countValue = 1;
        let dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value;
        const squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
          countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
          dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
          dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
          total = price * typeValue * squareValue * countValue * dayValue;
        }

        totalValue.textContent = total;
      };

      /* if (target.matches('.calc-type') || target.matches('.calc-square') ||
      target.matches('.calc-count') || target.matches('.calc-day')) {
        console.log('1');
      } или */

      /* if (target === calcType || target === calcSquare ||
        target === calcCount || target === calcDay) {
        console.log('1');
      } или */

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  };
  calc(100);


  // command !
  const ourCommand = () => {
    const command = document.querySelector('.command');
    let support;
    command.addEventListener('mouseover', event => {
      const target = event.target;
      if (target.matches('img')) {
        support = target.src;
        target.src = target.dataset.img;
        target.dataset.img = support;
      }
    });
    command.addEventListener('mouseout', event => {
      const target = event.target;
      if (target.matches('img')) {
        support = target.src;
        target.src = target.dataset.img;
        target.dataset.img = support;
      }
    });
  };
  ourCommand();

  //form
  const form = () => {
    const formName = document.querySelectorAll(['.form-name', '#form2-name']);
    const formEmail = document.querySelectorAll('.form-email');
    const formPhone = document.querySelectorAll('.form-phone');
    const mess = document.querySelectorAll('.mess');

    formEmail.forEach(elem => {
      elem.addEventListener('blur', () => {
        elem.value = elem.value.replace(/[^@-_.!~*'A-Za-z]/g, '').replace(/\s+/g, '');
      });
    });

    formPhone.forEach(elem => {
      //const regexpPhone = /^(8|\+7)(\d{3})(\d{3})(\d{4})$/;
      elem.addEventListener('input', (e) => {
        if (!elem.value /* || !regexpPhone.test(elem.value) */) {
          elem.style.border = '2px solid red';
        } else {
          elem.style.border = 'none';
          const x = e.target.value.replace(/\D/g, '').match(/(8|\+7)(\d{0,3})(\d{0,3})(\d{0,4})/);
          e.target.value =  x[1] + '(' + x[2] + ')' + x[3] + (x[4] ? '-' + x[4] : '');
          // elem.value = elem.value.replace(regexpPhone, '$1($2)-$3-$4');
          //elem.value = elem.value.replace(/[^0-9+]/g, '').replace(/\s+/g, '').replace(regexpPhone, '$1($2)-$3-$4');
        }
      });
    });

    formName.forEach(elem => {
      elem.addEventListener('input', () => {
        if (!elem.value) {
          elem.style.border = '2px solid red';
        } else {
        // eslint-disable-next-line no-useless-escape
          elem.value = elem.value.replace(/[^а-яА-яёЁ\s\-]/g, '').replace(/\s+/g, ' ').replace(/[А-Я]/g, match =>
            match.toLowerCase()).replace(/^[а-я]/g, match => match.toUpperCase());
        }
      });
    });

    mess.forEach(elem => {
      elem.addEventListener('input', () => {
        if (!elem.value) {
          elem.style.border = '2px solid red';
        } else {
          elem.value = elem.value.replace(/[^а-яА-яёЁ0-9\s,.!?;:()]/g, '').replace(/\s+/g, ' ');
        }
      });
    });

  };
  form();

  // send-aiax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.querySelectorAll(['#form1', '#form2', '#form3']);

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2 rem;';

    form.forEach(elem => {
      elem.addEventListener('submit', event => {
        event.preventDefault();
        elem.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(elem);
        const body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postData(body, () => {
          formData.forEach((key) => {
            body[key] = '';
            console.log(body[key]);
          });
          statusMessage.textContent = successMessage;
        }, error => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
      });
    });


    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');

      request.send(JSON.stringify(body));
    };
  };

  sendForm();

});
