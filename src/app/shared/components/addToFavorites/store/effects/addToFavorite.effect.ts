import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddToFavoritesService } from '../../services/addToFavorites.service';
import {
    addToFavoritesAction,
    addToFavoritesFailureAction,
    addToFavoritesSuccessAction,
} from '../actions/addToFavorites.sction';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ArticleInterface } from '../../../../types/article.interface';
import { of } from 'rxjs';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AddToFavoriteEffect {
    addToFavoriteEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addToFavoritesAction),
            switchMap(({ isFavorited, slug }) => {
                const article$ = isFavorited
                    ? this.addToFavoritesService.removeFromFavorites(slug)
                    : this.addToFavoritesService.addToFavorites(slug);

                return article$.pipe(
                    map((article: ArticleInterface) => {
                        return addToFavoritesSuccessAction({ article });
                    }),
                    catchError(() => of(addToFavoritesFailureAction()))
                );
            })
        );
    });

    constructor(
        private actions$: Actions,
        private addToFavoritesService: AddToFavoritesService,
        private authService: AuthService,
        private router: Router
    ) {}
}
