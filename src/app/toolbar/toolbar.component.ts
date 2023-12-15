import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  userlogin = this.autSercice.getUserLogin();

  login: boolean=false;
  rol:string="";
  name:string="";

  constructor(private autSercice: AuthService, private router: Router,private userService: UserService) {
    this.autSercice.getUserLogin().subscribe((res) => {
      if (res) {
        console.log("sesion iniciada");
        this.login = true;
        this.getData(res.uid);
      } else {
        console.log("sesion cerrada");
        this.login = false;
      }
    })
  }

  logout(){
    this.autSercice.logout();
  }

  getData(uid:string){
    const path = 'Users';
    const id = uid;
    return this.userService.getUser<user>(path,id).subscribe((res)=>{
      console.log('datos->',res);
      if(res){
        this.rol = res.rol;
        this.name = res.name;
      }
    })
  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
  reloadPage() {
    window.location.reload();
  }
}
