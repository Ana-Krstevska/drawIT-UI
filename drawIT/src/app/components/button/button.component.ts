import { Component } from '@angular/core';  
import { ThemeService } from '../../services/theme.service.';  
  
@Component({  
  selector: 'app-button',  
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})  
export class ButtonComponent {  
  constructor(private themeService: ThemeService) { }  
  
  selectAzure() {  
    this.themeService.selectTheme('azure');  
  }  
  
  selectAws() {  
    this.themeService.selectTheme('aws');  
  }  
}  
