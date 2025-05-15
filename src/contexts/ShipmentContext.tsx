
import React, { createContext, useContext, useState, useEffect } from "react";
import { Shipment, Carrier, TrackingFormData, Alert } from "@/types";
import { toast } from "sonner";
import { getMockShipments, getMockCarriers, getMockAlerts } from "@/lib/mock-data";

interface ShipmentContextType {
  shipments: Shipment[];
  carriers: Carrier[];
  activeShipment: Shipment | null;
  alerts: Alert[];
  isLoading: boolean;
  trackShipment: (data: TrackingFormData) => Promise<Shipment | null>;
  setActiveShipment: (shipment: Shipment | null) => void;
  dismissAlert: (alertId: string) => void;
  markAllAlertsAsRead: () => void;
  unreadAlertCount: number;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(undefined);

export const ShipmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Calculate unread alert count
  const unreadAlertCount = alerts.filter(alert => !alert.read).length;

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // In a real app, these would be API calls
        const mockCarriers = getMockCarriers();
        const mockShipments = getMockShipments();
        const mockAlerts = getMockAlerts();
        
        setCarriers(mockCarriers);
        setShipments(mockShipments);
        setAlerts(mockAlerts);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load initial data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Track a new shipment
  const trackShipment = async (data: TrackingFormData): Promise<Shipment | null> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call the Freightify API
      // For demo, we'll simulate the API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const carrier = carriers.find(c => c.scac === data.carrierScac);
      if (!carrier) {
        toast.error("Invalid carrier selected");
        return null;
      }
      
      // Check if the shipment is already tracked
      const existingShipment = shipments.find(
        s => s.trackingNumber === data.trackingNumber && s.carrier.scac === data.carrierScac
      );
      
      if (existingShipment) {
        setActiveShipment(existingShipment);
        toast.info(`Shipment ${data.trackingNumber} already tracked`);
        return existingShipment;
      }
      
      // Simulate API response by creating a new mock shipment
      const mockShipments = getMockShipments();
      const mockShipment = {
        ...mockShipments[0],
        id: `${Date.now()}`, // Generate unique ID
        trackingType: data.trackingType,
        trackingNumber: data.trackingNumber,
        carrier: carrier,
      };
      
      // Add to state
      setShipments(prev => [mockShipment, ...prev]);
      setActiveShipment(mockShipment);
      
      toast.success(`Successfully tracked ${data.trackingType === 'container' ? 'container' : 'bill of lading'} ${data.trackingNumber}`);
      return mockShipment;
    } catch (error) {
      console.error("Error tracking shipment:", error);
      toast.error("Failed to track shipment");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Dismiss an alert
  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
    toast.success("Alert marked as read");
  };

  // Mark all alerts as read
  const markAllAlertsAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
    toast.success("All alerts marked as read");
  };

  return (
    <ShipmentContext.Provider
      value={{
        shipments,
        carriers,
        activeShipment,
        alerts,
        isLoading,
        trackShipment,
        setActiveShipment,
        dismissAlert,
        markAllAlertsAsRead,
        unreadAlertCount
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipments = (): ShipmentContextType => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error("useShipments must be used within a ShipmentProvider");
  }
  return context;
};
