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
import { NgSelectModule } from '@ng-select/ng-select';
import { ControlMessagesComponent } from './control-messages.component';
import { ParceiroNegocioComponent } from './parceiro-negocio/parceiro-negocio.component';

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
    NbSelectModule,
    NgSelectModule,
    NbAlertModule,
  ],
  declarations: [
    CadastrosComponent,
    ClientesComponent,
    StatusComponent,
    DadosCadastroComponent,
    ControlMessagesComponent,
    ParceiroNegocioComponent,
  ],
})

export class CadastrosModule { }
