import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleInterface } from '../../shared/types/article.interface';
import { ArticleInputInterface } from '../../shared/types/articleInput.interface';
import { environment } from '../../../environments/environment';
import { pluck } from 'rxjs/operators';
import { SaveArticleInterface } from '../../shared/types/saveArticle.interface';

@Injectable()
export class EditArticleService {
    constructor(private http: HttpClient) {}

    updateArticle(
        slug: string,
        articleInput: ArticleInputInterface
    ): Observable<ArticleInterface> {
        return this.http
            .put<SaveArticleInterface>(
                `${environment.apiUrl}/articles/${slug}`,
                articleInput
            )
            .pipe(pluck('article'));
    }
}
