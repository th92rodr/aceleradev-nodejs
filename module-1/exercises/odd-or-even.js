'use strict';

/*
  Dada uma lista de números de 0 a 10, escreva um algoritmo que separe os números pares dos números ímpares.
  Conhecimentos utilizados: estrutura de decisão, estrutura de repetição, operadores aritméticos.
*/

function odd_or_even(number) {
  let odds = [];
  let evens = [];
  for (let i = 0; i <= number; i++) {
    if (i % 2 == 0) {
      odds.push(i);
    } else {
      evens.push(i);
    }
  }

  return { odds, evens };
}

module.exports = { odd_or_even };
