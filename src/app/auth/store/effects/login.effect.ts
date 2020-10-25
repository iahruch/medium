import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { loginAction, loginSuccessAction } from '../actions/login.action';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { registerFailureAction } from '../actions/register.action';
import { PersistanceService } from '../../../shared/services/persistance.service';

@Injectable()
export class LoginEffect {
    loginEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginAction),
            switchMap(({ request }) => {
                return this.authService.login(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        this.persistanceService.set(
                            'accessToken',
                            currentUser.token
                        );
                        return loginSuccessAction({ currentUser });
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(
                            registerFailureAction({
                                errors: errorResponse.error.errors,
                            })
                        );
                    })
                );
            })
        )
    );

    redirestAfterSubmit$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginSuccessAction),
                tap(() => this.router.navigate(['/']))
            ),
        {
            dispatch: false,
        }
    );

    constructor(
        private actions$: Actions,
        private persistanceService: PersistanceService,
        private authService: AuthService,
        private router: Router
    ) {}
}
