import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsComponet } from './components/settings/settings.componet';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BackendErrorsMsgComponent } from '../shared/components/backendErrorsMsg/backendErrorsMsg.component';

const routes = [
    {
        path: 'settings',
        component: SettingsComponet,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('settings', reducers),
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [SettingsComponet],
})
export class SettingsModule {}
