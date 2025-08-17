import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-certif',
  standalone: false,
  templateUrl: './certif.component.html',
  styleUrl: './certif.component.css'
})
export class CertifComponent {

  constructor(private global:GlobalService){}
  certifData:any[]=[]
  certifForm!:FormGroup
  certifId:string=''
  

  ngOnInit(){
    this.certifForm=new FormGroup({
        icon:new FormControl(''),
        title:new FormControl(''),
        year:new FormControl('')
      })
    this.global.getCertif().subscribe(res=>{
      this.certifData=res
      console.log(res)
      
    })
  }

  editProject(id:string){
    const selected=this.certifData.find(s=>s._id==id)
    if(selected){
      this.certifForm.patchValue({
        icon:selected.icon,
        title:selected.title,
        year:selected.year,
      })
      this.certifId = id;
      console.log(this.certifId)
    }

  }

  deleteCert(id:string){
    this.global.deleteCertif(id).subscribe({
    next: () => {
      console.log("sdasdasda");
      
    },
    error: (err) => console.error(err)
  });
  }

  assignData(){
    const formData = {
      icon:this.certifForm.get('icon')?.value,
      title:this.certifForm.get('title')?.value,
      year:this.certifForm.get('year')?.value,
    }

    return formData

  }

  submitEdit(){
  
  this.global.updateCertif(this.certifId, this.assignData()).subscribe(res => {
    console.log('Update response:', res);
  });
}


  submit(){
    this.global.addCertif(this.assignData()).subscribe(res=>{
      console.log('new project: ',res)
    })
  }
}
