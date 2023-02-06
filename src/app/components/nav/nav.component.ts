import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public token;
  public id;
  public cliente: any = undefined;
  public usuario: any =undefined;
  
constructor(
  private _clienteService: ClienteService,
  private _router: Router
){
  this.token = this._clienteService.getToken();
  this.id = this._clienteService.getId();
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
}


logout(){

localStorage.clear();
location.reload();
this._router.navigate(['/login']);
}
 

}
