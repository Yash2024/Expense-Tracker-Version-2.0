import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { expense } from '../expense.model';
import { ExpServiceService } from '../services/exp-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gen',
  templateUrl: './gen.component.html',
  styleUrls: ['./gen.component.css']
})
export class GenComponent implements OnInit {
 
  logtog: boolean = true;
  explist : expense[]=[];
  exp : expense = {_id:"",date:"",name:"",desc:"",amount: 0,btn: true,userId: ""};
  total: number=0;
  curlist: expense[]=[]
  curmonth: number[]=[1,0,0,0,0,0,0,0,0,0,0,0,0];
  curuser: string | null ="";
  month: string | null = "All Months";
  constructor( private service : ExpServiceService, private router: Router) { }

  ngOnInit(): void {
    this.curuser = localStorage.getItem("user");
    console.log(this.curuser);
    if(this.curuser === null || this.curuser === "")
    {
      alert("Please Login To your Account");
      this.router.navigate(['login']);
    } 
    else{
    this.service.getexplist().subscribe((res)=>{
      this.explist = res as expense[];
      
      if(this.curmonth[0]==1)
      {
          this.all();
      }
      else if(this.curmonth[1]==1)
      {
        this.jan();
      }
      else if(this.curmonth[2]==1)
      {
        this.feb();
      }
      else if(this.curmonth[3]==1)
      {
        this.mar();
      }
      else if(this.curmonth[4]==1)
      {
        this.apr();
      }
      else if(this.curmonth[5]==1)
      {
        this.may();
      }
      else if(this.curmonth[6]==1)
      {
        this.jun();  
      }
      else if(this.curmonth[7]==1)
      {
        this.jul();
      }
      else if(this.curmonth[8]==1)
      {
        this.aug();
      }
      else if(this.curmonth[9]==1)
      {
        this.sept();
      }
      else if(this.curmonth[10]==1)
      {
        this.oct();
      }
      else if(this.curmonth[11]==1)
      {
        this.nov();
      }
      else if(this.curmonth[12]==1)
      {
        this.dec();
      }
      this.calctot();
    })
  }
  }

  //update
  setsave(exp: expense,i: number) {
    exp.btn = false;
    // this.service.updateexpense(exp as expense).subscribe(res =>{
    //   this.service.getexplist().subscribe( (result)=>{
    //     this.explist = result as expense[];
    //   })
    // })
    // document.getElementById("text")?.disabled=false;
  }

  saveexp(exp: expense, i: number) {
    if (exp.amount === 0 || exp.amount === null) {
      alert("please enter the amount");
    }
    else if (exp.desc === "") {
      alert("please enter the description");
    }
    else if (exp.name === "") {
      alert("please enter the name");
    }
    else if (exp.date === "" || exp.date === "mm/dd/yyyy") {
      alert("please enter the date");
    }
    else {
      this.explist[i] = exp;
      this.explist[i].btn = true;
      this.service.updateexpense(exp as expense).subscribe((res) =>{
        this.service.getexplist().subscribe( (result)=>{
          this.explist = result as expense[];
        })
      })
      this.explist.sort((a,b) => a.date.localeCompare(b.date));
      this.curlist.sort((a,b) => a.date.localeCompare(b.date));  //function to sort in angular
      alert("The Expense has been Updated Successfully");
      this.calctot();
    }
  }

  //ADD NEW
  newslot: boolean = false;

  addslot() {
    this.newslot = true;
  }
  logout(){
    localStorage.setItem("user","");
    localStorage.setItem("token","");
  }
  addexpense() {

    var expd = Object.assign({}, this.exp);
    if (expd.amount === 0 || expd.amount === null) {
      alert("please enter the amount");
    }
    else if (expd.desc === "") {
      alert("please enter the description");
    }
    else if (expd.name === "") {
      alert("please enter the name");
    }
    else if (expd.date === "" || expd.date === "mm/dd/yyyy") {
      alert("please enter the date");
    }
    else {
      expd.btn = true;
      expd.userId = this.curuser;
      this.service.addexpense(expd).subscribe((res)=>{
        // console.log(res);
        this.service.getexplist().subscribe((result) =>{
          this.explist = result as expense[];
        });
      });
      
      
      this.exp = { _id: "", date: "", name: "", desc: "", amount: 0, btn: true, userId: ""};
      alert("The Expense has been Added Successfully");
      this.newslot = false;
      this.ngOnInit();
      this.calctot();
    }
  }

  cancel() {
    this.newslot = false;
  }

  //Delete
  deleteexpense(id: string) {
    console.log(id);
    this.service.deleteproduct(id).subscribe(res =>{
      this.service.getexplist().subscribe(res => {
        this.explist as expense[];
      });
    });

    
    this.explist = this.explist.filter(x => x._id != id);
    this.curlist = this.curlist.filter(x => x._id != id);
      
    this.calctot();
    alert("Product Deleted Successfully");
  }

   
  calctot(){
    this.total=0;
    let array = this.curlist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].amount != null) {
        this.total += array[i].amount;
      }
    }
  }

  all(){
    this.month="All Months";
    this.curmonth = [1,0,0,0,0,0,0,0,0,0,0,0,0];
    this.curlist=[];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if ( array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.explist =this.curlist;
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  jan(){
    this.month="January";
    this.curlist=[];
    this.curmonth = [0,1,0,0,0,0,0,0,0,0,0,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[6] == '1' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  feb(){
    this.month="February";
    this.curlist=[];
    this.curmonth = [0,0,1,0,0,0,0,0,0,0,0,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[6] == '2' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  mar(){
    this.month="March";
    this.curlist=[];
    this.curmonth = [0,0,0,1,0,0,0,0,0,0,0,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[6] == '3' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  apr(){
    this.month="April";
    this.curlist=[];
    this.curmonth = [0,0,0,0,1,0,0,0,0,0,0,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[6] == '4' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  may(){
    this.month="May";
    this.curlist=[];
    this.curmonth = [0,0,0,0,0,1,0,0,0,0,0,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[6] == '5' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  jun(){
    this.month="June";
    this.curlist=[];
    this.curmonth = [0,0,0,0,0,0,1,0,0,0,0,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[6] == '6' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  jul(){
    this.month="July";
    this.curlist=[];
    this.curmonth = [0,0,0,0,0,0,0,1,0,0,0,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[6] == '7' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  aug(){
    this.month="August";
    this.curlist=[];
    this.curmonth = [0,0,0,0,0,0,0,0,1,0,0,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[6] == '8' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  sept(){
    this.month="September";
    this.curlist=[];
    this.curmonth = [0,0,0,0,0,0,0,0,0,1,0,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[6] == '9' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  oct(){
    this.month="October";
    this.curlist=[];
    this.curmonth = [0,0,0,0,0,0,0,0,0,0,1,0,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[5] == '1' && array[i].date[6] == '0' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  nov(){
    this.month="November";
    this.curlist=[];
    this.curmonth = [0,0,0,0,0,0,0,0,0,0,0,1,0];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[5] == '1' && array[i].date[6] == '1' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }
  dec(){
    this.month="December";
    this.curlist=[];
    this.curmonth = [0,0,0,0,0,0,0,0,0,0,0,0,1];
    let array = this.explist;
    for (let i = 0; i < array.length; i++) {
      if (array[i].date[5] == '1' && array[i].date[6] == '2' && array[i].userId === this.curuser) {
        this.curlist.push(array[i]);
      }
    }
    this.curlist.sort((a,b) => a.date.localeCompare(b.date));
    this.calctot();
  }

}
