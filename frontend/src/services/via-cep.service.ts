import axios, { AxiosResponse } from 'axios';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const fetchAddressData = async (
  zipCode: string,
): Promise<ViaCepResponse | null> => {
  try {
    const response = await axios.get<any, AxiosResponse<ViaCepResponse, any>>(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    );
    if (response?.data?.erro) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching address data:', error);
    return null;
  }
};
