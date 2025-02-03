import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasComponent } from './canvas.component';
import { DrawingAPIService } from 'src/app/services/drawing-api.service';
import { DiagramService } from 'src/app/services/diagram.service';
import { ThemeService } from 'src/app/services/theme.service';

const mockDrawingAPIService = {
  getDrawingRequest: () => ({
    configuration: [] 
  })
};

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasComponent ],
      providers: [
        { provide: DrawingAPIService, useValue: mockDrawingAPIService },
        DiagramService,
        ThemeService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
