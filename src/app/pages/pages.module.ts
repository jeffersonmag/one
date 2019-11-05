import { NgModule } from '@angular/core';
import { NbMenuModule, NbStepperModule, NbProgressBarModule, NbPopoverComponent, NbPopoverModule, NbTreeGridModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardCampanhaModule } from './dashboard-campanha/dashboard-campanha.module';
import { PendenciaModule } from './pendencia-fisico/pendencia.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { EsteiraProducaoModule } from './esteira-producao/esteira-producao.module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgIdleModule } from '@ng-idle/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    PendenciaModule,
    EsteiraProducaoModule,
    NbStepperModule,
    NbPopoverModule,
    DashboardCampanhaModule,
    NgIdleKeepaliveModule.forRoot(),
    NgIdleModule,
    NbProgressBarModule,
    Ng2SmartTableModule,
    NbTreeGridModule,    
  ],
  declarations: [
    PagesComponent
  ]
})
export class PagesModule {
}
