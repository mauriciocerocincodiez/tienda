import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt"; 

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  login_cliente(data: any){
  
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'login_cliente', data, {headers: headers});
    }

    obtener_cliente_gets(id: any, token: any){
    
      let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
      return this._http.get(this.url+'obtener_cliente_gets/'+id, {headers: headers});
      }
     
    getToken(){
     return localStorage.getItem('token'); 
    }
    getId(){
     return localStorage.getItem('_id');
    }

    actulizar_cliente_gets(id: any, data: any, token: any){
    
     let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
     return this._http.put(this.url+'actulizar_cliente_gets/'+id, data, {headers: headers});
    }

    obtener_productos(){
     return this._http.get(this.url+'obtener_productos');
      }

    obtener_producto_cliente(id: any, token: any){
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
    return this._http.get(this.url+'obtener_producto_cliente/'+id, {headers: headers});
     }
     
    agregar_carrito_cliente(data: any, token: any){
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
    return this._http.post(this.url+'agregar_carrito_cliente', data, {headers: headers});
    }
    obtener_carrito_cliente(id: any, token: any){
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
    return this._http.get(this.url+'obtener_carrito_cliente/'+id, {headers: headers});
    }

   eliminar_carrito_cliente(id: any, token: any){
   let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
   return this._http.delete(this.url+'eliminar_carrito_cliente/'+id, {headers: headers});
   }
   
   agregar_direccion_cliente1(data: any, token: any){
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
    return this._http.post(this.url+'agregar_direccion_cliente1', data, {headers: headers});
    }

    public isAuthenticated(): boolean{

      const token1 = localStorage.getItem('token');
      const token = "'"+token1+"';";
   
      //'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MzlkMzE1NzA0NzNjM2UwNTdhZmU3MDQiLCJub21icmVzIjoid2lsdG9uIiwiYXBlbGxpZG9zIjoic2VybmEiLCJlbWFpbCI6InNlcm5hQGdtYWlsLmNvbSIsImlhdCI6MTY3MTYzNTg4MSwiZXhwIjoxNjcyMjQwNjgxfQ.niiO5Te0SPQIboHb9191sZEWJ-AK2e2ObMdwn7q9fgo';
      
   
      if (!token){
       return false;
   
      } 
      
      try {
       
       const helper = new JwtHelperService();
       var decodetoken = helper.decodeToken(token);

       if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
       }
   
   
      if(!decodetoken){
       localStorage.removeItem('token');
       return false;
      }
   
      } catch (error) {
   
        localStorage.clear();
       return false;
       
      }
   
      
   
   
       return true;
      
   
      
   
     }

}
