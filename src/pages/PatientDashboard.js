import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import PatientSidebar from '../components/PatientSidebar';
import HealthChatbot from '../components/HealthChatbot';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)),
    url('https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const MobileHeader = styled.div`
  display: none;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuButton = styled.button`
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const MobileTitle = styled.h1`
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 700;
`;

const DashboardHeader = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WelcomeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #4CAF50, #45a049);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const WelcomeText = styled.div`
  h1 {
    margin: 0;
    color: #2c3e50;
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  p {
    margin: 0.5rem 0 0 0;
    color: #7f8c8d;
    font-size: 1.1rem;
  }
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
  }
`;

const DashboardContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const EmptyState = styled.div`
  h2 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  p {
    color: #7f8c8d;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const PatientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <DashboardContainer>
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />
      
      <MainContent>
        <MobileHeader>
          <MobileMenuButton onClick={toggleSidebar}>
            <FaBars />
          </MobileMenuButton>
          <MobileTitle>Patient Dashboard</MobileTitle>
        </MobileHeader>

        <DashboardHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WelcomeSection>
            <UserIcon>
              <FaUser />
            </UserIcon>
          <WelcomeText>
            <h1><FaUser /> Welcome, {user.name || 'Patient'}!</h1>
            <p>Patient Dashboard - Care Connect</p>
          </WelcomeText>
          </WelcomeSection>
        </DashboardHeader>

        <DashboardContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EmptyState>
            <h2>Patient Dashboard</h2>
            <p>Use the sidebar on the left to access your medical information and features.</p>
            <p>The health assistant chatbot is available on the bottom right for any health-related questions.</p>
          </EmptyState>
        </DashboardContent>
      </MainContent>

      <HealthChatbot />
    </DashboardContainer>
  );
};

export default PatientDashboard;
