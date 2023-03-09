import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onMobileNumberChange: (mobileNumber: string) => void;
}

const MobileForm: React.FC<Props> = ({ onMobileNumberChange }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const handleMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMobileNumber(value);
    onMobileNumberChange(value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMobileNumberError("");

    if (!mobileNumber) {
      setMobileNumberError("Mobile Number cannot be blank");
    } else {
      localStorage.setItem('mobileNumber', mobileNumber);
      navigate('/otp');
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      Mobile Number: {" "}
      <input
        type="tel"
        value={mobileNumber}
        onChange={handleMobileNumberChange}
        placeholder="Enter your mobile number"
        pattern="[0-9]{3}-[0-9]{3} [0-9]{4}" 
      />
      <div style={{ color: "red"}}>
        {mobileNumberError && <p>{mobileNumberError}</p>}
      </div>
      <br/>
      Format hint: 012-345 6789
      <br/>
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MobileForm;
