import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MoedaService } from '../../services/moeda.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-conversao-moedas',
  templateUrl: './conversao-moedas.component.html',
  styleUrls: ['./conversao-moedas.component.scss']
})
export class ConversaoMoedasComponent implements OnInit {
  displayedColumns: string[] = ['simbolo', 'nome', 'valor'];
  dataSource = new MatTableDataSource<any>();
  quantidadeRegistros: number = 5;
  moedaOrigem: string | null = null;
  moedaDestino: string | null = null;
  valorParaConverter: number | null = null;
  erro: string = '';
  resultadoConversao: { valorConvertido: number; taxaConversao: number } | null = null;
  conversaoForm: FormGroup;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private moedaService: MoedaService, private fb: FormBuilder) {
    this.conversaoForm = this.fb.group({
      moedaOrigem: ['', Validators.required],
      moedaDestino: ['', Validators.required],
      valorParaConverter: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.carregarMoedas();
  }

  async carregarMoedas() {
    try {
      this.dataSource.data = await this.moedaService.listarMoedas();
    } catch (error) {
      console.error('Erro ao carregar moedas:', error);
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async converter() {
    if (this.conversaoForm.valid) {
      this.erro = '';
      const { moedaOrigem, moedaDestino, valorParaConverter } = this.conversaoForm.value;

      try {
        this.resultadoConversao = await this.moedaService.converterMoeda(moedaOrigem, moedaDestino, valorParaConverter);
      } catch (error) {
        this.erro = 'Erro ao realizar a conversão. Tente novamente.';
        console.error('Erro ao converter moedas:', error);
      }
    }
  }
}
