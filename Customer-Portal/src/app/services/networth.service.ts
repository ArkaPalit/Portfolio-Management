import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class NetworthService {

  url = "https://calculatenetworthapi.azurewebsites.net/api/Networth/CalculateNetworth?id=1";
  

  constructor(private http:HttpClient) { }

  getNetworth()
  {
    return this.http.get(this.url);
  }




}
