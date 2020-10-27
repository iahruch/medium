import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes = [
    {
        path: '',
        component: GlobalFeedComponent,
    },
];

@NgModule({
    declarations: [GlobalFeedComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    exports: [],
})
export class GlobalFeedModule {}
