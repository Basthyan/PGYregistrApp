import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneradorQrPage } from './generador-qr.page';

describe('GeneradorQrPage', () => {
  let component: GeneradorQrPage;
  let fixture: ComponentFixture<GeneradorQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeneradorQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
