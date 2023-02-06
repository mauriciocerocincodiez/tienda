import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SowProductoComponent } from './sow-producto.component';

describe('SowProductoComponent', () => {
  let component: SowProductoComponent;
  let fixture: ComponentFixture<SowProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SowProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SowProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
