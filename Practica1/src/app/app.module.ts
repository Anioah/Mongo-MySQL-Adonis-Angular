import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { MostrarEmpresaComponent } from './Components/empresa/mostrar-empresa.component';
import { HttpClientService } from './services/http-client.service';
import { AuthHttpInterceptor } from './Interceptor/auth-http-interceptor.service';
import { MostrarCompanyComponent } from './Components/company/mostrar-company.component';
import { ContratosComponent } from './Components/contratos/contratos.component';

@NgModule({
  declarations: [
    AppComponent,
    MostrarEmpresaComponent,
    ContratosComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MostrarCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClientService,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
