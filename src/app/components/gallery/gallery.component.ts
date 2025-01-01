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
    {name: 'cupcakes', url: '/law_cake_mishmakery.jpg'},
    {name: 'tulip_cake', url: '/mishmakery_cupcakes.jpg'},
    {name: 'law_cake', url: '/tulip_cake_mishmakery.png'},
    {name: 'hilbah', url: '/hilbah_mishmakery.jpg'},
    {name: 'cupcakes', url: '/law_cake_mishmakery.jpg'},
    {name: 'tulip_cake', url: '/mishmakery_cupcakes.jpg'},
    {name: 'law_cake', url: '/tulip_cake_mishmakery.png'}
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
      width: '70vw',
      maxWidth: '70vw',
      height: '70vh',
      maxHeight: '70vh',
      autoFocus: false
    })
  }

}
