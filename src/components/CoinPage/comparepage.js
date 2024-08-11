import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed

const MyCompareButton = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/compare');
  };

  return (
    <Button variant="text" onClick={handleSettingsClick} style={{ color: '#B2BEB5', fontWeight:'bold' }} >
      Compare
    </Button>
  );
};

export default MyCompareButton;
