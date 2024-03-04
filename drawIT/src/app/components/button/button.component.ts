import { Component } from '@angular/core';  
import { ThemeService } from '../../services/themeService';  
  
@Component({  
  selector: 'app-button',  
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})  
export class ButtonComponent {  
  constructor(private themeService: ThemeService) { }  
  
  selectAzure() {  
    this.themeService.selectTheme('azure');  
    console.log('Azure')
  }  
  
  selectAws() {  
    this.themeService.selectTheme('aws');  
    console.log('AWS')
  }  
}  
