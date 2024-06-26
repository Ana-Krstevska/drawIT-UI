import { Component, OnInit } from '@angular/core';
import * as joint from 'jointjs'; 

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  constructor() { }  
  
  ngOnInit(): void { }  
  
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
  
    const wakeup = new joint.shapes.standard.Rectangle();  
    wakeup.position(395, 30);  
    wakeup.resize(100, 40);  
    wakeup.attr({  
      body: {  
        fill: 'lightblue'  
      },  
      label: {  
        text: 'API',  
        fill: 'black'  
      }  
    });  
    wakeup.addTo(graph);  
  
    const eatBreakfast = wakeup.clone();  
    eatBreakfast.translate(0, 100);  
    eatBreakfast.attr({  
      body: {  
        fill: 'orange'  
      },  
      label: {  
        text: 'Database'  
      }  
    });  
    eatBreakfast.addTo(graph);  
  
    const goToWork = wakeup.clone();  
    goToWork.translate(0, 200);  
    goToWork.attr({  
      body: {  
        fill: 'lightgreen'  
      },  
      label: {  
        text: 'Storage'  
      }  
    });  
    goToWork.addTo(graph);  
  
    const link1 = new joint.shapes.standard.Link();  
    link1.source(wakeup);  
    link1.target(eatBreakfast);  
    link1.addTo(graph);  
  
    const link2 = link1.clone();  
    link2.source(eatBreakfast);  
    link2.target(goToWork);  
    link2.addTo(graph);  
  }  

}
