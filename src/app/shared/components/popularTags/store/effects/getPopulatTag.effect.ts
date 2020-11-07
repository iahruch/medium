import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    getPopularTagsAction,
    getPopularTagsActionFailure,
    getPopularTagsActionSuccess,
} from '../actions/getPopularTags.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PopularTagsService } from '../../services/popularTags.service';
import { of } from 'rxjs';
import { PopularTagType } from '../../../../types/popularTag.type';

@Injectable()
export class GetPopulatTagEffect {
    getPopularTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getPopularTagsAction),
            switchMap(() => {
                return this.popularTagsService.getPopularTags().pipe(
                    map((popularTags: PopularTagType[]) => {
                        return getPopularTagsActionSuccess({ popularTags });
                    }),
                    catchError(() => of(getPopularTagsActionFailure()))
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private popularTagsService: PopularTagsService
    ) {}
}
