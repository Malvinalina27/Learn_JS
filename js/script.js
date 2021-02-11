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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {

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
      
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');            
      while (isNumber(addExpenses)) {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      } 
      appData.addExpenses = addExpenses.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
      appData.deposit = confirm ('Есть ли у вас депозит в банке?');      
      for (let i = 0; i < 2; i++) {
          let question = prompt('Введите обязательную статью расходов?');
          let cash;
          while (isNumber(question) || question === null) {
            question = prompt('Введите обязательную статью расходов?');
          } 
          do {
            cash = prompt('Во сколько это обойдется?');
          } while (!isNumber(cash) || cash === 0);
          appData.expenses[question] = cash;          
      }
    },
    getExpensesMonth: function () {
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
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
      return appData.budgetMonth * appData.period;
    },
    
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();

// расходы за месяц


console.log('Возможные расходы: ', appData.addExpenses); 
console.log('Расходы за месяц: ', appData.expensesMonth); 
console.log(appData.getTargetMonth()); 
console.log(appData.getStatusIncome()); 

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
}

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney); 
