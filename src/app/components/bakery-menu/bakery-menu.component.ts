import { Component, inject } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { LayoutService } from '../../services/layout.service';
import { HttpClient } from '@angular/common/http';

interface CustomCakeItem {
  title: string;
  price: string;
  note?: string;
}

interface DessertItem {
  title: string;
  details: string[];
}

interface BakeryMenuContent {
  customCakes: {
    title: string;
    description: string;
    items: CustomCakeItem[];
  };
  otherDesserts: {
    title: string;
    items: DessertItem[];
  };
  flavors: {
    title: string;
    items: string[];
    additionalMessage: string;
  };
}

@Component({
  selector: 'app-bakery-menu',
  templateUrl: './bakery-menu.component.html',
  styleUrl: './bakery-menu.component.scss'
})
export class BakeryMenuComponent {
  menu?: BakeryMenuContent;
  menuLoading = true;
  menuError = false;

  constructor(
    private layoutService: LayoutService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<BakeryMenuContent>('/content/bakery_menu.json')
      .subscribe({
        next: (menu) => {
          this.menu = menu;
          this.menuLoading = false;
        },
        error: (error) => {
          console.error('Unable to load bakery menu:', error);
          this.menuLoading = false;
          this.menuError = true;
        }
      });
  }

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
