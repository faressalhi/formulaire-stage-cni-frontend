import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChoicesResponseComponent } from './new-choices-response.component';

describe('NewChoicesResponseComponent', () => {
  let component: NewChoicesResponseComponent;
  let fixture: ComponentFixture<NewChoicesResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChoicesResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChoicesResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
