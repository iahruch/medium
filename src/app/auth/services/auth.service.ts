import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { pluck } from 'rxjs/operators';


@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return  this.http.post<AuthResponseInterface>(` ${environment.apiUrl}/users`, data )
      .pipe(pluck('user'));
  }
}
