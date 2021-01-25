import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule, NbButtonModule, NbCardModule,
  NbIconModule, NbListModule, NbProgressBarModule,
  NbRadioModule, NbSelectModule, NbSpinnerModule,
  NbTabsetModule, NbUserModule, NbTooltipModule,
  NbPopoverModule, NbTreeGridModule, NbSearchModule,
  NbInputModule, NbDatepickerModule, NbAlertModule,
  NbWindowModule, NbDialogModule, NbCheckboxModule, NbToggleComponent, NbToggleModule, NbAutocompleteModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CadastrosComponent } from './cadastros.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderModule } from 'ngx-order-pipe';
import { DadosCadastroComponent } from './clientes/dados-cadastro/dados-cadastro.component';
import {
  DadosCadastroParceiroNegocioComponent,
} from './parceiro-negocio/dados-cadastro-parceiro-negocio/dados-cadastro-parceiro-negocio.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ControlMessagesComponent } from './control-messages.component';
import { ParceiroNegocioComponent } from './parceiro-negocio/parceiro-negocio.component';
import { BancosComponent } from './bancos/bancos.component';
import { DadosCadastroBancosComponent } from './bancos/dados-cadastro-bancos/dados-cadastro-bancos.component';
import { NbMomentDateModule } from '@nebular/moment';
import { PlanoContasComponent } from './plano-contas/plano-contas.component';
import { NgxMaskModule } from 'ngx-mask';
import { UiSwitchModule } from 'ngx-ui-switch';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CentroCustosComponent } from './centro-custos/centro-custos.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { DadosCadastroCentroCustosComponent } from './centro-custos/dados-cadastro-centro-custos/dados-cadastro-centro-custos.component';
import { DadosCadastroProjetosComponent } from './projetos/dados-cadastro-projetos/dados-cadastro-projetos.component';
import { TipoContaCorrenteComponent } from './tipo-conta-corrente/tipo-conta-corrente.component';
import { DadosCadastroTipoCcComponent } from './tipo-conta-corrente/dados-cadastro-tipo-cc/dados-cadastro-tipo-cc.component';
import { LojasComponent } from './lojas/lojas.component';
import { TipoLojaComponent } from './tipo-lojas/tipo-lojas.component';
import { CanalVendasComponent } from './canal-vendas/canal-vendas.component';
import { DadosCadastroLojasComponent } from './lojas/dados-cadastro-lojas/dados-cadastro-lojas.component';
import { DadosCadastroTipoLojasComponent } from './tipo-lojas/dados-cadastro-tipo-lojas/dados-cadastro-tipo-lojas.component';
import { DadosCadastroCanalVendasComponent } from './canal-vendas/dados-cadastro-canal-vendas/dados-cadastro-canal-vendas.component';
import { StatusComponent } from './status/status.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ConfiguracoesPagarComponent } from './configuracoes/configuracoes-pagar/configuracoes-pagar.component';
import { ConfiguracoesReceberComponent } from './configuracoes/configuracoes-receber/configuracoes-receber.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    PipesModule,
    NbSpinnerModule,
    NbProgressBarModule,
    RoundProgressModule,
    NbTooltipModule,
    NbListModule,
    NbPopoverModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    OrderModule,
    NbSearchModule,
    NbInputModule,
    NbDatepickerModule,
    ReactiveFormsModule,
    NbMomentDateModule,
    NbSelectModule,
    NgSelectModule,
    NbAlertModule,
    NbSearchModule,
    UiSwitchModule,
    MatSlideToggleModule,
    NbCheckboxModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NgxMaskModule.forChild(),
    NgSelectModule,
    NbAutocompleteModule,
    NbToggleModule,
  ],
  declarations: [
    CadastrosComponent,
    ClientesComponent,
    DadosCadastroComponent,
    DadosCadastroParceiroNegocioComponent,
    DadosCadastroBancosComponent,
    ControlMessagesComponent,
    ParceiroNegocioComponent,
    BancosComponent,
    PlanoContasComponent,
    CentroCustosComponent,
    ProjetosComponent,
    DadosCadastroCentroCustosComponent,
    DadosCadastroProjetosComponent,
    TipoContaCorrenteComponent,
    DadosCadastroTipoCcComponent,
    LojasComponent,
    DadosCadastroLojasComponent,
    TipoLojaComponent,
    DadosCadastroTipoLojasComponent,
    CanalVendasComponent,
    DadosCadastroCanalVendasComponent,
    StatusComponent,
    ConfiguracoesComponent,
    ConfiguracoesPagarComponent,
    ConfiguracoesReceberComponent,
  ],
})

export class CadastrosModule { }
