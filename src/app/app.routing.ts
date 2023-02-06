import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";
import { AuthGuard } from "./guards/auth.guard";
import { IndexProductoComponent } from "./components/pruductos/index-producto/index-producto.component";
import { SowProductoComponent } from "./components/productos/sow-producto/sow-producto.component";

const appRoute : Routes = [
 { path: '', component: InicioComponent },
 { path: 'login', component: LoginComponent },
 { path: 'cuenta/perfil', component: PerfilComponent, canActivate: [AuthGuard] },
 { path: 'productos', component: IndexProductoComponent },
 { path: 'productos/:slug', component: SowProductoComponent }
]

export const appRoutingPorviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
