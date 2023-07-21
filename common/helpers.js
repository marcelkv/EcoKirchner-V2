function roundToTwoDecimals(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}