import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestService } from '../services/request.service';

import { LoginComponent } from './login.component';
import { TelaComponent } from './tela/tela.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
  children: [
    {
      path: 'login',
      component: TelaComponent,
    },

    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    //{ path: '**', redirectTo: '/login' },
  ],
},
{ path: '**', redirectTo: '/auth/login' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,],
  providers: [RequestService]
})
export class LoginRoutingModule {
}
