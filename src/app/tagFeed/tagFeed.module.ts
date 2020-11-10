import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedModule } from '../shared/components/feed/feed.module';
import { BannerModule } from '../shared/components/banner/banner.module';
import { PopularTagsModule } from '../shared/components/popularTags/popularTags.module';
import { FeedTogglerModule } from '../shared/components/feedToggler/feedToggler.module';
import { TagFeedComponent } from './components/tagFeed/tagFeed.component';

const routes = [
    {
        path: 'tags/:slug',
        component: TagFeedComponent,
    },
];

@NgModule({
    declarations: [TagFeedComponent],
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
export class TagFeedModule {}
