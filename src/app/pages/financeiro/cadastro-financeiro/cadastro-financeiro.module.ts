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
import { NgbPaginationModule, NgbModalModule, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { CadastroFinanceiroComponent } from './cadastro-financeiro.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { AdicionarParcelasComponent } from './adicionar-parcelas/adicionar-parcelas.component';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [CadastroFinanceiroComponent, AdicionarParcelasComponent],
  imports: [
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
  entryComponents: [AdicionarParcelasComponent],
  providers: [NgbActiveModal],
})
export class CadastroFinanceiroModule { }

export class PageModule { }