'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money; // доход за месяц. месячный доход
let income = 'фриланс';  // доп доход за месяц
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); // доп расходы за месяц 
let deposit = confirm ('Есть ли у вас депозит в банке?'); 
let mission = 200000; // цель

let start = function() {
  do{
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money));
};
start();

// typeof 
let showtypeOf = function(data) { 
  console.log(data, typeof(data));
};

showtypeOf(money);
showtypeOf(income);
showtypeOf(deposit);

// расходы за месяц
let expenses = [];
let getExpensesMonth = function() {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    
    expenses[i] = prompt('Введите обязательную статью расходов?');
    sum += +prompt('Во сколько это обойдется?');

    while(!isNumber(sum)) {
      sum += prompt('Во сколько это обойдется?');
    }
        
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ', expensesAmount);


console.log(addExpenses.toLowerCase().split(', ')); 

// накопления за месяц
let getAccumulatedMonth = function() {
  return money - expensesAmount;
};


//результат накопления за месяц
let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц: ', accumulatedMonth);
 
// период накоплений
let getTargetMonth = function() {
  if (accumulatedMonth > 0) {
    return ('Цель будет достигнута через ' + Math.ceil(mission / accumulatedMonth ) + ' месяцев');
  } else if (accumulatedMonth < 0) {
    return ('Цель не будет достигнута');
  }
};
console.log(getTargetMonth());

// дневной бюджет
let budgetDay = accumulatedMonth / 30; 
console.log('Бюджет на день: ', Math.floor(budgetDay));

// уровень дохода
let getStatusIncome = function() {
  if (1200 < budgetDay){
    return ('У вас высокий уровень дохода');
  } else if(600 < budgetDay && budgetDay < 1199){
    return ('У вас средний уровень дохода');
  } else if(0 <= budgetDay && budgetDay< 599){
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else if(budgetDay < 0){  
    return ('Что-то пошло не так');
  }
};
console.log(getStatusIncome()); 

console.log('Цель заработать ' + mission + ' рублей');




