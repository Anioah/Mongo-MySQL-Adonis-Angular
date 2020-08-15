import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona';
import { Contrato } from 'src/app/models/contrato';
import {HttpClientService} from "../../services/http-client.service";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mostrar-empresa',
  templateUrl: './mostrar-empresa.component.html',
  styleUrls: ['./mostrar-empresa.component.css']
})
export class MostrarEmpresaComponent implements OnInit{

contratos_empleado: Contrato = new Contrato();
empleados: Persona = new Persona();
buscarempleado:Persona = new Persona();
upempleado:Persona = new Persona();
empleados_array:Persona[] = [];
public component;
public data = true;
public interfaz = true;

//Constructor
constructor(private http:HttpClientService, private router: Router){}

ngOnInit(){
  this.mostrarEmpleados();
}

public logout(): void {
 localStorage.setItem('token','');
 window.localStorage.removeItem('userToken');
 this.router.navigate(['/login']);
}

mostrarEmpleados(){
    this.http.makeRequest('get',environment.api_url+'/empleados',{
      body:{}
    }).subscribe(empleados =>{this.empleados_array = empleados});
}

deleteEmpleado(id: any){
  this.http.makeRequest('delete', environment.api_url+'/deleteEmpleado',{
    body:{
      id:id
  }}).subscribe();

  window.location.reload();
}

nuevoEmpleado(){
  this.http.makeRequest('post', environment.api_url+'/nuevoEmpleado',{
    body:{
      nombre:this.empleados.nombre,
      apellido_p:this.empleados.apellido_p,
      apellido_m:this.empleados.apellido_m,
      sexo:this.empleados.sexo,
      telefono:this.empleados.telefono,
      direccion:this.empleados.direccion,
      correo:this.empleados.correo
    }}).subscribe();

    //this.mostrarEmpleados();
    window.location.reload();

    this.clearEmpleado(this.empleados);

    this.resetComponents();

    alert("Empleado creado con éxito");
}

getEmpleado(empleado: Persona){
  this.upempleado = empleado;
  this.component = false;
}

showEmpleado(empleado: Persona){
  this.upempleado = empleado;
  this.interfaz = false;
}

backToShowEmpleado(){
  this.interfaz = false;
  this.data = true;
}

actualizarempleado(newInput: Persona){

  this.http.makeRequest('put', environment.api_url+'/updateEmpleado',{
    body:{
      id:newInput.id,
      nombre:newInput.nombre,
      apellido_p:newInput.apellido_p,
      apellido_m:newInput.apellido_m,
      sexo:newInput.sexo,
      telefono:newInput.telefono,
      direccion:newInput.direccion,
      correo:newInput.correo
    }}).subscribe();

    window.location.reload();

    alert("Empleado actualizado Correctamente");

  }

  newContratoComponent(empleado: Persona){
    this.upempleado = empleado;
    this.data = false;
    console.log(this.upempleado.id);
  }

  nuevoContrato(id: any){
    this.http.makeRequest('post', environment.api_url+'/newContrato',{
      body:{
        empleado_id: id,
        duracion_contrato: this.contratos_empleado.duracion_contrato,
        puesto: this.contratos_empleado.puesto,
        sueldo: this.contratos_empleado.sueldo,
        nombre_empresa: this.contratos_empleado.nombre_empresa
      }}).subscribe();

      this.clearContrato(this.contratos_empleado);
      this.data = true;

      alert("Contrato creado con éxito");

  }

  clearEmpleado(empleado: Persona){
    empleado.id = null;
    empleado.nombre = null;
    empleado.apellido_p = null;
    empleado.apellido_m = null;
    empleado.sexo = null;
    empleado.direccion = null;
    empleado.telefono = null;
    empleado.correo = null;

  }

  clearContrato(contrato: Contrato){
    contrato._id = null;
    contrato.duracion_contrato = null;
    contrato.empleado_id = null;
    contrato.nombre_empresa = null;
    contrato.puesto = null;
    contrato.sueldo = null;

  }

  initNewEmpleado(){
    this.component = true;
  }

  clearArray(array: Array<Persona>){
    array = Persona[''];
  }

  resetComponents(){
    this.component = null;
    this.data = true;
    this.interfaz = true;
  }

}
