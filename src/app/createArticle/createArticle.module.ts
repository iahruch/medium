import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteConfigLoadEnd, RouterModule, Routes } from '@angular/router';
import { CreateAticleComponent } from './components/createArticle/createAticle.component';
import { ArticleFormModule } from '../shared/components/articleForm/articleForm.module';

const routes: Routes = [
    {
        path: 'articles/new',
        component: CreateAticleComponent,
    },
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ArticleFormModule],
    declarations: [CreateAticleComponent],
})
export class CreateArticleModule {}
