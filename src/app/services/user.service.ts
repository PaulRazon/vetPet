import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private firestore: AngularFirestore) { 

  }

  createdoc(data: any, path:string,id:string){
    const collection = this.firestore.collection(path); 
    return collection.doc(id).set(data);
  }
    
  getUser<type>(path:string,id:string){
    const collection = this.firestore.collection(path); 
    return collection.doc<type>(id).valueChanges();
  }
}
