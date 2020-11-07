import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { pluck } from 'rxjs/operators';
import { PopularTagType } from '../../../types/popularTag.type';

@Injectable()
export class PopularTagsService {
    constructor(private http: HttpClient) {}

    getPopularTags(): Observable<PopularTagType[]> {
        return this.http
            .get<PopularTagType[]>(`${environment.apiUrl}/tags`)
            .pipe(pluck('tags'));
    }
}
