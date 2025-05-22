import { Navigate } from 'react-router';
import { jwtDecode }  from 'jwt-decode';

type Props = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: any = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
}
