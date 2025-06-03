import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-landing-portal',
  templateUrl: './landing-portal.component.html',
  styleUrl: './landing-portal.component.scss'
})
export class LandingPortalComponent implements OnInit, OnDestroy {

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

  public homeImages: string[] = [
    '../../../../tulip_cake_mishmakery.png',
    '../../../../mishmakery_cupcakes_3.png',
    '../../../../mishmakery_artsy_cake.png'
  ];
  
  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startImageAutoplay();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startImageAutoplay() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 6000);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.homeImages.length;
  }

}
