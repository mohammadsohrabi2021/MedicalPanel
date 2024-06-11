import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { Box } from '@mui/material';

const Container = styled.div`
  display: flex;
 
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
const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */
  margin:10px 30px;
  padding-top: 64px; // ارتفاع تاپ بار
  transition: margin-right 0.3s ease; // انیمیشن برای تغییر موقعیت
  margin-right: ${({ sidebarOpen }) => (sidebarOpen ? '40px' : '30px')};
`;
const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
          
          <Outlet />
          <Footer />
        </Content>
      </StyledContainer>
     
    </>
  );
};

export default MainLayout;

