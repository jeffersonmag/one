import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from './../@theme/theme.module';
import { DashboardModule } from './../pages/dashboard/dashboard.module';
import { ButtonsComponent } from './../pages/forms/buttons/buttons.component';
import { DatepickerComponent } from './../pages/forms/datepicker/datepicker.component';
import { FormInputsComponent } from './../pages/forms/form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './../pages/forms/form-layouts/form-layouts.component';
import { FormsRoutingModule } from './../pages/forms/forms-routing.module';
import { FormsComponent } from './../pages/forms/forms.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { TelaComponent } from './tela/tela.component';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
@NgModule({
  declarations: [
    LoginComponent,
    TelaComponent,
    FormsComponent,
    FormInputsComponent,
    FormLayoutsComponent,
    ButtonsComponent,
    DatepickerComponent,
  ],
  imports: [
    LoginRoutingModule,
    DashboardModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    FormsModule,
  ],
})
export class LoginModule {
}
