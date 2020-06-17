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
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { PipesModule } from '../../pipes/pipes.module';
import { DashboardCampanhaComponent } from './dashboard-campanha.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrderModule } from 'ngx-order-pipe';
import { DxPivotGridModule, DxButtonModule, DxDataGridModule, DxTemplateModule, DxBulletModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import config from 'devextreme/core/config';

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
    DxButtonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
  ],
  declarations: [
    DashboardCampanhaComponent,
  ],
})
export class DashboardCampanhaModule {

  constructor () {
    config({ decimalSeparator: ',' , thousandsSeparator: '.' });
  }
}

export class PageModule { }

export class AppModule { }

platformBrowserDynamic().bootstrapModule(DashboardCampanhaModule);
