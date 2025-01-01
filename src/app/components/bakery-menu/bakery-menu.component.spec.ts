import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BakeryMenuComponent } from './bakery-menu.component';

describe('BakeryMenuComponent', () => {
  let component: BakeryMenuComponent;
  let fixture: ComponentFixture<BakeryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BakeryMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BakeryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
