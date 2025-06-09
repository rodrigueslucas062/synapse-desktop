import { useEffect } from 'react';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router';

export function withAuth(Component: any) {
  return function ProtectedRoute(props: any) {
    const auth = useAuth();
    const isAuthenticated = auth?.isAuthenticated;
    const loading = auth?.loading;
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
