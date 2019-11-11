import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardCampanhaComponent } from './dashboard-campanha/dashboard-campanha.component';
import { PagesComponent } from './pages.component';
import { PendenciaComponent } from './pendencia-fisico/pendencia.component';
import { EsteiraProducaoComponent } from './esteira-producao/esteira-producao.component';

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

    //{
    //  path: 'esteira-producao',
    //  loadChildren: () => import('./esteira-producao/esteira-producao.module')
    //    .then(m => m.EsteiraProducaoModule),
    //},
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

    /*{
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },*/

    {
      path: '',
      redirectTo: 'dashboard-campanha',
      pathMatch: 'full',
    },

    {
      path: '',
      redirectTo: 'pendencia-fisico',
      pathMatch: 'full',
    },

    {
      path: '',
      redirectTo: 'esteira-producao',
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
