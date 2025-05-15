
import { Carrier, Shipment, Alert, Milestone, Voyage } from "@/types";

export const getMockCarriers = (): Carrier[] => [
  {
    id: "msc",
    name: "MSC - Mediterranean Shipping Company",
    scac: "MSCU",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mediterranean_Shipping_Company_logo.svg/320px-Mediterranean_Shipping_Company_logo.svg.png"
  },
  {
    id: "maersk",
    name: "Maersk Line",
    scac: "MAEU",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maersk_Group_Logo.svg/320px-Maersk_Group_Logo.svg.png"
  },
  {
    id: "cma",
    name: "CMA CGM",
    scac: "CMDU",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/CMA_CGM_logo.svg/320px-CMA_CGM_logo.svg.png"
  },
  {
    id: "cosco",
    name: "COSCO Shipping",
    scac: "COSU",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/COSCO_logo.svg/320px-COSCO_logo.svg.png"
  },
  {
    id: "hapag",
    name: "Hapag-Lloyd",
    scac: "HLCU",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hapag-Lloyd_logo.svg/320px-Hapag-Lloyd_logo.svg.png"
  }
];

const portCoordinates: Record<string, [number, number]> = {
  'Shanghai': [31.2304, 121.4737],
  'Singapore': [1.3521, 103.8198],
  'Rotterdam': [51.9244, 4.4777],
  'Antwerp': [51.2211, 4.3997],
  'Hamburg': [53.5511, 9.9937],
  'Los Angeles': [33.7701, -118.1937],
  'Long Beach': [33.7701, -118.1937],
  'New York': [40.7128, -74.0060],
  'Busan': [35.1795, 129.0756],
  'Hong Kong': [22.3193, 114.1694],
  'Dubai': [25.2048, 55.2708],
  'Felixstowe': [51.9625, 1.3511],
  'Tokyo': [35.6762, 139.6503],
  'Ningbo': [29.8683, 121.5440],
  'Shenzhen': [22.5431, 114.0579]
};

const generateMockMilestones = (origin: string, destination: string): Milestone[] => {
  // Example milestone sequence for container shipping
  const now = new Date();
  const twoDaysAgo = new Date(now);
  twoDaysAgo.setDate(now.getDate() - 2);
  
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(now.getDate() - 5);
  
  const tenDaysAgo = new Date(now);
  tenDaysAgo.setDate(now.getDate() - 10);

  const fiveDaysFromNow = new Date(now);
  fiveDaysFromNow.setDate(now.getDate() + 5);
  
  const tenDaysFromNow = new Date(now);
  tenDaysFromNow.setDate(now.getDate() + 10);
  
  const originCoords = portCoordinates[origin] || [0, 0];
  const destCoords = portCoordinates[destination] || [0, 0];

  // Calculate a position between origin and destination to represent current position
  const progress = 0.6; // 60% of the way
  const currentLat = originCoords[0] + (destCoords[0] - originCoords[0]) * progress;
  const currentLng = originCoords[1] + (destCoords[1] - originCoords[1]) * progress;

  return [
    {
      id: "m1",
      type: "actual",
      event: "Booking Confirmed",
      location: {
        port: origin,
        country: "China",
        coordinates: {
          lat: originCoords[0],
          lng: originCoords[1]
        }
      },
      estimatedTime: tenDaysAgo.toISOString(),
      actualTime: tenDaysAgo.toISOString(),
      status: "completed"
    },
    {
      id: "m2",
      type: "actual",
      event: "Empty Container Pick-up",
      location: {
        port: origin,
        terminal: "Terminal A",
        country: "China",
        coordinates: {
          lat: originCoords[0],
          lng: originCoords[1]
        }
      },
      estimatedTime: fiveDaysAgo.toISOString(),
      actualTime: fiveDaysAgo.toISOString(),
      status: "completed"
    },
    {
      id: "m3",
      type: "actual",
      event: "Gate In",
      location: {
        port: origin,
        terminal: "Terminal A",
        country: "China",
        coordinates: {
          lat: originCoords[0],
          lng: originCoords[1]
        }
      },
      estimatedTime: fiveDaysAgo.toISOString(),
      actualTime: fiveDaysAgo.toISOString(),
      status: "completed"
    },
    {
      id: "m4",
      type: "actual",
      event: "Loaded on Vessel",
      location: {
        port: origin,
        terminal: "Terminal A",
        country: "China",
        coordinates: {
          lat: originCoords[0],
          lng: originCoords[1]
        }
      },
      estimatedTime: twoDaysAgo.toISOString(),
      actualTime: twoDaysAgo.toISOString(),
      status: "completed"
    },
    {
      id: "m5",
      type: "actual",
      event: "Vessel Departure",
      location: {
        port: origin,
        country: "China",
        coordinates: {
          lat: originCoords[0],
          lng: originCoords[1]
        }
      },
      estimatedTime: twoDaysAgo.toISOString(),
      actualTime: twoDaysAgo.toISOString(),
      status: "completed"
    },
    {
      id: "m6",
      type: "estimated",
      event: "Vessel at Sea",
      location: {
        port: "At Sea",
        country: "",
        coordinates: {
          lat: currentLat,
          lng: currentLng
        }
      },
      estimatedTime: now.toISOString(),
      actualTime: now.toISOString(),
      status: "in-progress",
      notes: "Currently 60% through voyage"
    },
    {
      id: "m7",
      type: "estimated",
      event: "Vessel Arrival",
      location: {
        port: destination,
        country: "Netherlands",
        coordinates: {
          lat: destCoords[0],
          lng: destCoords[1]
        }
      },
      estimatedTime: fiveDaysFromNow.toISOString(),
      status: "upcoming"
    },
    {
      id: "m8",
      type: "estimated",
      event: "Unloaded from Vessel",
      location: {
        port: destination,
        terminal: "Terminal B",
        country: "Netherlands",
        coordinates: {
          lat: destCoords[0],
          lng: destCoords[1]
        }
      },
      estimatedTime: fiveDaysFromNow.toISOString(),
      status: "upcoming"
    },
    {
      id: "m9",
      type: "estimated",
      event: "Customs Clearance",
      location: {
        port: destination,
        terminal: "Terminal B",
        country: "Netherlands",
        coordinates: {
          lat: destCoords[0],
          lng: destCoords[1]
        }
      },
      estimatedTime: fiveDaysFromNow.toISOString(),
      status: "upcoming"
    },
    {
      id: "m10",
      type: "estimated",
      event: "Gate Out",
      location: {
        port: destination,
        terminal: "Terminal B",
        country: "Netherlands",
        coordinates: {
          lat: destCoords[0],
          lng: destCoords[1]
        }
      },
      estimatedTime: tenDaysFromNow.toISOString(),
      status: "upcoming"
    },
    {
      id: "m11",
      type: "estimated",
      event: "Empty Container Return",
      location: {
        port: destination,
        terminal: "Depot C",
        country: "Netherlands",
        coordinates: {
          lat: destCoords[0],
          lng: destCoords[1]
        }
      },
      estimatedTime: tenDaysFromNow.toISOString(),
      status: "upcoming"
    }
  ];
};

const generateMockVoyage = (originPort: string, destinationPort: string): Voyage => {
  const now = new Date();
  const departureDate = new Date(now);
  departureDate.setDate(now.getDate() - 2);
  
  const arrivalDate = new Date(now);
  arrivalDate.setDate(now.getDate() + 5);
  
  const originCoords = portCoordinates[originPort] || [0, 0];
  const destCoords = portCoordinates[destinationPort] || [0, 0];
  
  // Calculate current position (60% of the way)
  const progress = 0.6;
  const currentLat = originCoords[0] + (destCoords[0] - originCoords[0]) * progress;
  const currentLng = originCoords[1] + (destCoords[1] - originCoords[1]) * progress;
  
  return {
    id: "v1",
    vessel: "ODYSSEY EXPLORER",
    voyage: "AE7-22W",
    departurePort: originPort,
    departureDate: departureDate.toISOString(),
    arrivalPort: destinationPort,
    arrivalDate: arrivalDate.toISOString(),
    currentPosition: {
      lat: currentLat,
      lng: currentLng
    },
    status: "in-transit"
  };
};

export const getMockShipments = (): Shipment[] => {
  const carriers = getMockCarriers();
  
  // Define some origin-destination pairs
  const routes = [
    { origin: 'Shanghai', destination: 'Rotterdam' },
    { origin: 'Hong Kong', destination: 'Los Angeles' },
    { origin: 'Singapore', destination: 'Hamburg' },
    { origin: 'Shenzhen', destination: 'Antwerp' },
    { origin: 'Busan', destination: 'Felixstowe' }
  ];
  
  return routes.map((route, index) => {
    const carrier = carriers[index % carriers.length];
    const trackingType = index % 2 === 0 ? 'container' : 'bl';
    const trackingNumber = trackingType === 'container' 
      ? `MSCU${Math.floor(1000000 + Math.random() * 9000000)}`
      : `HLBL${Math.floor(10000000 + Math.random() * 90000000)}`;
    
    const milestones = generateMockMilestones(route.origin, route.destination);
    const voyage = generateMockVoyage(route.origin, route.destination);
    
    // Determine shipment status
    let status: 'on-schedule' | 'delayed' | 'alert' | 'completed' = 'on-schedule';
    if (index === 1) status = 'delayed';
    else if (index === 2) status = 'alert';
    else if (index === 4) status = 'completed';
    
    return {
      id: `s${index + 1}`,
      trackingType,
      trackingNumber,
      carrier,
      voyage,
      milestones,
      status,
      eta: voyage.arrivalDate,
      alerts: index === 2 ? [
        {
          id: `alert-${index}-1`,
          type: 'delay',
          message: 'Vessel departure delayed by 24 hours',
          severity: 'medium',
          timestamp: new Date().toISOString(),
          read: false,
          shipmentId: `s${index + 1}`
        }
      ] : undefined
    };
  });
};

export const getMockAlerts = (): Alert[] => {
  return [
    {
      id: "a1",
      type: "delay",
      message: "Vessel departure delayed by 24 hours",
      severity: "medium",
      timestamp: new Date().toISOString(),
      read: false,
      shipmentId: "s2"
    },
    {
      id: "a2",
      type: "exception",
      message: "Container damaged during loading",
      severity: "high",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      read: false,
      shipmentId: "s3"
    },
    {
      id: "a3",
      type: "custom",
      message: "Documentation update required",
      severity: "low",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      read: true,
      shipmentId: "s1"
    },
    {
      id: "a4",
      type: "deviation",
      message: "Vessel route changed due to weather conditions",
      severity: "medium",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      read: false,
      shipmentId: "s4"
    }
  ];
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getStatusColor = (status: string): string => {
  switch(status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'upcoming':
      return 'bg-gray-400';
    case 'delayed':
      return 'bg-red-500';
    case 'on-schedule':
      return 'bg-green-500';
    case 'alert':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-400';
  }
};

export const getAlertSeverityColor = (severity: string): string => {
  switch(severity) {
    case 'low':
      return 'bg-blue-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};
