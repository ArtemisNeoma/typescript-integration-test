const calcCpfDigit = (cpfArray: number[], start = 1): number => {
  const result =
    cpfArray.reduce(
      (previousValue: number, currentValue: number, currentIndex: number) => {
        const totalSum = previousValue + currentValue * (currentIndex + start);
        return totalSum;
      },
      0,
    ) % 11;
  if (result >= 10) {
    const resultString = result.toString();
    return Number(resultString.slice(-1));
  }
  return result;
};

export default calcCpfDigit;
