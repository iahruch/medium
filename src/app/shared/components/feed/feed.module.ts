import { NgModule } from '@angular/core';
import { FeedComponent } from './feed.component';
import { FeedServices } from './services/feed.services';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/effects/getFeed.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetFeedEffect]),
        StoreModule.forFeature('feed', reducers),
    ],
    declarations: [FeedComponent],
    exports: [FeedComponent],
    providers: [FeedServices],
})
export class FeedModule {}
