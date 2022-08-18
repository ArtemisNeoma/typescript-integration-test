import StatusError from '@util/error';
import axios from 'axios';

const getCep = async (value: string): Promise<boolean> => {
  try {
    const { status } = await axios.get(
      `https://cep.awesomeapi.com.br/json/${value}`,
    );
    if (status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export default getCep;
