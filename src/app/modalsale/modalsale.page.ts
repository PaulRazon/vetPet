import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalsale',
  templateUrl: './modalsale.page.html',
  styleUrls: ['./modalsale.page.scss'],
})
export class ModalsalePage implements OnInit {
  @Input() amount: any;
  @Input() items: any[] = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
