
import { useShipments } from "@/contexts/ShipmentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BarChart2, Package, Ship, Bell, Clock } from "lucide-react";
import { formatDate, getStatusColor } from "@/lib/mock-data";

const DashboardPage = () => {
  const { shipments, alerts, isLoading } = useShipments();
  
  const delayedShipments = shipments.filter(s => s.status === 'delayed');
  const activeShipments = shipments.filter(s => s.status !== 'completed');
  const unreadAlerts = alerts.filter(a => !a.read);
  
  const shipmentsByStatus = {
    'on-schedule': shipments.filter(s => s.status === 'on-schedule').length,
    'delayed': shipments.filter(s => s.status === 'delayed').length,
    'alert': shipments.filter(s => s.status === 'alert').length,
    'completed': shipments.filter(s => s.status === 'completed').length,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your shipments and alerts</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeShipments.length} active shipments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vessels at Sea</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeShipments.length}</div>
            <p className="text-xs text-muted-foreground">
              {delayedShipments.length} with delays
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {alerts.length - unreadAlerts.length} resolved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Transit Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.3 days</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status chart */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shipment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(shipmentsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} mr-2`}></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium capitalize">
                      {status.replace(/-/g, ' ')}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${getStatusColor(status)} h-2 rounded-full`} 
                        style={{ 
                          width: `${(count / shipments.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {unreadAlerts.length > 0 ? (
              <div className="space-y-4">
                {unreadAlerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${alert.severity === 'high' ? 'bg-red-500' : alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(alert.timestamp)}
                        </p>
                      </div>
                    </div>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'outline'} className="text-xs">
                      {alert.type}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <BarChart2 className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                <p className="text-muted-foreground">No active alerts</p>
              </div>
            )}
            <div className="mt-4">
              <Link to="/alerts" className="text-sm text-ocean-600 hover:underline">
                View all alerts →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent shipments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
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
                </tr>
              </thead>
              <tbody>
                {shipments.slice(0, 5).map(shipment => (
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
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <Link to="/tracking" className="text-sm text-ocean-600 hover:underline">
                View all shipments →
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
