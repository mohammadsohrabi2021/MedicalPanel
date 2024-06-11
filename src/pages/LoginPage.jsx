import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, InputAdornment } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import backgroundImage from '../assets/images/image.png'; // فرض بر این است که تصویر پزشک به این شکل ذخیره شده است.
import logo from '../assets/images/logo 2.png'; // لوگوی سیستم
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
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
    display: none; // مخفی کردن عکس در صفحات با عرض کمتر از 768 پیکسل
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
`;

const LoginForm = styled(Box)`
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  background-color: #ffffff; /* Ensure the form has a white background */
`;

const Logo = styled('img')`
  display: block;
  margin: 0 auto 20px;
  width: 25%; /* Adjust the size based on your actual logo */
`;

const WelcomeText = styled(Typography)`
  margin-bottom: 20px;
  text-align: center;
  color: #4a4a4a;
  font-weight: 500;
  font-family: 'iran-sans';
  
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
      position: 'top-center',
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
          <Typography variant="h5" fontFamily={'iran-sans'} component="h1" textAlign="center">
            ورود به سیستم
          </Typography>
          <Typography  fontFamily={'iran-sans'} color={'gray'} textAlign={'center'} px={{xs:0,sm:2}} lineHeight={'30px'} py={1} fontSize={'14px'}>
            به شرکت سایان رایان اکباتان خوش آمدید. لطفاً با وارد کردن ایمیل و رمز عبور خود وارد سیستم شوید.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="ایمیل"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="رمز عبور"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
           
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                  <HttpsIcon />
                </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{marginTop:'20px'}}
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
