import React, { useEffect, useState } from 'react';
import { db } from "../services/config";
import { Link, useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ViewAgendaOutlined from "@mui/icons-material/ViewAgendaOutlined";

import { Box, TextField, Button, Grid } from "@mui/material";
import { HOME, TODO_DETAILS_PATH } from '../constants/routes';

import {
  collection, 
  query,
  onSnapshot,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

interface Props {}

interface Todo {
  id: string;
  subject: string;
  completed: boolean;
}

const ToDos = () => {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const addSubmit = async () => {
    console.info("add: " + subject);
    if (subject !== "") {
      await addDoc(collection(db, "todos"), {
        subject,
        completed: false,
      });
      setSubject("");
    }
  }

  const updateTodo = async (id: string, completed: boolean) => {
    const userDoc = doc(db, "todos", id);
    const newFields = { completed: !completed };
    await updateDoc(userDoc, newFields);
  };

  const deleteTodo = async (id: string) => {
    const userDoc = doc(db, "todos", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const updatedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        subject: doc.data().subject as string,
        completed: doc.data().completed as boolean,
      }));
      setTodos(updatedTodos);
    });
    return unsubscribe;
  }, []);

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <br/><br/>
      <Button variant="contained" onClick={ () => navigate(HOME) }>Back to Home</Button>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        width={"90vw"}
        maxWidth={"600px"}
        boxShadow={2}
        margin={3}
      >
        <TextField 
          error={false}
          fullWidth 
          id="outlined-search" 
          label="New To Do" 
          type="search" 
          placeholder='what do you want to do?'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <Button 
          onClick={ addSubmit }
          fullWidth
          color='primary'
        >
          Add-Todo
        </Button>
      </Box>

      {todos.map((todo) => {
        return (
          <Box
            key={todo.id}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            boxShadow={2}
            margin={3}
            bgcolor="lightgray"
            width={"90vw"}
            maxWidth={"600px"}
          >
            <h1>{todo.subject}</h1>
            <p>{todo.completed ? "Completed" : "Haven't Complete"}</p>
            <Grid
              container spacing={3}
            >
              <Grid item xs>
                <Button variant='contained'
                  fullWidth
                  color='primary'
                  onClick={ () => navigate(TODO_DETAILS_PATH.replace(':id', todo.id)) }
                >
                  View {" "}
                  <ViewAgendaOutlined />
                </Button>
              </Grid>

              <Grid item xs>

                <Button variant='contained'
                  onClick={() => {
                    updateTodo(todo.id, todo.completed);
                  }}
                  fullWidth
                  color='primary'
                >
                  {todo.completed ? "Set Incomplete" : "Set Complete"} {" "}
                  <EditIcon />
                </Button>
              </Grid>

              <Grid item xs>

                <Button variant='contained'
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                  fullWidth
                  color='primary'
                >
                  Delete {" "}
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          </Box>
        )
      })}
    </div>
    
  )
}

export default ToDos