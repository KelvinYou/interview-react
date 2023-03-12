import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DETAIL } from '../constants/routes';

const NameIC = () => {
  const [name, setName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [icNumberError, setIcNumberError] = useState('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    console.info("name: " + value);
  };

  const handleIcNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIcNumber(value);
    console.info("icNumber: " + value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNameError("");
    setIcNumberError("");

    if (!name) {
      setNameError("Name cannot be blank");
    }

    if (!icNumber) {
      setIcNumberError("icNumber cannot be blank");
    }

    if (name && icNumber) {
      localStorage.setItem('name', name);
      localStorage.setItem('icNumber', icNumber);
      navigate(DETAIL);
    }
    
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h1>Hello</h1>

      <div>Enter your name: </div>
      <input
        type="text"
        value={name}
        onChange={handleName}
        placeholder="Enter name"
      />
      <div style={{ color: "red"}}>
        {nameError && <p>{nameError}</p>}
      </div>
      <br />
      <div>Enter your ic number: </div>

      <input
        type="text"
        value={icNumber}
        onChange={handleIcNumber}
        placeholder="Enter IC number"
      />
      <div style={{ color: "red"}}>
        {icNumberError && <p>{icNumberError}</p>}
      </div>
      <br/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default NameIC