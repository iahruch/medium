import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavoritesComponent } from './addToFavorites/addToFavorites.component';

@NgModule({
    imports: [CommonModule],
    exports: [AddToFavoritesComponent],
    declarations: [AddToFavoritesComponent],
})
export class AddToFavoritesModule {}
