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
  public products: Product[] = [];
  public productsFounds: Product[] = [];
  public filter = [
    "Juguetes y Accesorios",
    "Ropa",
    "Limpieza",
    "Alimento",
  ];

  public colors = [
    {
      type: "Juguetes y Accesorios",
      color: "primary"
    },
    {
      type: "Ropa",
      color: "secondary"
    },
    {
      type: "Limpieza",
      color: "warning"
    },
    {
      type: "Alimento",
      color: "danger"
    }
  ];

  constructor(
    private router: Router, private productService: ProductService, private authService: AuthService,
    private alertController: AlertController) {
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.products = products;
        this.productsFounds = this.products;
      });
  
     }

  openProductAddPage() {
    this.router.navigate(['/add-product']); // Asume que la ruta 'product-add' existe para añadir productos.
  }

  public filterProducts(): void {
    console.log(this.filter);
    this.productsFounds = this.products.filter(
      item => {
        return this.filter.includes(item.type);
      }
    );
  }

  public getColor(type: string): string {
    const itemFound = this.colors.find((element) => {
      return element.type === type;
    });
    let color = itemFound && itemFound.color ? itemFound.color : "";
    return color;
  }

  async mostrarConfirmacion(name:string) {

    this.productService.pos = this.products.findIndex(item => item.name == name);
    this.productService.productwhere = this.products[this.productService.pos];
    this.productService.productCollection.snapshotChanges().subscribe((data) => {
      this.productService.productwhere.id = data[this.productService.pos].payload.doc.id;
    });

  const alert = await this.alertController.create({
    header: 'Alerta',
    message: '¿Quieres eliminar el producto seleccionado?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Acción cancelada');
        }
      }, {
        text: 'Sí',
        handler: () => {
          this.productService.deleteProduct(this.productService.productwhere);
        }
      }
    ]
  });

  await alert.present();
}

openProductUpdatePage(name:string) {
  this.productService.pos = this.products.findIndex(item => item.name == name);
  this.productService.productwhere = this.products[this.productService.pos];
  this.productService.productCollection.snapshotChanges().subscribe((data) => {
    this.productService.productwhere.id = data[this.productService.pos].payload.doc.id;
  });
  console.log(this.productService.productwhere);
  
  
  this.router.navigate(['/update-product']);
  
}



}
