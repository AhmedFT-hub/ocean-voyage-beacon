
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreVertical, Pencil, Trash2, LockIcon } from "lucide-react";
import { Navigate } from "react-router-dom";

const UserManagementPage = () => {
  const { user } = useAuth();
  
  // Admin-only page
  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Mock users
  const [users] = useState([
    {
      id: "1",
      name: "Admin User",
      email: "admin@oceantracking.com",
      role: "admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      status: "active",
    },
    {
      id: "2",
      name: "Viewer User",
      email: "viewer@oceantracking.com",
      role: "viewer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=viewer",
      status: "active",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarah@oceantracking.com",
      role: "viewer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      status: "active",
    },
    {
      id: "4",
      name: "Michael Chen",
      email: "michael@oceantracking.com",
      role: "viewer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      status: "inactive",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
        </div>
        <Button className="bg-ocean-600 hover:bg-ocean-700">
          <PlusCircle className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage user access and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2 pl-0">User</th>
                  <th className="text-left font-medium p-2">Email</th>
                  <th className="text-left font-medium p-2">Role</th>
                  <th className="text-left font-medium p-2">Status</th>
                  <th className="text-left font-medium p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 pl-0">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">
                      <Badge 
                        variant="outline"
                        className={`
                          ${user.role === 'admin' ? 'bg-ocean-100 text-ocean-700' : 'bg-gray-100 text-gray-700'}
                          bg-opacity-80 capitalize
                        `}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Badge 
                        variant="outline"
                        className={`
                          ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                          bg-opacity-80 capitalize
                        `}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <LockIcon className="h-4 w-4 mr-2" /> Reset Password
                          </DropdownMenuItem>
                          {user.status === 'active' ? (
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Activate</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementPage;
