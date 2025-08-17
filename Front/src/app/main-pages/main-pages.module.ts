import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPagesRoutingModule } from './main-pages-routing.module';
import { MainPagesComponent } from './main-pages.component';
import { IndexComponent } from './pages/index/index.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainPagesComponent,
    IndexComponent,
    NavbarComponent,
    AboutComponent,
    ServicesComponent,
    ProjectsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    MainPagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class MainPagesModule { }
