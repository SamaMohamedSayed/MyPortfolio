import { Component } from '@angular/core';
import { slideInAnimation } from '../animations/animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-pages',
  standalone: false,
  templateUrl: './main-pages.component.html',
  styleUrl: './main-pages.component.css',
  animations:[slideInAnimation]
})
export class MainPagesComponent {
  prepareRoute(outlet: RouterOutlet){
    return outlet?.activatedRouteData?.['animation']
  }
}
