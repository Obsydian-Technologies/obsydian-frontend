import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopProductsComponent } from './my-shop-products.component';

describe('MyShopProductsComponent', () => {
  let component: MyShopProductsComponent;
  let fixture: ComponentFixture<MyShopProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShopProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShopProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
