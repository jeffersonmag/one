import { NgModule } from '@angular/core';
import { NbMenuModule, NbStepperModule, NbProgressBarModule, NbPopoverModule, NbTreeGridModule, NbSidebarModule, NbSelectModule, NbDatepickerModule, NbDialogModule, NbWindowModule, NbToastrModule, NbChatModule } from '@nebular/theme';

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
import { BrowserModule } from '@angular/platform-browser';
import { NgxCpfCnpjModule } from 'ngx-cpf-cnpj';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbToastModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../../../projects/cadastros/src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../@core/core.module';
import { PipesModule } from '../pipes/pipes.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

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
    CadastrosModule,
    NbDateFnsDateModule.forChild({ format: 'dd/MM/yyyy' }),
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
