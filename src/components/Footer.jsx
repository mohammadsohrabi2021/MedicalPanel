import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

const FooterContainer = styled(Box)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #eeeeee;
  text-align: center;
  padding: 10px;
`;

function Footer() {
  return (
    <FooterContainer>
      <Typography fontFamily={'iran-sans'} fontSize={'14px'}>
        © 2024 پنل پزشکی. همه حقوق محفوظ است.
      </Typography>
    </FooterContainer>
  );
}

export default Footer;
