// Задание 1
// let x1 = 2, y1 = 3, x2 = 10, y2 = 5; // площадь равна 16;
let x1 = 10, y1 = 5, x2 = 2, y2 = 3; // площадь равна 16;
// let x1 = -5, y1 = 8, x2 = 10, y2 = 5; // площадь равна 45;
// let x1 = 5, y1 = 8, x2 = 5, y2 = 5; // площадь равна 0;
// let x1 = 8, y1 = 1, x2 = 5, y2 = 1; // площадь равна 0.
let s = Math.abs(x1 - x2) * Math.abs(y1 - y2);
console.log(s);

// Задание 2
// let a = 13.123456789, b = 2.123, n = 5; // дробные части: 12345, 12300.
let a = 13.890123, b = 2.891564, n = 2; // дробные части: 89, 89.
// let a = 13.890123, b = 2.891564, n = 3; // дробные части: 890, 891.
let aNormalized = Math.round(a * Math.pow(10, n));
let bNormalized = Math.round(b * Math.pow(10, n));

console.log('Первое число больше ', aNormalized > bNormalized);
console.log('Первое число меньше ', aNormalized < bNormalized);
console.log('Первое число больше либо равно ему ', aNormalized >= bNormalized);
console.log('Первое число меньше либо равно ему ', aNormalized <= bNormalized);
console.log('Числа равны ', aNormalized === bNormalized);
console.log('Остаток ', aNormalized % bNormalized);
console.log(aNormalized, bNormalized);

// Задание 3
// let c = 0, m = 100;
// let c = 2, m = 5;
// let c = 100, m = -5;
// let c = -3, m = -10;
let c = 1, m = 4;
let f = Math.random();
console.log(f);
console.log('Первое число: ', c)
console.log('Второе число: ', m)
console.log(f *= (Math.max(Math.abs(c), Math.abs(m)) - 1), " Берем максимальное число из заданных параметров, в его абсолютном значении");
console.log(f += Math.min(c, m), " Плюсуем минимальное число из заданных");
console.log(Math.round(f), " Выводим результат рандомного числа в заданном диапазоне");
let checkResult = Math.round(f) % 2;
console.log(checkResult, "0 - четное, 1 - нечетное")
if (checkResult === 0) {
    f++;
    console.log(Math.round(f), "Преобразование в нечетное(f++)");
    if (f > Math.max(Math.abs(c), Math.abs(m))) {
        f = f - 2;
        console.log(Math.round(f), "При преобразовании числа в нечетное была превышена максимальная граница. Число уменьшено на 2.");
    }
}
