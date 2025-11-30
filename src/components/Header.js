import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaChevronDown, FaHome } from 'react-icons/fa';
import LoginModal from './LoginModal';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
`;

const LogoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
`;

const LogoText = styled.h1`
  color: #2c3e50;
  font-size: 28px;
  font-weight: 800;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled(Link)`
  background: linear-gradient(45deg, #6c757d, #5a6268);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const LoginDropdown = styled.div`
  position: relative;
`;

const LoginButton = styled.button`
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const DropdownContent = styled(motion.div)`
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  background: white;
  min-width: 220px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  overflow: hidden;
  z-index: 1001;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled(Link)`
  padding: 15px 20px;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 500;

  &:hover {
    background: linear-gradient(45deg, #f8f9fa, #e9ecef);
    color: #4CAF50;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isHomePage = location.pathname === '/';

  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoIcon>CC</LogoIcon>
        <LogoText>Care Connect</LogoText>
      </Logo>
      
      <NavSection>
        {!isHomePage && (
          <BackButton to="/">
            <FaHome />
            <span>Back to Home</span>
          </BackButton>
        )}
        
        {isHomePage && (
          <LoginDropdown>
            <LoginButton onClick={toggleModal}>
              <FaUser />
              <span>Login</span>
              <FaChevronDown 
                style={{ 
                  transform: isModalOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }} 
              />
            </LoginButton>
          </LoginDropdown>
        )}
      </NavSection>
      
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </HeaderContainer>
  );
};

export default Header;
