import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MutualFundService {

  url = "https://calculatenetworthapi.azurewebsites.net/api/Networth/ViewMutualFunds?id=1";
  sellAssetsUrl = "https://calculatenetworthapi.azurewebsites.net/api/Networth/SellAssets";
  constructor(private http:HttpClient, private toastr:ToastrService) { }

  displayMutualFunds()
  {
    return this.http.get(this.url);
  }
  

  sellMutualFunds(portfolioId:number,stockName:string, stockCount:number):Observable<string>
  {
    
    let sellAssetsUrl = this.sellAssetsUrl+'?portfolioId='+portfolioId+'&assetName='+stockName+'&unitsToSell='+stockCount;
    //https://localhost:44356/api/Networth/SellAssets?portfolioId=1&stockName=Tata%20Steel&stockCount=1
    //https://localhost:44356/api/Networth/SellAssets?portfolioId=1&assetName=Tata%20Steel&unitsToSell=1
   return this.http.post<string>(sellAssetsUrl,
      {

        headers:new HttpHeaders({

        'Content-Type':'application/text;charset=UTF-8',

        'Access-Control-Allow-Origin':'*',

        'Access-Control-Allow-Method':'*',

        'Authorization':'Bearer '+localStorage.getItem("jwt")

      })

  })
    
  
};

}
