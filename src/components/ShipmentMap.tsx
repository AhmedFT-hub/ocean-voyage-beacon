
import React from "react";
import { Shipment } from "@/types";

// In a real application, this would use Leaflet, Google Maps, or Mapbox
// For this prototype, let's use a simple map representation
const ShipmentMap: React.FC<{ shipment: Shipment }> = ({ shipment }) => {
  // Extract locations from milestones for the map
  const originMilestone = shipment.milestones.find(m => m.event.includes("Departure") || m.event.includes("Gate In"));
  const destinationMilestone = shipment.milestones.find(m => m.event.includes("Arrival") || m.event.includes("Gate Out"));
  
  // Current position from the voyage
  const currentPosition = shipment.voyage.currentPosition;
  
  return (
    <div className="relative h-full w-full bg-ocean-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-ocean-50 p-4 flex flex-col">
        <div className="text-center mb-4">
          <p className="text-muted-foreground text-sm">
            Map visualization requires a mapping library integration
          </p>
        </div>
        
        <div className="flex-1 relative border border-dashed border-ocean-300 rounded-lg p-4">
          {/* Origin */}
          <div className="absolute top-1/4 left-10 flex flex-col items-center">
            <div className="h-4 w-4 rounded-full bg-ocean-600"></div>
            <div className="mt-2 bg-white px-3 py-1 rounded shadow-md text-sm">
              <div className="font-medium">{shipment.voyage.departurePort}</div>
              <div className="text-xs text-muted-foreground">Origin</div>
            </div>
          </div>
          
          {/* Current position */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="h-6 w-6 rounded-full bg-ocean-600 animate-pulse flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-white"></div>
            </div>
            <div className="mt-2 bg-white px-3 py-1 rounded shadow-md text-xs">
              <div className="font-medium">{shipment.voyage.vessel}</div>
              <div className="text-xs text-muted-foreground">Currently at Sea</div>
            </div>
          </div>
          
          {/* Destination */}
          <div className="absolute top-1/4 right-10 flex flex-col items-center">
            <div className="h-4 w-4 rounded-full bg-ocean-300"></div>
            <div className="mt-2 bg-white px-3 py-1 rounded shadow-md text-sm">
              <div className="font-medium">{shipment.voyage.arrivalPort}</div>
              <div className="text-xs text-muted-foreground">Destination</div>
            </div>
          </div>
          
          {/* Path between points (simplified) */}
          <div className="absolute top-1/4 left-12 right-12 h-0.5 bg-ocean-300"></div>
          
          {/* Travel progress indicator */}
          <div className="absolute top-1/4 left-12 h-0.5 bg-ocean-600" style={{ width: '60%' }}></div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm">
            <span className="font-medium">Transit Progress:</span> 60% complete
          </p>
          <p className="text-xs text-muted-foreground">
            Integration with a mapping library would provide real-time vessel position and route visualization
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentMap;
