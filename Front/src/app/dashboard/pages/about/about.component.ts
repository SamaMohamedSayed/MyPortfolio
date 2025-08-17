import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  aboutText!: any;
  myForm!:FormGroup
  constructor(private global:GlobalService){}
  ngOnInit(){
    this.global.getAboutText().subscribe(res=>{
      this.aboutText=res.aboutText
      console.log(res);
      
      this.myForm=new FormGroup({
        aboutText:new FormControl(this.aboutText)
      })
    })
  }

  submit(){
    const data={
      aboutText:this.myForm.get('aboutText')?.value
    }
    this.global.updatetext(data).subscribe(res=>
      console.log(res)
    )
  }
} 
