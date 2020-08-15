import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { Router } from '@angular/router';
import {HttpClientService} from "../../services/http-client.service";
import {AuthService} from "../../services/auth.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mostrar-company',
  templateUrl: './mostrar-company.component.html',
  styleUrls: ['./mostrar-company.component.css']
})
export class MostrarCompanyComponent implements OnInit{

  empresas: Empresa = new Empresa();
  findEmpresa:Empresa = new Empresa();
  upEmpresa:Empresa = new Empresa();
  empresas_array:Empresa[] = [];
  public component;
  public data = false;

  //Constructor
  constructor(private http:HttpClientService,private router: Router){}

  ngOnInit(){
    this.mostrarEmpresas();
  }

  public logout(): void {
    localStorage.setItem('token','');
    window.localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
   }

  mostrarEmpresas(){
    this.http.makeRequest('get',environment.api_url+'/empresas',{
      body:{}
    }).subscribe(empresas =>{this.empresas_array = empresas});

  }

  deleteEmpresa(id: any){
    this.http.makeRequest('delete', environment.api_url+'/deleteEmpresa',{
      body:{
        id:id
    }}).subscribe();

    window.location.reload();

  }

  nuevaEmpresa(){
    this.http.makeRequest('post', environment.api_url+'/nuevaEmpresa',{
    body:{
      nombre:this.empresas.nombre,
      rfc:this.empresas.rfc,
      telefono:this.empresas.telefono,
      direccion:this.empresas.direccion
    }}).subscribe();

    window.location.reload();

    this.clearEmpresa(this.empresas);

    this.resetComponents();

    alert("Empresa creada con éxito");
  }

  getEmpresa(empresa: Empresa){
    this.upEmpresa = empresa;
    this.component = false;
  }

  showEmpresa(empresa: Empresa){
    this.upEmpresa = empresa;
    this.data = true;
  }

  actualizarEmpresa(newInput: Empresa){

    this.http.makeRequest('put', environment.api_url+'/updateEmpresa',{
    body:{
      id:newInput.id,
      nombre:newInput.nombre,
      rfc:newInput.rfc,
      telefono:newInput.telefono,
      direccion:newInput.direccion
    }}).subscribe();

    window.location.reload();
    this.clearEmpresa(newInput);

    this.resetComponents();

    alert("Empresa actualizada Correctamente");

  }

  clearEmpresa(empresa: Empresa){
    empresa.id = null;
    empresa.nombre = null;
    empresa.rfc = null;
    empresa.direccion = null;
    empresa.telefono = null;
  }

  initNewEmpresa(){
    this.component = true;
  }

  clearArray(array: Array<Empresa>){
    array = Empresa[''];
  }

  resetComponents(){
    this.component = null;
    this.data = false;
  }

}
