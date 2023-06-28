import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3333';

export const apiGet = async (routs: string,) => {
  try {
    const resposta = await axios.get(routs);

    return resposta.data;
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const apiPost = async (routs: string, bady: any) => {
  try {
    const resposta = await axios.post(routs, bady);

    return resposta.data;
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const apiDelete = async (routs: string) => {
  try {
    const resposta = await axios.delete(routs);

    return resposta.data;
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const apiUpdate = async (routs: string, bady: any) => {
  try {
    const resposta = await axios.put(routs, bady);

    return resposta.data;
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
};
