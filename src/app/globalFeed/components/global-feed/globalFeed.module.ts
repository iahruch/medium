import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/global-feed.component';
import { RouterModule } from '@angular/router';
import { FeedModule } from '../../../shared/components/feed/feed.module';

const routes = [
    {
        path: '',
        component: GlobalFeedComponent,
    },
];

@NgModule({
    declarations: [GlobalFeedComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FeedModule],
    exports: [],
})
export class GlobalFeedModule {}
