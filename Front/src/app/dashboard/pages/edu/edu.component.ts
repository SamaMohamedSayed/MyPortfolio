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
          title:new FormControl(''),
          name:new FormControl(''),
          description:new FormControl(''),
          date:new FormControl('')
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
          title:selected.title,
          name:selected.name,
          description:selected.description,
          date:selected.date,
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
        title:this.eduForm.get('title')?.value,
        name:this.eduForm.get('name')?.value,
        date:this.eduForm.get('date')?.value,
        description:this.eduForm.get('description')?.value,
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
        console.log('new Edu: ',res)
      })
      this.getEducation()
    }
}
