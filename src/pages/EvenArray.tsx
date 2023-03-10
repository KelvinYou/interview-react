import React from 'react';

import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
type ArrayNum = {
  [key: string]: number[]
};

var kelvin: ArrayNum = {
  array1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  array2: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  array3: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  array4: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  array5: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
};


const EvenArray = () => {
  const navigate = useNavigate();

  const allValues = [];
  for (const key in kelvin) {
    if (kelvin.hasOwnProperty(key)) {
      for (const element of kelvin[key]) {
        allValues.push(element);
      }
    }
  }

  const input = allValues
    .map((value, index) => ((index) % 10 === 0) ? `\n${value}` : `${value}`)
    .join(", ");

  const evenValues = [];
  for (const key in kelvin) {
    if (kelvin.hasOwnProperty(key)) {
      for (const element of kelvin[key]) {
        if (element % 2 === 0) {
          evenValues.push(element);
        }
      }
    }
  }

  const output = evenValues.join(', ');

  return (
    <div style={{ marginLeft: "50px" }}>
      <h1>Even Values By Kelvin</h1>

      <h3>Input: </h3>
      <pre>{input}</pre>

      <h3>Output with for loop: </h3>
      <p>{output}</p>

      <h3>Output with map: </h3>
      <p>
        {
          Object.values(kelvin)
          .map((array) => array.filter((element) => element % 2 === 0))
          .flat().join(", ")
        }
      </p>


      <Button variant='contained' onClick={ () => {
        navigate("/");
      } }>Back to Home</Button>
    </div>
  );
}

export default EvenArray