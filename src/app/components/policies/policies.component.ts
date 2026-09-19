import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { HttpClient } from '@angular/common/http';

interface TermsConditionsContent {
  title: string;
  terms: Terms[];
}

interface Terms {
  title: string;
  content: string[];
}
  
@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss'
})
export class PoliciesComponent {
  termsConditions?: TermsConditionsContent;
  termsConditionsLoading = true;
  termsConditionsError = false;

  constructor(
    private layoutService: LayoutService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<TermsConditionsContent>('/content/terms_conditions.json')
      .subscribe({
        next: (termsConditions) => {
          this.termsConditions = termsConditions;
          this.termsConditionsLoading = false;
        },
        error: (error) => {
          console.error('Unable to load terms and conditions:', error);
          this.termsConditionsLoading = false;
          this.termsConditionsError = true;
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

}
