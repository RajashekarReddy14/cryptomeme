import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import "./styles.css";

function SelectDays({ days, handleDaysChange, noPTag }) {
  const handleButtonClick = (value) => {
    handleDaysChange(value);
  };

  return (
    <div className="select-days" style={{ marginBottom: noPTag && "0" }}>
      <Stack spacing={1} direction="row">
        {[7, 30, 60, 90, 120, 365].map((value) => (
          <Button
            key={value}
            variant={days === value ? 'contained' : 'text'}
            onClick={() => handleButtonClick(value)}
            sx={{
              color: days === value ? 'white' : '#6F7177', 
              borderColor: days === value ? undefined : 'black', 
              '&:hover': {
                borderColor: 'black',
              },
            }}
          >
            {value === 365 ? '1Y' : `${value}D`}
          </Button>
        ))}
      </Stack>
    </div>
  );
}

export default SelectDays;
