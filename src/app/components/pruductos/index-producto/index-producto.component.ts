import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent {
  public productos : any = {};
  public producto : any;
  public token;
  public url; 

  constructor(
    private _clienteService: ClienteService,
  ){
    
    this.token = this._clienteService.getToken();
    this.url = GLOBAL.url;

    this._clienteService.obtener_productos(this.token).subscribe(
      Response => {
       
       this.productos = Response;
       this.producto = Object.values(this.productos.data);
       console.log('obteniendo productos des index productos');
       console.log(this.producto);
      },
      error =>{
        console.log(error);
      }
    );
  }

}
