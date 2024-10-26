import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { ListagemMoedasComponent } from './components/listagem-moedas/listagem-moedas.component';
import { ConversaoMoedasComponent } from './components/conversao-moedas/conversao-moedas.component';
import { HistoricoConversoesComponent } from './components/historico-conversoes/historico-conversoes.component';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'listagem-moedas', component: ListagemMoedasComponent },
  { path: 'conversao-moedas', component: ConversaoMoedasComponent },
  { path: 'historico-conversoes', component: HistoricoConversoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
