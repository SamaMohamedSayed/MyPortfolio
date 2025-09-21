import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPagesComponent } from './main-pages.component';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { animation } from '@angular/animations';

const routes: Routes = [{ path: '', component: MainPagesComponent ,children:[
  {path:'',component:IndexComponent},
  {path:'about',component:AboutComponent,data:{animation:'About'}},
  {path:'projects',component:ProjectsComponent,data:{animation:'Projects'}},
  {path:'service',component:ServicesComponent,data:{animation:'Services'}},
  {path:'contact',component:ContactComponent,data:{animation:'Contact'}}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPagesRoutingModule { }

