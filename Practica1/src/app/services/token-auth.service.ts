import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {HttpClientService} from "../services/http-client.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {

  constructor(private router: Router, private http: HttpClientService) { }

  validation(){
 
    this.http.makeRequest('get',environment.api_url+'/userAuth',{
      body:{}
    }).subscribe(data => {this.tokenValidation(data)});

    return this.tokenValidation 
  }

  tokenValidation(validation: boolean): boolean{
    var validation: boolean = validation;
    if(!validation){
      this.router.navigate(['/login']);
    }
    return validation !== false;
  }
}
