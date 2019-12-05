function numToString(value) {
    let rounded_value = Math.round(value * 10000) / 10000;
    if (rounded_value >= 0.001 && rounded_value < 1000)
        return rounded_value.toString();
    if (rounded_value < 1e+6)
        return `${rounded_value / 1000} thousand`;
    if (rounded_value < 1e+9)
        return `${rounded_value / 1000000} million`;
    if (rounded_value < 1e+12)
        return `${rounded_value / 1000000000} billion`;
    else
        return rounded_value.toExponential()
}

export {numToString}