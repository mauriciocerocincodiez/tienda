import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";
declare var iziToast: any;
declare var Cleave: any;
declare var StickySidebar: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  public carrrito_array : any;
  public carrrito_arr : any;
  public subtotal: number = 0;
  public token;
  public id;
  public url;
  public socket  = io('http://localhost:4201');
  public data_producto_eliminado: any;
  window: any = window;
  handler = this.window.ePayco.checkout.configure({ key: '34f054ca93562e3b9baafd02daab181c', test: true });

  constructor(
    private _clienteService: ClienteService
  ){
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url;

    this._clienteService.obtener_carrito_cliente(this.id, this.token).subscribe(
      Response =>{
       
        this.carrrito_array = Response;
        this.carrrito_arr = this.carrrito_array.data;  
        for (var i = 0; i < this.carrrito_arr.length; i++) {
          this.subtotal = this.subtotal + this.carrrito_arr[i].producto.precio;
          console.log(this.subtotal);
        }
       
      }
    );
  }

  eliminar_producto_carrito(id: any){
    console.log('id');
    console.log(id);
    this._clienteService.eliminar_carrito_cliente(id, this.token).subscribe(
      Response => {
        this._clienteService.obtener_carrito_cliente(this.id, this.token).subscribe(
          Response =>{
           
            this.data_producto_eliminado = Response;
            this.socket.emit('delete-carrito', {data: this.data_producto_eliminado.data});
           
            this.carrrito_array = Response;
            this.carrrito_arr = this.carrrito_array.data;  
            for (var i = 0; i < this.carrrito_arr.length; i++) {
              this.subtotal = this.subtotal + this.carrrito_arr[i].producto.precio;
              console.log(this.subtotal);
            }
           
          }
        );
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

  ngOnInit(): void{
    setTimeout(()=>{
       new Cleave('#cc-number', {
        creditCard: true,
        onCreditCardTypeChanged: function (type: any) {
            // update UI ...
        }
    });

    new Cleave('#cc-exp-date', {
      date: true,
      datePattern: ['m', 'y']
  });

  new Cleave('.input-11', {
    numericOnly: true,
    blocks: [0, 3, 3, 4],
    delimiters: ["(", ") ", "-"]
});
    });

    var sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20});
  }


  epayco(){
	
	
    var data={ 
      //Parametros compra (obligatorio) 
      
      
      name: "Plan de facturacion electronica",
      description: "Plan de facturacion electronica",
      invoice: "",
      currency: "cop",
      country: "co",
      tax_base: '0',
      tax: '0',
      amount: 60000,
     
      lang: "es",
    external: "false",
    //Onpage="false" - Standard="true" 
      //Atributos opcionales
      method:'GET',
      extra1: '',
      extra2: 'ePayco',
      extra3: '',
      response: "http://localhost:4200/response",
      confirmation: "http://localhost:4200/confirmation",
  } 
  
  this.handler.onCloseModal = this.onCloseEpaycoModal
  this.handler.open(data)
}

onCloseEpaycoModal(){
  alert('Close ePayco Modal!!!!!!!')
}


}
