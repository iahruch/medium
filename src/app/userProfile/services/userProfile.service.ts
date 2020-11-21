import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileInterface } from '../../shared/types/profile.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable()
export class UserProfileService {
    constructor(private http: HttpClient) {}
    getUserProfile(slug: String): Observable<ProfileInterface> {
        return this.http
            .get(`${environment.apiUrl}/profiles/${slug}`)
            .pipe(pluck('profile'));
    }
}
