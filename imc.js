
function imc(weigth, height) {
    const value = weigth / (height*height);

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

console.log(imc(70, 1.75));

console.log(imc(90, 1.65));
