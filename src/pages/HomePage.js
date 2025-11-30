import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import FeatureCarousel from '../components/FeatureCarousel';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroSection = styled(motion.section)`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 5rem;
  padding: 3rem 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin-bottom: 3rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #2c3e50, #4CAF50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: #666;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;


const WarningSection = styled(motion.div)`
  background: rgba(255, 193, 7, 0.9);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  margin-top: 3rem;
  border: 2px solid #ffc107;
  box-shadow: 0 10px 30px rgba(255, 193, 7, 0.3);
`;

const WarningText = styled.p`
  color: #856404;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Care Connect
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your trusted healthcare partner for comprehensive medical services
        </HeroSubtitle>
      </HeroSection>

      <FeatureCarousel />

      <WarningSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <WarningText>
          <FaExclamationTriangle />
          This is just a college project and not a real application
          <FaExclamationTriangle />
        </WarningText>
      </WarningSection>
    </HomeContainer>
  );
};

export default HomePage;
