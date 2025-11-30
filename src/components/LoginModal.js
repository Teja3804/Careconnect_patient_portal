import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaUserMd, FaCog, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalContent = styled(motion.div)`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -60px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg) scale(1.1);
  }

  @media (max-width: 768px) {
    top: -50px;
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

const ModalTitle = styled.h2`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ModalSubtitle = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LoginOptions = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 2rem;
    flex-direction: column;
  }
`;

const LoginOption = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 20px;

  &:hover {
    transform: translateY(-10px);
  }

  &:active {
    transform: translateY(-5px);
  }
`;

const OptionIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  background: ${props => props.gradient || 'linear-gradient(45deg, #4CAF50, #45a049)'};
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 4px rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: ${props => props.gradient || 'linear-gradient(45deg, #4CAF50, #45a049)'};
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  ${LoginOption}:hover & {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 
      0 25px 80px rgba(0, 0, 0, 0.4),
      0 0 0 6px rgba(255, 255, 255, 0.2);

    &::before {
      opacity: 0.3;
    }
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 32px;
  }
`;

const OptionTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLoginSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>

            <ModalTitle>Choose Your Login</ModalTitle>
            <ModalSubtitle>Select your role to continue</ModalSubtitle>

            <LoginOptions>
              <LoginOption
                onClick={() => handleLoginSelect('/patient-login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <OptionIcon gradient="linear-gradient(45deg, #4CAF50, #45a049)">
                  <FaUser />
                </OptionIcon>
                <OptionTitle>Patient</OptionTitle>
              </LoginOption>

              <LoginOption
                onClick={() => handleLoginSelect('/doctor-login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <OptionIcon gradient="linear-gradient(45deg, #2196F3, #1976D2)">
                  <FaUserMd />
                </OptionIcon>
                <OptionTitle>Doctor</OptionTitle>
              </LoginOption>

              <LoginOption
                onClick={() => handleLoginSelect('/admin-login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <OptionIcon gradient="linear-gradient(45deg, #9C27B0, #7B1FA2)">
                  <FaCog />
                </OptionIcon>
                <OptionTitle>Admin</OptionTitle>
              </LoginOption>
            </LoginOptions>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
