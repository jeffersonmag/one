import { NgModule } from '@angular/core';
import {
  NbMenuModule, NbStepperModule, NbIconModule, NbProgressBarModule, NbButtonModule,
  NbTooltipModule, NbPopoverModule, NbTreeGridModule, NbCardModule
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardCampanhaModule } from './dashboard-campanha/dashboard-campanha.module';
import { DashboardProducaoModule } from './dashboard-producao/dashboard-producao.module';
import { PendenciaModule } from './pendencia-fisico/pendencia.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { EsteiraProducaoModule } from './esteira-producao/esteira-producao.module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgIdleModule } from '@ng-idle/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CadastrosModule } from './cadastros/cadastros.module';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { IConfig } from 'ngx-mask';
import { FinanceiroModule } from './financeiro/financeiro.module';
import { FormsModule } from '@angular/forms';
import { TabelaComissaoModule } from './tabela-comissao/tabela-comissao.module';
import { ComissoesPagasModule } from './comissoes-pagas/comissoes-pagas.module';
import { RequestService } from '../services/request.service';
import { ComissoesComponent } from './comissoes/comissoes.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { GraficosProducaoModule } from './graficos-producao/graficos-producao.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { NbMomentDateModule } from '@nebular/moment';

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
    TabelaComissaoModule,
    ComissoesPagasModule,
    GraficosProducaoModule,
    NbStepperModule,
    NbPopoverModule,
    DashboardCampanhaModule,
    DashboardProducaoModule,
    NgIdleKeepaliveModule.forRoot(),
    GoogleChartsModule.forRoot(),
    NgIdleModule,
    NbProgressBarModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    CadastrosModule,
    NbDateFnsDateModule.forChild({ format: 'dd/MM/yyyy' }),
    FormsModule,
    NbCardModule,
    NgbPaginationModule,
    NbMomentDateModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule
  ],
  declarations: [
    PagesComponent,
    ComissoesComponent,
  ],
  providers:
    [RequestService]
})
export class PagesModule {
}
