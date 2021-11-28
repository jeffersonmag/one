import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InstituicaoComponent } from './instituicao/instituicao.component';
import { LojaComponent } from './loja/loja.component';
import { OperacaoComponent } from './operacao/operacao.component';
import { ProdutoComponent } from './produto/produto.component';
import { ConsultorComponent } from './consultor/consultor.component';
import { CanalSuporteComponent } from './canal-suporte/canal-suporte.component';
import { StatusComponent } from './status/status.component';
import { GraficosProducaoComponent } from './graficos-producao.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { NbCardModule, NbInputModule, NbProgressBarModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    InstituicaoComponent,
    LojaComponent,
    OperacaoComponent,
    ProdutoComponent,
    ConsultorComponent,
    CanalSuporteComponent,
    StatusComponent,
    GraficosProducaoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatGridListModule,
    NbCardModule,
    NbSpinnerModule,
    NbProgressBarModule,
    NbInputModule
  ]
})
export class GraficosProducaoModule { }

export class PageModule { }

export class AppModule { }
