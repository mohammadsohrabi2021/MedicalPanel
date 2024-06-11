import React from 'react';
import { Outlet } from 'react-router-dom';

const IdentityLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default IdentityLayout;
