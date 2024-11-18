export function mainEcuadorianCid(value) {
    let firstNine = [];

    if (value.toString().length === 10) {
        if (isProvince(value.toString()[0], value.toString()[1])) {
            let thirdDigit = parseInt(value.toString()[2]);
            if (thirdDigit >= 0 && thirdDigit < 10) {
                firstNine = value.toString().slice(0, 9);
                console.log(value.toString()[value.toString().length - 1]);
                let aux = consecutiveValues(firstNine);
            
                console.log(aux.toString());
                console.log(value.toString()[value.toString().length - 1] === aux.toString() ? true : false);
                return value.toString()[value.toString().length - 1] === aux.toString() ? true : false;
            }
        }
    }
    return false; 
}

function isProvince(firstDigit, secondDigit) {
    return parseInt(firstDigit + secondDigit) > 0 && parseInt(firstDigit + secondDigit) < 25;
}


function consecutiveValues(firstNineValues) {
    let result = 0;
    for (let i = 0; i < firstNineValues.length; i++) {
        let digit = firstNineValues[i];
        if (i % 2 === 0) {
            result += istenOrSuperior(digit * 2); 
        } else {
            result += istenOrSuperior(digit * 1); 
        }
    }
    return (calculateValueSuperior(result)-result);
}

function istenOrSuperior(value) {
    return value >= 10 ? value - 9 : value;
}

function calculateValueSuperior(value) {
    return ((value + 10) - (value % 10));
}
