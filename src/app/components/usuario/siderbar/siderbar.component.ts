import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent {

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


}
