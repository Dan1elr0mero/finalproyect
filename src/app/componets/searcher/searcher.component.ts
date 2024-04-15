import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { fillStateCarProducts } from '../../store/product.action';
import { AppState } from '../../app.state';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.css',
})
export class SearcherComponent {
  query: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(
    private productService: ProductsService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = this.products;
    });
  }

  search() {
    this.filteredProducts = this.products.filter(
      (product) =>
        product.title &&
        product.title.toLowerCase().includes(this.query.toLowerCase()),

      console.log(this.filteredProducts)
    );
  }
}
