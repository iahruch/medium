import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateAticleComponent } from './components/createArticle/createAticle.component';
import { ArticleFormModule } from '../shared/components/articleForm/articleForm.module';
import { CreateArticleService } from './services/createArticle.service';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { CreateArticleEffect } from './store/effects/createArticle.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';

const routes = [
    {
        path: 'articles/new',
        component: CreateAticleComponent,
    },
];
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ArticleFormModule,
        EffectsModule.forFeature([CreateArticleEffect]),
        StoreModule.forFeature('createArticle', reducers),
        RouterModule.forChild(routes),
    ],
    declarations: [CreateAticleComponent],
    providers: [CreateArticleService],
})
export class CreateArticleModule {}
