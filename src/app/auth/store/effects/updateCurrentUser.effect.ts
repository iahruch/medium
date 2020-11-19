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
import {
    updateCurrentUserAction,
    updateCurrentUserFailureAction,
    updateCurrentUserSuccessAction,
} from '../actions/updateCurrentUser.action';

@Injectable()
export class UpdateCurrentUserEffect {
    updateCurrentUserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCurrentUserAction),
            switchMap(({ currentUserInput }) => {
                return this.authService
                    .updateCurrentUser(currentUserInput)
                    .pipe(
                        map((currentUser: CurrentUserInterface) => {
                            return updateCurrentUserSuccessAction({
                                currentUser,
                            });
                        }),
                        catchError((errorResponse: HttpErrorResponse) => {
                            return of(
                                updateCurrentUserFailureAction({
                                    errors: errorResponse.error.errors,
                                })
                            );
                        })
                    );
            })
        )
    );

    constructor(private actions$: Actions, private authService: AuthService) {}
}
