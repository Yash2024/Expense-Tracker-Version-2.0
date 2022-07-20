import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { expense } from '../expense.model';
import { user } from '../user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpServiceService {

  constructor(private http: HttpClient) { }

  tk: string | null=localStorage.getItem("token");
  getexplist(){
    var url = environment.apibaseurl+"/expenses";

    return this.http.get(url,{
      headers: new HttpHeaders({
        'Authorization': "Bearer "+ this.tk
      })
    });
  }
  
  addexpense(exp: expense){
    var url = environment.apibaseurl+"/expenses";
    return this.http.post(
      url,
      exp,{
        headers: new HttpHeaders({
          'Authorization': "Bearer "+ this.tk
        })
      }
    );
  }

  updateexpense(exp: expense){
    var url = environment.apibaseurl+"/expenses/"+exp._id;
    return this.http.patch( 
      url, 
      exp,{
        headers: new HttpHeaders({
          'Authorization': "Bearer "+ this.tk
        })
      });
  }

  deleteproduct(id: string){
    var url =environment.apibaseurl+"/expenses/"+id;
    return this.http.delete(url,{
      headers: new HttpHeaders({
        'Authorization': "Bearer "+ this.tk
      })
    });
  }

  signup(usr: user){
    var url = environment.apibaseurl+"/users/signup";
    return this.http.post(
      url,
      usr
    );
  }

  login(usr: user): Observable<any>{
    var url = environment.apibaseurl+"/users/login";
    return this.http.post(
      url,
      usr
    )
  }

  deleteuser(id: string){
    var url = environment.apibaseurl+"/users/"+id;
    return this.http.delete(url);
  }
}
