import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Loader, Text, Title, Button } from '@mantine/core';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const user = JSON.parse(userData);
        setIsAuthenticated(true);
        
        if (requireAdmin) {
          if (user.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requireAdmin]);

  if (isLoading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader size="lg" />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/users" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', gap: '20px' }}>
        <Title order={2} color="red">Không có quyền truy cập</Title>
        <Text>Bạn cần quyền admin để truy cập trang này.</Text>
        <Button onClick={() => navigate('/')}>Về trang chủ</Button>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;
