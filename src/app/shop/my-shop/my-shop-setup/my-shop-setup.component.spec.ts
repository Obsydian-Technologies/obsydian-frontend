import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopSetupComponent } from './my-shop-setup.component';

describe('MyShopSetupComponent', () => {
  let component: MyShopSetupComponent;
  let fixture: ComponentFixture<MyShopSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShopSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShopSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
