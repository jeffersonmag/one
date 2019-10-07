import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../services/session.service';
import { MENU_ITEMS } from './pages-menu';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS; 

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {  }  

  ngOnInit() {
    const token = this.sessionService.get('token');
    //console.log('meu token');
    //console.log(token);
    if (!token) {
      this.router.navigate(['/']);
    }
  }

}
