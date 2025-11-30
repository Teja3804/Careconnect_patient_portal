import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCog, FaSignOutAlt, FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaIdCard, FaHeartbeat, FaPills, FaChartLine, FaSearch, FaFilter } from 'react-icons/fa';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)),
    url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 2rem;
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
  background: linear-gradient(45deg, #9C27B0, #7B1FA2);
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
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SearchSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid rgba(156, 39, 176, 0.2);
  border-radius: 25px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(156, 39, 176, 0.5);
    box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid rgba(156, 39, 176, 0.2);
  border-radius: 25px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(156, 39, 176, 0.5);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(123, 31, 162, 0.1));
  border: 1px solid rgba(156, 39, 176, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(156, 39, 176, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #9C27B0;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 600;
`;

const PatientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const PatientCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: rgba(156, 39, 176, 0.3);
  }
`;

const PatientHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PatientAvatar = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #9C27B0, #7B1FA2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

const PatientInfo = styled.div`
  flex: 1;
`;

const PatientName = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const PatientDetails = styled.p`
  margin: 0.25rem 0 0 0;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const InfoSection = styled.div`
  margin-bottom: 1rem;
`;

const InfoTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const InfoTag = styled.span`
  background: rgba(156, 39, 176, 0.1);
  color: #9C27B0;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
`;

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    filterPatients();
  }, [patients, searchTerm, statusFilter]);

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients');
      const data = await response.json();
      if (data.success) {
        setPatients(data.data);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPatients = () => {
    let filtered = patients;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(patient => patient.status === statusFilter);
    }

    setFilteredPatients(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const getStats = () => {
    return {
      total: patients.length,
      active: patients.filter(p => p.status === 'active').length,
      inactive: patients.filter(p => p.status === 'inactive').length,
      new: patients.filter(p => {
        const createdDate = new Date(p.dateOfBirth);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        return createdDate > sixMonthsAgo;
      }).length
    };
  };

  if (loading) {
    return (
      <DashboardContainer>
        <EmptyState
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Loading...</h2>
        </EmptyState>
      </DashboardContainer>
    );
  }

  const stats = getStats();

  return (
    <DashboardContainer>
      <DashboardHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <WelcomeSection>
          <UserIcon>
            <FaCog />
          </UserIcon>
          <WelcomeText>
            <h1><FaCog /> Welcome, {user.name || 'Administrator'}!</h1>
            <p>Administration Dashboard - Care Connect</p>
          </WelcomeText>
        </WelcomeSection>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </LogoutButton>
      </DashboardHeader>

      <DashboardContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SearchSection>
          <SearchInput
            type="text"
            placeholder="Search patients by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </FilterSelect>
        </SearchSection>

        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Total Patients</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatNumber>{stats.active}</StatNumber>
            <StatLabel>Active Patients</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <StatNumber>{stats.inactive}</StatNumber>
            <StatLabel>Inactive Patients</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <StatNumber>{stats.new}</StatNumber>
            <StatLabel>New This Month</StatLabel>
          </StatCard>
        </StatsGrid>

        <PatientsGrid>
          {filteredPatients.map((patient, index) => (
            <PatientCard
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PatientHeader>
                <PatientAvatar>
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </PatientAvatar>
                <PatientInfo>
                  <PatientName>{patient.name}</PatientName>
                  <PatientDetails>
                    {patient.gender} • {patient.dateOfBirth ? new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear() : 'N/A'} years
                  </PatientDetails>
                </PatientInfo>
              </PatientHeader>

              <InfoSection>
                <InfoTitle>
                  <FaMapMarkerAlt /> Address
                </InfoTitle>
                <ContactInfo>
                  <ContactItem>
                    <FaMapMarkerAlt />
                    {patient.address || 'Address not provided'}
                  </ContactItem>
                </ContactInfo>
              </InfoSection>

              <InfoSection>
                <InfoTitle>
                  <FaPhone /> Contact Information
                </InfoTitle>
                <ContactInfo>
                  <ContactItem>
                    <FaPhone />
                    {patient.phone}
                  </ContactItem>
                  <ContactItem>
                    <FaEnvelope />
                    {patient.email}
                  </ContactItem>
                </ContactInfo>
              </InfoSection>

              <InfoSection>
                <InfoTitle>
                  <FaIdCard /> Insurance
                </InfoTitle>
                <ContactInfo>
                  <ContactItem>
                    Provider: {patient.insuranceProvider || 'Not specified'}
                  </ContactItem>
                  <ContactItem>
                    Policy: {patient.insuranceNumber || 'Not specified'}
                  </ContactItem>
                </ContactInfo>
              </InfoSection>

              <InfoSection>
                <InfoTitle>
                  <FaHeartbeat /> Medical Information
                </InfoTitle>
                <InfoList>
                  {patient.conditions?.map((condition, idx) => (
                    <InfoTag key={idx}>{condition}</InfoTag>
                  )) || <InfoTag>No conditions listed</InfoTag>}
                </InfoList>
              </InfoSection>

              <InfoSection>
                <InfoTitle>
                  <FaPills /> Current Medications
                </InfoTitle>
                <InfoList>
                  {patient.currentMedications?.map((med, idx) => (
                    <InfoTag key={idx}>{med}</InfoTag>
                  )) || <InfoTag>No medications</InfoTag>}
                </InfoList>
              </InfoSection>
            </PatientCard>
          ))}
        </PatientsGrid>

        {filteredPatients.length === 0 && (
          <EmptyState>
            <h2>No patients found</h2>
            <p>Try adjusting your search criteria or filters.</p>
          </EmptyState>
        )}
      </DashboardContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;