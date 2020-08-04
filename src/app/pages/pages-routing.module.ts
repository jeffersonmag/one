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
import { CentroCustosComponent } from './cadastros/centro-custos/centro-custos.component';
import { ProjetosComponent } from './cadastros/projetos/projetos.component';
import { TipoContaCorrenteComponent } from './cadastros/tipo-conta-corrente/tipo-conta-corrente.component';
import { LojasComponent } from './cadastros/lojas/lojas.component';
import { CanalVendasComponent } from './cadastros/canal-vendas/canal-vendas.component';
import { TipoLojaComponent } from './cadastros/tipo-lojas/tipo-lojas.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { ConfiguracoesComponent } from './cadastros/configuracoes/configuracoes.component';
import { TabelaComissaoComponent } from './tabela-comissao/tabela-comissao.component';
//import { GraficoComponent } from './grafico/grafico.component';


//define o a página inicial
if (window.sessionStorage.permissao_dashboard_campanha) {
  var home: string = 'dashboard-campanha';
} else if (window.sessionStorage.permissao_pendencia_fisico) {
  home = 'pendencia-fisico';
} else if (window.sessionStorage.permissao_esteira_producao) {
  home = 'esteira-producao';
} else if (window.sessionStorage.permissao_cadastro_financeiro) {
  home = 'financeiro';
} else if (window.sessionStorage.permissao_cadastro_financeiro) {
  home = 'tabela-comissao';
} else if (window.sessionStorage.permissao_tabela_comissao) {
  home = 'cadastros/parceiro-negocio';
} else if (window.sessionStorage.permissao_cadastro_cliente) {
  home = 'cadastros/clientes';
} else if (window.sessionStorage.permissao_cadastro_parceiro_negocio) {
  home = 'cadastros/parceiro-negocio';
} else if (window.sessionStorage.permissao_cadastro_plano_de_contas) {
  home = 'cadastros/plano-contas';
} else if (window.sessionStorage.permissao_cadastro_centro_de_custos) {
  home = 'cadastros/centro-custos';
} else if (window.sessionStorage.permissao_cadastro_projetos) {
  home = 'cadastros/projetos';
} else if (window.sessionStorage.permissao_cadastro_tipo_conta_corrente) {
  home = 'cadastros/tipo-conta-corrente';
} else if (window.sessionStorage.permissao_cadastro_lojas) {
  home = 'cadastros/lojas';
} else if (window.sessionStorage.permissao_cadastro_tipo_lojas) {
  home = 'cadastros/tipo-lojas';
} else if (window.sessionStorage.permissao_cadastro_tipo_canal_vendas) {
  home = 'cadastros/tipo-canal-vendas';
} else if (window.sessionStorage.permissao_cadastro_tipo_canal_vendas) {
  home = 'cadastros/configuracoes';
};

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

    /*{
      path: 'grafico',
      component: GraficoComponent,
    },*/

    {
      path: 'pendencia-fisico',
      component: PendenciaComponent,
    },

    {
      path: 'esteira-producao',
      component: EsteiraProducaoComponent,
    },

    {
      path: 'tabela-comissao',
      component: TabelaComissaoComponent,
    },

    {
      path: 'financeiro',
      component: FinanceiroComponent,
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
      path: 'cadastros/centro-custos',
      component: CentroCustosComponent,
    },

    {
      path: 'cadastros/projetos',
      component: ProjetosComponent,
    },

    {
      path: 'cadastros/tipo-conta-corrente',
      component: TipoContaCorrenteComponent,
    },

    {
      path: 'cadastros/lojas',
      component: LojasComponent,
    },

    {
      path: 'cadastros/tipo-lojas',
      component: TipoLojaComponent,
    },

    {
      path: 'cadastros/canal-vendas',
      component: CanalVendasComponent,
    },

    {
      path: 'cadastros/configuracoes',
      component: ConfiguracoesComponent,
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
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
