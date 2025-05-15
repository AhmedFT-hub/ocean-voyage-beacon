
export type Role = 'admin' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Carrier {
  id: string;
  name: string;
  scac: string; // Standard Carrier Alpha Code
  logo?: string;
}

export interface Voyage {
  id: string;
  vessel: string;
  voyage: string;
  departurePort: string;
  departureDate: string;
  arrivalPort: string;
  arrivalDate: string;
  currentPosition?: {
    lat: number;
    lng: number;
  };
  status: 'scheduled' | 'in-transit' | 'completed' | 'delayed';
}

export interface Location {
  port: string;
  terminal?: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Milestone {
  id: string;
  type: 'estimated' | 'actual';
  event: string;
  location: Location;
  estimatedTime: string;
  actualTime?: string;
  notes?: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed';
}

export interface Shipment {
  id: string;
  trackingType: 'container' | 'bl';
  trackingNumber: string;
  carrier: Carrier;
  voyage: Voyage;
  milestones: Milestone[];
  status: 'on-schedule' | 'delayed' | 'alert' | 'completed';
  eta: string;
  alerts?: Alert[];
}

export interface Alert {
  id: string;
  type: 'delay' | 'deviation' | 'custom' | 'exception';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  read: boolean;
  shipmentId: string;
}

export interface TrackingFormData {
  trackingType: 'container' | 'bl';
  trackingNumber: string;
  carrierScac: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'pdf' | 'excel';
  created: string;
  shipments: string[];
  filters?: Record<string, any>;
}
