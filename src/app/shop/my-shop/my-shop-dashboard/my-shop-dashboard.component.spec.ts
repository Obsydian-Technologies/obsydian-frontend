import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopDashboardComponent } from './my-shop-dashboard.component';

describe('MyShopDashboardComponent', () => {
  let component: MyShopDashboardComponent;
  let fixture: ComponentFixture<MyShopDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShopDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShopDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
