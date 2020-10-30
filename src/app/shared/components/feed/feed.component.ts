import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from './store/actions/getFeed.action';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from './types/getFeedResponse.interface';
import { errorSelector, feedSelector, isLoadingSelector } from './store/selectors';

@Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>


  @Input('apiUrl') apiUrlProps: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.store.dispatch(getFeedAction({url: this.apiUrlProps}));
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
  }

}
