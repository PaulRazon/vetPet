import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  constructor(
    private router: Router, private productService: ProductService, private authService: AuthService,
    private alertController: AlertController
  ) { }

  openProductAddPage() {
    this.router.navigate(['/add-product']); // Asume que la ruta 'product-add' existe para añadir productos.
  }

}
