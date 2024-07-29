import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(products => {
      this.allProducts = products;
    });
  }

 addToCart(product: Product, quantity: string): void {  
    const qty = parseInt(quantity, 10); 
    if (!isNaN(qty) && qty > 0) {
      this.cartService.addToCart(product, qty);
      console.log(`Added ${qty} of ${product.title} to the cart.`);
    } else {
      console.log('Invalid quantity');
    }
  }
}
