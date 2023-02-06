import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  public cliente: any = {};
  public token;
  public id;
  public usuario: any =undefined;

  constructor(
    private _clienteService: ClienteService
  ){
    
    this.token = this._clienteService.getToken();
    this.id = this._clienteService.getId();
    
    if(this.token){
      this._clienteService.obtener_cliente_gets(this.id, this.token).subscribe(
        Response => {
          
          this.usuario = Response;
          this.cliente = this.usuario.data;
          console.log('esotoy en nav');
          console.log(this.cliente);
        },
        error => {
          console.log(error);
        }
      )
    } else {

      // redireccionar

    }

  }

  actualiza(actualizarForm: NgForm ){
    if(actualizarForm.valid){
      this._clienteService.actulizar_cliente_gets(this.id, this.cliente, this.token).subscribe(
        Response => {
          console.log(Response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#358A0A',
            color: '#DAEDE8',
            class: 'text-danger',
            position: 'topRight',
            message: 'Se actualizaron los datos de forma exitosa',
          });
        },
        error => {
          console.log(error);
        }
      );

    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        color: 'danger',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe llenar todos los campos',
      });
    }
    
  }

  

}
