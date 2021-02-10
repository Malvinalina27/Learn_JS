'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money, // доход за месяц. месячный доход
    start = function() {
      do{
        money = prompt('Ваш месячный доход?');
      }
      while(!isNumber(money));
    };
    start();

let appData = {
    income: {}, //дополнительные доходы
    addIncome: [], //дополнительные доходы
    expenses: {}, //доп расходы
    addExpenses: [], //массив с возможными расходами
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function() {
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
          appData.addExpenses = addExpenses.toLowerCase().split(', ');         
          appData.deposit = confirm ('Есть ли у вас депозит в банке?'); 
          for (let i = 0; i < 2; i++) {
              let question = prompt('Введите обязательную статью расходов?');
              let cash;
              do {
                cash = +prompt('Во сколько это обойдется?');
              } while (!isNumber(cash) || cash < 0);
              appData.expenses[question] = cash;          
          }
    },
    getBudget: function() {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // период накоплений
    getTargetMonth: function() {
      if (appData.budgetMonth > 0) {
       return ('Цель будет достигнута через ' + Math.ceil(appData.mission / appData.budgetMonth ) + ' месяцев');
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
    
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    
  };
  appData.asking();
  appData.getBudget();
  appData.getTargetMonth();
  appData.getStatusIncome();

// расходы за месяц
for (let key in appData.expenses) {
  appData.expensesMonth += appData.expenses[key];
}

console.log('Расходы за месяц: ', appData.expensesMonth); 
console.log(appData.getTargetMonth()); 
console.log(appData.getStatusIncome()); 

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
}

