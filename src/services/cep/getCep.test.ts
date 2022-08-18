import getCep from './getCep';
import axios from 'axios';

describe('getCep', () => {
  describe('getCep', () => {
    it('Should return true error when testing valid postal code', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200 });
      expect(await getCep('')).toBe(true);
    });
    it('Should return false when testing invalid code', async () => {
      const mockAxios = jest.spyOn(axios, 'get');
      mockAxios.mockImplementation(() =>
        Promise.reject(new Error('cep invalido ')),
      );
      expect(await getCep('')).toBe(false);
    });
    it('Should return false when return code is not 200', async () => {
      const mockAxios = jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ status: 404 });
      expect(await getCep('')).toBe(false);
    });
  });
});
