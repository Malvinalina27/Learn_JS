'use strict';

let money = +prompt('Ваш месячный доход?', 50000);
let income = 'фриланс'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'ЖКХ, животные, книги');
let deposit = confirm ('Есть ли у вас депозит в банке?'); 
let mission = 200000;
let expenses1 = prompt('Введите обязательную статью расходов?', 'ЖКХ');
let amount1 = +prompt('Во сколько это обойдется?', 4000);
let expenses2 = prompt('Введите обязательную статью расходов?', 'животные');
let amount2 = +prompt('Во сколько это обойдется?', 5000);
let budgetMonth = money - amount1 - amount2;
let budgetDay = budgetMonth / 30;
let period = Math.ceil(mission / budgetMonth);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Бюджет на день: ', Math.floor(budgetDay));

if (1200 <= budgetDay){
  console.log('У вас высокий уровень дохода');
} else if(600 <= budgetDay < 1200){
  console.log('У вас средний уровень дохода');
} else if(0 <= budgetDay < 600){
  console.log('К сожалению, у вас уровень дохода ниже среднего');
} else if(budgetDay < 0){
  console.log('Что-то пошло не так');
}