import { Component, OnInit } from '@angular/core';  
import { DrawingAPIService } from '../services/drawing-api.service';  
  
@Component({  
  selector: 'app-input-page',  
  templateUrl: './input-page.component.html',  
  styleUrls: ['./input-page.component.scss']  
})  
export class InputPageComponent implements OnInit {  
  title = 'drawIT';  
  data = null;  
  
  constructor(private apiService: DrawingAPIService) {}  
  
  ngOnInit() {  
    this.apiService.getAzureServices().subscribe((data: any) => {    
      console.log(data);  
      this.data = data;    
    });   
  }     
}  
