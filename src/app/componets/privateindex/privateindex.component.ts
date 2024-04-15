import { Component, Output, EventEmitter, input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { Store, select } from '@ngrx/store';
import {
  fillStateCarProducts,
  removeProductFromCart,
} from '../../store/product.action';
import { LoginResponse } from '../../interfaces/login';
import { AppState } from '../../app.state';
import { LoginComponent } from '../login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearcherComponent } from '../searcher/searcher.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addFavorite, removeFavorite } from '../../store/favorite.actions';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-privateindex',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    NgbModule,
    SearcherComponent,
    FormsModule,
    ProductDetailsComponent,
  ],
  templateUrl: './privateindex.component.html',
  styleUrl: './privateindex.component.css',
})
export class PrivateindexComponent {
  //variables
  maxRating: number = 5;
  readOnly: boolean = true;
  isFavorite$: Observable<boolean>;
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  query: string = '';
  verification: LoginResponse = {} as LoginResponse;
  products: Product[] = [];
  newProductCar: Product[] = [];
  moveFavoriteProduct: Product = {
    price: 0,
  };

  constructor(
    private productService: ProductsService,
    private store: Store<AppState>,
    private modalService: NgbModal
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

  ngOnInit() {
    //ngrx subscribe for changes
    this.store
      .pipe(select('loggedIn'))
      .subscribe((respuesta: LoginResponse) => {
        // console.log(respuesta);
        this.verification = respuesta;
        // console.log(this.verification);
        // console.log('esta vivo desde private index');
        this.filteredProducts = this.products;
      });

    //call api
    this.productService.getProducts().subscribe({
      next: (value: Product[]) => {
        this.products = value;
        // console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.filteredProducts = this.products;
  }

  //logic personal pag
  handleCardClick(product: Product) {
    const modalRef = this.modalService.open(ProductDetailsComponent, {
      windowClass: 'modal-custom',
    });
    modalRef.componentInstance.messageFromParent = product;
    // console.log(product);
  }

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

  //logic add car
  productCar(newProductCar: Product) {
    // console.log('hize click en un producto');
    // console.log(newProductCar);
    this.store.dispatch(fillStateCarProducts({ carData: newProductCar }));
  }
  //logic search
  search() {
    this.filteredProducts = this.products?.filter(
      (product) =>
        product.title &&
        product.title.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  //logic category filter
  filtrarProductos(event: any): void {
    console.log(event.value);
    const categoriaSeleccionada: string = event?.value; // Utiliza el tipo 'any' para evitar el error
    if (categoriaSeleccionada === 'Categorias') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.category === categoriaSeleccionada
      );
    }
  }
}
