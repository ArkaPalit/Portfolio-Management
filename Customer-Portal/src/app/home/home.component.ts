import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NetworthService } from '../services/networth.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { StockService } from '../services/stock.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  amount:any;
  userId: number;
  closeResult: string;

  constructor(private mynetworth:NetworthService, private modalService: NgbModal) {
    this.mynetworth.getNetworth().subscribe((data)=>{
      this.amount = data;
    });
   }

  ngOnInit(): void {
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

