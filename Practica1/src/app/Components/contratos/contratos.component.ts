import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/contrato';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientService } from 'src/app/services/http-client.service'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent{

  constructor(private http: HttpClientService,private router: Router) { }

  contratos_empleado: Contrato = new Contrato();
  findContrato: Contrato = new Contrato();
  upContrato: Contrato = new Contrato();
  contratos_array: Contrato [] = [];
  public component;
  public detail = true;

  public logout(): void {
    localStorage.setItem('token','');
    window.localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  mostrarContratos(empleado: any){

    if(this.findContrato.empleado_id == null){
      alert("Ingresa el Código del empleado a verificar")
    }else{
      this.http.makeRequest('post', environment.api_url+'/contratosPorEmpleado',{
        body:{
          empleado_id: this.findContrato.empleado_id
      }}).subscribe( contratos => { this.contratos_array = contratos } );

      this.clearContrato(this.findContrato);

      this.component = true;
    }
  }


  deleteContrato(contrato: Contrato){
    this.http.makeRequest('delete', environment.api_url+'/deleteContrato',{
      body:{
        _id:contrato._id
    }}).subscribe();

    this.findContrato.empleado_id = contrato.empleado_id

    this.mostrarContratos(contrato._id);


  }

  nuevoContrato(){
    this.http.makeRequest('post', environment.api_url+'/newContrato',{
      body:{
        empleado_id: this.contratos_empleado.empleado_id,
        duracion_contrato: this.contratos_empleado.duracion_contrato,
        puesto: this.contratos_empleado.puesto,
        sueldo: this.contratos_empleado.sueldo,
        nombre_empresa: this.contratos_empleado.nombre_empresa
      }}).subscribe();

      this.clearContrato(this.contratos_empleado);

      alert("Empleado creado con éxito");

  }

  getContrato(contrato: Contrato){
      this.upContrato = contrato;
      this.component = false;
  }

  getContratoForDetail(contrato: Contrato){
    this.upContrato = contrato;
    this.component = false;
    this.detail = true;
  }

  showContrato(contrato: Contrato){
    this.upContrato = contrato;
    this.detail = false;
    this.component = true;
  }

  actualizarContrato(newInput: Contrato){
    this.http.makeRequest('put', environment.api_url+'/updateContrato',{
      body:{
        _id: newInput._id,
        empleado_id: newInput.empleado_id,
        duracion_contrato: newInput.duracion_contrato,
        puesto: newInput.puesto,
        sueldo: newInput.sueldo,
        nombre_empresa: newInput.nombre_empresa
      }}).subscribe();

      this.clearContrato(newInput);

      this.resetComponents();

      alert("Contrato actualizado Correctamente");

    }

    clearContrato(contrato: Contrato){
      contrato._id = null;
      contrato.duracion_contrato = null;
      contrato.empleado_id = null;
      contrato.nombre_empresa = null;
      contrato.puesto = null;
      contrato.sueldo = null;

    }

    backToContratosPorEmpleado(){
      this.component = true;
      this.detail = true;
    }

    clearArray(array: Array<Contrato>){
      array = Contrato[''];
    }

    resetComponents(){
      this.component = null;
    }

}
