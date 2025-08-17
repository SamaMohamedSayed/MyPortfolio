import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  active:string='skills'
  aboutData: any = {};

  constructor(private global:GlobalService){}

  ngOnInit(){
    this.global.aboutPage().subscribe(res=>{
      this.aboutData=res
    })
  }

    showSection(section:string){
      this.active=section
    }
} 
