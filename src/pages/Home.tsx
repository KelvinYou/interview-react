import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <br/>
      <br/>
      <Button variant='contained'
      onClick={() => { navigate("/mobile_form") }}>Beginner</Button>
      <br/>
      <br/>

      <Button variant='contained'
      onClick={() => { navigate("/even_array") }}>Inter</Button>
      <br/>
      <br/>

      <Button variant='contained'
      onClick={() => { navigate("/todos") }}>Advance</Button>

      <div>Interviewee: Kelvin</div>
      <div>Start at: 2.08pm</div>
      <div>Done at: 4.49pm</div>
    </div>
  )
}

export default Home