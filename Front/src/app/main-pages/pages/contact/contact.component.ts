import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private global:GlobalService){}
    submitted=false

  myForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]),
    mobile:new FormControl('',[Validators.required]),
    subject:new FormControl('',[Validators.required]),
    msg:new FormControl('',[Validators.required,Validators.minLength(10)]),
  })


  submit(){
    this.submitted=true
    if (this.myForm.valid){
      this.global.contactPage(this.myForm.value).subscribe(res=>{
        console.log(res)
      })
    }
    else{
      console.log('err') 
    }
    
  }
}
