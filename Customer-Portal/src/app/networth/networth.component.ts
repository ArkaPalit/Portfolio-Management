import { Component, OnInit } from '@angular/core';
import { NetworthService } from '../services/networth.service';

@Component({
  selector: 'app-networth',
  templateUrl: './networth.component.html',
  styleUrls: ['./networth.component.css']
})
export class NetworthComponent implements OnInit {
  amount:any;
  constructor(private usersNetWorth:NetworthService) { 
    this.usersNetWorth.getNetworth().subscribe((data)=>{
      this.amount = data;
    });
  }

  ngOnInit(): void {
  }

}
