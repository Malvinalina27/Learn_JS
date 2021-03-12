/* eslint-disable no-unused-vars */
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
    // кнопка вызова меню
    btnMenu.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.menu');
      if (target) {
        handlerMenu();
      }
    });
    // active-menu
    menu.addEventListener('click', event => {
      const target = event.target;
      console.log(target);
      if (target.classList.contains('close-btn') || target.closest('li>a')) {
        handlerMenu();
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

  //calc
  const calc = (price = 100) => {
    const calcItem = document.querySelectorAll(['.calc-square', '.calc-count', '.calc-day']);

    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');
    const totalValue = document.getElementById('total');


    calcItem.forEach(elem => {
      elem.addEventListener('input', () => {
        if (elem === calcSquare) {
          elem.value = elem.value.replace(/[^0-9.]/g, '');
        } else {
          elem.value = elem.value.replace(/[^0-9]/g, '');
        }
      });
    });

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      // сброс значений
      if (calcType.options[calcType.selectedIndex].matches('.calc-option-title')) {
        calcDay.value = '';
        calcCount.value = '';
        calcSquare.value = '';
      }

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
          total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
        }

        totalValue.textContent = total;
      };
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
      elem.addEventListener('input', () => {
        //elem.value = elem.value.replace(/[^@-_.!~*'A-Za-z]/g, '');
        // eslint-disable-next-line no-useless-escape
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(elem.value) === false) {
          elem.style.border = '2px solid red';
          elem.style.title = 'Введите корректные данные name@name.name';
          return false;
        } else {
          elem.style.border = 'none';
          return true;
        }
      });
    });

    formPhone.forEach(elem => {
      elem.addEventListener('input', () => {
        // eslint-disable-next-line no-undef
        maskPhone('.form-phone');
      });
    });

    formName.forEach(elem => {
      elem.addEventListener('input', e => {
        if (!elem.value) {
          elem.style.border = '2px solid red';
        } else {
          elem.style.border = 'none';
          const target = e.target;
          let val = target.value;
          // eslint-disable-next-line no-useless-escape
          val = val.replace(/[^а-яА-ЯёЁ\s\-]/g, '').replace(/\s+/g, ' ');
          const arr = val.split(' ');
          for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
              arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1).toLowerCase();
            }
          }
          val = arr.join(' ');
          elem.value = val.replace(/^\s/g, '');
        }
      });
    });

    mess.forEach(elem => {
      elem.addEventListener('input', () => {
        if (!elem.value) {
          elem.style.border = '2px solid red';
        } else {
          elem.style.border = 'none';
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
    statusMessage.style.cssText = 'font-size: 2 rem; color: #fff;';

    // ajax
    const postData = formData =>
      fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

    //заполнение формы
    form.forEach(elem => {
      elem.addEventListener('submit', event => {
        event.preventDefault();
        elem.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(elem);
        const input = elem.querySelectorAll('input');

        /* const body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        }); */
        postData(formData)
          .then(response => {
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }
            console.log(response);
            statusMessage.textContent = successMessage;
            input.forEach(item => {
              item.value = '';
            });
            setTimeout(() => {
              statusMessage.style = 'display: none';
            }, 3000);
          })
          .catch(error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
            input.forEach(item => {
              item.value = '';
            });
            setTimeout(() => {
              statusMessage.style = 'display: none';
            }, 3000);
          });
      });
    });
  };

  sendForm();
});
