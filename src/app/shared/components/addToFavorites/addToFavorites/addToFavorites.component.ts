import { Component, Input, OnInit } from '@angular/core';

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

    constructor() {}

    ngOnInit(): void {
        this.favoritesCount = this.favoritesCountProps;
        this.isFavorited = this.isFavoritesProps;
    }

    handleLike() {
        if (this.isFavorited) {
            this.favoritesCount = this.favoritesCount - 1;
        } else {
            this.favoritesCount = this.favoritesCount + 1;
        }
        this.isFavorited = !this.isFavorited;
    }
}
