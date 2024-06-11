import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import styled from 'styled-components';

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 240px;
    box-sizing: border-box;
    top: 64px; /* فاصله از بالای صفحه به اندازه ارتفاع تاپ‌بار */
    height: calc(100% - 64px); /* ارتفاع کامل منهای ارتفاع تاپ‌بار */
    right: 0;
    left: auto;
    direction: rtl; /* جهت‌گیری از راست به چپ */
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'iran-sans', sans-serif;
`;

const StyledListItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${({ selected }) => (selected ? '#e0f7fa' : 'transparent')};
  &:hover {
    background-color: #b2ebf2;
  }
  &:active {
    background-color: #80deea;
  }
`;

function Sidebar({ open, onClose }) {
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <StyledDrawer
      variant={open ? 'persistent' : 'temporary'}
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // بهتر کردن عملکرد در موبایل
      }}
    >
      <StyledList>
        <StyledListItem
          selected={selectedItem === 'dashboard'}
          onClick={() => handleItemClick('dashboard')}
        >
          داشبورد
        </StyledListItem>
        <StyledListItem
          selected={selectedItem === 'patients'}
          onClick={() => handleItemClick('patients')}
        >
          لیست بیماران
        </StyledListItem>
        <StyledListItem
          selected={selectedItem === 'reports'}
          onClick={() => handleItemClick('reports')}
        >
          گزارش‌ها
        </StyledListItem>
      </StyledList>
    </StyledDrawer>
  );
}

export default Sidebar;

