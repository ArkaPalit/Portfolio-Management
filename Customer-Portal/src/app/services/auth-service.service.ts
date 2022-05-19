import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // Taking the api endpoint from enviornment file
  BaseUrl = environment.authApiBaseUrl;

  constructor(private http:HttpClient, private router:Router) { 
    
  }
  login(loginCredentials:User):Observable<any> {
    return this.http.post(this.BaseUrl+"/Authentication", loginCredentials);
  }

  isUserLogIn(){
    if(localStorage.getItem("token")){
      this.router.navigate(["home"]);
    }
    }


}
