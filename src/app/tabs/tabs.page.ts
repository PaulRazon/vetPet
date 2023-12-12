import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { user } from '../models/user.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  login: boolean=false;
  rol:'user'|'admin' = 'user';

  constructor(private userService: UserService, private autSercice: AuthService) {
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

  getData(uid:string){
    const path = 'Users';
    const id = uid;
    return this.userService.getUser<user>(path,id).subscribe((res)=>{
      console.log('datos->',res);
      if(res){
        this.rol = res.rol;
      }
    })
  }
}
