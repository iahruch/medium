import { NgModule } from '@angular/core';
import { FeedComponent } from './feed.component';
import { FeedServices } from './services/feed.services';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/effects/getFeed.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '../errorMessage/errorMessage.module';
import { LoadingModule } from '../loading/errorMessage.module';

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetFeedEffect]),
        StoreModule.forFeature('feed', reducers),
        RouterModule,
        ErrorMessageModule,
        LoadingModule,
    ],
    declarations: [FeedComponent],
    exports: [FeedComponent],
    providers: [FeedServices],
})
export class FeedModule {}
