import { Component } from '@angular/core';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { ArticleInputInterface } from '../../../shared/types/articleInput.interface';

@Component({
    selector: 'mc-create-article',
    templateUrl: './createArticle.component.html',
})
export class CreateAticleComponent {
    initDataTest: ArticleInputInterface = {
        title: 'Test title',
        description: 'Test description',
        body: 'Lorem text lorem lorem lore',
        tagList: ['Hitler', 'dragon'],
    };

    onSubmit(res: any): void {
        console.log('Component CreateAticleComponent', res);
    }
}
