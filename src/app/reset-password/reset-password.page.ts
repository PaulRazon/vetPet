import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(private autSercice: AuthService, private router: Router) { }
  usuario = {
    email: '',
  }
  ngOnInit() {
  }

  resetPassword(email: string){
    return this.autSercice.resetPassword(email)
      .then(() => {
        this.navigateLogin();
      })
  }

  navigateLogin(){
    this.router.navigate(['/login']);
  }
}