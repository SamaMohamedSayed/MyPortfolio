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
  skills!:any[]

  constructor(private global:GlobalService){}

  ngOnInit(){
    this.global.aboutPage().subscribe(res=>{
      this.aboutData=res
    })

    this.global.getSkills().subscribe((res:any)=>{
      this.skills=this.groupByCategory(res)
    })
  }

  groupByCategory(data: any[]) {
    const grouped: any = {};

    data.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = {
          category: item.category,
          skills: []
        };
      }
      grouped[item.category].skills.push(...item.skills);
    });

    return Object.values(grouped);
  }

    showSection(section:string){
      this.active=section
    }
} 
