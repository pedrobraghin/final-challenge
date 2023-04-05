import axios from 'axios';
interface Address {
  patio: string;
  complement: string;
  neighborhood: string;
  locality: string;
  uf: string;
}

export default class FetchAddress {
  static async fetchByCep(cep: string): Promise<Address> {
    const url = `https://viacep.com.br/ws/${cep}/json`;
    const response = await axios.get(url);

    const address: Address = {
      complement: response.data.complemento,
      locality: response.data.localidade,
      neighborhood: response.data.bairro,
      patio: response.data.logradouro,
      uf: response.data.uf,
    };
    return address;
  }
}
