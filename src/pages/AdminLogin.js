import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaExclamationTriangle, FaDesktop, FaServer, FaCog, FaDatabase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
  position: relative;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)),
    url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LoginCard = styled(motion.div)`
  background: transparent;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h1`
  color: #2c3e50;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #9C27B0, #7B1FA2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LoginSubtitle = styled.p`
  color: #666;
  font-size: 1rem;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const FormLabel = styled.label`
  display: block;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 18px 20px;
  border: none;
  border-bottom: 3px solid rgba(156, 39, 176, 0.3);
  border-radius: 0;
  font-size: 18px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  font-family: inherit;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-bottom-color: #9C27B0;
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: #666;
    font-weight: 400;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  right: 20px;
  color: #9C27B0;
  font-size: 18px;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 20px;
  background: none;
  border: none;
  color: #9C27B0;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  transition: all 0.3s ease;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: #7B1FA2;
    transform: translateY(-50%) scale(1.1);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #9C27B0, #7B1FA2);
  color: white;
  border: none;
  padding: 20px;
  border-radius: 0;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(156, 39, 176, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const FormLinks = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FormLink = styled.a`
  color: #9C27B0;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 8px;

  &:hover {
    color: #7B1FA2;
    background: rgba(156, 39, 176, 0.1);
    text-decoration: none;
  }
`;

const WarningSection = styled(motion.div)`
  background: rgba(255, 193, 7, 0.9);
  backdrop-filter: blur(20px);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 2rem;
  border: 2px solid #ffc107;
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
`;

const WarningText = styled.p`
  color: #856404;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  color: rgba(156, 39, 176, 0.1);
  font-size: ${props => props.size || '2rem'};
  pointer-events: none;
  z-index: 0;
`;

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to admin dashboard
        navigate('/admin-dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      {/* Floating Computer/Tech Icons */}
      <FloatingIcon
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{ top: '10%', left: '10%' }}
        size="3rem"
      >
        <FaDesktop />
      </FloatingIcon>
      
      <FloatingIcon
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2, delay: 1 }}
        style={{ top: '20%', right: '15%' }}
        size="2.5rem"
      >
        <FaServer />
      </FloatingIcon>
      
      <FloatingIcon
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
        style={{ bottom: '20%', left: '20%' }}
        size="2rem"
      >
        <FaDatabase />
      </FloatingIcon>
      
      <FloatingIcon
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.09, scale: 1 }}
        transition={{ duration: 2, delay: 2 }}
        style={{ bottom: '15%', right: '10%' }}
        size="2.8rem"
      >
        <FaCog />
      </FloatingIcon>
      
      <FloatingIcon
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.07, scale: 1 }}
        transition={{ duration: 2, delay: 2.5 }}
        style={{ top: '50%', left: '5%' }}
        size="1.8rem"
      >
        <FaDesktop />
      </FloatingIcon>
      
      <FloatingIcon
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.11, scale: 1 }}
        transition={{ duration: 2, delay: 3 }}
        style={{ top: '60%', right: '5%' }}
        size="2.2rem"
      >
        <FaServer />
      </FloatingIcon>

      <LoginCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LoginHeader>
          <LoginTitle>Administration Login</LoginTitle>
          <LoginSubtitle>Access administrative systems and management tools</LoginSubtitle>
        </LoginHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="username">Username</FormLabel>
            <InputContainer>
              <FormInput
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <InputIcon>
                <FaUser />
              </InputIcon>
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputContainer>
              <FormInput
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <PasswordToggle
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputContainer>
          </FormGroup>

          <LoginButton type="submit">
            Login
          </LoginButton>

          <FormLinks>
            <FormLink href="#">Forgot Password?</FormLink>
          </FormLinks>
        </Form>

        <WarningSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <WarningText>
            <FaExclamationTriangle />
            This is just a college project and not a real application
            <FaExclamationTriangle />
          </WarningText>
        </WarningSection>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;
