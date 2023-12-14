import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '../services/cita.service';
import { ToastController } from '@ionic/angular';
import { Cita } from '../models/cita.model';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  citaForm:FormGroup;
  public citas:Cita[] =[];
  public userlogin = this.authService.getUserLogin();
  public user:Cita={
    id:'',
    name:'',
    propietario:'',
    fecha:'',
    hora:'',
    tipo:'',
    observaciones:'',
    email:''
  }

  constructor(private authService: AuthService,private citaService:CitaService,private formBuilder:FormBuilder,private toastController:ToastController) {
    this.citaForm = this.formBuilder.group({
      name: ['', Validators.required],
      propietario: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      tipo: ['', Validators.required],
      observaciones: ['', Validators.required],
    });

   //Mete retraso para que la base de datos cargue y se actualice el usuario
    setTimeout(() => {
 
      this.citaService.getDates().subscribe(data => {
        console.log(data);
        this.citas = data;
      });
    }, 500);
    
    
  }

  async addCita(){
    if (await this.validationDate() && this.citaForm.valid) {
      const cita = this.citaForm.value;
      this.citas.forEach(element => {
        cita.email = element.email;
      })
      
      this.citaService.saveProduct(cita)
          .then(async (result)=>{
            if(result=='success'){
              console.log('Cita guardado exitosamente');
              const toast = await this.toastController.create({
                message: 'Cita guardado correctamente',
                duration: 2000, // Duración de 2 segundos
                position: 'top' // Posición superior
              });
              toast.present();
              
          }else{
            console.log('Error al guardar el Cita');
          }
        })
        .catch(error =>{
          console.log('error')
        });
    } else {
      console.warn('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }
  }
  async validationDate(): Promise<boolean> {
    const selectedDate: Date = new Date(this.citaForm.value.fecha);
    const currentDate: Date = new Date();
    //transformarla a numeros
    const fecha1 = (selectedDate.getDay()+selectedDate.getMonth()+selectedDate.getFullYear()+1);
    const fecha2 = (currentDate.getDay()+currentDate.getMonth()+currentDate.getFullYear());

    // console.log((selectedDate.getDay()+selectedDate.getMonth()+selectedDate.getFullYear())+1);
    // console.log(currentDate.getDay()+currentDate.getMonth()+currentDate.getFullYear());
  
    if (fecha1 <= fecha2) {
     // console.log('La fecha seleccionada no es válida. Debe ser posterior a la fecha actual.');
      const toast = await this.toastController.create({
        message: 'Fecha es incorrecta debe ser posterior a la fecha actual',
        duration: 2000, // Duración de 2 segundos
        position: 'top' // Posición superior
      });
      toast.present();
      return false;
    }
      
  
    return true;
  }

}