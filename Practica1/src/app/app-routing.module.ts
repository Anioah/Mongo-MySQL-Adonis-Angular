import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { MostrarEmpresaComponent } from './Components/empresa/mostrar-empresa.component';
import { MostrarCompanyComponent } from './Components/company/mostrar-company.component';
import { ContratosComponent } from './Components/contratos/contratos.component';
import { AuthGuard } from './guards/auth.guard';
import { tokenAuthGuard } from './guards/tokenAuth.guard';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'registrar',
    component: RegisterComponent
  },
  {
    path:'home',
    component:HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,tokenAuthGuard]
  },
  {
    path:'mostrar-empresa',
    component:MostrarEmpresaComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,tokenAuthGuard]
  },
  {
    path:'mostrar-company',
    component:MostrarCompanyComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,tokenAuthGuard]
  },
  {
    path:'contratos',
    component:ContratosComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard,tokenAuthGuard]
  },
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
