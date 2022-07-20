import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { user } from '../user.model';
import { ExpServiceService } from '../services/exp-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usr: user = { _id: "", email: "", password: "" };
  constructor(private service: ExpServiceService, private router: Router) { }

  tkn: string = "";
  id: string = "";
  mess: string = "";

 showPassword: boolean = false;

  ngOnInit(): void {
  }

  signin() {
    if(this.usr.email==="")
    {
      alert("Please Enter Email")
    }
    else if(this.usr.password==="")
    {
      alert("Please Enter Password")
    }
    else{
    this.service.login(this.usr as user).subscribe((res) => {

      alert(res.message);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", res._id);
      this.router.navigate(['home']);

    }, (error: HttpErrorResponse) => {
      console.log("Error:" + error.message)
      alert("Please Enter a Valid Email ");
    })
  }
  }

  goto() {
    this.router.navigate(['signup']);
  }

  myFunction(){
    this.showPassword=!this.showPassword
  }
  
}
