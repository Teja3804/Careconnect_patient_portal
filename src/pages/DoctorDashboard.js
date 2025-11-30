import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaStethoscope, FaPills, FaChartLine, FaSignOutAlt, FaBars, FaTimes, FaHeartbeat, FaThermometerHalf, FaWeight, FaEye, FaUserMd } from 'react-icons/fa';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)),
    url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
`;

const Sidebar = styled.div`
  width: 320px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-right: 2px solid rgba(33, 150, 243, 0.2);
  padding: 1.5rem;
  overflow-y: auto;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    width: 300px;
  }
  
  @media (min-width: 769px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #7f8c8d;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const PatientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const PatientItem = styled(motion.div)`
  padding: 1.2rem;
  background: ${props => props.isActive ? 'rgba(52, 152, 219, 0.15)' : 'rgba(255, 255, 255, 0.8)'};
  border: 2px solid ${props => props.isActive ? 'rgba(52, 152, 219, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isActive ? '0 4px 15px rgba(52, 152, 219, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    background: rgba(52, 152, 219, 0.1);
    border-color: rgba(52, 152, 219, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.2);
  }
`;

const PatientName = styled.h3`
  color: #2c3e50;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`;

const PatientInfo = styled.p`
  color: #7f8c8d;
  font-size: 0.8rem;
  margin: 0;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #2c3e50;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const WelcomeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const UserIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #2196F3, #1976D2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
`;

const WelcomeMessage = styled.h1`
  color: #2c3e50;
  font-size: 1.8rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
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

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const PatientDetails = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const PatientHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(52, 152, 219, 0.2);
`;

const PatientAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const PatientTitle = styled.h2`
  color: #2c3e50;
  margin: 0;
  font-size: 1.8rem;
`;

const PatientSubtitle = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const InfoLabel = styled.div`
  color: #7f8c8d;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 500;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled(motion.li)`
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(52, 152, 219, 0.1);
    border-color: rgba(52, 152, 219, 0.3);
  }
`;

const AISuggestions = styled.div`
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.1));
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const AITitle = styled.h4`
  color: #27ae60;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AIText = styled.p`
  color: #2c3e50;
  margin: 0;
  line-height: 1.6;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      console.log('Fetching patients for doctor:', user.id);
      // Try to fetch patients filtered by doctor's specialization first
      const response = await fetch(`/api/patients/doctor/${user.id}`);
      const data = await response.json();
      console.log('Patients response:', data);
      
      if (data.success && data.data.length > 0) {
        setPatients(data.data);
        setSelectedPatient(data.data[0]);
      } else {
        // Fallback: fetch all patients if filtered endpoint returns no results
        console.log('No filtered patients found, fetching all patients...');
        const allResponse = await fetch('/api/patients');
        const allData = await allResponse.json();
        if (allData.success) {
          setPatients(allData.data);
          if (allData.data.length > 0) {
            setSelectedPatient(allData.data[0]);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Fallback: try to fetch all patients
      try {
        const allResponse = await fetch('/api/patients');
        const allData = await allResponse.json();
        if (allData.success) {
          setPatients(allData.data);
          if (allData.data.length > 0) {
            setSelectedPatient(allData.data[0]);
          }
        }
      } catch (fallbackError) {
        console.error('Fallback fetch also failed:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const generateAISuggestions = (patient) => {
    if (!patient.testResults) return "No test results available for AI analysis.";
    
    const suggestions = [];
    
    if (patient.testResults.bloodSugar && parseFloat(patient.testResults.bloodSugar) > 126) {
      suggestions.push("• Consider diabetes management plan with diet modification");
    }
    
    if (patient.testResults.bloodPressure && patient.testResults.bloodPressure.includes("150")) {
      suggestions.push("• Monitor blood pressure closely, consider lifestyle changes");
    }
    
    if (patient.testResults.cholesterol && parseFloat(patient.testResults.cholesterol) > 200) {
      suggestions.push("• Recommend cholesterol-lowering diet and exercise");
    }
    
    if (patient.symptoms && patient.symptoms.length > 0) {
      suggestions.push("• Address current symptoms with appropriate treatment plan");
    }
    
    return suggestions.length > 0 ? suggestions.join('\n') : "• Patient appears stable, continue current treatment plan";
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

  return (
    <DashboardContainer>
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>
            <FaUser /> My Patients
          </SidebarTitle>
          <CloseButton onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </CloseButton>
        </SidebarHeader>
        
        <PatientList>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <PatientItem
                key={patient.id}
                isActive={selectedPatient?.id === patient.id}
                onClick={() => setSelectedPatient(patient)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PatientName>{patient.name}</PatientName>
                <PatientInfo>
                  {patient.gender} • {patient.dateOfBirth ? new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear() : 'N/A'} years
                </PatientInfo>
              </PatientItem>
            ))
          ) : (
            <div style={{ 
              padding: '2rem', 
              textAlign: 'center', 
              color: '#7f8c8d',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
              border: '2px dashed rgba(0, 0, 0, 0.1)'
            }}>
              <h3>No patients found</h3>
              <p>No patients match your specialization or there was an error loading patients.</p>
            </div>
          )}
        </PatientList>
      </Sidebar>

      <MainContent>
        <Header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MobileMenuButton onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </MobileMenuButton>
          
          <WelcomeSection>
            <UserIcon>
              <FaUserMd />
            </UserIcon>
            <WelcomeMessage>
              <FaStethoscope /> Welcome, Dr. {user.name || 'Doctor'}
            </WelcomeMessage>
          </WelcomeSection>
          
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </LogoutButton>
        </Header>

        <Content>
          {selectedPatient ? (
            <PatientDetails
              key={selectedPatient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PatientHeader>
                <PatientAvatar>
                  {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                </PatientAvatar>
                <div>
                  <PatientTitle>{selectedPatient.name}</PatientTitle>
                  <PatientSubtitle>
                    {selectedPatient.gender} • {selectedPatient.dateOfBirth ? new Date().getFullYear() - new Date(selectedPatient.dateOfBirth).getFullYear() : 'N/A'} years • {selectedPatient.bloodType}
                  </PatientSubtitle>
                </div>
              </PatientHeader>

              <Section>
                <SectionTitle>
                  <FaHeartbeat /> Current Symptoms
                </SectionTitle>
                <List>
                  {selectedPatient.symptoms?.map((symptom, index) => (
                    <ListItem 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {symptom}
                    </ListItem>
                  )) || <ListItem>No current symptoms reported</ListItem>}
                </List>
              </Section>

              <Section>
                <SectionTitle>
                  <FaChartLine /> Test Results
                </SectionTitle>
                <InfoGrid>
                  {selectedPatient.testResults && Object.entries(selectedPatient.testResults).map(([key, value], index) => (
                    key !== 'lastUpdated' && (
                      <InfoCard 
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <InfoLabel>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</InfoLabel>
                        <InfoValue>{value}</InfoValue>
                      </InfoCard>
                    )
                  ))}
                </InfoGrid>
              </Section>

              <Section>
                <SectionTitle>
                  <FaThermometerHalf /> Vital Signs
                </SectionTitle>
                <InfoGrid>
                  {selectedPatient.vitalSigns && Object.entries(selectedPatient.vitalSigns).map(([key, value], index) => (
                    key !== 'lastUpdated' && (
                      <InfoCard 
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <InfoLabel>{key.toUpperCase()}</InfoLabel>
                        <InfoValue>{value}</InfoValue>
                      </InfoCard>
                    )
                  ))}
                </InfoGrid>
              </Section>

              <Section>
                <SectionTitle>
                  <FaPills /> Current Medications
                </SectionTitle>
                <List>
                  {selectedPatient.currentMedications?.map((medication, index) => (
                    <ListItem 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {medication}
                    </ListItem>
                  )) || <ListItem>No current medications</ListItem>}
                </List>
              </Section>

              <Section>
                <SectionTitle>
                  <FaEye /> Medical History
                </SectionTitle>
                <List>
                  {selectedPatient.medicalHistory?.map((condition, index) => (
                    <ListItem 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {condition}
                    </ListItem>
                  )) || <ListItem>No medical history recorded</ListItem>}
                </List>
              </Section>

              <AISuggestions>
                <AITitle>
                  <FaChartLine /> AI Suggestions
                </AITitle>
                <AIText style={{ whiteSpace: 'pre-line' }}>
                  {generateAISuggestions(selectedPatient)}
                </AIText>
              </AISuggestions>
            </PatientDetails>
          ) : (
            <EmptyState
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2>No Patient Selected</h2>
              <p>Select a patient from the sidebar to view their details.</p>
            </EmptyState>
          )}
        </Content>
      </MainContent>
    </DashboardContainer>
  );
};

export default DoctorDashboard;