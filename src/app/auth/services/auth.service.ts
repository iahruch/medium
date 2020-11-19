import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { pluck } from 'rxjs/operators';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserInputInterface } from '../../shared/types/currentUserInput.interface';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        return this.http
            .post<AuthResponseInterface>(` ${environment.apiUrl}/users`, data)
            .pipe(pluck('user'));
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
        return this.http
            .post<AuthResponseInterface>(
                `${environment.apiUrl}/users/login`,
                data
            )
            .pipe(pluck('user'));
    }

    getCurrentUser(): Observable<CurrentUserInterface> {
        return this.http.get(`${environment.apiUrl}/user`).pipe(pluck('user'));
    }

    updateCurrentUser(
        currentUserInput: CurrentUserInputInterface
    ): Observable<CurrentUserInterface> {
        return this.http
            .put(`${environment.apiUrl}/user`, currentUserInput)
            .pipe(pluck('user'));
    }
}

//https://conduit.productionready.io/api/user
