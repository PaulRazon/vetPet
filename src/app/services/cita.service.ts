import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Tab2Page } from '../tab2/tab2.page';
import { Cita } from '../models/cita.model';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private cita:Observable<Cita[]>;
  public emailOnline:string="";
  public citaCollection:AngularFirestoreCollection<Cita>;
  public pos = 0;
  public user:Cita={
    id:'',
    name:'',
    propietario:'',
    fecha:'',
    hora:'',
    tipo:'',
    observaciones:'',
    email:'',
  }
  constructor(private firestore: AngularFirestore,private authService: AuthService) {


    this.authService.getUserLogin().subscribe(data => {
      if (data?.email!==null) {
        this.user.email = data?.email;
      }

    });
    this.citaCollection = this.firestore.collection<Cita>('cita');
    this.cita = this.citaCollection.valueChanges();
  }
  //Añadir
  saveProduct(citaUser: Cita): Promise<string> {
    // this.products.push(product);
    return this.citaCollection.add(citaUser)
      .then((doc)=>{
        console.log('Producto Añadido con id'+ doc.id);
        citaUser.id = doc.id;
        return 'success'
      })
      .catch((error)=>{
        console.log('Error al añadir producto'+ error);
        return 'Error'
      });
  }

  //Modificar
  updateProduct(citaUser:Cita):Promise<string>{
    return this.citaCollection.doc(citaUser.id).update(citaUser)
    .then((doc)=>{
      console.log('Producto actualizado con id'+ citaUser.id);

      return 'success'
    })
    .catch((error)=>{
      console.log('Error al actualizar producto'+ error);
      return 'Error'
    });
  }
  //Eliminar
  deleteProduct(citaUser:Cita):Promise<string>{
    return this.citaCollection.doc(citaUser.id).delete()
    .then((doc)=>{
      console.log('Producto eliminado con id'+ citaUser.id);
      return 'success'
    })
    .catch((error)=>{
      console.log('Error al eliminar producto'+ error);
      return 'Error'
    });
  }
  //OBTENER DE FIREBASE
  getDates(): Observable<Cita[]> {
    return this.firestore.collection<Cita>('cita', ref => ref.where('email', '==', this.user.email)).valueChanges();
  }
  getCitas(): Observable<Cita[]> {
    return this.cita;
  }
  getDatesInfo<type>(path:string,id:string){
    const collection = this.firestore.collection(path);
    return collection.doc<type>(id).valueChanges();
  }
}
