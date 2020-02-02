'use strict';

/*
  Desenvolva um programa que leia o peso (em kg) e altura (em metros) e em seguida calcule o IMC e mostre qual a situação do adulto de acordo com a tabela.
  Conhecimentos utilizados: Estrutura de decisão, operadores aritméticos, operadores de comparação, operadores lógicos e funções.
*/

function imc(weigth, height) {
  const value = weigth / (height * height);

  if (value < 18.5) {
    return 'Magreza';
  } else if (value < 24.9) {
    return 'Normal';
  } else if (value < 29.9) {
    return 'Sobrepeso';
  } else if (value < 39.9) {
    return 'Obesidade';
  } else {
    return 'Obesidade Grave';
  }
}

//console.log(imc(70, 1.75));
//console.log(imc(90, 1.65));

module.exports = { imc };
