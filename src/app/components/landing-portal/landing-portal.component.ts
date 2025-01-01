import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-landing-portal',
  templateUrl: './landing-portal.component.html',
  styleUrl: './landing-portal.component.scss'
})
export class LandingPortalComponent {

  constructor(private layoutService: LayoutService) {}

  //Layout Service Methods
  get IsMobileViewport() {
    return this.layoutService.isMobile;
  }
  
  get IsTabletViewport() {
    return this.layoutService.isTablet;
  }

  get IsLaptopViewport() {
    return this.layoutService.isLaptop;
  }

  get IsLargeViewport() {
    return this.layoutService.isLarge;
  }

  get IsXLargeViewport() {
    return this.layoutService.isXLarge;
  }

}
