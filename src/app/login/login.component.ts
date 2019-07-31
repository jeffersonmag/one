import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  styleUrls: ['login.component.scss'],
  template: `
  <ngx-default-column-layout>
    <router-outlet></router-outlet>
  </ngx-default-column-layout>
`,
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
