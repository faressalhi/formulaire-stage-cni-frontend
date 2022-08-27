import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChoiceComponent } from './new-choice.component';

describe('NewChoiceComponent', () => {
  let component: NewChoiceComponent;
  let fixture: ComponentFixture<NewChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
