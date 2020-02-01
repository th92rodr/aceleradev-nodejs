'use strict';

function weighted_average(score1, score2, weight1, weight2) {
  return (score1 * weight1 + score2 * weight2) / (weight1 + weight2);
}

//console.log(weighted_average(8, 4, 3, 2));

module.exports = weighted_average;
