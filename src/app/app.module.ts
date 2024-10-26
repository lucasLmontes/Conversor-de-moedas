import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { ListagemMoedasComponent } from './components/listagem-moedas/listagem-moedas.component';
import { ConversaoMoedasComponent } from './components/conversao-moedas/conversao-moedas.component';
import { HistoricoConversoesComponent } from './components/historico-conversoes/historico-conversoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MoedaService } from './services/moeda.service';
import { HistoricoConversaoService } from './services/historico-conversao.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    ListagemMoedasComponent,
    ConversaoMoedasComponent,
    HistoricoConversoesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [MoedaService, HistoricoConversaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
