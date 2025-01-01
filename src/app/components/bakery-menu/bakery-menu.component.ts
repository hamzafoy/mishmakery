import { Component, inject } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-bakery-menu',
  templateUrl: './bakery-menu.component.html',
  styleUrl: './bakery-menu.component.scss'
})
export class BakeryMenuComponent {

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

  checkLayout(override?: boolean): number {
    if (override) {
      return this.IsMobileViewport || this.IsTabletViewport ? 1 : 2
    } else {
      return this.IsMobileViewport || this.IsTabletViewport ? 1 : 3
    }
  }

  private _formBuilder = inject(FormBuilder);
  dessertVariants = [
    {name: 'Sheet Cakes'},
    {name: 'Loaf Cakes'},
    {name: 'Cupcakes'},
    {name: 'Pound Cakes'},
    {name: 'Dessert Breads'},
    {name: 'Sponge Cakes'},
    {name: 'Cookies'},
    {name: 'Pakistani Burfi'},
    {name: 'Brownies'},
    {name: 'Palestinian Hilba'},
    {name: 'Decorated Cookies'}
  ]
  dessertFlavors = [
    {name: 'Chocolate'},
    {name: 'Marble'},
    {name: 'Vanilla'},
    {name: 'Strawberry'},
    {name: 'Coffee'},
    {name: 'Carrot'},
    {name: 'Red Velvet'},
    {name: 'Lemon'}
  ]

  dessertTypeGroup = this._formBuilder.group({
    dessertType: ['', Validators.required]
  });
  dessertFlavorGroup = this._formBuilder.group({
    dessertFlavor: ['', Validators.required]
  });
}
