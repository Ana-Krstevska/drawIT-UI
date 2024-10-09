import { Component, OnInit } from '@angular/core';      
import * as joint from 'jointjs';      
import { Subscription } from 'rxjs';    
import { DrawingRequest, ServicePair } from 'src/app/models/drawing-request.model';      
import { DiagramService } from 'src/app/services/diagram.service';  
import { DrawingAPIService } from 'src/app/services/drawing-api.service';      
import { ThemeService } from 'src/app/services/theme.service';    
      
@Component({      
  selector: 'app-canvas',      
  templateUrl: './canvas.component.html',      
  styleUrls: ['./canvas.component.scss']      
})      
export class CanvasComponent implements OnInit {      
  private subscription!: Subscription;      
  drawingRequest!: DrawingRequest;      
  fillColor = 'blue';     
  labelColor = 'white';  
  servicePairs: ServicePair[] = [];      
      
  constructor(private apiService: DrawingAPIService,   
              private themeService: ThemeService,  
              private diagramService: DiagramService) { }      
      
  ngOnInit(): void {      
    this.drawingRequest = this.apiService.getDrawingRequest();      
    this.servicePairs = this.drawingRequest.configuration || [];      
    
    this.subscription = this.themeService.theme$.subscribe(theme => {      
      this.fillColor = theme === 'azure' ? '#185ee0' : '#ec9e06';      
      this.labelColor = theme === 'azure' ? '#dee9fc' : '#fcf4e8';  
    });    
  }      
      
  ngAfterViewInit(): void {      
    const graph = new joint.dia.Graph;     
    const element = document.getElementById('myDiagramDiv');      
        
    if (!element) {      
      console.error("Element with id 'myDiagramDiv' not found");      
      return;      
    }      
        
    const paper = new joint.dia.Paper({      
      el: element,      
      width: element.clientWidth,      
      height: element.clientHeight,      
      model: graph,      
      gridSize: 1      
    });      
      
    const serviceToElementMap = new Map<string, joint.shapes.standard.Rectangle>();  
    let xPosition = 0;  
      
    this.servicePairs.forEach((pair, index) => {    
      if (!pair.sourceService) {  
        return;  
      }  
  
      let el = serviceToElementMap.get(pair.sourceService);  
      if (!el) {  
        el = new joint.shapes.standard.Rectangle();  
        serviceToElementMap.set(pair.sourceService, el);  
      }    
    
      let ySpacing = 30;   
      let yPosition = element.clientHeight / 2;    
      if (this.servicePairs.length >= 4) {    
        yPosition = index % 2 === 0 ? element.clientHeight / 2 - 75 : element.clientHeight / 2 + 75;    
        ySpacing = -35;  
      }    
      el.position(xPosition, yPosition);      
    
      let textWidth = 100;      
      if (pair.sourceService) {      
        textWidth = pair.sourceService.length * 6 + 50;      
      }      
    
      el.resize(textWidth, 40);      
      el.attr({      
        body: {      
          fill: this.fillColor      
        },      
        label: {      
          text: pair.sourceService,      
          fill: this.labelColor,   
          fontWeight: 'bold'    
        }      
      });      
    
      el.addTo(graph);      
        
      xPosition += textWidth + ySpacing;    
    });        
    
    this.servicePairs.forEach((pair, index) => {  
      if (!pair.sourceService || !pair.destinationService) {  
        return;  
      }  
  
      const sourceElement = serviceToElementMap.get(pair.sourceService);  
        
      let destinationElement = serviceToElementMap.get(pair.destinationService);  
      if (!destinationElement) {  
        destinationElement = new joint.shapes.standard.Rectangle();  
        destinationElement.position(xPosition, element.clientHeight / 2);  
        let textWidth = pair.destinationService.length * 6 + 50;  
        destinationElement.resize(textWidth, 40);  
        destinationElement.attr({      
          body: {      
            fill: this.fillColor     
          },      
          label: {      
            text: pair.destinationService,      
            fill: this.labelColor,  
            fontWeight: 'bold'       
          }      
        });  
        destinationElement.addTo(graph);  
        serviceToElementMap.set(pair.destinationService, destinationElement);  
          
        xPosition += textWidth + 30;  
      }  
  
      if (sourceElement && destinationElement) {  
        const link = new joint.shapes.standard.Link();      
        link.source(sourceElement);      
        link.target(destinationElement);      
        link.addTo(graph);      
      }  
    });  
  
    this.diagramService.setGraph(graph, paper);   
  }          
}      
