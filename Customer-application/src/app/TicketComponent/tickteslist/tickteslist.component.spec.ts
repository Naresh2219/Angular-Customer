import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickteslistComponent } from './tickteslist.component';

describe('TickteslistComponent', () => {
  let component: TickteslistComponent;
  let fixture: ComponentFixture<TickteslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TickteslistComponent]
    });
    fixture = TestBed.createComponent(TickteslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
