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
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.displayText = currentText.substring(0, this.charIndex--);
    } else {
      this.displayText = currentText.substring(0, this.charIndex++);
    }

    let typingSpeed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.charIndex === currentText.length+1) {
      this.isDeleting = true;
      typingSpeed = 2000;

    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typingSpeed = 500;
    }

    setTimeout(() => this.typeEffect(), typingSpeed);
  }

  
}
