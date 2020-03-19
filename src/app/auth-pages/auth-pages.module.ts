import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPagesRoutingModule } from './auth-pages-routing.module';
import { LoginComponent } from './login/login.component';
import {ComponentsModule} from '../components/components.module';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import {NgxLoadingModule} from 'ngx-loading';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthPagesRoutingModule,
    ComponentsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class AuthPagesModule { }
