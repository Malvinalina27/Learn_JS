'use strict';


let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
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
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'), 
    incomeItems = document.querySelectorAll('.income-items'), 
    periodAmount = document.querySelector('.period-amount');



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
    //change
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
    this.getBudget();
    this.showResult();
  }
  reset() {
    let dataInput = document.querySelectorAll('.data input[type = text]');
    //change
    dataInput.forEach((item) => {
      item.removeAttribute('disabled');
      item.value = '';
    });
    let resultInput = document.querySelectorAll('.result input[type = text]');
    //change
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
    //change
    periodSelect.addEventListener('change',  () => {
      incomePeriodValue.value = this.calcSavedMoney();
    });
  }
  addIncomeBlock() {
    //change
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }
  addExpensesBlock() {
    //change
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }
  getExpenses() {
    //change
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
    //change
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
    //change
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( (item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    //change
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
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
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
  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  }
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;

  }
  eventListeners() {
    start.addEventListener('click', this.start.bind(appData), false);
    cancel.addEventListener('click', this.reset.bind(appData), false);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    //change
    periodSelect.addEventListener('change', () => {
      periodAmount.innerHTML = periodSelect.value;
    });
  }
}

const appData = new AppData();

console.log(appData);
AppData.prototype.eventListeners();