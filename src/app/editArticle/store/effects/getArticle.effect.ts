import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ArticleInterface } from '../../../shared/types/article.interface';

import { ArticleService as SharedArticleService } from '../../../shared/services/article.services';
import {
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction,
} from '../actions/getArticle.action';

@Injectable()
export class GetArticleEffect {
    getAticleEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getArticleAction),
            switchMap(({ slug }) => {
                return this.sharedArticleService.getArticle(slug).pipe(
                    map((article: ArticleInterface) => {
                        return getArticleSuccessAction({ article });
                    }),
                    catchError(() => {
                        return of(getArticleFailureAction());
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private sharedArticleService: SharedArticleService
    ) {}
}
