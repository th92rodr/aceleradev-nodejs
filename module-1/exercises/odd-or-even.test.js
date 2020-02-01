const odd_or_even = require('./odd-or-even');

describe('the function odd_or_even should...', () => {
  test('return an object with a list of all the odd numbers from 0 to 10', () => {
    expect(odd_or_even(10)).toMatchObject({
      odds: [0, 2, 4, 6, 8, 10]
    });
  });

  test('return an object with a list of all the even numbers from 0 to 10', () => {
    expect(odd_or_even(10)).toMatchObject({
      evens: [1, 3, 5, 7, 9]
    });
  });
});
