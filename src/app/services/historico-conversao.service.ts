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
  private historico: HistoricoConversao[] = this.carregarHistoricoLocalStorage();
  private nextId = this.carregarNextIdLocalStorage();

  private salvarLocalStorage() {
    localStorage.setItem('historicoConversoes', JSON.stringify(this.historico));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  private carregarHistoricoLocalStorage(): HistoricoConversao[] {
    const historico = localStorage.getItem('historicoConversoes');
    return historico ? JSON.parse(historico) : [];
  }

  private carregarNextIdLocalStorage(): number {
    const nextId = localStorage.getItem('nextId');
    return nextId ? parseInt(nextId, 10) : 1;
  }

  adicionarConversao(conversao: Omit<HistoricoConversao, 'id'>) {
    this.historico.push({ id: this.nextId++, ...conversao });
    this.salvarLocalStorage();
  }

  obterHistorico(): HistoricoConversao[] {
    return this.historico;
  }

  obterConversoesDeAltoValor(valorMinimo: number): HistoricoConversao[] {
    return this.historico.filter(conversao => conversao.valorEntrada >= valorMinimo);
  }

  excluirConversao(id: number) {
    this.historico = this.historico.filter(conversao => conversao.id !== id);
    this.salvarLocalStorage();
  }
}
