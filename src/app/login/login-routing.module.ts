import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}
