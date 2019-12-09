import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbUserModule,
  NbTooltipModule,
  NbPopoverModule,
  NbTreeGridModule,
  NbSearchModule,
  NbInputModule,
  NbDatepickerModule,
  NbAlertModule,
  NbWindowModule,
  NbDialogModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CadastrosComponent } from './cadastros.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderModule } from 'ngx-order-pipe';
import { StatusComponent } from './status/status.component';
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
    FormsModule,
    ReactiveFormsModule,
    NbMomentDateModule,
    NbSelectModule,
    NgSelectModule,
    NbAlertModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ],
  declarations: [
    CadastrosComponent,
    ClientesComponent,
    StatusComponent,
    DadosCadastroComponent,
    DadosCadastroParceiroNegocioComponent,
    DadosCadastroBancosComponent,
    ControlMessagesComponent,
    ParceiroNegocioComponent,
    BancosComponent,
  ],
})

export class CadastrosModule { }
