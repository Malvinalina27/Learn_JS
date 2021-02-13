'use strict';


let Start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let budgetMonthValue = document.getElementsByClassName('.budget_month-value'),
    budgetDayValue = document.getElementsByClassName('.budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('.expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('.additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('.additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('.income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('.target_month-value')[0];

let salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    //incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItem = document.querySelectorAll('.income-items');




let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    income: {}, //дополнительные доходы
    incomeMonth: 0,
    addIncome: [], //дополнительные доходы
    expenses: {}, //доп расходы
    addExpenses: [], //массив с возможными расходами
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {
      
      if(salaryAmount.value === '') {
        alert('Ошибка. Поле "Месячный доход" должно быть заполнено');
        return;
      }
      appData.budget = +salaryAmount.value;
      
      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();
      appData.showResult();
 /*      appData.getTargetMonth();
      appData.getStatusIncome();
      appData.getInfoDeposit();
      appData.calcSavedMoney(); */
    },
    showResult: function() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay; 
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcSavedMoney();
    },
    addExpensesBlock: function() {
      
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
      }
    },
    getExpenses: function() {
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
    getIncome: function() { //заглушка, сделать, как getExpenses
      if(confirm('Есть ли у вас дополнительный источник заработка?')) {
        let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
        while (isNumber(itemIncome)) {
          itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
        }

        let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
        while (!isNumber(cashIncome)) {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
        }

        appData.income[itemIncome] = cashIncome;
      }

      for(let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
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
        let itemValue = item.trim();
        if (itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
    getExpensesMonth: function () {
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }
    },
    getBudget: function() {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // период накоплений
    getTargetMonth: function() {
      if (appData.budgetMonth > 0) {
       return ('Цель будет достигнута через ' + targetAmount.value / appData.budgetMonth  + ' месяцев');
      } else if (appData.budgetMonth < 0) {
        return ('Цель не будет достигнута');
      }
    },
    getStatusIncome: function() {
      if (1200 < appData.budgetDay){
        return ('У вас высокий уровень дохода');
      } else if(600 < appData.budgetDay && appData.budgetDay < 1199){
        return ('У вас средний уровень дохода');
      } else if(0 <= appData.budgetDay && appData.budgetDay< 599){
        return ('К сожалению, у вас уровень дохода ниже среднего');
      } else if(appData.budgetDay < 0){  
        return ('Что-то пошло не так');
      }
    },
    
    getInfoDeposit: function(){      
      if(appData.deposit){
        do {
          appData.percentDeposit = prompt('Какой годовой процент?', '10');
        } while (!isNumber(appData.percentDeposit));

        do {
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while (!isNumber(appData.moneyDeposit));
      }
    },
    calcSavedMoney: function() {
      return appData.budgetMonth * targetAmount.value;
    },
    
};

Start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);


/* for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
} 
 */
