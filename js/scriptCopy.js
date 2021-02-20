'use strict';


let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], //вывод справа накопления
    targetMonthValue = document.getElementsByClassName('target_month-value')[0]; 

let salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'), //range период расчета слева
    incomeItems = document.querySelectorAll('.income-items'); 
    
let periodAmount = document.querySelector('.period-amount');




let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    addExpenses: [], //массив с возможными расходами
    addIncome: [], //дополнительные доходы
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    deposit: false,
    expenses: {}, //доп расходы
    expensesMonth: 0,
    income: {}, //дополнительные доходы
    incomeMonth: 0,
    moneyDeposit: 0,
    percentDeposit: 0,
    start: function (event) {
      if(salaryAmount.value === '') {
        event.preventDefault();
        alert('не заполнен месячный доход');
      } 

      let dataInput = document.querySelectorAll('.data input[type = text]');
      dataInput.forEach(function(item){
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
    },
    reset: function() {
      let dataInput = document.querySelectorAll('.data input[type = text]');      
      dataInput.forEach(function(item){
        item.removeAttribute('disabled');
        item.value = '';
      });
      let resultInput = document.querySelectorAll('.result input[type = text]');
      resultInput.forEach(function(item){
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

    },
    showResult: function() {
      budgetMonthValue.value = this.budgetMonth; // доход за месяц
      budgetDayValue.value = Math.ceil(this.budgetDay); //дневной бюджет
      expensesMonthValue.value = this.expensesMonth; //расход за месяц
      additionalIncomeValue.value = this.addIncome.join(', '); //возможные доходы
      additionalExpensesValue.value = this.addExpenses.join(', '); //возможные расходы 
      incomePeriodValue.value = this.calcSavedMoney(); //накопления за период
      targetMonthValue.value = Math.ceil(this.getTargetMonth()); // срок достижения цели в мес

    },
    //дополнительный доход +
    addIncomeBlock: function(){
      
      let cloneIncomeItems = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if(incomeItems.length === 3){
        incomePlus.style.display = 'none';
      }
    },
    // обязаттельные расходы +
    addExpensesBlock: function() {
      
      let cloneExpensesItem = expensesItems[0].cloneNode(true); //к первому элементу
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items'); //определяем количество элементов
      if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
      }
    },
    // обязательные расходы
    getExpenses: function() {
      expensesItems.forEach(function(item) { //перебираем все элементы с классом expensesItems
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
    // 
    getIncome: function() { 
      incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
        }
      });

      for(let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    },
    getAddExpenses: function() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if(item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },
    getAddIncome: function() {
      additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
    getExpensesMonth: function () {
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }
    },
    getBudget: function() {
      appData.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      appData.budgetDay = this.budgetMonth / 30;
    },
    // период накоплений
    getTargetMonth: function() {
      return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function() {
      if (1200 < this.budgetDay){
        return ('У вас высокий уровень дохода');
      } else if(600 < this.budgetDay && this.budgetDay < 1199){
        return ('У вас средний уровень дохода');
      } else if(0 <= this.budgetDay && this.budgetDay< 599){
        return ('К сожалению, у вас уровень дохода ниже среднего');
      } else if(this.budgetDay < 0){  
        return ('Что-то пошло не так');
      }
    },
    
    getInfoDeposit: function(){      
      if(this.deposit){
        do {
          appData.percentDeposit = prompt('Какой годовой процент?', '10');
        } while (!isNumber(this.percentDeposit));

        do {
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while (!isNumber(this.moneyDeposit));
      }
    },
    calcSavedMoney: function() {
      return this.budgetMonth * periodSelect.value;
    
    },
    
};


start.addEventListener('click', appData.start.bind(appData), false);
cancel.addEventListener('click', appData.reset.bind(appData), false);
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('change', function(e) {
  periodAmount.innerHTML = e.target.value;
  incomePeriodValue.value = appData.calcSavedMoney();
});

/* for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
} 
 */