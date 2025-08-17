import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
    constructor(private global:GlobalService){}
    services:any[]=[]
    msg:string=''
    ngOnInit(){
      this.global.servicePage().subscribe(res=>{
        this.services=res
        this.msg=res[0].msg
      })
    }
}
