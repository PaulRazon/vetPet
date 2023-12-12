import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async login(email: string, password: string) {
    try{
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    }catch(error){
      console.dir(error);
      return error
    }
  }

  async register(email: string, password: string) {
    try{
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    }catch(error){
      console.dir(error);
      return error
    }
  }

  async loginWhitGoogle(){
    try{
      return await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }catch(error){
      console.dir(error);
      return error
    }
  }

  getUserLogin(){
    return this.afAuth.authState
  }
  
  logout(){
    this.afAuth.signOut().then(() =>{
      this.router.navigate(['/tabs']);
    })
  }

  resetPassword(email: string){
    return this.afAuth.sendPasswordResetEmail(email)
  }
  
}
