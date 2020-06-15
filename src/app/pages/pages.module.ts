import { NgModule } from '@angular/core';
import { NbMenuModule, NbStepperModule, NbProgressBarModule, NbPopoverModule, NbTreeGridModule, NbSidebarModule, NbSelectModule, NbDatepickerModule, NbDialogModule, NbWindowModule, NbToastrModule, NbChatModule, NbToggleComponent } from '@nebular/theme';

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
import { CadastrosModule } from './cadastros/cadastros.module';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FinanceiroModule } from './financeiro/financeiro.module';
import { StatusComponent } from './cadastros/status/status.component';
import { FormsModule } from '@angular/forms';
//import { GraficoComponent } from './grafico/grafico.component';
//import { GraficoModule } from './grafico/grafico.module';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    PendenciaModule,
    FinanceiroModule,
    EsteiraProducaoModule,
    NbStepperModule,
    NbPopoverModule,
    DashboardCampanhaModule,
    NgIdleKeepaliveModule.forRoot(),
    NgIdleModule,
    NbProgressBarModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    CadastrosModule,
    NbDateFnsDateModule.forChild({ format: 'dd/MM/yyyy' }),
    FormsModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
