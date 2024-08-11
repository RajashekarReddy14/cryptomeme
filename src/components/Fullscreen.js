import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import LineChart from './CoinPage/LineChart';
import OpenInNew from '@mui/icons-material/OpenInNew';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose, chartData ,onClick}) {
  return (
    <React.Fragment>
    <Button 
      variant="text" 
      onClick={onClick} 
      startDecorator={<OpenInNew />} 
      style={{ color: '#B2BEB5', fontWeight:'bold' }} 
    >
      FullScreen
    </Button>

    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Chart
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: 'calc(100% - 64px)', width: '100%' }}>
        <LineChart chartData={chartData} />
      </div>
    </Dialog>
    </React.Fragment>
  );
}
