import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGenerateComponent } from './button-generate.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ButtonGenerateComponent', () => {
  let component: ButtonGenerateComponent;
  let fixture: ComponentFixture<ButtonGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonGenerateComponent ],
      providers: [ HttpClient, HttpHandler ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
