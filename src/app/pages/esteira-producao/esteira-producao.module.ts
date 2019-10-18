import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbAlertModule,
  NbIconModule,
  NbListModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbUserModule,
  NbStepperModule,
  NbTreeGridModule,
  NbTooltipModule,
  NbDialogModule,
  NbWindowModule,
  NbCheckboxModule,
  NbInputModule,
  NbPopoverModule,
  NbDialogRef,
  NbSearchService,
  NbSearchModule
} from '@nebular/theme';
import { NgbPaginationModule, NgbModalModule, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { EsteiraProducaoComponent, CustomModalOptions } from './esteira-producao.component';
import { ThemeModule } from '../../@theme/theme.module';
import { PipesModule } from '../../pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { EsteiraProducaoRoutingModule, routedComponents } from './esteira-producao-routing.module';
import { BaseHistoricaComponent } from './base-historica/base-historica.component';
import { SolucaoInconsistenciasComponent } from './solucao-inconsistencias/solucao-inconsistencias.component';
import { StatusCardComponent } from './status-card/status-card.component';

@NgModule({
  declarations: [
    EsteiraProducaoComponent,
    BaseHistoricaComponent,
    SolucaoInconsistenciasComponent,
    ...routedComponents,
    SolucaoInconsistenciasComponent,
    StatusCardComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ThemeModule,
    NbAlertModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    PipesModule,
    NbSpinnerModule,
    NbProgressBarModule,
    NbStepperModule,
    HttpClientModule,
    NbTreeGridModule,
    NbTooltipModule,
    NbDialogModule,
    NbWindowModule,
    NbPopoverModule,
    NbCheckboxModule,
    NbInputModule,
    EsteiraProducaoRoutingModule,
    NgbModalModule,
    NgbPaginationModule,
    NbSearchModule
  ],
  entryComponents: [BaseHistoricaComponent],
  providers: [CustomModalOptions, NgbActiveModal]
})
export class EsteiraProducaoModule { }

export class PageModule { }