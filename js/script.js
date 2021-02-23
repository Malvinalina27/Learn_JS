'use strict';


const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      incomePlus = document.getElementsByTagName('button')[0],
      expensesPlus = document.getElementsByTagName('button')[1];

let depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], 
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'), 
    incomeItems = document.querySelectorAll('.income-items'), 
    periodAmount = document.querySelector('.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

//change let
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


class AppData {
  constructor() {
    this.addExpenses = [];
    this.addIncome = [];
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.deposit = false;
    this.expenses = {};
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.moneyDeposit = 0;
    this.percentDeposit = 0;
  }
  start(event) {
    if (salaryAmount.value === '') {
      event.preventDefault();
      alert('не заполнен месячный доход');
    }

    let dataInput = document.querySelectorAll('.data input[type = text]');
    dataInput.forEach( (item) => {
      item.setAttribute('disabled', true);
    });
    incomePlus.setAttribute('disabled', true);
    expensesPlus.setAttribute('disabled', true);

    cancel.style.display = 'block';
    start.style.display = 'none';

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.calcSavedMoney();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
  }
  reset() {
    let dataInput = document.querySelectorAll('.data input[type = text]');
    dataInput.forEach((item) => {
      item.removeAttribute('disabled');
      item.value = '';
    });
    let resultInput = document.querySelectorAll('.result input[type = text]');
    resultInput.forEach((item) => {
      item.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display = 'block';
    }
    incomePlus.removeAttribute('disabled');

    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = 'block';
    }
    expensesPlus.removeAttribute('disabled');

    periodSelect.value = 1;
    periodAmount.innerHTML = 1;

    document.querySelector('#deposit-check').checked = false;

    cancel.style.display = 'none';
    start.style.display = 'block';
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth; // доход за месяц
    budgetDayValue.value = Math.ceil(this.budgetDay); //дневной бюджет
    expensesMonthValue.value = +this.expensesMonth; //расход за месяц
    additionalIncomeValue.value = this.addIncome.join(', '); //возможные доходы
    additionalExpensesValue.value = this.addExpenses.join(', '); //возможные расходы 
    incomePeriodValue.value = this.calcSavedMoney(); //накопления за период
    targetMonthValue.value = Math.ceil(this.getTargetMonth()); // срок достижения цели в мес
    periodSelect.addEventListener('change',  () => {
      incomePeriodValue.value = this.calcSavedMoney();
    });
  }
  addIncomeBlock() {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }
  // 
  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( (item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach( (item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome() {
    if (1200 < this.budgetDay) {
      return ('У вас высокий уровень дохода');
    } else if (600 < this.budgetDay && this.budgetDay < 1199) {
      return ('У вас средний уровень дохода');
    } else if (0 <= this.budgetDay && this.budgetDay < 599) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  }
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;     
    }
  } 
  // homework
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('change', () => {
        if ( !isNumber(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100 ) {
          start.setAttribute('disabled', true);
          alert('Введите корректное значение в поле проценты');
        } else {
          start.removeAttribute('disabled');
        }  
      });
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value ='';
      depositAmount.value ='';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventListeners() {
    start.addEventListener('click', this.start.bind(appData), false);
    cancel.addEventListener('click', this.reset.bind(appData), false);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    periodSelect.addEventListener('change', () => {
      periodAmount.innerHTML = periodSelect.value;
    });

    depositCheck.addEventListener('change', this.depositHandler.bind(appData));
  }
}

const appData = new AppData();

console.log(appData);
appData.eventListeners();