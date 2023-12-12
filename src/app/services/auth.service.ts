import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { user } from '../models/user.model';

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

  register(data: user){
    return this.afAuth.createUserWithEmailAndPassword(data.email, data.password);
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
  
  navigateToTabs(){
    this.router.navigate(['/tabs']);
  }
}
