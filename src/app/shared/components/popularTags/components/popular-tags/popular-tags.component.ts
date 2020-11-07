import { Component, OnInit } from '@angular/core';
import { getPopularTagsAction } from '../../store/actions/getPopularTags.action';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PopularTagType } from '../../../../types/popularTag.type';
import {
    isLoadingSelector,
    popularTagsSelector,
    errorSelector,
} from '../../store/selectors';

@Component({
    selector: 'mc-popular-tags',
    templateUrl: './popular-tags.component.html',
})
export class PopularTagsComponent implements OnInit {
    popularTags$: Observable<PopularTagType[] | null>;
    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.initializeValues();
        this.fetchData();
    }

    fetchData(): void {
        this.store.dispatch(getPopularTagsAction());
    }
    initializeValues(): void {
        this.popularTags$ = this.store.pipe(select(popularTagsSelector));
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
    }
}
