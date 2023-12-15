import { Component, OnInit } from '@angular/core';
import { Cita } from '../models/cita.model';
import { CitaService } from '../services/cita.service';

@Component({
  selector: 'app-ver-citas',
  templateUrl: './ver-citas.page.html',
  styleUrls: ['./ver-citas.page.scss'],
})
export class VerCitasPage implements OnInit {
  public citas: Cita[] = [];
  public citasFounds: Cita[] = [];
  status: 'atendida' | 'cancelada' | 'pendiente' = 'pendiente';

  constructor(private citaService: CitaService) {}

  ngOnInit() {
    this.citaService.getCitas().subscribe(
      (dates: Cita[]) => {
        this.citas = dates;
        this.citasFounds = [...this.citas]; // Use a copy to avoid unintended side effects
      },
      (error) => {
        console.error('Error fetching citas:', error);
      }
    );
  }
  getData(uid: string) {
    const path = 'cita';
    const id = uid;
  
    return this.citaService.getDatesInfo<Cita>(path, id).subscribe((res) => {
      if (res && res.status !== undefined) {
        console.log('Status:', res.status);
        this.status = res.status;
      } else {
        console.log('Status is undefined');
      }
    });
  }
  validarCita(index: number): void {
    this.citaService.pos = this.citas.findIndex((item) => item.name === this.citasFounds[index].name);
    
    if (this.citaService.pos !== -1) {
      this.citaService.user = this.citas[this.citaService.pos];
  
      this.citasFounds[index].status = 'atendida';
      const citaUpdate = this.citasFounds[index];
  
      this.citaService.updateProduct(citaUpdate).then((result) => {
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
  cancelarCita(index: number): void {
    this.citaService.pos = this.citas.findIndex((item) => item.name === this.citasFounds[index].name);
    
    if (this.citaService.pos !== -1) {
      this.citaService.user = this.citas[this.citaService.pos];
  
      this.citasFounds[index].status = 'cancelada';
      const citaUpdate = this.citasFounds[index];
  
      this.citaService.updateProduct(citaUpdate).then((result) => {
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