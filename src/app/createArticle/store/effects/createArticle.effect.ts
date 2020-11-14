import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CreateArticleService } from '../../services/createArticle.service';
import {
    createArticleAction,
    createArticleFailureAction,
    createArticleSuccessAction,
} from '../actions/createArticle.action';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

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
                        catchError((errorsResponse: BackendErrorsInterface) => {
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

    redirectAfterCreate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createArticleSuccessAction),
            tap(({ article }) => {
                this.router.navigate(['/articles', article.slug]);
            })
        )
    );

    constructor(
        private actions$: Actions,
        private createArticleService: CreateArticleService,
        private router: Router
    ) {}
}
