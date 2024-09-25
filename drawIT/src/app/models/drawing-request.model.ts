export interface ServicePair {  
    sourceService?: string;  
    destinationService?: string;  
  }  
    
  export class DrawingRequest {  
    id?: string;  
    configuration?: ServicePair[];  
  }  
  