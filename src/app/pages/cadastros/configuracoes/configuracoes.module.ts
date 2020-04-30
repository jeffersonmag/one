import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  NbSearchModule,
  NbAutocompleteModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { ConfiguracoesReceberComponent } from './configuracoes-receber/configuracoes-receber.component';
import { ConfiguracoesPagarComponent } from './configuracoes-pagar/configuracoes-pagar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPaginationModule, NgbModalModule, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../../../pipes/pipes.module';
import { NbDateFnsDateModule } from '@nebular/date-fns';



@NgModule({
  declarations: [ConfiguracoesReceberComponent, ConfiguracoesPagarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    CommonModule,
    NbSelectModule,
    NbAlertModule,
    BrowserModule,
    NbTabsetModule,
    NbAutocompleteModule,
    NgSelectModule,
    NbDateFnsDateModule,
    NbDatepickerModule,
    NbCardModule,
    PipesModule,
    NgbPaginationModule,
  ],
  entryComponents: [ConfiguracoesReceberComponent, ConfiguracoesPagarComponent],
})
export class ConfiguracoesModule { }
