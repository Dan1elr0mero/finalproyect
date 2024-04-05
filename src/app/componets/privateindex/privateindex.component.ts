import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-privateindex',
  standalone: true,
  imports: [],
  templateUrl: './privateindex.component.html',
  styleUrl: './privateindex.component.css',
})
export class PrivateindexComponent {
  // products: Product[] = []

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (value) => {
        // this.products = value
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
