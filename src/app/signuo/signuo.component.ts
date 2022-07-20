import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { user } from '../user.model';
import { ExpServiceService } from '../services/exp-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signuo',
  templateUrl: './signuo.component.html',
  styleUrls: ['./signuo.component.css']
})
export class SignuoComponent implements OnInit {

  usr: user = {_id: "", email: "",  password: ""}
  route: ActivatedRoute | null | undefined;
  showPassword: boolean = false;
  constructor(private service: ExpServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  signup(){
    if(this.usr.email==="")
    {
      alert("Please Enter Email")
    }
    else if(this.usr.password==="")
    {
      alert("Please Enter Password")
    }
    else{
    this.service.signup(this.usr as user).subscribe((res)=>{
      console.log(res);
      alert("User Created Successfully")
      this.router.navigate(['login']);
    },
    (error: HttpErrorResponse)=>{
        console.log("Error:"+error.message)
        alert("Please Enter a Valid Email ");
      })
    
    }
  }

  goto(){
      this.router.navigate(['login']);
  }
  myFunction(){
    this.showPassword=!this.showPassword
  }
}
