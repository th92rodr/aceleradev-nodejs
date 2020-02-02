'use strict';

/*
  Você deverá criar um arquivo chamado media-ponderada.js e, dentro dele, calcular a média ponderada das notas abaixo. Para calcular a média ponderada você deve multiplicar cada nota pelo seu peso e em seguida dividir a soma pela soma dos pesos.
  Conhecimentos utilizados: Variáveis, Operadores Aritméticos
*/

function weighted_average(score1, score2, weight1, weight2) {
  return (score1 * weight1 + score2 * weight2) / (weight1 + weight2);
}

//console.log(weighted_average(8, 4, 3, 2));

module.exports = { weighted_average };
