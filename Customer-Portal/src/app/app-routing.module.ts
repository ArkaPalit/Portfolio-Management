import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StockComponent } from './stock/stock.component';
import { MutualfundsComponent } from './mutualfunds/mutualfunds.component';
import { NetworthComponent } from './networth/networth.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'stocks', component:StockComponent, canActivate:[AuthGuard]},
  {path:'mutual-funds', component:MutualfundsComponent, canActivate:[AuthGuard]},
  {path:'net-worth', component:NetworthComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
