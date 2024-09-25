import { Component } from '@angular/core';  
  
@Component({  
  selector: 'app-input-page',  
  templateUrl: './input-page.component.html',  
  styleUrls: ['./input-page.component.scss']  
})  
export class InputPageComponent {  
  title = 'drawIT';    
  theme: 'azure' | 'aws' = 'azure';  
  description: string = '';   
}  
