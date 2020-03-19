import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {AdminPageLayoutComponent} from "./layouts/admin-page-layout/admin-page-layout.component";
import {AuthPageLayoutComponent} from "./layouts/auth-page-layout/auth-page-layout.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminPageLayoutComponent,
        children: [
            {
                path: 'admin',
                loadChildren: './admin-pages/admin-pages.module#AdminPagesModule'
            }]
    }, {
        path: '',
        component: AuthPageLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './auth-pages/auth-pages.module#AuthPagesModule'
            }]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
