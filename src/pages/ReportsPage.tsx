
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, Ship, Package, Filter } from "lucide-react";

const ReportsPage = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  
  const handleExport = (format: string) => {
    setLoading(true);
    
    // Simulate export delay
    setTimeout(() => {
      setLoading(false);
      // In a real app, this would trigger a file download
      console.log(`Exporting in ${format} format...`);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-1">Export and analyze shipment data</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="history">Export History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ReportCard
              title="Shipment Status Summary"
              description="Overview of all shipments by status"
              icon={<Package className="h-5 w-5" />}
              loading={loading}
              onExport={handleExport}
            />
            <ReportCard
              title="Voyage Timeline"
              description="Detailed vessel schedule and deviations"
              icon={<Ship className="h-5 w-5" />}
              loading={loading}
              onExport={handleExport}
            />
            <ReportCard
              title="Carrier Performance"
              description="Metrics and KPIs by carrier"
              icon={<Calendar className="h-5 w-5" />}
              loading={loading}
              onExport={handleExport}
            />
            <ReportCard
              title="Alert Analysis"
              description="Summary of exceptions and delays"
              icon={<FileText className="h-5 w-5" />}
              loading={loading}
              onExport={handleExport}
            />
            <ReportCard
              title="Transit Time Report"
              description="Average transit times by route"
              icon={<Calendar className="h-5 w-5" />}
              loading={loading}
              onExport={handleExport}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" /> Custom Report Builder
              </CardTitle>
              <CardDescription>
                Create a customized report with the exact data you need
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-8 rounded-md flex flex-col items-center justify-center text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Custom Report Builder</h3>
                <p className="text-muted-foreground mt-1 max-w-md">
                  This feature is coming soon. You'll be able to select specific data points,
                  date ranges, and formats for your custom reports.
                </p>
                <Button 
                  className="mt-4 bg-ocean-600 hover:bg-ocean-700"
                  disabled
                >
                  Build Custom Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" /> Export History
              </CardTitle>
              <CardDescription>
                Previously generated reports and exports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-2 pl-0">Report Name</th>
                      <th className="text-left font-medium p-2">Type</th>
                      <th className="text-left font-medium p-2">Date Created</th>
                      <th className="text-left font-medium p-2">Created By</th>
                      <th className="text-left font-medium p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-2 pl-0 font-medium">Shipment Status Summary</td>
                      <td className="p-2">Excel</td>
                      <td className="p-2">May 12, 2025</td>
                      <td className="p-2">Admin User</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-2 pl-0 font-medium">Voyage Timeline</td>
                      <td className="p-2">PDF</td>
                      <td className="p-2">May 10, 2025</td>
                      <td className="p-2">Admin User</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-2 pl-0 font-medium">Alert Analysis</td>
                      <td className="p-2">Excel</td>
                      <td className="p-2">May 5, 2025</td>
                      <td className="p-2">Admin User</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
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

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  loading: boolean;
  onExport: (format: string) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ 
  title, 
  description, 
  icon,
  loading,
  onExport
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base">
          <div className="p-2 bg-ocean-100 rounded-full mr-2">
            {icon}
          </div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-40 bg-muted/50 rounded-md flex items-center justify-center">
          <FileText className="h-16 w-16 text-muted-foreground opacity-50" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => onExport('excel')}
          disabled={loading}
        >
          Excel
        </Button>
        <Button 
          onClick={() => onExport('pdf')}
          disabled={loading}
          className="bg-ocean-600 hover:bg-ocean-700"
        >
          {loading ? (
            <span className="flex items-center">
              <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
              Exporting...
            </span>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" /> PDF
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportsPage;
