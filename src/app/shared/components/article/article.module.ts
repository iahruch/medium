import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Route, RouterModule, Routes } from '@angular/router';

import { reducers } from './store/reducers';
import { ErrorMessageModule } from '../errorMessage/errorMessage.module';
import { LoadingModule } from '../loading/loading.module';
import { ArticleServices } from '../../services/article.services';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { ArticleComponent } from './components/article.component';

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetArticleEffect]),
        StoreModule.forFeature('article', reducers),
        RouterModule.forChild(routes),
        RouterModule,
        ErrorMessageModule,
        LoadingModule,
    ],
    declarations: [ArticleComponent],
    exports: [],
    providers: [ArticleServices],
})
export class ArticleModule {}
