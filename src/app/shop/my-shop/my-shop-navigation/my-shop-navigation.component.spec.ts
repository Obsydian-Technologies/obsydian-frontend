import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopNavigationComponent } from './my-shop-navigation.component';

describe('MyShopNavigationComponent', () => {
  let component: MyShopNavigationComponent;
  let fixture: ComponentFixture<MyShopNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShopNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShopNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
