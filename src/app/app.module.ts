import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import pt from '@angular/common/locales/pt';
registerLocaleData(pt);
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbStepperModule,
  NbSelectModule,
  NbProgressBarModule,
  NbTreeGridModule,
  NbCardModule,
  NbCheckboxModule,
  NbRadioModule,
  NbButtonModule,
  NbActionsModule,
  NbUserModule,
  NbIconModule,
} from '@nebular/theme';

import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipesModule } from './pipes/pipes.module';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgIdleModule } from '@ng-idle/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCpfCnpjModule } from 'ngx-cpf-cnpj';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";

export let options: Partial<IConfig> | (() => Partial<IConfig>) = {};

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};


/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
@NgModule({
  declarations: [
    AppComponent,
    /*FormInputsComponent,
    FormLayoutsComponent,
    ButtonsComponent,
    DatepickerComponent*/
  ],
  imports: [HttpClientModule,
    NgbToastModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    FormsModule,
    NbStepperModule,
    NbSidebarModule.forRoot(),
    NbSelectModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    PipesModule,
    HttpClientModule,
    NgbModule,
    NgIdleKeepaliveModule.forRoot(),
    NgIdleModule,
    NbProgressBarModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    NgxMaskModule.forRoot(options),
    NbDateFnsDateModule.forRoot({ format: 'dd/MM/yyyy' }),
    BrowserAnimationsModule,
    BrowserModule,
    NgxCpfCnpjModule,
    NbCardModule,
    NbCheckboxModule,
    NbRadioModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbIconModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NbSidebarModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

export class PageModule { }


export class CadastroModule { }


