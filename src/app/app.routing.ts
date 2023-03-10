import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";
import { AuthGuard } from "./guards/auth.guard";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { SowProductoComponent } from "./components/productos/sow-producto/sow-producto.component";
import { CarritoComponent } from "./components/carrito/carrito.component";
import { DireccionesComponent } from "./components/usuario/direcciones/direcciones.component";

const appRoute : Routes = [
 { path: '', component: InicioComponent },
 { path: 'login', component: LoginComponent },
 { path: 'cuenta/perfil', component: PerfilComponent, canActivate: [AuthGuard] },
 { path: 'cuenta/direcciones', component: DireccionesComponent, canActivate: [AuthGuard] },
 { path: 'productos', component: IndexProductoComponent },
 { path: 'productos/:id', component: SowProductoComponent , canActivate: [AuthGuard]},
 { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] }
]

export const appRoutingPorviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
