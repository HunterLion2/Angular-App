import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducingComponent } from './introducing.component';

describe('IntroducingComponent', () => {
  let component: IntroducingComponent;
  let fixture: ComponentFixture<IntroducingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroducingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroducingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
