import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";
declare var iziToast: any;

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
  public id_cliente: any;
  public carrito_data: any = {
    cantidad: ''
  };
  public socket  = io('http://localhost:4201');

  constructor(
    private _clienteService: ClienteService,
  ){
    
    this.token = this._clienteService.getToken();
    this.id_cliente = this._clienteService.getId();
    this.url = GLOBAL.url;

    this._clienteService.obtener_productos().subscribe(
      Response => {
       
       this.productos = Response;
       this.producto = Object.values(this.productos.data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  agregar_carrito(_id_producto: any){
  console.log(_id_producto);
    if(this.carrito_data.cantidad >= 1){
      let data = {
        producto: _id_producto,
        cliente: this.id_cliente,
        cantidad: this.carrito_data.cantidad
      }
  
      this._clienteService.agregar_carrito_cliente(data, this.token).subscribe(
        Response =>{
          this.productos = Response;
           if(this.productos.data != 1 ){
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se agrego el producto al carrito de forma exitosa.'
      });
             this.socket.emit('add-carrito-add', {data: true});
           } else {
            iziToast.show({
              title: 'ERROR',
              titleColor: 'red',
              color: 'danger',
              class: 'text-danger',
              position: 'topRight',
              message: 'Este producto ya existe en el carrito.',
            });
           }
        },
        error =>{
          console.log(error);
        }
      );
  
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        color: 'danger',
        class: 'text-danger',
        position: 'topRight',
        message: 'Seleccione una cantidad.',
      });
    }
      
   }

   

}
