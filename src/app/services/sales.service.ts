import { Injectable } from '@angular/core';
import { Cart } from '../models/product.model';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private cart: Observable<Cart[]>;
  public cartCollection: AngularFirestoreCollection<Cart>;
  public pos = 0;
  public user: Cart = {
    id: '', // Otra opción sería id: undefined, dependiendo de tus necesidades
    items: [],
    total: 0,
    itemCount: 0,
    status: 'espera', // Cambié a 'espera' por coherencia con el estado inicial
  };

  constructor(private firestore: AngularFirestore,private authService: AuthService) { 
    this.cartCollection = this.firestore.collection<Cart>('carts');
    this.cart = this.cartCollection.valueChanges();
  }
  getSales(): Observable<Cart[]> {
    return this.cart;
  }
  getSalesInfo<type>(path:string,id:string){
    const collection = this.firestore.collection(path); 
    return collection.doc<type>(id).valueChanges();
  }
    //Modificar
    updateCart(cartUser:Cart):Promise<string>{
      return this.cartCollection.doc(cartUser.id).update(cartUser)
      .then((doc)=>{
        console.log('Producto actualizado con id'+ cartUser.id);
  
        return 'success'
      })
      .catch((error)=>{
        console.log('Error al actualizar producto'+ error);
        return 'Error'
      });
    }
}
