import calcCpfDigit from './calcCpfDigit';

describe('calcCpfDigit', () => {
  describe('calcCpfDigit', () => {
    it('Should result 0 when calculating 123456789', () => {
      const result = calcCpfDigit([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(result).toBe(0);
    });
    it('Should result 8 when calculating 970504890', () => {
      const result = calcCpfDigit([9, 7, 0, 5, 0, 4, 8, 9, 0]);
      expect(result).toBe(8);
    });
  });
});
