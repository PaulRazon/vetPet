import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent  implements OnInit {
  userlogin = this.autSercice.getUserLogin();

  constructor(private autSercice: AuthService) { }

  ngOnInit() {}

  logout(){
    this.autSercice.logout();
  }
}
