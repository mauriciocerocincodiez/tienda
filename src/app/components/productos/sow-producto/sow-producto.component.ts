import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";
declare var tns: any;
declare var lightGallery: any;
declare var iziToast: any;

@Component({
  selector: 'app-sow-producto',
  templateUrl: './sow-producto.component.html',
  styleUrls: ['./sow-producto.component.css']
})
export class SowProductoComponent {
   
public id: any;
public productos: any;
public producto: any;
public url;
public carrito_data: any = {
  cantidad: ''
};
public socket  = io('http://localhost:4201');
public token;
public id_cliente: any;

constructor(
 private _router: Router,
 private _route: ActivatedRoute,
 private _clienteService: ClienteService
){
  this.url = GLOBAL.url;
  this.token = localStorage.getItem('token');
  this.id_cliente = localStorage.getItem('_id');
  this._route.params.subscribe(
    params => {
      this.id = params['id'];
      console.log('id del producto');
      console.log(this.id);
      this._clienteService.obtener_producto_cliente(this.id, this.token).subscribe(
        response => {
          
          this.productos = response;
          if(this.productos.data == undefined){
              this.producto = undefined;
          } else {
            this.producto = this.productos.data;
            console.log('producto');
            console.log(this.producto);
            console.log('galeria');
            console.log(this.producto.galeria);
          }
          
          
        },
        error =>{
          console.log(error);
        }
      )
    }
  );
}


ngOnInit(): void {

  setTimeout(()=>{
    tns({
      container: '.cs-carousel-inner',
      controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
      navPosition: "top",
      controlsPosition: "top",
      mouseDrag: !0,
      speed: 600,
      autoplayHoverPause: !0,
      autoplayButtonOutput: !1,
      navContainer: "#cs-thumbnails",
      navAsThumbnails: true,
      gutter: 15,
    });
    var e = document.querySelectorAll(".cs-gallery");
    if (e.length){
      for (var t = 0; t < e.length; t++){
        lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
      }
    }

   
  }, 500);
  
  tns({
    container: '.cs-carousel-inner-two',
    controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
    navPosition: "top",
    controlsPosition: "top",
    mouseDrag: !0,
    speed: 600,
    autoplayHoverPause: !0,
    autoplayButtonOutput: !1,
    nav: false,
    controlsContainer: "#custom-controls-related",
    responsive: {
      0: {
        items: 1,
        gutter: 20
      },
      480: {
        items: 2,
        gutter: 24
      },
      700: {
        items: 3,
        gutter: 24
      },
      1100: {
        items: 4,
        gutter: 30
      }
    }
  });

 }

 agregar_carrito(){
  
  if(this.carrito_data.cantidad >= 1){
    let data = {
      producto: this.producto._id,
      cliente: this.id_cliente,
      cantidad: this.carrito_data.cantidad
    }

    this._clienteService.agregar_carrito_cliente(data, this.token).subscribe(
      Response =>{
        console.log(Response);
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
