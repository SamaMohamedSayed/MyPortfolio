import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  constructor(private global:GlobalService){}

  projects:any[]=[]
  myForm!:FormGroup
  projectId:string=''
  editIndex:any=''
  coverFile:any=''
  imagesFiles:any[]=[]

  ngOnInit(){
    this.myForm=new FormGroup({
        cover:new FormControl(''),
        createdAt:new FormControl(''),
        role:new FormControl(''),
        title:new FormControl('',),
        description:new FormControl(''),
        images:new FormControl([]),
        technologies:new FormControl('')
      })
    this.global.projectPage().subscribe(res=>{
      this.projects=res
      console.log(res)
      
    })
  }

  editProject(id:string){
    const selected=this.projects.find(s=>s._id==id)
    if(selected){
      this.myForm.patchValue({
        title:selected.title,
        createdAt:selected.createdAt,
        role:selected.role,
        description:selected.description,
        technologies:selected.technologies
      })
      this.projectId = id;
      console.log(this.projectId)
    }

  }

  onCoverSelect(ev:any){
    const cover=ev.target.files[0]
    this.myForm.patchValue({cover:cover})
    this.coverFile=cover
  }
  onImagesSelect(ev:any){
    const images=Array.from(ev.target.files)
    this.myForm.patchValue({images:images})
    this.imagesFiles=images
  }

  deleteProject(id:string,i:number){
    this.global.projectDelete(id).subscribe({
    next: () => {
      this.projects.splice(i, 1);
    },
    error: (err) => console.error(err)
  });
  }

  assignData(){
    const formData = new FormData();
    formData.append('title', this.myForm.get('title')?.value);
    formData.append('description', this.myForm.get('description')?.value);
    formData.append('technologies', this.myForm.get('technologies')?.value);
    formData.append('createdAt', this.myForm.get('createdAt')?.value);
    formData.append('role', this.myForm.get('role')?.value);

    if (this.coverFile) {
      formData.append('cover', this.coverFile);
      console.log(this.coverFile);
      
    }

    if (this.imagesFiles && this.imagesFiles.length > 0) {
      this.imagesFiles.forEach(file => {
        formData.append('images', file);
      });
    }
    console.log("sssss  ",this.myForm.value);

    return formData

  }

  submitEdit(){
  
  this.global.projectUpdate(this.projectId, this.assignData()).subscribe(res => {
    console.log('Update response:', res);
  });
}


  submit(){
    this.global.addProject(this.assignData()).subscribe(res=>{
      console.log('new project: ',res)
    })
  }
}
