import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers';
import { AuthService } from './services/auth.service';
import { RegisterEffect } from './store/effects/register.effect';
import { SharedModule } from '../shared/shared.module';
import { PersistanceService } from '../shared/services/persistance.service';
import { LoginComponent } from './components/login/login.component';
import { LoginEffect } from './store/effects/login.effect';
import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { UpdateCurrentUserEffect } from './store/effects/updateCurrentUser.effect';
import { LogoutEffect } from './store/effects/logout.effect';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
];

@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('auth', reducer),
        EffectsModule.forFeature([
            RegisterEffect,
            LoginEffect,
            GetCurrentUserEffect,
            UpdateCurrentUserEffect,
            LogoutEffect,
        ]),
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [AuthService, PersistanceService],
})
export class AuthModule {}
