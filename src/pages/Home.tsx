import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { MOBILE_FORM, EVEN_ARRAY, TODOS } from '../constants/routes';

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
      onClick={() => { navigate(MOBILE_FORM) }}>Beginner</Button>
      <br/>
      <br/>

      <Button variant='contained'
      onClick={() => { navigate(EVEN_ARRAY) }}>Inter</Button>
      <br/>
      <br/>

      <Button variant='contained'
      onClick={() => { navigate(TODOS) }}>Advance</Button>
      <br/>
      <br/>
      <br/>

      <div>Interviewee: Kelvin You</div>
      <div>Start at: 2.08pm</div>
      <div>Done at: 4.49pm</div>
      <div>Pushed to github at: 4.51pm</div>
      <div>github: <a href="https://github.com/KelvinYou/interview-react" target="_blank">https://github.com/KelvinYou/interview-react</a></div>
      <div>Deploy at: 4.52pm</div>
      <div>link: <a href="https://interview-react-orcin.vercel.app/" target="_blank">https://interview-react-orcin.vercel.app/</a></div>
      <div>Submit to HOD at: 4.57pm</div>
    </div>
  )
}

export default Home