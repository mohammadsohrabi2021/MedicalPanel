import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled, { withTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
const StyledAppBar = styled(AppBar)`
  z-index: ${({ theme }) => theme.zIndex + 1};
`;

const StyledButton = styled(Button)`
  && {
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.4s, background-color 0.4s, border-color 0.4s;
  }

  &&::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 300%;
    height: 300%;
    background-color: rgba(211, 47, 47, 0.1);
    transition: transform 0.4s;
    z-index: -1;
    transform: translateX(-50%) translateY(-50%) scale(0);
  }

  &&:hover::before {
    transform: translateX(-50%) translateY(-50%) scale(1);
  }

  &&:hover {
    color: ${({ theme }) => theme.palette?.error?.main || "red"};
    border-color: ${({ theme }) => theme.palette?.error?.main || "red"};
  }
`;

const CustomDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 15px;
    padding: 20px;
  }
`;

function TopBar({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            fontFamily={"iran-sans"}
            fontWeight={"bold"}
            noWrap
            sx={{ flexGrow: 1 }}
          >
            پنل پزشکی
          </Typography>
          <StyledButton
            variant="contained"
            sx={{ color: "#fff", border: "1px solid #fff" }}
            fontFamily={"iran-sans"}
            fontWeight={"bold"}
            onClick={handleLogoutClick}
          >
            <Typography fontFamily={"iran-sans"} fontSize={"12px"}>
              خروج{" "}
            </Typography>{" "}
            <LogoutIcon />
          </StyledButton>
        </Toolbar>
      </StyledAppBar>

      <CustomDialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center", fontWeight: "bold",fontFamily:"iran-sans" }}>
          تأیید خروج
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ textAlign: "center", marginBottom: "20px" ,fontFamily:"iran-sans"}}
          >
            آیا مطمئن هستید که می‌خواهید از حساب خود خارج شوید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center",gap:'40px' }}>
          <Button onClick={handleClose} variant="contained" color="secondary">
            لغو
          </Button>
          <Button
            onClick={handleConfirmLogout}
            variant="contained"
            color="error"
            autoFocus
          >
            تأیید
          </Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
}

export default withTheme(TopBar);
