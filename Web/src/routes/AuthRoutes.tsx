import { useAuth } from '@/contexts/auth';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
    children: React.ReactElement;
  }


export default function AuthRoute({ children }: AuthRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}