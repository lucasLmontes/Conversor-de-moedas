import { Injectable } from '@angular/core';
import axios from 'axios';
import { HistoricoConversaoService } from './historico-conversao.service';

@Injectable({
  providedIn: 'root'
})
export class MoedaService {
  private API_URL = 'https://v6.exchangerate-api.com/v6/22f195b7663124ae3184a0dd';

  constructor(private historicoConversaoService: HistoricoConversaoService) {}

  async listarMoedas() {
    try {
      const response = await axios.get(`${this.API_URL}/codes`);
      if (response.data.result === 'success') {
        return response.data.supported_codes.map(([code, name]: [string, string]) => ({
          simbolo: code,
          nome: name
        }));
      } else {
        throw new Error("Erro ao buscar lista de moedas.");
      }
    } catch (error) {
      console.error("Erro ao buscar moedas: ", error);
      throw error;
    }
  }

  async converterMoeda(moedaOrigem: string, moedaDestino: string, valor: number) {
    try {
      const response = await axios.get(`${this.API_URL}/latest/${moedaOrigem}`);
      const taxaConversao = response.data.conversion_rates[moedaDestino];
      const valorConvertido = valor * taxaConversao;

      const data = new Date();
      this.historicoConversaoService.adicionarConversao({
        data: data.toLocaleDateString(),
        hora: data.toLocaleTimeString(),
        moedaOrigem: moedaOrigem,
        moedaDestino: moedaDestino,
        valorEntrada: valor,
        valorConvertido: valorConvertido,
        taxaConversao: taxaConversao
      });

      return {
        valorConvertido,
        taxaConversao
      };
    } catch (error) {
      console.error("Erro ao converter moedas: ", error);
      throw error;
    }
  }
}
