import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { fillStateCarProducts } from '../../store/product.action';
import { AppState } from '../../app.state';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { addFavorite, removeFavorite } from '../../store/favorite.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  //variables
  productInformation: Product | undefined;
  isFavorite$: Observable<boolean>;
  moveFavoriteProduct: Product = {
    price: 0,
  };

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<AppState>
  ) {
    this.isFavorite$ = this.store.pipe(
      select('FavoriteProducts'),
      map(
        (FavoriteProducts) =>
          !!FavoriteProducts.find(
            (item) => item.id === this.moveFavoriteProduct.id
          )
      )
    );
  }
  @Input() messageFromParent!: Product;
  ngOnInit() {
    console.log('hola desde el hijo');
    console.log(this.messageFromParent);
    this.productInformation = this.messageFromParent;
  }

  cerrarModal() {
    this.activeModal.close();
  }

  //logic favorite button
  //logic favorite button
  Favorite(productFavorite: Product): void {
    this.moveFavoriteProduct = productFavorite;

    this.isFavorite$.pipe(take(1)).subscribe((isFavorite) => {
      if (isFavorite) {
        this.store.dispatch(removeFavorite({ product: productFavorite }));
        console.log('eliminado de favoritos');
      } else {
        this.store.dispatch(addFavorite({ product: productFavorite }));
        console.log('agregado a favoritos');
      }
    });
  }

  productCar(newProductCar: Product) {
    // console.log('hize click en un producto');
    // console.log(newProductCar);
    this.store.dispatch(fillStateCarProducts({ carData: newProductCar }));
  }
}
