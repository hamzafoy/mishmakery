import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { GalleryViewerModalComponent } from './gallery-viewer-modal/gallery-viewer-modal.component';
import { LayoutService } from '../../services/layout.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

export interface GalleryImage {
  id: number;
  url: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit, OnDestroy {
  public trueColCount: number = 2;
  public images: GalleryImage[] = [];
  public loadingCategories: Set<string> = new Set();
  private destroy$ = new Subject<void>();

  constructor(
    public galleryDialog: MatDialog,
    private layoutService: LayoutService,
    private http: HttpClient
  ) {}

  categories = ['wedding', 'graduation', 'baby', 'birthday', 'holiday', 'cupcakes', 'miscellaneous'];
  getImagesByCategory(category: string) {
    return this.images.filter(img => img.category === category);
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
    // Load first 3 categories immediately, rest on-demand
    this.loadCategoriesProgressive();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCategoriesProgressive(): void {
    // Priority load: first 3 categories
    const priorityCategories = this.categories.slice(0, 3);
    const deferredCategories = this.categories.slice(3);

    // Load priority categories immediately
    priorityCategories.forEach(category => this.loadCategory(category));

    // Defer loading of remaining categories (load after 2 seconds to avoid congestion)
    setTimeout(() => {
      deferredCategories.forEach(category => this.loadCategory(category));
    }, 2000);
  }

  private loadCategory(category: string): void {
    if (this.loadingCategories.has(category)) return; // Already loading or loaded

    this.loadingCategories.add(category);

    this.getImages(category)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          if (response && response.resources) {
            const returnedImages = response.resources.map((item: any, index: number) => ({
              id: index + 1,
              url: this.optimizeCloudinaryUrl(item),
              category: category
            }));
            console.log(`Fetched images for category ${category}:`, returnedImages);
            this.images.push(...returnedImages);
          } else {
            console.error('Unexpected API response format:', response);
          }
          this.loadingCategories.delete(category);
        },
        (error) => {
          console.error(`Error loading category ${category}:`, error);
          this.loadingCategories.delete(category);
        }
      );
  }

  private optimizeCloudinaryUrl(item: any): string {
    // Add transformation parameters for optimal loading
    // w_800: width 800px (responsive)
    // q_auto: automatic quality optimization
    // f_auto: automatic format selection (WebP for modern browsers)
    const baseUrl = `https://res.cloudinary.com/dynxatbex/image/upload/`;
    const transformations = `w_800,q_auto,f_auto/v${item.version}/${item.public_id}.${item.format}`;
    return `${baseUrl}${transformations}`;
  }

  isLoadingCategory(category: string): boolean {
    return this.loadingCategories.has(category);
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

  getImages(category: string): Observable<any> {
        return this.http.get(
            `https://res.cloudinary.com/dynxatbex/image/list/${category}.json`
        );
    }

}
