import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseHistoricaComponent } from './base-historica/base-historica.component';
import { EsteiraProducaoComponent, CustomModalOptions } from './esteira-producao.component';
import { SolucaoInconsistenciasComponent } from './solucao-inconsistencias/solucao-inconsistencias.component';


const routes: Routes = [
    {
        path: '',
        component: EsteiraProducaoComponent,
        children: [
            {
                path: 'base-historica',
                component: BaseHistoricaComponent,
            }
        ]
    },
    {
        path: '',
        component: EsteiraProducaoComponent,
        children: [
            {
                path: 'solucao-inconsistencias',
                component: SolucaoInconsistenciasComponent,
            }
        ]
    },
    {
        path: '',
        component: CustomModalOptions,
        children: [
            {
                path: 'base-historica',
                component: BaseHistoricaComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EsteiraProducaoRoutingModule { }

export const routedComponents = [
    EsteiraProducaoComponent,
    BaseHistoricaComponent,
    SolucaoInconsistenciasComponent
];