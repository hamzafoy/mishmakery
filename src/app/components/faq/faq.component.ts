import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { HttpClient } from '@angular/common/http';

interface FaqContent {
  title: string;
  questions: QnA[];
}

interface QnA {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  frequentlyAskedQuestions?: FaqContent;
  faqLoading: boolean = true;
  faqError: boolean = false;

  constructor(
    private layoutService: LayoutService, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<FaqContent>('/content/faq.json')
      .subscribe({
        next: (faqContent) => {
          this.frequentlyAskedQuestions = faqContent;
          this.faqLoading = false;
        },
        error: (error) => {
          console.error('Unable to load FAQ content:', error);
          this.faqLoading = false;
          this.faqError = true;
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
