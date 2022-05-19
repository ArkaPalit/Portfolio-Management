import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NetworthService } from '../services/networth.service';
import { StockService } from '../services/stock.service';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatCardModule} from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
declare var $:any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit{

  
  @ViewChild('dataTable', {static:false}) table:any;
  stocks:any = [];
  dataTable:any;
  closeResult: string;
  portfolioId:number;
  stockName:string;
  stockCount:number;
  f:FormGroup;
 
  constructor(private stockData: StockService, private httpClient: HttpClient,
    private modalService: NgbModal, private route:Router, private router:ActivatedRoute, private toastr:ToastrService) {}


    ngAfterViewInit(): void {
      // this.dataTable = $(this.table.nativeElement);
      // this.dataTable.DataTable();
  
      
    }

      open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
      
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }

         
      onSubmit(portfolioId:number, stockName:string, stockCount:number,f:NgForm):any
      {
        f.reset();
        console.warn(portfolioId);
        console.warn(typeof stockName);
        console.warn(typeof stockCount);
        // this.stockData.sendSaleData(data.value).subscribe((result)=>{
        //   console.warn(result);
        // })


        this.stockData.sendSaleData(portfolioId, stockName, stockCount).subscribe(usdata=>{

          console.log(usdata);
          this.toastr.success('Your sell order was successful', 'Transaction Status',{timeOut:10000});
          this.ngOnInit();
          this.reloadCurrentRoute();

          console.log('returned from aservice call');
          
        },
        err=>{
          this.toastr.error('Your sell order was not successful. Please enter valid details', 'Transaction Status',{timeOut:10000});
          this.ngOnInit();
          this.reloadCurrentRoute();
      }
        );
      
      }
  ngOnInit(): void {

    
    console.log('inside ngOnit');
    this.stockData.displayMyStocks().subscribe((data)=>{
      console.warn("data", data)
      this.stocks = data;
    })
    
    // this.f = new FormGroup({
    //   'portfolioId': new FormControl(null, Validators.required),
    //   'stockName':new FormControl(null, Validators.required),
    //   'stockCount': new FormControl(null, Validators.required)
    // });
   
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.route.navigateByUrl('/stocks', {skipLocationChange: true}).then(() => {
        this.route.navigate(['stocks']);
    });
}
  

}
