import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSimpleResponseComponent } from './new-simple-response.component';

describe('NewSimpleResponseComponent', () => {
  let component: NewSimpleResponseComponent;
  let fixture: ComponentFixture<NewSimpleResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSimpleResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSimpleResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
