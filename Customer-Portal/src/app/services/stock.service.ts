import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url = "https://calculatenetworthapi.azurewebsites.net/Networth/ViewStockHoldings?id=1";
  sellAssetsUrl = "https://calculatenetworthapi.azurewebsites.net/api/Networth/SellAssets";
  constructor(private http:HttpClient) { }

  displayMyStocks()
  {
    console.log('display stocks inside service called');
    return this.http.get(this.url);
    // return this.http.get(this.url)
    // .pipe(map((res:any)=>{
    //   return res;

    //}))
  }

  sendSaleData(portfolioId:number,stockName:string, stockCount:number):Observable<string>
  {
    console.log('calling api');
    let url = this.sellAssetsUrl+'?portfolioId='+portfolioId+'&assetName='+stockName+'&unitsToSell='+stockCount;
    //https://localhost:44356/api/Networth/SellAssets?portfolioId=1&stockName=Tata%20Steel&stockCount=1

    //https://localhost:44356/api/Networth/SellAssets?portfolioId=1&assetName=Tata%20Steel&unitsToSell=1
    return this.http.post<string>(url,

      {

          headers:new HttpHeaders({

          'Content-Type':'application/text;charset=UTF-8',

          'Access-Control-Allow-Origin':'*',

          'Access-Control-Allow-Method':'*',

          'Authorization':'Bearer '+localStorage.getItem("jwt")

        })

    }
    

  )};
  

  
  // login(data):Observable<any> {
  //   console.log(data);
  //   return this.http.post("https://localhost:44356/api/Networth/CalculateNetworth/1", data);
    
  // }
}
