import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardCampanhaComponent } from './dashboard-campanha/dashboard-campanha.component';
import { PagesComponent } from './pages.component';
import { PendenciaComponent } from './pendencia-fisico/pendencia.component';
import { EsteiraProducaoComponent } from './esteira-producao/esteira-producao.component';
import { ClientesComponent } from './cadastros/clientes/clientes.component';
import { ParceiroNegocioComponent } from './cadastros/parceiro-negocio/parceiro-negocio.component';
import { BancosComponent } from './cadastros/bancos/bancos.component';
import { PlanoContasComponent } from './cadastros/plano-contas/plano-contas.component';

//define o a página inicial
if (window.sessionStorage.permissao_dashboard_campanha) {
  var home: string = 'dashboard-campanha';
} else if (window.sessionStorage.permissao_pendencia_fisico) {
  home = 'pendencia-fisico';
} else if (window.sessionStorage.permissao_esteira_producao) {
  home = 'esteira-producao';
} else if (window.sessionStorage.permissao_cadastro_bancos) {
  home = 'cadastros/parceiro-negocio';
} else if (window.sessionStorage.permissao_cadastro_cliente) {
  home = 'cadastros/clientes';
} else if (window.sessionStorage.permissao_cadastro_parceiro_negocio) {
  home = 'cadastros/parceiro-negocio';
} else if (window.sessionStorage.permissao_cadastro_plano_de_contas) {
  home = 'cadastros/plano-contas';
}

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'dashboard-campanha',
      component: DashboardCampanhaComponent,
    },

    {
      path: 'pendencia-fisico',
      component: PendenciaComponent,
    },

    {
      path: 'esteira-producao',
      component: EsteiraProducaoComponent,
    },

    {
      path: 'cadastros/clientes',
      component: ClientesComponent,
    },

    {
      path: 'cadastros/parceiro-negocio',
      component: ParceiroNegocioComponent,
    },

    {
      path: 'cadastros/bancos',
      component: BancosComponent,
    },

    {
      path: 'cadastros/plano-contas',
      component: PlanoContasComponent,
    },

    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: '',
      redirectTo: home,
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
