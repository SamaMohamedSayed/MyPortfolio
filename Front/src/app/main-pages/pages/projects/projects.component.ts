import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  constructor(private global:GlobalService){}
  projects:any[]=[]
  ngOnInit(){
    this.global.projectPage().subscribe(res=>{
      console.log(res)
      this.projects=res
    })
  }
}

