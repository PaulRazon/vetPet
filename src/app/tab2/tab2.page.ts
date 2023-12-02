import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private autSercice: AuthService, private router: Router) {}

  ngOnInit() {
    this.autSercice.getUserLogin().subscribe((res) => {
      if (res) {
        this.router.navigate(['tabs/tab2']);
      }else{
        this.router.navigate(['login']);
      }
    })
  }
}
