import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
];

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('auth', reducer),
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class AuthModule {}
