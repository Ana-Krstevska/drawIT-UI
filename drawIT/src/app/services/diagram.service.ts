import { Injectable } from '@angular/core';        
import * as joint from 'jointjs';       
  
@Injectable({        
  providedIn: 'root'        
})        
export class DiagramService {        
  private graph!: joint.dia.Graph;    
  private paper!: joint.dia.Paper;  
  
  constructor() { }        
  
  setGraph(graph: joint.dia.Graph, paper: joint.dia.Paper) {        
    this.graph = graph;        
    this.paper = paper;  
  }        
  
  downloadDiagram(): void {   
    const svgElement = this.paper.svg;    
    const svgString = new XMLSerializer().serializeToString(svgElement);    
  
    const canvas = document.createElement("canvas");      
    const ctx = canvas.getContext("2d");      
    const DOMURL = window.URL || window.webkitURL || window;      
  
    canvas.width = this.paper.options.width as number;  
    canvas.height = this.paper.options.height as number;  
  
    const img = new Image();      
    const svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});      
    const url = DOMURL.createObjectURL(svg);      
  
    img.onload = function() {      
      if(ctx) {      
        ctx.fillStyle = "white";  
        ctx.fillRect(0, 0, canvas.width, canvas.height);  
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);      
        const dataUrl = canvas.toDataURL("image/png");    
        const downloadLink = document.createElement('a');      
        downloadLink.href = dataUrl;    
        downloadLink.download = 'diagram.png';      
        document.body.appendChild(downloadLink);      
        downloadLink.click();      
        document.body.removeChild(downloadLink);      
      }      
      DOMURL.revokeObjectURL(url);      
    }      
  
    img.src = url;      
  }        
}        
