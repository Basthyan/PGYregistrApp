import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatInputModule],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
