
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ocean-50 p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
