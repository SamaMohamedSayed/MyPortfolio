import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private global:GlobalService){}
  
  msgs:any[]=[]
  // ishidden=false

  ngOnInit(){
    this.global.getContact().subscribe(res=>{
      console.log(res)
      this.msgs=res
      
    })
  }

  deleteMsg(id: string, index: number) {
  this.global.hideMsg(id).subscribe({
    next: () => {
      this.msgs.splice(index, 1);
    },
    error: (err) => console.error(err)
  });
}

}
