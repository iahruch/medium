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
import { parseUrl, stringify } from 'query-string';

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
    }

    initializeListener(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.currentPage = Number(params.page || '1');
            //console.log('queryParams ', this.currentPage);
            this.fetchFeed();
        });
    }

    initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.feed$ = this.store.pipe(select(feedSelector));

        this.baseUrl = this.router.url.split('?')[0];
    }

    fetchFeed() {
        const offset = this.currentPage * this.limit - this.limit;
        const parsedUrl = parseUrl(this.apiUrlProps);
        const stingifiedParams = stringify({
            limit: this.limit,
            offset: offset,
            ...parsedUrl.query,
        });
        const apiUrlWithParams = `${this.apiUrlProps}?${stingifiedParams}`;
        this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));

        // console.log('apiUrlWithParams ', apiUrlWithParams);
    }
}
