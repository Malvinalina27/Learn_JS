'use strict';


let Start = document.getElementById('start'),
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
    //incomeAmount = document.querySelector('.income-amount'),
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
    start: function(event) {
     if(salaryAmount.value === '') {
        event.preventDefault();
        alert('не заполнен месячный доход');
      } 
      
      appData.budget = +salaryAmount.value;      
      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.calcSavedMoney();
      appData.getBudget();     
      appData.showResult();
    },
    showResult: function() {
      budgetMonthValue.value = appData.budgetMonth; // доход за месяц
      budgetDayValue.value = Math.ceil(appData.budgetDay); //дневной бюджет
      expensesMonthValue.value = appData.expensesMonth; //расход за месяц
      additionalIncomeValue.value = appData.addIncome.join(', '); //возможные доходы
      additionalExpensesValue.value = appData.addExpenses.join(', '); //возможные расходы 
      incomePeriodValue.value = appData.calcSavedMoney(); //накопления за период
      targetMonthValue.value = Math.ceil(appData.getTargetMonth()); // срок достижения цели в мес

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
        let itemValue = item.value.trim();
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
      appData.budgetDay = appData.budgetMonth / 30;
    },
    // период накоплений
    getTargetMonth: function() {
      return targetAmount.value / appData.budgetMonth;
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
      return appData.budgetMonth * periodSelect.value;
    
    },
    //ползунок
    getPeriod: function(event) {
      periodAmount.innerHTML = event.target.value;
    },
    
    
};
Start.addEventListener('click', appData.start, false);
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('change', function() {
  incomePeriodValue.value = appData.calcSavedMoney();});


/* for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
} 
 */