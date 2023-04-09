import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Private = () => {
  const isLogin = useSelector(state => state.auth.isLogin);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default Private;
