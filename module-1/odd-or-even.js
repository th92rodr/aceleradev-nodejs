function odd_or_even(number) {
    odds = []
    evens = []
    for (let i = 0; i <= number; i++) {
        if (i % 2 == 0) {
            odds.push(i);
        } else {
            evens.push(i);
        }
    }

    return { odds, evens };
}

module.exports = odd_or_even;