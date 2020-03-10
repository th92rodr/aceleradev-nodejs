'use strict';

const fs = require('fs');

const readFile = () => {
  const file = fs.readFileSync(`${process.cwd()}/data.csv`).toString();
  const fileLines = file.split('\n');
  const headers = fileLines[0].split(',');

  const players = fileLines.slice(1, fileLines.length - 1).map((row) => {
    const columns = row.split(',');
    const player = {};
    headers.forEach((element, index) => (player[element] = columns[index]));
    return player;
  });
  return players;
};

// Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo?
const q1 = () => {
  const players = readFile();
  let set = new Set();
  players.map((p) => {
    if (p.nationality != '') set.add(p.nationality);
  });
  return set.size;
};

// Quantos clubes (coluna `club`) diferentes existem no arquivo?
const q2 = () => {
  const players = readFile();
  let set = new Set();
  players.map((p) => {
    if (p.club != '') set.add(p.club);
  });
  return set.size;
};

// Liste o primeiro nome dos 20 primeiros jogadores de acordo com a coluna `full_name`.
const q3 = () => {
  const players = readFile();
  return players.slice(0, 20).map((p) => p.full_name);
};

// Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?
const q4 = () => {
  const players = readFile();
  players.map((p) => (p.eur_wage = +p.eur_wage));
  players.sort((a, b) => (a.eur_wage <= b.eur_wage ? 1 : -1));
  return players.slice(0, 10).map((p) => p.full_name);
};

// Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?
const q5 = () => {
  const players = readFile();
  players.map((p) => {
    p.eur_wage = +p.eur_wage;
    p.age = +p.age;
  });
  players.sort((a, b) => {
    if (a.age == b.age) {
      return a.eur_wage <= b.eur_wage ? 1 : -1;
    } else {
      return a.age < b.age ? 1 : -1;
    }
  });
  return players.slice(0, 10).map((p) => p.full_name);
};

// Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as chaves são as idades e os valores a contagem.
const q6 = () => {
  const players = readFile();
  let map = new Map();
  players.forEach((p) => {
    p.age = +p.age;

    if (map.has(p.age)) {
      let count = map.get(p.age);
      map.set(p.age, count + 1);
    } else {
      map.set(p.age, 1);
    }
  });

  let agesCount = {};
  map.forEach((value, key) => (agesCount[key] = value));

  return agesCount;
};

module.exports = { q1, q2, q3, q4, q5, q6 };
