import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-drawing-spinner',
  templateUrl: './drawing-spinner.component.html',
  styleUrls: ['./drawing-spinner.component.scss']
})
export class DrawingSpinnerComponent implements OnInit {
  pencilColor?: string;
  pencilTopColor?: string;
  pencilBottomColor?: string;
  textColor?: string;
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.theme$.subscribe(theme => {
      if (theme === 'azure') {
        this.pencilColor = '#185ee0';
        this.textColor = '#dee9fc';
        this.pencilTopColor = '#3a6ff2';
        this.pencilBottomColor = '#1148b8';
      } else {
        this.pencilColor = '#ec9e06';
        this.textColor = '#fcf4e8';
        this.pencilTopColor = '#ffaf26';
        this.pencilBottomColor = '#c87a00';
      }
      document.documentElement.style.setProperty('--pencil-color', this.pencilColor);
      document.documentElement.style.setProperty('--pencil-top-color', this.pencilTopColor);
      document.documentElement.style.setProperty('--pencil-bottom-color', this.pencilBottomColor);
      document.documentElement.style.setProperty('--text-color', this.textColor);
    });
  }

}
