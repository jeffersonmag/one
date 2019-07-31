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
  NbMenuModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from './../@theme/theme.module';
import { DashboardModule } from './../pages/dashboard/dashboard.module';
import { FormsRoutingModule } from './../pages/forms/forms-routing.module';
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
    TelaComponent
  ],
  imports: [
    LoginRoutingModule,
    ThemeModule,
    NbMenuModule,
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
