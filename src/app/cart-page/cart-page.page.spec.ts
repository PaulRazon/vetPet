import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPagePage } from './cart-page.page';

describe('CartPagePage', () => {
  let component: CartPagePage;
  let fixture: ComponentFixture<CartPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CartPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
