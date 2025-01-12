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
    {name: 'hilbah', url: '/hilbah_mishmakery.jpg'},
    {name: 'law_cake', url: '/mishmakery_law_cake.jpg'},
    {name: 'cupcakes1', url: '/mishmakery_cupcakes.jpg'},
    {name: 'tulip_cake', url: '/tulip_cake_mishmakery.png'},
    {name: 'cupcakes2', url: '/mishmakery_cupcakes_2.png'},
    {name: 'regal_cake', url: '/mishmakery_regal_cake.png'},
    {name: 'cupcakes3', url: '/mishmakery_cupcakes_3.png'},
    {name: 'mariam_cake', url: '/mishmakery_mariam_cake.png'},
    {name: 'cupcakes4', url: '/mishmakery_cupcakes_4.png'},
    {name: 'cupcakes5', url: '/mishmakery_cupcakes_5.png'}
  ]

  constructor(
    public galleryDialog: MatDialog,
    private layoutService: LayoutService
  ) { }

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
