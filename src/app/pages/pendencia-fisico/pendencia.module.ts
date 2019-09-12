import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  NbUserModule,
  NbStepperModule,

} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PendenciaComponent } from './pendencia.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbModalModule, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    FormsModule,
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
    NgxEchartsModule,
    PipesModule,
    NbSpinnerModule,
    NbProgressBarModule,
    NbStepperModule,
    HttpClientModule,
    NgbPaginationModule
  ],
  declarations: [
    PendenciaComponent,
  ],
})
export class PendenciaModule { }

export class PageModule { }

export class SelectLabelShowcaseComponent {
  selectedItem;
}
