import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }
logtog: string|null = "";
check: boolean=true;
  ngOnInit(): void {
    this.logtog=localStorage.getItem("logtog");
    if(this.logtog==="false")
    {
      this.check=false;
    }
    else
    {
      this.check=true;
    }
  }
logout(){
  localStorage.setItem("user","");
  localStorage.setItem("token","");
  localStorage.setItem("logtog","");
}
}
