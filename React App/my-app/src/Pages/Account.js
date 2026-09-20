import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyAccountComponent from '../Components/Account/MyAccount';
import { useAuth } from '../Components/Common/AuthContext';

export default function MyAccountPage() {
  const { user: authUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || authUser;

  useEffect(() => {
    document.title = "My Account | Dashboard";
    if (!user) navigate('/');
  }, [user, navigate]);

  if (!user) return null;

  return <MyAccountComponent user={user} />;
}
