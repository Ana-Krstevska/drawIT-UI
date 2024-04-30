import { Component, OnInit } from '@angular/core';    
import { ThemeService } from '../../services/theme.service.';    
    
@Component({    
  selector: 'app-button',    
  templateUrl: './button.component.html',  
  styleUrls: ['./button.component.scss']  
})    
export class ButtonComponent implements OnInit {    
  theme: 'azure' | 'aws' = 'azure';  
  
  constructor(private themeService: ThemeService) { }    
  
  ngOnInit() {  
    this.themeService.theme$.subscribe(theme => {  
      this.theme = theme;  
    });  
  }  
    
  selectAzure() {    
    this.themeService.selectTheme('azure');    
  }    
    
  selectAws() {    
    this.themeService.selectTheme('aws');    
  }    
}    
