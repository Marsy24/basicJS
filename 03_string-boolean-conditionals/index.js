// Задание 1
// Correct:
// let password = '-312';
// let password = '1234-';
// let password = '4321_';
let password = 'qaz-xsw';
// let password = '_zxd';
//
// Incorrect:
// let password = '_-a';
// let password = 'qaz';
// let password = '_-3';
// let password = '123456789';

password.length >= 4 && (password.includes('-') || password.includes('_')) ? console.log('Пароль надёжный') : console.log('Пароль не очень надёжный');
console.log('-------------------------------------------------------');

// Задание 2
let firstName = 'АлЕкcЕй', lastName = 'Филатов';
console.log('Входные:', firstName, lastName);

function correctName(s1) {
  let isValid = s1.substring(0, 1).toUpperCase() + s1.substring(1).toLowerCase()
  return isValid;
}

(firstName.substring(1) === firstName.substring(1).toLowerCase() && lastName.substring(1) === lastName.substring(1).toLowerCase())
&&
(firstName.substring(0, 1) === firstName.substring(0, 1).toUpperCase() && lastName.substring(0, 1) === lastName.substring(0, 1).toUpperCase()) ?
console.log('Изменений произведено не было. Входные имя и фамилия корректны')
:
console.log('Корректное имя:', correctName(firstName), '\nКорректная фамилия:', correctName(lastName))
