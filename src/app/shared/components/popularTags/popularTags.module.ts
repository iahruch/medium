import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { HttpClientModule } from '@angular/common/http';
import { PopularTagsService } from './services/popularTags.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GetPopulatTagEffect } from './store/effects/getPopulatTag.effect';
import { reducers } from './store/reducers';
import { LoadingModule } from '../loading/loading.module';
import { ErrorMessageModule } from '../errorMessage/errorMessage.module';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [PopularTagsComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('popularTags', reducers),
        EffectsModule.forFeature([GetPopulatTagEffect]),
        LoadingModule,
        ErrorMessageModule,
        RouterModule,
    ],
    declarations: [PopularTagsComponent],
    providers: [PopularTagsService],
})
export class PopularTagsModule {}
