import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallusersComponent } from './getallusers.component';

describe('GetallusersComponent', () => {
  let component: GetallusersComponent;
  let fixture: ComponentFixture<GetallusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetallusersComponent]
    });
    fixture = TestBed.createComponent(GetallusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
