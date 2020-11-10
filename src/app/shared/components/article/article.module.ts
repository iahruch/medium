import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { reducers } from './store/reducers';
import { ErrorMessageModule } from '../errorMessage/errorMessage.module';
import { LoadingModule } from '../loading/loading.module';
import { ArticleServices } from '../../services/article.services';
import { GetArticleEffect } from './store/effects/getArticle.effect';

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetArticleEffect]),
        StoreModule.forFeature('article', reducers),
        RouterModule,
        ErrorMessageModule,
        LoadingModule,
    ],
    declarations: [],
    exports: [],
    providers: [ArticleServices],
})
export class ArticleModule {}
