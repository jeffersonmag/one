import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTooltipModule,
  NbUserModule,
  NbStepperModule,
  NbDialogModule,

} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatInputModule, MatChipsModule, MatIconModule} from '@angular/material';
import {PlatformModule} from '@angular/cdk/platform';

import { ThemeModule } from '../../@theme/theme.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PendenciaComponent } from './pendencia.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbModalModule, NgbModule, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ListagemBorderoComponent } from './listagem-bordero/listagem-bordero.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
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
    NbTooltipModule,
    NgxEchartsModule,
    PipesModule,
    NbSpinnerModule,
    NbProgressBarModule,
    HttpClientModule,
    NgbPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    NbStepperModule,
    NgbModalModule,
    NbDialogModule.forRoot(),
    MatInputModule,
    PlatformModule,
    MatChipsModule,
    MatIconModule,
    NgbModule
  ],
  declarations: [
    PendenciaComponent,
    ListagemBorderoComponent,
  ],
})
export class PendenciaModule { }

export class PageModule { }

export class AppModule { }

export class SelectLabelShowcaseComponent {
  selectedItem;
}
