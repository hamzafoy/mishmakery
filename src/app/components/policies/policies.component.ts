import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss'
})
export class PoliciesComponent {

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
