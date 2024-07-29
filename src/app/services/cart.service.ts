import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
// export class CartService {
//   cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
//   cartItems = this.cartItemsSubject.asObservable();

//   constructor() {}

//   addToCart(product: Product, quantity: number): void {
//     var currentCartItems = this.cartItemsSubject.value;
//     var cartItemIndex = currentCartItems.findIndex(item => item.product.id === product.id);

//     if (cartItemIndex >= 0) {
//       currentCartItems[cartItemIndex].quantity += quantity;
//     } 
    
//     else {
//       currentCartItems.push({ product, quantity });
//     }
    
//     console.log(currentCartItems, "from addToCart()");
//     this.cartItemsSubject.next([...currentCartItems]);
//   }
  
//     getCartItems():Observable<any> {
//       console.log(this.cartItems,"from getCartItems()");
//       return this.cartItems;
//     }

//   removeFromCart(productId: number): void {
//     const currentCartItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
//     this.cartItemsSubject.next([...currentCartItems]);
//   }

//   clearCart(): void {
//     this.cartItemsSubject.next([]);
//   }

// }


// =================================== => with local storage
export class CartService {
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.getCartItemsFromLocalStorage());
  cartItems = this.cartItemsSubject.asObservable();

  constructor() {}

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private getCartItemsFromLocalStorage(): CartItem[] {
    if (this.isLocalStorageAvailable()) {
      const cartItems = localStorage.getItem('cartItems');
      return cartItems ? JSON.parse(cartItems) : [];
    }
    return [];
  }

  private saveCartItemsToLocalStorage(cartItems: CartItem[]): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }

  addToCart(product: Product, quantity: number): void {
    let currentCartItems = this.cartItemsSubject.value;
    const cartItemIndex = currentCartItems.findIndex(item => item.product.id === product.id);

    if (cartItemIndex >= 0) {
      currentCartItems[cartItemIndex].quantity += quantity;
    } else {
      currentCartItems.push({ product, quantity });
    }

    this.cartItemsSubject.next([...currentCartItems]);
    this.saveCartItemsToLocalStorage(currentCartItems);

    console.log(currentCartItems, "from addToCart()");
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems;
  }

  removeFromCart(productId: number): void {
    const currentCartItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next([...currentCartItems]);
    this.saveCartItemsToLocalStorage(currentCartItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartItemsToLocalStorage([]);
  }
}

