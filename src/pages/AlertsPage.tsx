
import { useState } from "react";
import { useShipments } from "@/contexts/ShipmentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Bell, AlertTriangle, Clock } from "lucide-react";
import { formatDate, getAlertSeverityColor } from "@/lib/mock-data";
import { Alert } from "@/types";
import { Link } from "react-router-dom";

const AlertsPage = () => {
  const { alerts, dismissAlert, markAllAlertsAsRead } = useShipments();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  
  const filteredAlerts = alerts.filter(alert => {
    if (filter === "all") return true;
    if (filter === "unread") return !alert.read;
    if (filter === "read") return alert.read;
    return true;
  });
  
  const handleDismissAll = () => {
    markAllAlertsAsRead();
  };
  
  const renderAlertIcon = (type: string) => {
    switch (type) {
      case 'delay':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'exception':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'deviation':
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage shipment alerts and exceptions
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" /> 
            Alert Management
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Button 
                variant={filter === "all" ? "secondary" : "ghost"} 
                onClick={() => setFilter("all")} 
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={filter === "unread" ? "secondary" : "ghost"} 
                onClick={() => setFilter("unread")} 
                size="sm"
              >
                Unread
              </Button>
              <Button 
                variant={filter === "read" ? "secondary" : "ghost"} 
                onClick={() => setFilter("read")} 
                size="sm"
              >
                Read
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDismissAll}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Mark All Read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length > 0 ? (
            <div className="divide-y">
              {filteredAlerts.map((alert) => (
                <AlertItem 
                  key={alert.id} 
                  alert={alert} 
                  onDismiss={() => dismissAlert(alert.id)} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium">No alerts to display</h3>
              <p className="text-muted-foreground mt-1">
                {filter === "all" 
                  ? "You don't have any alerts at the moment." 
                  : filter === "unread" 
                  ? "You've read all your alerts." 
                  : "No read alerts to display."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface AlertItemProps {
  alert: Alert;
  onDismiss: () => void;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, onDismiss }) => {
  const renderAlertIcon = (type: string) => {
    switch (type) {
      case 'delay':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'exception':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'deviation':
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className={`py-4 ${alert.read ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${getAlertSeverityColor(alert.severity)} bg-opacity-10 mt-1`}>
            {renderAlertIcon(alert.type)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-base">{alert.message}</h4>
              <Badge 
                variant="outline" 
                className={`${getAlertSeverityColor(alert.severity)} bg-opacity-10 border-0 text-xs capitalize`}
              >
                {alert.severity}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(alert.timestamp)} • 
              <Link to={`/shipments/${alert.shipmentId}`} className="ml-1 text-ocean-600 hover:underline">
                View Shipment
              </Link>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!alert.read && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDismiss} 
              className="text-muted-foreground"
            >
              Mark as Read
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
