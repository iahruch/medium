import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditAticleComponent } from './components/editArticle/editAticle.component';
import { ArticleFormModule } from '../shared/components/articleForm/articleForm.module';
import { EditArticleService } from './services/editArticle.service';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArticleService as SharedArticleService } from '../shared/services/article.services';
import { UpdateArticleEffect } from './store/effects/updateArticle.effect';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { reducers } from './store/reducers';
import { LoadingModule } from '../shared/components/loading/loading.module';

const routes = [
    {
        path: 'articles/:slug/edit',
        component: EditAticleComponent,
    },
];
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ArticleFormModule,
        EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
        StoreModule.forFeature('editArticle', reducers),
        RouterModule.forChild(routes),
        LoadingModule,
    ],
    declarations: [EditAticleComponent],
    providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
