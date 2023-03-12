import React, { useState } from 'react';
import OTPTimer from '../components/OTPTimer'
import { useNavigate } from 'react-router-dom';
import { NAME_IC } from '../constants/routes';

const OTPForm = () => {
  const [otpNumber, setOtpNumber] = useState('');
  const navigate = useNavigate();
  const handleOtpNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOtpNumber(value);
    console.info("otp number: " + value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('otpNumber', otpNumber);
    if (otpNumber == "123456")
      navigate(NAME_IC);
    else {
      alert("wrong otp, the otp is 123456");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>OTP = 123456</div>
      <input
        type="tel"
        value={otpNumber}
        onChange={handleOtpNumber}
        placeholder="Enter otp"
      />
      <br/>
      <br/>
      <OTPTimer initialMinutes={5} />
      <br/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default OTPForm