import { Injectable } from '@angular/core';
import { Cart, Product, CartItem } from '../models/product.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartHistorialCompras: Observable<Cart[]>;
  public cartCollection:AngularFirestoreCollection<Cart>;
  public pos = 0;
  public cart: Cart = {
    id: '',
    items: [],
    total: 0,
    itemCount: 0
  };



  constructor(private firestore: AngularFirestore) {
    this.cartCollection = this.firestore.collection<Cart>('carts');
    this.cartHistorialCompras = this.cartCollection.valueChanges();
  }
  
  public getCart(): Cart {
    return this.cart;
  }

  public getCartHistorial(): Observable<Cart[]> {
    return this.cartHistorialCompras;
  }

  private calculateTotal(cart: Cart): number {
    return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  private calculateItemCount(cart: Cart): number {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }


  public addToCart(product: Product): Cart {

    const existingCartItem = this.cart.items.find((item) => item.product.name === product.name);

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      const newItem: CartItem = {
        product: product,
        quantity: 1,
      };
      this.cart.items.push(newItem);
    }

    this.cart.total = this.calculateTotal(this.cart);
    this.cart.itemCount = this.calculateItemCount(this.cart);

    return this.cart;
  }

  public removeItemFromCart(item: CartItem, quantityToRemove: number) {
    const index = this.cart.items.findIndex((cartItem) => cartItem === item);
    if (index !== -1) {
      if (item.quantity > quantityToRemove) {
        item.quantity -= quantityToRemove;
      } else {
        // Si la cantidad a eliminar es igual o mayor que la cantidad en el carrito, elimina el elemento por completo.
        this.cart.items.splice(index, 1);
      }
  
      // Actualiza el total y la cantidad de artículos
      this.cart.total = this.calculateTotal(this.cart);
      this.cart.itemCount = this.calculateItemCount(this.cart);
    }

  }
  buyProducts(cart: Cart): Promise<string> {
    return this.cartCollection
      .add(cart)
      .then((doc) => {
        console.log('Productos comprados con ID: ' + doc.id);
        cart.id = doc.id;
        return 'success'; // Retorna el carrito actualizado con el ID
      })
      .catch((error)=>{
        console.log('Error al añadir producto'+ error);
        return 'Error'
      });
  }
}
