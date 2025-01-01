import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { MishmakeryService } from '../../services/mishmakery.service';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.component.html',
  styleUrl: './order-requests.component.scss'
})
export class OrderRequestsComponent {
  constructor(
    private layoutService: LayoutService, 
    private mishmakeryService: MishmakeryService
  ) {}

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
