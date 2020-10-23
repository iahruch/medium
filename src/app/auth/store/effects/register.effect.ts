import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.action';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { PersistanceService } from '../../../shared/services/persistance.service';


@Injectable()
export class RegisterEffect {

  register$ = createEffect( () =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap( ({request}) => {
        return this.authService.register(request).pipe(
          map( (currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return  registerSuccessAction({currentUser});
          }),
          catchError( (errorResponse: HttpErrorResponse) => {
            return of(registerFailureAction({errors: errorResponse.error.errors }));
          })
        );
      })
    )
  );

  redirestAfterSubmit$ = createEffect( () => this.actions$.pipe(
    ofType(registerSuccessAction),
    tap(() => this.router.navigate(['/']) )
  ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router,
  ){}


}
