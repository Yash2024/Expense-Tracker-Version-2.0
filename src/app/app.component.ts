import { LocalizedString } from '@angular/compiler';
import { Component, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { expense } from './expense.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expense_tracker';
  

   logtog: boolean =true;
  
  logout(){
    localStorage.setItem("user","");
    localStorage.setItem("token","");
    this.logtog = false;
  }

}
