import { Component } from '@angular/core';
import { slideInAnimation } from './animations/animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  animations:[slideInAnimation]
})
export class AppComponent {
  title = 'potrfolio';

}
