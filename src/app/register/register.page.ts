import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { user } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  data: user = {
    uid: '',
    name: '',
    email: '',
    password: '',
    rol: 'user',
  };

  constructor(
    private autSercice: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async register() {
    const res = await this.autSercice.register(this.data).catch((error) => {
      console.log(error);
    });
    if (res?.user) {
      const path = 'Users';
      const id = res.user.uid;
      this.data.uid = id;
      this.data.password = '';
      this.userService.createdoc(this.data, path, id);
      this.autSercice.navigateToTabs();
    }
  }
}
