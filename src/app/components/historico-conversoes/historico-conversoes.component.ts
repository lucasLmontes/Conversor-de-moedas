import { Component, OnInit } from '@angular/core';
import { HistoricoConversaoService } from '../../services/historico-conversao.service';

@Component({
  selector: 'app-historico-conversoes',
  templateUrl: './historico-conversoes.component.html',
  styleUrls: ['./historico-conversoes.component.scss']
})
export class HistoricoConversoesComponent implements OnInit {
  displayedColumns: string[] = ['data', 'hora', 'moedaOrigem', 'moedaDestino', 'valorEntrada', 'valorConvertido', 'taxaConversao', 'acao'];
  historico: any[] = [];
  valorMinimoAltoValor = 1000;

  constructor(private historicoConversaoService: HistoricoConversaoService) {}

  ngOnInit() {
    this.historico = this.historicoConversaoService.obterHistorico();
  }

  visualizarConversoesAltoValor() {
    this.historico = this.historicoConversaoService.obterConversoesDeAltoValor(this.valorMinimoAltoValor);
  }

  excluirConversao(id: number) {
    this.historicoConversaoService.excluirConversao(id);
    this.historico = this.historicoConversaoService.obterHistorico();
  }
}
