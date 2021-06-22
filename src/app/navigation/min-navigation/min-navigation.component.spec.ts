import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinNavigationComponent } from './min-navigation.component';

describe('MinNavigationComponent', () => {
  let component: MinNavigationComponent;
  let fixture: ComponentFixture<MinNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
