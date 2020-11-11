import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { GetArticleResponseInterface } from '../types/getArticleResponse.interface';
import { pluck } from 'rxjs/operators';
import { ArticleInterface } from '../types/article.interface';

@Injectable()
export class ArticleServices {
    constructor(private http: HttpClient) {}

    getArticle(slug: string): Observable<ArticleInterface> {
        const fullUrl = `${environment.apiUrl}/articles/${slug}`;
        return this.http
            .get<GetArticleResponseInterface>(fullUrl)
            .pipe(pluck('article'));
    }
}
