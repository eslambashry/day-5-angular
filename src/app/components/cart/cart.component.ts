import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.calculateTotalPrice();
  }

  updateQuantity(product: Product, event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement) {
      const quantity = +inputElement.value;
      if (quantity > 0) {
        const currentQuantity = this.cartItems.find((item: CartItem) => item.product.id === product.id)?.quantity || 0;
        const quantityDifference = quantity - currentQuantity;
        this.cartService.addToCart(product, quantityDifference);
        this.calculateTotalPrice();
      }
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
