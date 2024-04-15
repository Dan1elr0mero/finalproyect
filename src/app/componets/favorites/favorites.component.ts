import { Component, Output, EventEmitter, input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { addFavorite, removeFavorite } from '../../store/favorite.actions';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  products$: Observable<Product[]> | undefined;
  showFavoriteProducs: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    //ngrx subscribe for changes
    this.products$ = this.store.select((state) => state.FavoriteProducts);
  }

  closeFavoriteProducs() {
    this.showFavoriteProducs = false;
  }

  //logic unfavorite product
  UnfavoriteProduct(product: Product) {
    this.store.dispatch(removeFavorite({ product: product }));
  }
}
