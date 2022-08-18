import isCpfValid from './isCpfValid';

describe('isCpfValid', () => {
  describe('isCpfValid', () => {
    it('Should return true when validating 123.456.789-09', () => {
      expect(isCpfValid('12345678909')).toBe(true);
    });
    it('Should return false when validating CPF composed of the same numbers (111.111.111-11)', () => {
      expect(isCpfValid('11111111111')).toBe(false);
    });
    it('Should return false when the first validating digit is wrong (123.456.789-19)', () => {
      expect(isCpfValid('12345678919')).toBe(false);
    });
    it('Should return false when the second validating digit is wrong (123.456.789-08)', () => {
      expect(isCpfValid('12345678908')).toBe(false);
    });
  });
});
