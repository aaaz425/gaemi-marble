import { useAuth } from '@store/index';
import { Navigate, Outlet } from 'react-router-dom';

type RouteProps = {
  needAuth: boolean;
  redirectRoute: string;
};

export function ProtectedRoute({ needAuth, redirectRoute }: RouteProps) {
  const isAuthenticated = useAuth();

  if (needAuth) {
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to={redirectRoute} replace />
    );
  }

  return isAuthenticated ? <Navigate to={redirectRoute} replace /> : <Outlet />;
}
