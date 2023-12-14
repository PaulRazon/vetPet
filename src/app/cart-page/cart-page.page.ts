import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Cart, CartItem } from '../models/product.model';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
})
export class CartPagePage implements OnInit {
  public cart: Cart;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.cart = this.cartService.getCart();
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: environment.clientId, // Replace with your actual PayPal client ID
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'MXN',
              value: this.cart.total.toString(),
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: this.cart.total.toString(),
                },
              },
            },
            items: this.getItemsList(),
          },
        ],
      },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
        this.hacerCompra();
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - inform your server about completed transaction', data);
        // Handle successful payment here
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // Handle cancelation here
      },
      onError: (err) => {
        console.log('OnError', err);
        // Handle errors here
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  getItemsList(): any[] {
    const items: any[] = [];
    this.cart.items.forEach((item: CartItem) => {
      const currentItem = {
        name: item.product.name,
        quantity: item.quantity,
        unit_amount: {
          value: item.product.price,
          currency_code: 'MXN',
        },
      };
      items.push(currentItem);
    });
  
    return items;
  }

  async hacerCompra() {
    this.cartService
      .buyProducts(this.cart)
      .then(async (result) => {
        if (result === 'success') {
          const toast = await this.toastController.create({
            message: 'Compra exitosa',
            duration: 2000,
            position: 'top',
          });
          toast.present();
        } else {
          console.log('Error al guardar el producto');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      this.cart.items = [];
      this.cart.total = 0; 
  }

  async promptRemoveItem(item: CartItem) {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: `¿Cuántos ${item.product.name} deseas eliminar?`,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          max: item.quantity,
          value: '1',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: (data) => {
            const quantityToRemove = parseInt(data.quantity, 10);
            if (quantityToRemove > 0) {
              this.cartService.removeItemFromCart(item, quantityToRemove);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
