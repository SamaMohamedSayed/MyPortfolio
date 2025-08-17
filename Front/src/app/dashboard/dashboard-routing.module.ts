import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectComponent } from './pages/project/project.component';
import { ServiceComponent } from './pages/service/service.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EduComponent } from './pages/edu/edu.component';
import { CertifComponent } from './pages/certif/certif.component';
import { SkillsComponent } from './pages/skills/skills.component';


const routes: Routes = [{ path: '', component: DashboardComponent ,children:[
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  {path:'about',component:AboutComponent,children:[
    {path:'edu',component:EduComponent},
    {path:'certif',component:CertifComponent},
    {path:'skills',component:SkillsComponent}
  ]},

  {path:'project',component:ProjectComponent},
  {path:'service',component:ServiceComponent},
  {path:'contact',component:ContactComponent}
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
