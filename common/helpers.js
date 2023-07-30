function roundToTwoDecimals(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

function padNumberWithDecimalPlaces(number, decimalPlaces) {
    if (typeof number !== 'number') {
     return;
    }
  
    if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0) {
      return;
    }
  
    const fixedNumber = number.toFixed(decimalPlaces);
    const [integerPart, decimalPart] = fixedNumber.split('.');
    const paddedDecimalPart = decimalPart.padEnd(decimalPlaces, '0');
    
    return integerPart + '.' + paddedDecimalPart;
  }