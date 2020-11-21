import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { addToFavoritesAction } from '../store/actions/addToFavorites.sction';
import { Observable } from 'rxjs';
import { currentUserSelector } from '../../../../auth/store/selectors';
import { CurrentUserInterface } from '../../../types/currentUser.interface';

@Component({
    selector: 'mc-add-to-favorites',
    templateUrl: './addToFavorites.component.html',
})
export class AddToFavoritesComponent implements OnInit {
    @Input('isFavorited') isFavoritesProps: boolean;
    @Input('articleSlug') articleSlugProps: string;
    @Input('favoritesCount') favoritesCountProps: number;

    favoritesCount: number;
    isFavorited: boolean;
    isLoggedIn$: Observable<CurrentUserInterface>;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.favoritesCount = this.favoritesCountProps;
        this.isFavorited = this.isFavoritesProps;
        this.isLoggedIn$ = this.store.pipe(select(currentUserSelector));
    }

    handleLike() {
        this.store.dispatch(
            addToFavoritesAction({
                isFavorited: this.isFavorited,
                slug: this.articleSlugProps,
            })
        );

        if (this.isFavorited) {
            this.favoritesCount = this.favoritesCount - 1;
        } else {
            this.favoritesCount = this.favoritesCount + 1;
        }
        this.isFavorited = !this.isFavorited;
    }
}
