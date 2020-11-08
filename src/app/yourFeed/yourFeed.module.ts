import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourFeedComponent } from './components/your-feed/your-feed.component';
import { RouterModule } from '@angular/router';
import { FeedModule } from '../shared/components/feed/feed.module';
import { BannerModule } from '../shared/components/banner/banner.module';
import { PopularTagsModule } from '../shared/components/popularTags/popularTags.module';
import { FeedTogglerModule } from '../shared/components/feedToggler/feedToggler.module';

const routes = [
    {
        path: 'feed',
        component: YourFeedComponent,
    },
];

@NgModule({
    declarations: [YourFeedComponent],
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
export class YourFeedModule {}
