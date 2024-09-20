import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDanisoftUtilsModule } from 'ngx-danisoft-utils';
import { AuthRoutes } from './auth.routing';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxDanisoftUtilsModule,
  ],
})
export class AuthModule {}
