
import { Component, EventEmitter } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {
//   SocialAuthService,
//   GoogleLoginProvider,
//   SocialUser,
// } from 'angularx-social-login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loginForm!: FormGroup;
  isLoggedin?: boolean;
  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
     
  }
  
  
  
   

}
