import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { GalleryViewerModalComponent } from './gallery-viewer-modal/gallery-viewer-modal.component';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  public trueColCount: number = 2;
  galleryImgs = [
    {name: 'law_cake', category: 'graduation', url: '/mishmakery_law_cake.jpg'},
    {name: 'baby_1', category: 'baby', url: '/tulip_cake_mishmakery.png'},
    {name: 'cupcakes_12', category: 'cupcakes', url: '/mishmakery_cupcakes_3.png'},
    {name: 'birthday_3', category: 'birthday', url: '/mishmakery_mariam_cake.png'},
    {name: 'cupcakes_4', category: 'cupcakes', url: '/mishmakery_cupcakes_4.png'},
    {name: 'cupcakes_3', category: 'cupcakes', url: '/mishmakery_cupcakes_5.png'},
    {name: 'wedding_1', category: 'wedding', url: '/mishmakery_artsy_cake.png'},
    {name: 'cupcakes_1', category: 'cupcakes', url: '/mish_2.png'},
    {name: 'cupcakes_2', category: 'cupcakes', url: '/mish_5.png'},
    {name: 'holiday_1', category: 'holiday', url: '/mish_8.png'},
    {name: 'cupcakes_5', category: 'cupcakes', url: '/mish_9.png'},
    {name: 'cupcakes_9', category: 'cupcakes', url: '/mish_10.png'},
    {name: 'birthday_2', category: 'birthday', url: '/mish_14.png'},
    {name: 'wedding_5', category: 'wedding', url: '/mish_15.png'},
    {name: 'misc_3', category: 'miscellaneous', url: '/mish_18.png'},
    {name: 'birthday_1', category: 'birthday', url: '/mish_19.png'},
    {name: 'graduation_2', category: 'graduation', url: '/mish_20.png'},
    {name: 'graduation_1', category: 'graduation', url: '/mish_21.png'},
    {name: 'graduation_4', category: 'graduation', url: '/mish_22.png'},
    {name: 'graduation_5', category: 'graduation', url: '/mish_23.png'},
    {name: 'graduation_6', category: 'graduation', url: '/mish_24.png'},
    {name: 'graduation_7', category: 'graduation', url: '/mish_25.png'},
    {name: 'wedding_2', category: 'wedding', url: '/mish_26.png'},
    {name: 'wedding_3', category: 'wedding', url: '/mish_27.png'},
    {name: 'wedding_4', category: 'wedding', url: '/mish_28.png'},
    {name: 'birthday_5', category: 'birthday', url: '/mish_29.JPG'},
    {name: 'birthday_4', category: 'birthday', url: '/mish_30.png'},
    {name: 'graduation_3', category: 'graduation', url: '/mish_31.jpg'},
    {name: 'cupcakes_11', category: 'cupcakes', url: '/mish_32.png'},
    {name: 'cupcakes_10', category: 'cupcakes', url: '/mish_33.png'},
    {name: 'cupcakes_8', category: 'cupcakes', url: '/mish_34.png'},
    {name: 'cupcakes_6', category: 'cupcakes', url: '/mish_35.png'},
    {name: 'cupcakes_7', category: 'cupcakes', url: '/mish_36.png'},
    {name: 'misc_1', category: 'miscellaneous', url: '/mish_37.png'},
    {name: 'misc_4', category: 'miscellaneous', url: '/mish_38.png'},
    {name: 'misc_2', category: 'miscellaneous', url: '/mish_39.png'},
    {name: 'baby_2', category: 'baby', url: '/mish_40.jpg'},
    {name: 'baby_3', category: 'baby', url: '/mish_41.jpg'},
  ]

  constructor(
    public galleryDialog: MatDialog,
    private layoutService: LayoutService
  ) {}

  categories = ['wedding', 'graduation', 'baby', 'birthday', 'holiday', 'cupcakes', 'miscellaneous'];
  getImagesByCategory(category: string) {
    return this.galleryImgs.filter(img => img.category === category);
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

  ngOnInit(): void {
    this.trueColCount = this.galleryImgs.length;
  }

  openGalleryDialog(url: string) {
    const galleryDialog = this.galleryDialog.open(GalleryViewerModalComponent, {
      data: {
        imgUrl: url
      },
      width: 'auto',
      maxWidth: 'auto',
      height: 'auto',
      maxHeight: 'auto',
      autoFocus: false
    })
  }

}
