import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from '../store/actions/getFeed.action';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import {
    errorSelector,
    feedSelector,
    isLoadingSelector,
} from '../store/selectors';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { parseUrl, stringify } from 'query-string';

@Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnChanges {
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
        //console.log('apiUrlProps', this.apiUrlProps);
    }

    ngOnChanges(changes: SimpleChanges): void {
        const {
            apiUrlProps: { firstChange, currentValue, previousValue },
        } = changes;

        const isApiUrlChanged = !firstChange && currentValue !== previousValue;
        if (isApiUrlChanged) {
            this.fetchFeed();
        }
    }

    initializeListener(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.currentPage = Number(params.page || '1');
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
        //console.log('parsedUrl', parsedUrl);
        const stingifiedParams = stringify({
            limit: this.limit,
            offset: offset,
            ...parsedUrl.query,
        });
        //console.log('stingifiedParams', stingifiedParams);
        const apiUrlWithParams = `${parsedUrl.url}?${stingifiedParams}`;
        //console.log('apiUrlWithParams', apiUrlWithParams);
        this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
    }
}
