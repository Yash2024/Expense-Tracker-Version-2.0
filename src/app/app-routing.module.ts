import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { GenComponent } from './gen/gen.component';
import { LoginComponent } from './login/login.component';
import { SignuoComponent } from './signuo/signuo.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:GenComponent},
  {path:"about",component:AboutComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignuoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
