import React, { useState, useEffect } from "react";
import { Drawer, Grid, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ReportIcon from "@mui/icons-material/Report";
import { useNavigate } from "react-router-dom";
import logo from '../assets/images/images.png'
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
  font-family: "iran-sans", sans-serif;
`;

const StyledListItem = styled.li`
  padding: 20px 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  transition: background-color 0.3s ease;
  background-color: ${({ selected }) => (selected ? "#e0f7fa" : "transparent")};
  &:hover {
    background-color: #b2ebf2;
  }
  &:active {
    background-color: #80deea;
  }
`;

function Sidebar({ open, onClose }) {
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const navigate = useNavigate();

  const handleItemClick = (item, path) => {
    setSelectedItem(item);
    navigate(path);
  };

  useEffect(() => {
    // Set the default selected item to 'dashboard'
    handleItemClick("dashboard", "/dashboard");
  }, []);
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <StyledDrawer
      variant={open ? "persistent" : "temporary"}
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // بهتر کردن عملکرد در موبایل
      }}
    >
      <Grid pt={2} textAlign={'center'}>
      <img src={logo} style={{width:'50%'}} alt="logo" />
      </Grid>
     
      {matches ? (
        <StyledList>
          <StyledListItem
            selected={selectedItem === "dashboard"}
            onClick={() => {
              handleItemClick("dashboard", "/dashboard");
            }}
          >
            <DashboardIcon /> داشبورد
          </StyledListItem>
          <StyledListItem
            selected={selectedItem === "patients"}
            onClick={() => {
              handleItemClick("patients", "/dashboard/patients");
            }}
          >
            <RecentActorsIcon /> لیست بیماران
          </StyledListItem>
          <StyledListItem
            selected={selectedItem === "reports"}
            onClick={() => {
              handleItemClick("reports", "/dashboard/reports");
            }}
          >
            <ReportIcon /> گزارش‌ها
          </StyledListItem>
        </StyledList>
      ) : (
        <StyledList>
          <StyledListItem
            selected={selectedItem === "dashboard"}
            onClick={() => {
              handleItemClick("dashboard", "/dashboard");
              onClose(); // بستن سایدبار
            }}
          >
            <DashboardIcon /> داشبورد
          </StyledListItem>
          <StyledListItem
            selected={selectedItem === "patients"}
            onClick={() => {
              handleItemClick("patients", "/dashboard/patients");
              onClose(); // بستن سایدبار
            }}
          >
            <RecentActorsIcon /> لیست بیماران
          </StyledListItem>
          <StyledListItem
            selected={selectedItem === "reports"}
            onClick={() => {
              handleItemClick("reports", "/dashboard/reports");
              onClose(); // بستن سایدبار
            }}
          >
            <ReportIcon /> گزارش‌ها
          </StyledListItem>
        </StyledList>
      )}
    </StyledDrawer>
  );
}

export default Sidebar;
