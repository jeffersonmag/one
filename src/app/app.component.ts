/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import ptMessages from 'devextreme/localization/messages/pt.json';
import { locale, loadMessages } from 'devextreme/localization';
import config from 'devextreme/core/config';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ptBR');
    loadMessages(ptMessages);
    locale(navigator.language);
    config({ decimalSeparator: ',' , thousandsSeparator: '.' });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
  }
}
