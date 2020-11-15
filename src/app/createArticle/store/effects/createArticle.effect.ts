import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    createArticleAction,
    createArticleFailureAction,
    createArticleSuccessAction,
} from '../actions/createArticle.action';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CreateArticleService } from '../../services/createArticle.service';
import { Router } from '@angular/router';
import { ArticleInterface } from '../../../shared/types/article.interface';

@Injectable()
export class CreateArticleEffect {
    createAticleEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createArticleAction),
            switchMap(({ articleInput }) => {
                return this.createArticleService
                    .createArticle(articleInput)
                    .pipe(
                        map((article: ArticleInterface) => {
                            return createArticleSuccessAction({ article });
                        }),
                        catchError((errorsResponse: any) => {
                            return of(
                                createArticleFailureAction({
                                    errors: errorsResponse.error.errors,
                                })
                            );
                        })
                    );
            })
        )
    );

    redirectAfterCreate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(createArticleSuccessAction),
                tap(({ article }) => {
                    this.router.navigate(['/articles', article.slug]);
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private createArticleService: CreateArticleService,
        private router: Router
    ) {}
}
