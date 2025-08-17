import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service',
  standalone: false,
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
  constructor(private global:GlobalService){}
  services:any[]=[]
  msg=''
  myForm!:FormGroup
  ServiceId:string=''

  ngOnInit(){
    this.global.servicePage().subscribe(res => {
    this.services = res;
    this.msg = res[0].msg;
    });

    this.myForm = new FormGroup({
    msg: new FormControl(''),
    icon:new FormControl(''),
    title:new FormControl(''),
    description:new FormControl('')
  });


  
  }

  editService(id:string){
    const selected=this.services.find(s=>s._id==id)
    if(selected){
      this.myForm.patchValue({
        icon:selected.icon,
        title:selected.title,
        description:selected.description
      })
      this.ServiceId = id;
      // console.log(this.ServiceId)
    }
  }

  saveService(){
    const newdata={
      title:this.myForm.get('title')?.value,
      description:this.myForm.get('description')?.value
    }
    this.global.serviceUpdate(this.ServiceId,newdata).subscribe(res=>{
      console.log(res)
    })
    
  }

  deleteService(id:string){
    this.global.deleteService(id).subscribe(res=>{
      console.log('deleted')
    })
  }

  submit(){
    console.log('submitted')
    const data={
      title:this.myForm.get('title')?.value,
      icon:this.myForm.get('icon')?.value,
      description:this.myForm.get('description')?.value,
    }
    this.global.addService(data).subscribe(res=>{
      console.log(res)
    })
  }

}
