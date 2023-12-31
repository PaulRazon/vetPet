import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Cart, CartItem } from '../models/product.model';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsalePage } from '../modalsale/modalsale.page';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private toastController: ToastController,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
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
        this.spinner.show();
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
        this.hacerCompra();
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - inform your server about completed transaction', data);
        console.log(data.purchase_units[0].items);
        this.openModal(
          data.purchase_units[0].items,
          data.purchase_units[0].amount.value
        );
        this.spinner.hide();
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
    try {
      // Asignar el estado al carrito antes de la compra
      this.cart.status = 'espera';
      this.cart.id = this.cart.id;
  
      const result = await this.cartService.buyProducts(this.cart);
  
      if (result === 'success') {
        // Obtener el ID del carrito después de la compra
        const idDelCarrito = this.cart.id;
  
        // Puedes utilizar idDelCarrito según tus necesidades
        console.log('ID del carrito después de la compra:', idDelCarrito);
  
        // Resto del código para mostrar el mensaje de éxito
      } else {
        console.log('La compra no se completó correctamente.');
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    } finally {
      // Limpiar el carrito después de la compra (independientemente del resultado)
      this.cart.items = [];
      this.cart.total = 0;
    }
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

  openModal(items: any[], amount: any): void {
    const modalRef = this.modalService.open(ModalsalePage);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
  }
}
