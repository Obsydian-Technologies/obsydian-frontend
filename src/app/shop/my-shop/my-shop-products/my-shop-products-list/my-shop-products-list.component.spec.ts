import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopProductsListComponent } from './my-shop-products-list.component';

describe('MyShopProductsListComponent', () => {
  let component: MyShopProductsListComponent;
  let fixture: ComponentFixture<MyShopProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShopProductsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShopProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
