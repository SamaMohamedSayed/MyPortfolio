import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  constructor(private global:GlobalService){}
  homeDetails:any[]=[]
  cv=''


    texts: string[] = [
    'Web Developer',
    'Frontend Developer',
    'MEAN Stack Developer'
  ];

  displayText = '';
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;

  ngOnInit(){
    this.typeEffect();
    this.global.homePage().subscribe(res=>{
      console.log(res)
    this.homeDetails=res
    this.cv=res[0].cv
    })
  }

  showCv(){
    if(this.cv){
      window.open(`http://localhost:4000/images/${this.cv}`,'_blank')
    }
    else{
      window.open('not found')
    }

  }

  typeEffect() {
    this.displayText = this.texts[this.textIndex];

  setInterval(() => {
    this.textIndex = (this.textIndex + 1) % this.texts.length;
    this.displayText = this.texts[this.textIndex];
  }, 3000);
  }

  
}
