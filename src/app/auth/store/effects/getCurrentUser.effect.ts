import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { PersistanceService } from '../../../shared/services/persistance.service';
import {
    getCurrentUserAction,
    getCurrentUserFailureAction,
    getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.action';

@Injectable()
export class GetCurrentUserEffect {
    getCurrentUserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCurrentUserAction),
            switchMap(() => {
                const token = this.persistanceService.get('accessToken');
                console.log({ token });
                if (!token) {
                    return of(getCurrentUserFailureAction());
                }

                return this.authService.getCurrentUser().pipe(
                    map((currentUser: CurrentUserInterface) => {
                        return getCurrentUserSuccessAction({ currentUser });
                    }),
                    catchError(() => {
                        return of(getCurrentUserFailureAction());
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private persistanceService: PersistanceService,
        private authService: AuthService
    ) {}
}
