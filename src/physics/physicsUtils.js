function numToString(value) {
  const roundedValue = Math.round(value * 10000) / 10000;
  // if (rounded_value >= 0.001 && rounded_value < 1000)
  if (roundedValue < 1000) return roundedValue.toString();
  if (roundedValue < 1e+6) return `${roundedValue / 1000} thousand`;
  if (roundedValue < 1e+9) return `${roundedValue / 1000000} million`;
  if (roundedValue < 1e+12) return `${roundedValue / 1000000000} billion`;
  return roundedValue.toExponential();
}

export { numToString };
