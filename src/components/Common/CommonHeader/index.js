import React, { useState } from "react";
import "./styles.css";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function CommonHeader() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSettingsClick = (e) => {
    e.preventDefault(); 
    setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="headersub">
      <div className="linkssub">
        <a href="/">
          <p className="linksub">Summary</p>
        </a>
        <a href="/coin/bitcoin">
          <p className="linksub">Chart</p>
        </a>
        <a href="/watchlist">
          <p className="linksub">Statistics</p>
        </a>
        <a href="/" onClick={handleSettingsClick}>
          <p className="linksub">Analysis</p>
        </a>
        <a href="/" onClick={handleSettingsClick}>
          <p className="linksub">Settings</p>
        </a>
      </div>
      {showAlert && (
        <Stack >
          <Alert severity="info">Coming Soon</Alert>
        </Stack>
      )}
    </div>
  );
}

export default CommonHeader;
