import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaFileMedical, 
  FaPills, 
  FaCalendarAlt, 
  FaChartLine, 
  FaBell, 
  FaCog, 
  FaSignOutAlt,
  FaChevronRight,
  FaChevronDown
} from 'react-icons/fa';

const SidebarContainer = styled(motion.div)`
  width: 280px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const UserDetails = styled.div`
  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
  p {
    margin: 0.25rem 0 0 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
`;

const MenuSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.div`
  padding: 0.5rem 1.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MenuItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  position: relative;

  &:hover {
    background: rgba(76, 175, 80, 0.1);
    border-left-color: #4CAF50;
  }

  ${props => props.active && `
    background: rgba(76, 175, 80, 0.15);
    border-left-color: #4CAF50;
    color: #4CAF50;
  `}
`;

const MenuIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? '#4CAF50' : '#666'};
`;

const MenuText = styled.div`
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${props => props.active ? '#4CAF50' : '#333'};
`;

const MenuBadge = styled.div`
  background: #e74c3c;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
`;

const Submenu = styled(motion.div)`
  overflow: hidden;
`;

const SubmenuItem = styled.div`
  padding: 0.75rem 1.5rem 0.75rem 3.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: #666;

  &:hover {
    background: rgba(76, 175, 80, 0.05);
    color: #4CAF50;
  }
`;

const SidebarFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
  }
`;

const PatientSidebar = ({ isOpen, onClose, user }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FaUser />,
      section: 'main'
    },
    {
      id: 'test-results',
      title: 'View My Test Results',
      icon: <FaFileMedical />,
      section: 'medical'
    },
    {
      id: 'medications',
      title: 'My Active Medications',
      icon: <FaPills />,
      section: 'medical',
      badge: '3'
    },
    {
      id: 'appointments',
      title: 'Schedule an Appointment',
      icon: <FaCalendarAlt />,
      section: 'appointments'
    },
    {
      id: 'health-records',
      title: 'Health Records',
      icon: <FaChartLine />,
      section: 'medical',
      submenu: [
        'Medical History',
        'Vaccination Records',
        'Lab Reports',
        'Imaging Results'
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <FaBell />,
      section: 'system',
      badge: '2'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <FaCog />,
      section: 'system'
    }
  ];

  const sections = {
    main: 'Main',
    medical: 'Medical',
    appointments: 'Appointments',
    system: 'System'
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <SidebarContainer
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      isOpen={isOpen}
    >
      <SidebarHeader>
        <UserInfo>
          <UserAvatar>
            <FaUser />
          </UserAvatar>
          <UserDetails>
            <h3>{user?.name || 'Patient'}</h3>
            <p>Patient Portal</p>
          </UserDetails>
        </UserInfo>
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(groupedItems).map(([sectionKey, items]) => (
          <MenuSection key={sectionKey}>
            <SectionTitle>{sections[sectionKey]}</SectionTitle>
            {items.map((item) => (
              <div key={item.id}>
                <MenuItem
                  active={activeItem === item.id}
                  onClick={() => {
                    if (item.submenu) {
                      toggleExpanded(item.id);
                    } else {
                      setActiveItem(item.id);
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MenuIcon active={activeItem === item.id}>
                    {item.icon}
                  </MenuIcon>
                  <MenuText active={activeItem === item.id}>
                    {item.title}
                  </MenuText>
                  {item.badge && <MenuBadge>{item.badge}</MenuBadge>}
                  {item.submenu && (
                    <MenuIcon>
                      {expandedItems[item.id] ? <FaChevronDown /> : <FaChevronRight />}
                    </MenuIcon>
                  )}
                </MenuItem>
                
                {item.submenu && expandedItems[item.id] && (
                  <Submenu
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.submenu.map((subItem, index) => (
                      <SubmenuItem key={index}>
                        {subItem}
                      </SubmenuItem>
                    ))}
                  </Submenu>
                )}
              </div>
            ))}
          </MenuSection>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default PatientSidebar;
