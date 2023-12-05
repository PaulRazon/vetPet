import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario = {
    email: '',
    password: '',
    displayName:''
  }
  constructor(private autSercice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    console.log(this.usuario);
    const {email, password ,displayName} = this.usuario;
    this.autSercice.register(email,password,).then(res =>{
      console.log("Usuario registrado: ",res);
    })
    this.router.navigate(['/tabs']);
  }
}
