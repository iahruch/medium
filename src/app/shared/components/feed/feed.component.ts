import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from './store/actions/getFeed.action';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from './types/getFeedResponse.interface';
import {
    errorSelector,
    feedSelector,
    isLoadingSelector,
} from './store/selectors';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
    @Input('apiUrl') apiUrlProps: string;
    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;
    feed$: Observable<GetFeedResponseInterface | null>;

    limit = environment.limit;
    baseUrl: string;
    currentPage: number;
    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initializeValues();
        this.initializeListener();
        this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
    }
    initializeListener(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.currentPage = Number(params.page || '1');
        });
    }
    initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.feed$ = this.store.pipe(select(feedSelector));

        this.baseUrl = this.router.url.split('?')[0];
    }
}
