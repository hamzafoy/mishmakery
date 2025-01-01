import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPortalComponent } from './landing-portal.component';

describe('LandingPortalComponent', () => {
  let component: LandingPortalComponent;
  let fixture: ComponentFixture<LandingPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
