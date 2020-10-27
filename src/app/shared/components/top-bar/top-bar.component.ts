import { Component, OnInit } from '@angular/core';
import {
    currentUserSelector,
    isAnonymousSelector,
    isLoggedInSelector,
} from '../../../auth/store/selectors';
import { select, Store } from '@ngrx/store';

@Component({
    selector: 'mc-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
    constructor(private store: Store) {}

    isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    currentUser$ = this.store.pipe(select(currentUserSelector));

    ngOnInit(): void {}
}
