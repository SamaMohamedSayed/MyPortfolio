import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  constructor(private global:GlobalService){}
  myForm!:FormGroup
  homePage:any
  image:any
  cvFile:any
  projectsCounter=0
  skillsCounter=0
  msgCounter=0

  ngOnInit(){
    this.global.homePage().subscribe(res=>{
      this.homePage=res[0]
      console.log(res);
      
      this.myForm = new FormGroup({
          name:new FormControl(this.homePage.name),
          description:new FormControl(this.homePage.description),
          img:new FormControl(this.homePage.img),
          cv: new FormControl(this.homePage.cv),
          gitHub:new FormControl(this.homePage.gitHub),
          linkedin:new FormControl(this.homePage.linkedin),
          gmail:new FormControl(this.homePage.gmail),
      })
    })
    this.countProject();
    this.countMsg();
    this.countSkills();
  }

  onImgSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log( file);
    }
    this.image=file;
  }

  onFileSelected(event:any){
    const file=event.target.files[0]
    if(file){
      console.log(file)
    }
    this.cvFile=file
  }

  submit(){
    const formData= new FormData
    formData.append('name',this.myForm.get('name')?.value)
    formData.append('description',this.myForm.get('description')?.value)
    formData.append('gitHub',this.myForm.get('gitHub')?.value)
    formData.append('gmail',this.myForm.get('gmail')?.value)
    formData.append('linkedin',this.myForm.get('linkedin')?.value)
    // formData.append('description',this.myForm.get('description')?.value)
    if (this.image) {
      formData.append('img', this.image);
  }
  if(this.cvFile){
    formData.append('cv',this.cvFile)
  }
    console.log(formData)
    this.global.homeUpdates(formData).subscribe(res=>{
      console.log('res',res);
    })
  }

  countProject(){
    this.global.projectPage().subscribe(res=>{
      this.projectsCounter=res.length
    })
  }

  countSkills(){
    this.global.getSkills().subscribe(res=>{
      this.skillsCounter=res.length
    })
  }

  countMsg(){
    this.global.getContact().subscribe(res=>{
      this.msgCounter=res.length
    })
  }

}
