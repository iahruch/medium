import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';

import { reducers } from './store/reducers';
import { ErrorMessageModule } from '../errorMessage/errorMessage.module';
import { LoadingModule } from '../loading/loading.module';
import { ArticleService as SharedArticleServices } from '../../services/article.services';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { ArticleComponent } from './components/article.component';
import { TagListModule } from '../tagList/tagList.module';
import { ArticleService } from './services/art.service';
import { DeleteArticleEffect } from './store/effects/deleteArticle.effect';

const routes: Routes = [
    {
        path: 'articles/:slug',
        component: ArticleComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
        StoreModule.forFeature('article', reducers),
        RouterModule.forChild(routes),
        RouterModule,
        ErrorMessageModule,
        LoadingModule,
        TagListModule,
    ],
    declarations: [ArticleComponent],
    exports: [],
    providers: [SharedArticleServices, ArticleService],
})
export class ArticleModule {}
