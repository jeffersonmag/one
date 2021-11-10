import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  NbToastrModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComissoesPagasComponent } from './comissoes-pagas.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderModule } from 'ngx-order-pipe';
import { DxPivotGridModule, DxButtonModule, DxDataGridModule, DxTemplateModule, DxBulletModule } from 'devextreme-angular';
import { ComissoesPagasDetalhesComponent } from './comissoes-pagas-detalhes/comissoes-pagas-detalhes.component';



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
    DxPivotGridModule,
    DxDataGridModule,
    DxTemplateModule,
    DxButtonModule,
  ],
  declarations: [
    ComissoesPagasComponent,
    ComissoesPagasDetalhesComponent
  ]
})
export class ComissoesPagasModule { }
