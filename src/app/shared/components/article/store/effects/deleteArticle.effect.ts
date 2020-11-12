import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ArticleService } from '../../services/art.service';
import {
    deleteArticleAction,
    deleteArticleFailureAction,
    deleteArticleSuccessAction,
} from '../actions/deleteArticle.action';
import { Router } from '@angular/router';

@Injectable()
export class DeleteArticleEffect {
    deleteArticleEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteArticleAction),
            switchMap(({ slug }) => {
                return this.articleService.deleteArticle(slug).pipe(
                    map(() => {
                        return deleteArticleSuccessAction();
                    }),
                    catchError(() => {
                        return of(deleteArticleFailureAction());
                    })
                );
            })
        )
    );

    redirectAfterDeleteArticle$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(deleteArticleSuccessAction),
                tap(() => {
                    this.router.navigateByUrl('/');
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private articleService: ArticleService,
        private router: Router
    ) {}
}
