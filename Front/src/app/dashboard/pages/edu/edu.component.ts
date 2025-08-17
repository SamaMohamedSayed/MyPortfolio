import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edu',
  standalone: false,
  templateUrl: './edu.component.html',
  styleUrl: './edu.component.css'
})
export class EduComponent {

  constructor(private global:GlobalService){}
    eduData:any[]=[]
    eduForm!:FormGroup
    eduId:string=''
    
  
    ngOnInit(){
      this.eduForm=new FormGroup({
          degree:new FormControl(''),
          institution:new FormControl(''),
          graduation:new FormControl('')
        })
      this.getEducation();
    }
    getEducation(){
      this.global.getEdu().subscribe(res=>{
        this.eduData=res
        console.log(res)
        
      })
    }
  
    editEdu(id:string){
      const selected=this.eduData.find(s=>s._id==id)
      if(selected){
        this.eduForm.patchValue({
          degree:selected.degree,
          institution:selected.institution,
          graduation:selected.graduation,
        })
        this.eduId = id;
        console.log(this.eduId)
      }
  
    }
  
    deleteEdu(id:string){
      this.global.deleteEdu(id).subscribe({
      next: () => {
        console.log("sdasdasda");
        
      },
      error: (err) => console.error(err)
    });
      this.getEducation()

    }
  
    assignData(){
      const formData = {
        degree:this.eduForm.get('degree')?.value,
        institution:this.eduForm.get('institution')?.value,
        graduation:this.eduForm.get('graduation')?.value,
      }
  
      return formData
  
    }
  
    submitEdit(){
    
    this.global.updateEdu(this.eduId, this.assignData()).subscribe(res => {
      console.log('Update response:', res);
    });
  }
  
  
    submit(){
      this.global.addEdu(this.assignData()).subscribe(res=>{
        console.log('new project: ',res)
      })
      this.getEducation()
    }
}
