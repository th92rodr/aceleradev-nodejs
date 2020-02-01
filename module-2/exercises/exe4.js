/*
Agrupe as pessoas de acordo com as suas linguagens.

Input:
 {
   "name": "Melissa",
   "language": ["Python", "Haskell"]
 },
 {
   "name": "Carolina",
   "language": ["Python", "Javascript"]
 },
 {
   "name": "Armando",
   "language": ["Javascript", "Haskell"]
 }


Output:
 {
   "Javascript": [
     "Carolina",
     "Armando"
   ],
   "Python": [
     "Melissa",
     "Carolina"
   ],
   "Haskell": [
     "Melissa",
     "Armando"
   ]
 }
*/

const people = [
  {
    name: 'Melissa',
    language: ['Python', 'Haskell']
  },
  {
    name: 'Carolina',
    language: ['Python', 'Javascript']
  },
  {
    name: 'Armando',
    language: ['Javascript', 'Haskell']
  }
];

const obj = people.reduce((acumulator, current) => {
  current.language.forEach((language) => {
    if (!acumulator[language]) acumulator[language] = [];
    acumulator[language].push(current.name);
  });
  return acumulator;
}, {});

console.log(obj);
