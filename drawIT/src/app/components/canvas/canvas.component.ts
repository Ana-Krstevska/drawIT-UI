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
    
    let totalWidth = 0;   
    this.servicePairs.forEach((pair) => {    
      let textWidth = 100;    
      if (pair.sourceService) {    
        textWidth = pair.sourceService.length * 6 + 50;    
      }    
      totalWidth += textWidth + 50;    
    });  
    
    let xPosition = (element.clientWidth - totalWidth) / 2 - 50; 
    
    if (this.servicePairs.length >= 4) { 
      xPosition += 163
    }
 
    const elements: joint.shapes.standard.Rectangle[] = [];  
    
    this.servicePairs.forEach((pair, index) => {    
      const el = new joint.shapes.standard.Rectangle();    
      
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
      elements.push(el);  
    
      xPosition += textWidth + ySpacing;  
    });      
    
    for (let index = 0; index < elements.length - 1; index++) {    
      const link = new joint.shapes.standard.Link();    
      link.source(elements[index]);    
      link.target(elements[index + 1]);    
      link.addTo(graph);    
    }    
       
    const lastPair = this.servicePairs[this.servicePairs.length - 1];    
    if (lastPair && lastPair.destinationService) {    
      const el = new joint.shapes.standard.Rectangle();    
    
      let yPosition = element.clientHeight / 2;  
      if (this.servicePairs.length >= 4) {  
        yPosition = this.servicePairs.length % 2 === 0 ? element.clientHeight / 2 - 75 : element.clientHeight / 2 + 75;  
      }  
    
      el.position(xPosition, yPosition);  
      
      let textWidth = 100;   
      if (lastPair.destinationService) {    
        textWidth = lastPair.destinationService.length * 6 + 50;    
      }    
    
      el.resize(textWidth, 40);    
      el.attr({    
        body: {    
          fill: this.fillColor   
        },    
        label: {    
          text: lastPair.destinationService,    
          fill: this.labelColor,
          fontWeight: 'bold'     
        }    
      });    
    
      el.addTo(graph);    
      elements.push(el);   
       
      const link = new joint.shapes.standard.Link();    
      link.source(elements[this.servicePairs.length - 1]);   
      link.target(el);    
      link.addTo(graph);    
    }   
    this.diagramService.setGraph(graph, paper); 
  }        
}    
