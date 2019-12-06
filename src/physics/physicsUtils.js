function reduceDecimalValues(value) {
  let newValue = value;
  if (newValue) {
    while (newValue.length > 4) newValue = newValue.substring(0, newValue.length - 1);
    while (newValue[newValue.length - 1] === '0') newValue = newValue.substring(0, newValue.length - 1);
  }
  return newValue;
}
function numberWithCommas(value) {
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
  if (parts[0].length > 4) return parts[0];
  parts[1] = reduceDecimalValues(parts[1]);
  if (parts[1]) return parts.join('.');
  return parts[0];
}

function numToString(value) {
  if (value < 1e+12) return numberWithCommas(value);
  return value.toExponential();
  // return value.toExponential();
}


export { numToString };
