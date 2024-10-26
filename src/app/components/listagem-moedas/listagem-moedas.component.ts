import { Component, OnInit, ViewChild } from '@angular/core';
import { MoedaService } from '../../services/moeda.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-listagem-moedas',
  templateUrl: './listagem-moedas.component.html',
  styleUrls: ['./listagem-moedas.component.scss']
})
export class ListagemMoedasComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nome'];
  moedas: any[] = [];
  filteredMoedas: any[] = [];
  paginatorData: any[] = [];
  isLoading = true;
  pageSize = 5;
  pageIndex = 0;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private moedaService: MoedaService) {}

  async ngOnInit() {
    try {
      this.moedas = await this.moedaService.listarMoedas();
      this.filteredMoedas = this.moedas;
      this.updatePaginatorData();
    } catch (error) {
      console.error("Erro ao carregar moedas:", error);
    } finally {
      this.isLoading = false;
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatorData();
  }

  updatePaginatorData() {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatorData = this.filteredMoedas.slice(startIndex, startIndex + this.pageSize);
  }

  filterMoedas() {
    const term = this.searchTerm.toLowerCase();
    this.filteredMoedas = this.moedas.filter(moeda => 
      moeda.simbolo.toLowerCase().includes(term) || 
      moeda.nome.toLowerCase().includes(term)
    );
    this.pageIndex = 0;
    this.updatePaginatorData();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.updatePaginatorData();
  }

  sortData(sort: Sort) {
    const data = this.filteredMoedas.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredMoedas = data;
    } else {
      this.filteredMoedas = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'codigo':
            return this.compare(a.simbolo, b.simbolo, isAsc);
          case 'nome':
            return this.compare(a.nome, b.nome, isAsc);
          default:
            return 0;
        }
      });
    }
    this.updatePaginatorData();
  }

  compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
