import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopProductsEditComponent } from './my-shop-products-edit.component';

describe('MyShopProductsEditComponent', () => {
  let component: MyShopProductsEditComponent;
  let fixture: ComponentFixture<MyShopProductsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShopProductsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShopProductsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
