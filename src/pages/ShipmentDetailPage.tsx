
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useShipments } from "@/contexts/ShipmentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, Ship, Package, FileText, Download, Clock } from "lucide-react";
import { Milestone, Shipment } from "@/types";
import { formatDate, getStatusColor } from "@/lib/mock-data";
import ShipmentMap from "@/components/ShipmentMap";

const ShipmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { shipments } = useShipments();
  const [shipment, setShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    if (id) {
      const foundShipment = shipments.find(s => s.id === id);
      if (foundShipment) {
        setShipment(foundShipment);
      } else {
        navigate("/tracking", { replace: true });
      }
    }
  }, [id, shipments, navigate]);

  if (!shipment) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  const getTimelineStatus = (milestone: Milestone) => {
    switch (milestone.status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500 animate-pulse-slow';
      case 'upcoming':
        return 'bg-gray-300';
      case 'delayed':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button and header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="mb-2 flex items-center text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              {shipment.trackingType === 'container' ? (
                <Package className="h-6 w-6 mr-2 text-ocean-600" />
              ) : (
                <FileText className="h-6 w-6 mr-2 text-ocean-600" />
              )}
              {shipment.trackingNumber}
              <Badge 
                variant="outline" 
                className={`${getStatusColor(shipment.status)} bg-opacity-10 border-0 text-xs capitalize ml-3`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(shipment.status)} inline-block mr-1`}></span>
                {shipment.status.replace(/-/g, ' ')}
              </Badge>
            </h1>
            <p className="text-muted-foreground mt-1">
              {shipment.carrier.name} • 
              {shipment.trackingType === 'container' ? ' Container' : ' Bill of Lading'}
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center">
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
            <Button className="bg-ocean-600 hover:bg-ocean-700">Track Another</Button>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Ship className="h-4 w-4 mr-1 text-ocean-600" /> Vessel Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xl font-bold">{shipment.voyage.vessel}</div>
            <div className="text-sm">Voyage: {shipment.voyage.voyage}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-ocean-600" /> Route
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <div>
                <div className="font-medium">{shipment.voyage.departurePort}</div>
                <div className="text-muted-foreground text-xs">
                  {formatDate(shipment.voyage.departureDate)}
                </div>
              </div>
              <div className="border-t border-dashed self-center flex-grow mx-2 mt-1"></div>
              <div className="text-right">
                <div className="font-medium">{shipment.voyage.arrivalPort}</div>
                <div className="text-muted-foreground text-xs">
                  {formatDate(shipment.voyage.arrivalDate)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-1 text-ocean-600" /> ETA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xl font-bold">{formatDate(shipment.voyage.arrivalDate)}</div>
            <div className="text-sm text-muted-foreground">
              {shipment.status === 'delayed' 
                ? 'Delayed - 24 hours'
                : shipment.status === 'on-schedule'
                ? 'On schedule'
                : shipment.status === 'completed'
                ? 'Completed'
                : 'Status alert'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for detailed info */}
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="details">Shipment Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" /> Milestone Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-3 top-5 bottom-5 w-0.5 bg-gray-200"></div>
                
                {/* Timeline events */}
                <div className="space-y-8">
                  {shipment.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="relative pl-10">
                      {/* Timeline dot */}
                      <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-background ${getTimelineStatus(milestone)}`}></div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                        <div>
                          <div className="font-medium text-base">{milestone.event}</div>
                          <div className="text-sm text-muted-foreground">
                            {milestone.location.port}
                            {milestone.location.terminal && `, ${milestone.location.terminal}`}
                            {milestone.location.country && `, ${milestone.location.country}`}
                          </div>
                        </div>
                        <div className="sm:text-right mt-1 sm:mt-0">
                          <div className="text-sm font-medium">
                            {milestone.actualTime 
                              ? formatDate(milestone.actualTime)
                              : formatDate(milestone.estimatedTime)
                            }
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {milestone.type === 'actual' ? 'Actual' : 'Estimated'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Notes if any */}
                      {milestone.notes && (
                        <div className="mt-2 px-3 py-2 bg-muted rounded-md text-sm">
                          {milestone.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" /> Shipment Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] rounded-md border overflow-hidden">
                <ShipmentMap shipment={shipment} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                    <p className="capitalize">
                      {shipment.trackingType === 'container' ? 'Container' : 'Bill of Lading'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Number</p>
                    <p>{shipment.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Carrier</p>
                    <p>{shipment.carrier.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">SCAC</p>
                    <p>{shipment.carrier.scac}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p className="capitalize">{shipment.status.replace(/-/g, ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ETA</p>
                    <p>{formatDate(shipment.voyage.arrivalDate)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Voyage Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Vessel</p>
                    <p>{shipment.voyage.vessel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Voyage</p>
                    <p>{shipment.voyage.voyage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Departure</p>
                    <p>{shipment.voyage.departurePort}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(shipment.voyage.departureDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Arrival</p>
                    <p>{shipment.voyage.arrivalPort}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(shipment.voyage.arrivalDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p className="capitalize">{shipment.voyage.status.replace(/-/g, ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Progress</p>
                    <p>60%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShipmentDetailPage;
