import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

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

  selectedIndex = 0;
  links = [
    { label: 'Home', component: '' },
    { label: 'Menu', component: '/menu' },
    { label: 'Order Here', component: '/order-here' },
    { label: 'Gallery', component: '/gallery' },
    { label: 'Terms & Conditions', component: '/policies' },
    { label: 'FAQ', component: '/faq' },
    { label: 'About Us', component: '/about-us' }
  ];

}
