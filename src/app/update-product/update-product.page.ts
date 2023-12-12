import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage {
  public updateForm: FormGroup;
  
  constructor(
    private router:Router, 
    private toastController: 
    ToastController,
    private formBuilder: FormBuilder,
    private producService: ProductService
  ) { 
    this.updateForm= this.formBuilder.group({
      name: [this.producService.productwhere.name, Validators.required],
      price: [this.producService.productwhere.price, Validators.required],
      description: [this.producService.productwhere.description, Validators.required],
      photo: [this.producService.productwhere.photo, Validators.required],
      type: [this.producService.productwhere.type, Validators.required]
    });
  }

  async updateProduct() {
    if (this.updateForm.valid) {
      const product = this.updateForm.value;
      product.id = this.producService.productwhere.id;
      this.producService.updateProduct(product).then(async (result)=>{
        if(result=='success'){
          console.log('Producto modificado exitosamente');
          const toast = await this.toastController.create({
            message: 'Producto modificado correctamente',
            duration: 2000, 
            position: 'top' 
          });
          toast.present();
          this.router.navigate(['../tabs/tab4']);
        }else{
          console.log('Error al guardar el producto');
        }
      })
      .catch(error =>{
        console.log('error')
      });
    }else {
      console.warn('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }
  }

}
