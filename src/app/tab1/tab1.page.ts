import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { user } from '../models/user.model';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  login: boolean = false;
  rol: 'user' | 'admin' = 'user';
  name: string = '';
  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
    this.authService.getUserLogin().subscribe((res) => {
      if (res) {
        console.log('sesion iniciada');
        this.login = true;
        this.getData(res.uid);
      } else {
        console.log('sesion cerrada');
        this.login = false;
      }
    });
  }

  getData(uid: string) {
    const path = 'Users';
    const id = uid;
    return this.userService.getUser<user>(path, id).subscribe((res) => {
      //console.log('datos->', res);
      if (res) {
        this.rol = res.rol;
        this.name = res.name;
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['tabs/tab2']);
  }
  navigateToDates() {
    this.router.navigate(['tabs/ver-citas']);
  }

}
