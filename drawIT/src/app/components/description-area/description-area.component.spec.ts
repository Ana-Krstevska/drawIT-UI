import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionAreaComponent } from './description-area.component';

describe('DescriptionAreaComponent', () => {
  let component: DescriptionAreaComponent;
  let fixture: ComponentFixture<DescriptionAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
