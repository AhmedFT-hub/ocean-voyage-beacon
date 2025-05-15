
import { useState } from "react";
import { useShipments } from "@/contexts/ShipmentContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Package, FileText } from "lucide-react";
import { TrackingFormData } from "@/types";
import { Link } from "react-router-dom";
import { formatDate, getStatusColor } from "@/lib/mock-data";

const TrackingPage = () => {
  const { carriers, shipments, trackShipment, isLoading } = useShipments();
  const [trackingType, setTrackingType] = useState<"container" | "bl">("container");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrierScac, setCarrierScac] = useState("");
  const [activeTab, setActiveTab] = useState("track");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: TrackingFormData = {
      trackingType,
      trackingNumber,
      carrierScac,
    };
    
    await trackShipment(formData);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shipment Tracking</h1>
        <p className="text-muted-foreground mt-1">Track containers and bills of lading</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="track">Track Shipment</TabsTrigger>
          <TabsTrigger value="list">Shipment List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="track" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unified Tracking</CardTitle>
              <CardDescription>
                Track your container or bill of lading
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Tabs 
                      value={trackingType} 
                      onValueChange={(value) => setTrackingType(value as "container" | "bl")} 
                      className="w-full"
                    >
                      <TabsList className="w-full">
                        <TabsTrigger value="container" className="flex-1">
                          <Package className="h-4 w-4 mr-2" />
                          Container
                        </TabsTrigger>
                        <TabsTrigger value="bl" className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          Bill of Lading
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="trackingNumber" className="text-sm font-medium block mb-2">
                      {trackingType === "container" ? "Container Number" : "Bill of Lading Number"}
                    </label>
                    <Input
                      id="trackingNumber"
                      placeholder={trackingType === "container" ? "e.g. MSCU1234567" : "e.g. MAEU123456789"}
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="bg-white"
                      required
                    />
                  </div>
                  
                  <div className="md:w-1/3">
                    <label htmlFor="carrier" className="text-sm font-medium block mb-2">
                      Carrier
                    </label>
                    <Select value={carrierScac} onValueChange={setCarrierScac} required>
                      <SelectTrigger id="carrier" className="bg-white">
                        <SelectValue placeholder="Select carrier" />
                      </SelectTrigger>
                      <SelectContent>
                        {carriers.map((carrier) => (
                          <SelectItem key={carrier.scac} value={carrier.scac}>
                            {carrier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading || !trackingNumber || !carrierScac}
                    className="bg-ocean-600 hover:bg-ocean-700 min-w-[120px]"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                        Tracking...
                      </span>
                    ) : (
                      "Track"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Shipment List</CardTitle>
              <CardDescription>
                View and manage all tracked shipments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-2 pl-0">Tracking #</th>
                      <th className="text-left font-medium p-2">Type</th>
                      <th className="text-left font-medium p-2">Carrier</th>
                      <th className="text-left font-medium p-2">Status</th>
                      <th className="text-left font-medium p-2">Origin</th>
                      <th className="text-left font-medium p-2">Destination</th>
                      <th className="text-left font-medium p-2">ETA</th>
                      <th className="text-left font-medium p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.length > 0 ? (
                      shipments.map(shipment => (
                        <tr key={shipment.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="p-2 pl-0">
                            <Link to={`/shipments/${shipment.id}`} className="font-medium text-ocean-600 hover:underline">
                              {shipment.trackingNumber}
                            </Link>
                          </td>
                          <td className="p-2 capitalize">
                            {shipment.trackingType === 'container' ? 'Container' : 'Bill of Lading'}
                          </td>
                          <td className="p-2">{shipment.carrier.name}</td>
                          <td className="p-2">
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(shipment.status)} bg-opacity-10 border-0 text-xs capitalize`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(shipment.status)} inline-block mr-1`}></span>
                              {shipment.status.replace(/-/g, ' ')}
                            </Badge>
                          </td>
                          <td className="p-2">{shipment.voyage.departurePort}</td>
                          <td className="p-2">{shipment.voyage.arrivalPort}</td>
                          <td className="p-2">{formatDate(shipment.voyage.arrivalDate)}</td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Link 
                                to={`/shipments/${shipment.id}`} 
                                className="text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded"
                              >
                                Details
                              </Link>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-6 px-2 text-xs"
                              >
                                Export
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-muted-foreground">
                          No shipments tracked yet. Use the tracking form to add shipments.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackingPage;
