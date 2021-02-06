'use strict';

let money = +prompt('Ваш месячный доход?', 50000); // доход за месяц. месячный доход
let income = 'фриланс';  // доп доход за месяц
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'ЖКХ, животные, книги'); // доп расходы за месяц 
let deposit = confirm ('Есть ли у вас депозит в банке?'); 
let mission = 200000; // цель
let expenses1 = prompt('Введите обязательную статью расходов?', 'ЖКХ');
let amount1 = +prompt('Во сколько это обойдется?', 4000);
let expenses2 = prompt('Введите обязательную статью расходов?', 'животные');
let amount2 = +prompt('Во сколько это обойдется?', 5000);
 

// typeof 
let showtypeOf = function(data) { 
  console.log(data, typeof(data));
};

showtypeOf(money);
showtypeOf(income);
showtypeOf(deposit);

// расходы за месяц
let getExpensesMonth = function() {
  return amount1 + amount2;
};
console.log('Расходы за месяц: ', getExpensesMonth());

console.log(addExpenses.split(', ')); 

// накопления за месяц
let getAccumulatedMonth = function() {
  let a = money;
  let b = getExpensesMonth();
  return a - b;
};


//результат накопления за месяц
let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц: ', accumulatedMonth);
 
// период накоплений
let getTargetMonth = function() {
  if (accumulatedMonth > 0) {
    return (Math.ceil(mission / accumulatedMonth ));
  } else if (accumulatedMonth < 0) {
    return ('0');
  }
};
console.log('Период равен ' + getTargetMonth() + ' месяцев');

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




