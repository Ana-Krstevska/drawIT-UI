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
  graph!: joint.dia.Graph;
  paper!: joint.dia.Paper;
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
    this.graph = new joint.dia.Graph;  
    const element = document.getElementById('myDiagramDiv');  
      
    if (!element) {  
      console.error("Element with id 'myDiagramDiv' not found");  
      return;  
    }  
      
    this.paper = new joint.dia.Paper({  
      el: element,  
      width: element.clientWidth,  
      height: element.clientHeight,  
      model: this.graph,  
      gridSize: 1  
    });  
      
    const groupedServicePairs = this.groupServicePairsBySourceService(this.servicePairs);  
    
    // array to store created elements  
    const elements: joint.shapes.standard.Rectangle[] = [];  
    const links: joint.shapes.standard.Link[] = [];  
    const drawnServices = new Set<string>(); 
      
    let xPosition = 60;  
    let lastElement: joint.shapes.standard.Rectangle | undefined;  
      
    // If there are no groups (i.e., no source services with multiple outgoing links),  
    // draw all services in a linear fashion  
    if (groupedServicePairs.length === 0) {  
      let yPosition = element.clientHeight / 2;
      this.servicePairs.forEach((pair, index) => {  
        const sourceElement = this.createServiceRectangle(pair.sourceService);  

        if(pair.sourceService !== undefined)
          drawnServices.add(pair.sourceService);

        if (this.servicePairs.length >= 4) {
          xPosition -= 35;  
          yPosition = index % 2 === 0 ? element.clientHeight / 2 - 75 : element.clientHeight / 2 + 75;  
        } 

        this.drawLinear(sourceElement, xPosition, yPosition);  
        xPosition += sourceElement.size().width + 50;  
        elements.push(sourceElement);  
      
        // Create link with the last element  
        if (lastElement) {  
          const link = new joint.shapes.standard.Link();  
          link.source(lastElement);  
          link.target(sourceElement);  
          links.push(link);  
        }  
      
        lastElement = sourceElement;  
      });   

      const lastPair = this.servicePairs[this.servicePairs.length - 1];    
      if (lastPair && lastPair.destinationService) {  
        if (this.servicePairs.length >= 4) {  
          yPosition = this.servicePairs.length % 2 === 0 ? element.clientHeight / 2 - 75 : element.clientHeight / 2 + 75;  
        }   
        const destinationElement = this.createServiceRectangle(lastPair.destinationService);    
        this.drawLinear(destinationElement, xPosition, yPosition);    
        elements.push(destinationElement);    
      
        // Create link with the last element    
        if (lastElement) {    
          const link = new joint.shapes.standard.Link();    
          link.source(lastElement);    
          link.target(destinationElement);    
          links.push(link);    
        }    
      } 

      links.forEach(link => this.graph.addCell(link));

    } else {  
      // If there are groups, handle them as before but also add linear elements before and after  
      let linearServices: string[] = [];  
    
      // Creating the linear elements before the first group  
      for (let i = 0; i < this.servicePairs.length; i++) {  
        if (this.servicePairs[i].sourceService === groupedServicePairs[0][0].sourceService) {  
          break;  
        }  
        const sourceService = this.servicePairs[i].sourceService;
        if (sourceService !== undefined && !drawnServices.has(sourceService)) {
          linearServices.push(sourceService);  
        }
      }       
    
      // Creating the linear elements  
      linearServices.forEach((service) => {  
        const sourceElement = this.createServiceRectangle(service);  
        this.drawLinear(sourceElement, xPosition, element.clientHeight / 2);  
        xPosition += sourceElement.size().width + 50;  
        elements.push(sourceElement);  
    
        // Create link with the last element  
        if (lastElement) {  
          const link = new joint.shapes.standard.Link();  
          link.source(lastElement);  
          link.target(sourceElement);  
          links.push(link);  
        }  
    
        lastElement = sourceElement;  
      });  
    
      // Reset linearServices for the next part  
      linearServices = [];  
    
      groupedServicePairs.forEach((group) => {  
        const sourceService = group[0].sourceService;  
        const sourceElement = this.createServiceRectangle(sourceService);  
      
        elements.push(sourceElement);  
        this.drawLinear(sourceElement, xPosition, element.clientHeight / 2);  
        xPosition += sourceElement.size().width + 50;  
      
        // Create link with the last element  
        if (lastElement) {  
          const link = new joint.shapes.standard.Link();  
          link.source(lastElement);  
          link.target(sourceElement);  
          links.push(link);  
        }  
      
        lastElement = sourceElement;  
      
        let yPosition = element.clientHeight / 3;  
      
        group.forEach((pair) => {  
          const targetElement = this.createServiceRectangle(pair.destinationService);  
          if(pair.destinationService !== undefined)
            drawnServices.add(pair.destinationService);
          elements.push(targetElement);  
            
          this.drawLinear(targetElement, xPosition, yPosition);  
          yPosition = 2 * element.clientHeight / 3;  
      
          const link = new joint.shapes.standard.Link();  
          link.source(sourceElement);  
          link.target(targetElement);  
          links.push(link);  
        });  
      
        xPosition += 50;  
      });  
    
      // Creating the linear elements after the last group  
      for (let i = this.servicePairs.length - 1; i >= 0; i--) {  
        if (this.servicePairs[i].sourceService === groupedServicePairs[groupedServicePairs.length - 1][0].sourceService) {  
          break;  
        }  
        const sourceService = this.servicePairs[i].sourceService;
        if (sourceService !== undefined && !drawnServices.has(sourceService)) {
          linearServices.unshift(sourceService);   
        }
      }  
    
      // Creating the linear elements  
      linearServices.forEach((service) => {  
        const sourceElement = this.createServiceRectangle(service);  
        this.drawLinear(sourceElement, xPosition, element.clientHeight / 2);  
        xPosition += sourceElement.size().width + 50;  
        elements.push(sourceElement);  
      
        // Create link with the last element  
        if (lastElement) {  
          const link = new joint.shapes.standard.Link();  
          link.source(lastElement);  
          link.target(sourceElement);  
          links.push(link);  
        }  
      
        lastElement = sourceElement;  
      });  
      
      // Handle the destinationService of the last pair in servicePairs  
      const lastPair = this.servicePairs[this.servicePairs.length - 1];  
      if (lastPair && lastPair.destinationService) {  
        const destinationElement = this.createServiceRectangle(lastPair.destinationService);  
        this.drawLinear(destinationElement, xPosition, element.clientHeight / 2);  
        elements.push(destinationElement);  
      
        // Create link with the last element  
        if (lastElement) {  
          const link = new joint.shapes.standard.Link();  
          link.source(lastElement);  
          link.target(destinationElement);  
          links.push(link);  
        }  
      }  
      
      // Add links to graph  
      links.forEach(link => this.graph.addCell(link)); 
    }
  }                    

  drawInParallel(elements: joint.shapes.standard.Rectangle[], xPosition: number): void {  
    let yPosition = this.paper.getArea().height / 3;  
    elements.forEach(el => {  
      this.drawLinear(el, xPosition, yPosition);  
      // update y position for next element    
      yPosition = 2 * this.paper.getArea().height / 3;  
    });  
  }  
  
  groupServicePairsBySourceService(servicePairs: ServicePair[]): ServicePair[][] {  
    const servicePairsMap: { [sourceService: string]: ServicePair[] } = {};  
    const groupedServicePairs: ServicePair[][] = [];  
    
    servicePairs.forEach((pair) => {  
      if (pair.sourceService) {  
        // add pair to servicePairsMap  
        if (servicePairsMap[pair.sourceService]) {  
          servicePairsMap[pair.sourceService].push(pair);  
        } else {  
          servicePairsMap[pair.sourceService] = [pair];  
        }  
      }  
    });  
    
    // push only those servicePairs to groupedServicePairs which have more than one pair with the same source service  
    for (let key in servicePairsMap) {  
      if (servicePairsMap[key].length > 1) {  
        groupedServicePairs.push(servicePairsMap[key]);  
      }  
    }  
    
    return groupedServicePairs;  
  }  
    

  drawLinear(el: joint.shapes.standard.Rectangle, xPosition: number, yPosition: number): void {
    el.position(xPosition, yPosition);
    el.addTo(this.graph);
  }

  createServiceRectangle(service: string | undefined): joint.shapes.standard.Rectangle {
    const el = new joint.shapes.standard.Rectangle();
    const textWidth = (service ? service.length : 0) * 6 + 50;  

    el.resize(textWidth, 40);
    el.attr({
      body: {
        fill: this.fillColor
      },
      label: {
        text: service,
        fill: this.labelColor,
        fontWeight: 'bold'
      }
    });

    return el;
  }
} 