import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopProductsAddComponent } from './my-shop-products-add.component';

describe('MyShopProductsAddComponent', () => {
  let component: MyShopProductsAddComponent;
  let fixture: ComponentFixture<MyShopProductsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShopProductsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShopProductsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
