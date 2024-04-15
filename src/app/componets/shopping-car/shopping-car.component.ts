import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Product } from '../../interfaces/product';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  fillStateCarProducts,
  removeProductFromCart,
} from '../../store/product.action';

@Component({
  selector: 'app-shopping-car',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-car.component.html',
  styleUrl: './shopping-car.component.css',
})
export class ShoppingCarComponent {
  //variables
  showShoppingCart: boolean = false;
  totalPrice: number = 0;

  products$: Observable<Product[]> | undefined;

  //constructor necessary for the operation ngrx
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.products$ = this.store.select((state) => state.ProductsCarList);
    this.calculateTotalPrice();
  }
  //logic close the cart
  closeShoppingCart() {
    this.showShoppingCart = false;
  }
  //logic delate product
  deleteProduct(product: Product) {
    this.store.dispatch(removeProductFromCart({ product: product }));
  }
  //logic calculate total price
  calculateTotalPrice() {
    if (this.products$) {
      this.products$.subscribe((products) => {
        let totalPrice = 0;
        for (let index = 0; index < products.length; index++) {
          totalPrice += products[index].price;
        }
        this.totalPrice = totalPrice;
      });
    }
  }

  buy() {
    console.log('gracias por tu compra ');
  }
}
