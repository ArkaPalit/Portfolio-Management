import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ToastService } from '../common/toast.service';
import { AuthServiceService } from '../services/auth-service.service';

//import toast service here

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(private authService:AuthServiceService,private router:Router, private toast:ToastService) { }

  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {

    this.authService.isUserLogIn();
  }

  onSubmitLoginForm(){
    this.toast.showLoader()
    let cred=this.loginForm.value;
    let user=new User(cred.username,cred.password);

    // If the credentials mathches logging in the user
    this.authService.login(user).subscribe(res=>{
     this.toast.stopLoader()
     this.toast.showSuccess("Login Successfully")

    // Storing the token in local storage and navigating to home page 
    localStorage.setItem('token', res.token);
    this.router.navigate(['home'])
   },
   
   // Throws error in case of invalid credentials
   error=>{
     this.toast.stopLoader()
     this.toast.showError(error.error.message)
   })
  }
}
