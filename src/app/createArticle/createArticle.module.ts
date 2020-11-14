import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateAticleComponent } from './components/createArticle/createAticle.component';
import { ArticleFormModule } from '../shared/components/articleForm/articleForm.module';
import { CreateArticleService } from './services/createArticle.service';
import { EffectsModule } from '@ngrx/effects';
import { CreateArticleEffect } from './store/effects/createArticle.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';

const routes: Routes = [
    {
        path: 'articles/new',
        component: CreateAticleComponent,
    },
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ArticleFormModule,
        EffectsModule.forFeature([CreateArticleEffect]),
        StoreModule.forFeature('createArticle', reducers),
    ],
    declarations: [CreateAticleComponent],
    providers: [CreateArticleService],
})
export class CreateArticleModule {}
