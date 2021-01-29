import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CadastrosApiService } from './api/cadastros';
import { CampanhasApiService } from './api/campanhas';
import { ComissoesPagasApiService } from './api/comissoes-pagas';
import { DiasUteisPeriodoApiService } from './api/dias-uteis-periodo';
import { EsteiraProducaoApiService } from './api/esteira-producao';
import { FinanceiroApiService } from './api/financeiro';
import { IndiceContratosDigitadosApiService } from './api/indice-contratos-digitados';
import { LoginApiService } from './api/login';
import { PendenciaFisicoApiService } from './api/pendencia-fisico';
import { TabelaComissaoApiService } from './api/tabela-comissao';
import { TicketMedioApiService } from './api/ticket-medio';
import { UsuarioApiService } from './api/usuario';
import { RequestService } from './services/request.service';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./login/login.module')
      .then(m => m.LoginModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [RequestService,
    UsuarioApiService,
    LoginApiService,
    CampanhasApiService,
    CadastrosApiService,
    ComissoesPagasApiService,
    DiasUteisPeriodoApiService,
    EsteiraProducaoApiService,
    FinanceiroApiService,
    IndiceContratosDigitadosApiService,
    PendenciaFisicoApiService,
    TabelaComissaoApiService,
    TicketMedioApiService
  ]
})
export class AppRoutingModule {
}
