import React, { useState, useEffect } from 'react';
import { Container, Box, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import PatientsGrid from '../components/PatientsGrid';
import AddPatientModal from '../components/AddPatientModal';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 64px; // ارتفاع تاپ بار
  transition: margin-right 0.3s ease; // انیمیشن برای تغییر موقعیت
  margin-right: ${({ sidebarOpen }) => (sidebarOpen ? '240px' : '0')};
`;

const Content = styled(Box)`
  flex-grow: 1;
  padding: 20px;
  border-radius: 10px;
  margin-top: 60px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  background-color: #f4f4f4;
  transition: margin-right 0.3s ease; // انیمیشن برای تغییر موقعیت
  margin-right: ${({ sidebarOpen }) => (sidebarOpen ? '240px' : '0')};
`;

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);

  const addPatient = (newPatient) => {
    setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true); // باز کردن سایدبار در دسکتاپ به‌صورت پیش‌فرض
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <TopBar onMenuClick={toggleSidebar} />
      <StyledContainer maxWidth="false" sidebarOpen={isSidebarOpen}>
        <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />
        <Content sidebarOpen={isSidebarOpen}>
          <Button sx={{marginBottom:'30px'}} variant='contained' onClick={() => setIsModalOpen(true)}>افزودن بیمار جدید</Button>
          <PatientsGrid patients={patients} />
          <Footer />
        </Content>
      </StyledContainer>
      <AddPatientModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onAddPatient={addPatient} />
    </>
  );
}

export default Dashboard;
