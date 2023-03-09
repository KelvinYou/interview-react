import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpNumber, setOtpNumber] = useState('');
  const [name, setName] = useState('');
  const [icNumber, setIcNumber] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('mobileNumber');
    if (storedPhoneNumber) {
      setMobileNumber(storedPhoneNumber);
    }
    const storedOtpNumber = localStorage.getItem('otpNumber');
    if (storedOtpNumber) {
      setOtpNumber(storedOtpNumber);
    }
    const storeName = localStorage.getItem('name');
    if (storeName) {
      setName(storeName);
    }
    const storedIcNumber = localStorage.getItem('icNumber');
    if (storedIcNumber) {
      setIcNumber(storedIcNumber);
    }
  }, []);


  return (
    <>
      <h1>Your submitted details</h1>
      <div>Mobile Number: {mobileNumber}</div>
      <div>OTP: {otpNumber}</div>
      <div>Your Name: {name}</div>
      <div>Your IC Number: {icNumber}</div>

      <br/>
      <button onClick={() => {
        navigate("/");
      }}>Back to Home</button>
    </>
  )
}

export default Detail