import { Injectable } from '@angular/core';

interface HistoricoConversao {
  id: number;
  data: string;
  hora: string;
  moedaOrigem: string;
  moedaDestino: string;
  valorEntrada: number;
  valorConvertido: number;
  taxaConversao: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistoricoConversaoService {
  private historico: HistoricoConversao[] = [];
  private nextId = 1;

  adicionarConversao(conversao: Omit<HistoricoConversao, 'id'>) {
    this.historico.push({ id: this.nextId++, ...conversao });
  }

  obterHistorico(): HistoricoConversao[] {
    return this.historico;
  }

  obterConversoesDeAltoValor(valorMinimo: number): HistoricoConversao[] {
    return this.historico.filter(conversao => conversao.valorEntrada >= valorMinimo);
  }

  excluirConversao(id: number) {
    this.historico = this.historico.filter(conversao => conversao.id !== id);
  }
}
