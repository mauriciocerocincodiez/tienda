import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public carrrito_array: any;
  public carrrito_arr: any;
  public token;
  public id;
  public url;
  public cliente: any = undefined;
  public usuario: any =undefined;
  public op_cart = false;
  public subtotal: Number = 0;
  public socket  = io('http://localhost:4201');
  public data_producto_eliminado: any;
  public pro: any;
  
  
constructor(
  private _clienteService: ClienteService,
  private _router: Router
){

  this.token = this._clienteService.getToken();
  this.id = this._clienteService.getId();

  this.url = GLOBAL.url;
  this._clienteService.obtener_cliente_gets(this.id, this.token).subscribe(
    Response => {
      
      this.usuario = Response;
      this.cliente = this.usuario.data;
    },
    error => {
      console.log(error);
    }
  )

   this.obtener_carrito_cliente();

  
}

eliminar_producto_carrito(id: any){
  console.log('id');
  console.log(id);
  this._clienteService.eliminar_carrito_cliente(id, this.token).subscribe(
    Response => {
      console.log(Response);
      this.data_producto_eliminado = Response;
      this.socket.emit('delete-carrito', {data: this.data_producto_eliminado.data});
      iziToast.show({
        title: 'SUCCESS',
        titleColor: '#1DC74C',
        color: '#FFF',
        class: 'text-success',
        position: 'topRight',
        message: 'Se elimino el producto del carrito de forma exitosa.'
});
    },
    error =>{
      console.log(error);
    }
  );
}


logout(){

localStorage.clear();
location.reload();
this._router.navigate(['/login']);
}

op_modalcart(){
  if(this.token){
    if(!this.op_cart){
      this.op_cart = true;
      $('#cart').addClass('show');
  
    } else {
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

}

obtener_carrito_cliente(){
  this._clienteService.obtener_carrito_cliente(this.id, this.token).subscribe(
    Response =>{
      this.carrrito_array = Response;
      this.carrrito_arr = this.carrrito_array.data;  
      for (var i = 0; i < this.carrrito_arr.length; i++) {
        this.subtotal = this.subtotal + this.carrrito_arr[i].producto.precio;
     
      }
     
    }
  );
}

obtener_productos_carrito(){
  this.socket.on('new-carrito', (data) => {
    console.log('new-carrito');
    console.log(data);
    this.obtener_carrito_cliente();
   
   });
  
}

obtener_productos_carrito_index(){
  this.socket.on('new-carrito-add', (data) => {
    console.log(data);
    this.obtener_carrito_cliente();
   
   });
  
}

ngOnInit(): void {
  this.obtener_productos_carrito();
  this.obtener_productos_carrito_index();
}



}
