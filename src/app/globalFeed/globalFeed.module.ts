import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FeedModule } from '../shared/components/feed/feed.module';
import { BannerModule } from '../shared/components/banner/banner.module';
import { PopularTagsModule } from '../shared/components/popularTags/popularTags.module';
import { FeedTogglerModule } from '../shared/components/feedToggler/feedToggler.module';
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';

const routes = [
    {
        path: '',
        component: GlobalFeedComponent,
    },
];

@NgModule({
    declarations: [GlobalFeedComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FeedModule,
        BannerModule,
        PopularTagsModule,
        FeedTogglerModule,
    ],
    exports: [],
})
export class GlobalFeedModule {}
