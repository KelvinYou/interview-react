import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MobileForm from '../components/MobileForm';

const mobileForm = () => {
  const handleMobileNumberChange = (mobileNumber: string) => {
    console.log(`Mobile number changed to ${mobileNumber}`);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <MobileForm onMobileNumberChange={handleMobileNumberChange} />
      
    </div>
  );
}

export default mobileForm