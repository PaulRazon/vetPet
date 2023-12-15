import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/product.model';
import { SalesService } from '../services/sales.service'; // Asumí que la clase se llama CartService

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  public carts: Cart[] = [];
  public cartsFounds: Cart[] = [];
  status: 'entregado' | 'espera' = 'espera';

  constructor(private SalesService: SalesService) {} // Asegúrate de que esté importando el servicio correcto

  ngOnInit() {
    this.SalesService.getSales().subscribe(
      (cartsQ: Cart[]) => {
        this.carts = cartsQ;
        this.cartsFounds = [...this.carts]; // Usar una copia para evitar efectos secundarios no deseados
        console.log('Carts:', this.carts);
      },
      (error) => {
        console.error('Error fetching carts:', error);
      }
    );
  }

  getData(uid: string) {
    const path = 'carts';
    const id = uid;

    return this.SalesService.getSalesInfo<Cart>(path, id).subscribe((res) => {
      if (res && res.status !== undefined) {
        console.log('Status:', res.status);
        this.status = res.status;
      } else {
        console.log('Status is undefined');
      }
    });
  }

  marcarEntregado(index: number): void {
    this.SalesService.pos = this.carts.findIndex((item) => item.id === this.carts[index].id);

    if (this.SalesService.pos !== -1) {
      this.SalesService.user = this.carts[this.SalesService.pos];

      this.carts[index].status = 'entregado'; // Corregí el nombre de la propiedad
      const salesUpdate = this.carts[index];

      this.SalesService.updateCart(salesUpdate).then((result) => {
        if (result === 'success') {
          console.log('Cita actualizada exitosamente');
        } else {
          console.log('Error al actualizar la cita');
        }
      });
    } else {
      console.log('No se encontró la cita en la colección.');
    }
  }
}