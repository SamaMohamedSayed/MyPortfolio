import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { HeaderComponent } from './shared/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { ProjectComponent } from './pages/project/project.component';
import { ServiceComponent } from './pages/service/service.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { EduComponent } from './pages/edu/edu.component';
import { CertifComponent } from './pages/certif/certif.component';
import { SkillsComponent } from './pages/skills/skills.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    OverviewComponent,
    HeaderComponent,
    AboutComponent,
    ProjectComponent,
    ServiceComponent,
    ContactComponent,
    EduComponent,
    CertifComponent,
    SkillsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ]
})
export class DashboardModule { }
