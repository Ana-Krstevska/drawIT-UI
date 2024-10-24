import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DescriptionService } from 'src/app/services/description.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-description-area',
  templateUrl: './description-area.component.html',
  styleUrls: ['./description-area.component.scss']
})
export class DescriptionAreaComponent implements OnInit, AfterViewInit {

  @ViewChild('description') description!: ElementRef;
  @Output() descriptionChange = new EventEmitter<string>(); 
  theme = '';
  
  constructor(private themeService: ThemeService,
              private descriptionService: DescriptionService) { }  

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: string) => {  
      this.theme = theme;  
  
      const previousDescription = this.descriptionService.getDescription(theme);  
      if (previousDescription) {  
        this.description.nativeElement.value = previousDescription;  
      }  
    }); 
  }

  ngAfterViewInit(): void {
    const textarea = this.description.nativeElement;
    const lineHeight = parseFloat(window.getComputedStyle(textarea)["lineHeight"]);

    textarea.style.overflowY = 'hidden';
    textarea.style.height = (2 * lineHeight) + 'px';

    this.themeService.theme$.subscribe((theme: string) => {  
      this.theme = theme;  
    
      const previousDescription = this.descriptionService.getDescription(theme);  
      if (previousDescription) {  
        textarea.value = previousDescription;  
      } else {  
        textarea.value = '';  
      }  
    }); 

    textarea.addEventListener('input', () => {
      const lines = Math.floor(textarea.scrollHeight / lineHeight);

      if (textarea.value === '') {
        textarea.style.height = (2 * lineHeight) + 'px';
        textarea.style.overflowY = 'hidden';
      } else if (lines === 2) {
        textarea.style.height = (2 * lineHeight) + 'px';
        textarea.style.overflowY = 'hidden';
      } else if (lines <= 3) {
        textarea.style.height = (lines * lineHeight) + 'px';
        textarea.style.overflowY = 'hidden';
      } else {
        textarea.style.height = (3 * lineHeight) + 'px';
        textarea.style.overflowY = 'auto';
      }
      this.descriptionService.setDescription(textarea.value, this.theme);  
      this.descriptionChange.emit(textarea.value); 
    });
  }

}  
