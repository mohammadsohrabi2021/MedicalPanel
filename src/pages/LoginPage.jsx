import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import {  ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import backgroundImage from '../assets/images/image.png';  // فرض بر این است که تصویر پزشک به این شکل ذخیره شده است.
import logo from '../assets/images/logo.png';  // لوگوی سیستم

const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  flex: 1;
  @media (max-width: 767px) {
    display: none;  // مخفی کردن عکس در صفحات با عرض کمتر از 768 پیکسل
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
`;

const LoginForm = styled(Box)`
  width: 100%;
  max-width: 320px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
`;

const Logo = styled('img')`
  display: block;
  margin: 0 auto 20px;
  width: 20%;  // Adjust the size based on your actual logo
`;

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('لطفاً همه فیلدها را پر کنید');
      return;
    }
    toast.success(`خوش آمدید، ${email}!`, {
        position: "top-center",
        autoClose: 5000, // تعیین مدت زمان نمایش پیغام
        hideProgressBar: false,
        closeOnClick: true,
        onClose: () => navigate('/dashboard'), // هدایت کاربر به داشبورد پس از بسته شدن توست
        draggable: true,
        progress: undefined,
      });
  };

  return (
    <LoginPageContainer>
       <ToastContainer />
      <LeftPanel />
      <RightPanel>
        <LoginForm>
          <Logo src={logo} alt="MediGraph Logo" />
          <Typography variant="h5" component="h1" textAlign="center">ورود به سیستم</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="ایمیل" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="رمز عبور" variant="outlined" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={!email || !password} // Disable button if fields are empty
          >
            ورود
          </Button>
          </form>
        </LoginForm>
      </RightPanel>
    </LoginPageContainer>
  );
}

export default LoginPage;
