import { NgModule } from '@angular/core';
import { NbMenuModule, NbStepperModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardCampanhaModule} from './dashboard-campanha/dashboard-campanha.module';
import { PendenciaModule } from './pendencia-fisico/pendencia.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { EsteiraProducaoModule } from './esteira-producao/esteira-producao.module';



@NgModule({
  imports: [
  PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    PendenciaModule,
    EsteiraProducaoModule,
    NbStepperModule,
    DashboardCampanhaModule
  ],
  declarations: [
    PagesComponent
  ]
})
export class PagesModule {
}
