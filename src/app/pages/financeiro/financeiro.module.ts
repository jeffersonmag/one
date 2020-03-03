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
import { ThemeModule } from '../../@theme/theme.module';
import { PipesModule } from '../../pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { FinanceiroComponent } from './financeiro.component';
import { CadastroFinanceiroComponent } from './cadastro-financeiro/cadastro-financeiro.component';
import { StatusComponent } from '../financeiro/status/status.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { AdicionarParcelasComponent } from './cadastro-financeiro/adicionar-parcelas/adicionar-parcelas.component';

@NgModule({
  declarations: [FinanceiroComponent, CadastroFinanceiroComponent, StatusComponent, AdicionarParcelasComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    NbSearchModule,
    NbAutocompleteModule,
    NbDatepickerModule,
    NgbPaginationModule],
  entryComponents: [],
  providers: [NgbActiveModal],
})
export class FinanceiroModule { }

export class PageModule { }