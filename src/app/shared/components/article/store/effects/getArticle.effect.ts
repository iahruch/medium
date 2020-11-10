import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ArticleServices as SharedArticleService } from '../../../../services/article.services';
import { ArticleInterface } from '../../../../types/article.interface';
import {
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction,
} from '../actions/getArticle.action';

@Injectable()
export class GetArticleEffect {
    getArticleEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getArticleAction),
            switchMap(({ slug }) => {
                return this.sharedArticleServices.getArticle(slug).pipe(
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
        private sharedArticleServices: SharedArticleService
    ) {}
}
