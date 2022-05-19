import { Component, ViewChild, OnInit } from '@angular/core';
import { MutualFundService } from '../services/mutualfunds.service';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms' ;
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NumberFormatStyle } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-mutualfunds',
  templateUrl: './mutualfunds.component.html',
  styleUrls: ['./mutualfunds.component.css']
})
export class MutualfundsComponent implements OnInit {
  @ViewChild('dataTable', {static:false}) table:any;
  mutualFunds:any = [];
  dataTable:any;
  closeResult: string;
  portfolioId:number;
  mutualFundName:string;
  unitsToSell:number;
  sellform: FormGroup;
  userid:FormControlName;
  

  constructor(private mutualFundData:MutualFundService,private httpClient: HttpClient,
    private modalService: NgbModal, private toastr:ToastrService, private route:Router, private router:ActivatedRoute) {
    
    }
   

  ngAfterViewInit(): void {
    // this.dataTable = $(this.table.nativeElement);
    // this.dataTable.DataTable();

    
 }

 onSubmit(portfolioId:number, mutualFundName:string, unitsToSell:number,sellmutualfundform:NgForm):any
      {
        sellmutualfundform.reset();
        console.warn(portfolioId);
        
        this.mutualFundData.sellMutualFunds(portfolioId, mutualFundName, unitsToSell).subscribe(usdata=>{
        // console.log(returnvalue);
        
        console.log(usdata);
        this.toastr.success('Your sell order was successful', 'Transaction Status',{timeOut:300000});
        this.ngOnInit();
        this.reloadCurrentRoute();
          
      
      },
      err=>{
        this.toastr.error('Your sell order was not successful. Please enter valid details', 'Transaction Status',{timeOut:12000});
        this.ngOnInit();
        this.reloadCurrentRoute();
      });

      

      
    }
    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.route.navigateByUrl('/mutual-funds', {skipLocationChange: true}).then(() => {
          this.route.navigate(['mutual-funds']);
      });
  }



  ngOnInit(): void {

    this.mutualFundData.displayMutualFunds().subscribe((data)=>{
      console.warn("data", data)
      this.mutualFunds = data;

      
    })
    
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




}
