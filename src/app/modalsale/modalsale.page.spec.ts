import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalsalePage } from './modalsale.page';

describe('ModalsalePage', () => {
  let component: ModalsalePage;
  let fixture: ComponentFixture<ModalsalePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalsalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
