import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleInterface } from '../../../types/article.interface';
import { environment } from '../../../../../environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable()
export class AddToFavoritesService {
    constructor(private http: HttpClient) {}

    addToFavorites(slug: string): Observable<ArticleInterface> {
        const url = this.getUrl(slug);
        return this.http.post(url, {}).pipe(pluck('article'));
    }

    removeFromFavorites(slug: string): Observable<ArticleInterface> {
        const url = this.getUrl(slug);
        return this.http.delete(url).pipe(pluck('article'));
    }

    getUrl(slug: string): string {
        return `${environment.apiUrl}/articles/${slug}/favorite`;
    }
}
