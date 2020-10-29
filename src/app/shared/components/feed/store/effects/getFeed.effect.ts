import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { FeedServices } from '../../services/feed.services';
import {
    getFeedAction,
    getFeedFailureAction,
    getFeedSuccessAction,
} from '../actions/getFeed.action';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffect {
    getFeedEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getFeedAction),
            switchMap(({ url }) => {
                return this.feedServices.getFeed(url).pipe(
                    map((feed: GetFeedResponseInterface) => {
                        return getFeedSuccessAction({ feed });
                    }),
                    catchError(() => {
                        return of(getFeedFailureAction());
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private feedServices: FeedServices
    ) {}
}
