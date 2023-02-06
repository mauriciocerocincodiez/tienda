import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user: any = {};
  public usuario: any = {};
  public token;
  
  constructor(
    private _clienteService: ClienteService,
    private _router: Router
  ){
    this.token = this._clienteService.getToken();
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['']);
    } else {
      // MANTENER EN EL COMPONENTE
    }
  }

  login(loginForm: NgForm){
    const email = loginForm.value.email;
    const password = loginForm.value.password;

    let data = {
      email: email,
      password: password,
    };

    let data2 = {};

    this._clienteService.login_cliente(data).subscribe(
      (response) => {
        this.user = response;

        if (this.user.data == undefined) {
          iziToast.show({
            title: 'ERROR',
            titleColor: 'red',
            color: 'danger',
            class: 'text-danger',
            position: 'topRight',
            message: this.user.message,
          });
        } else {
          // SE CREA LOS DATOS Y EL TOKEN PARA MANTENER LA SESION INICIADA
          this.usuario = this.user.data;
          localStorage.setItem('token', this.user.token);
          localStorage.setItem('_id', this.user.data._id);

          this._router.navigate(['']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
