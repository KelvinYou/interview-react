import { useEffect, useState } from "react";
import { db } from "../services/config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TODOS } from '../constants/routes';

import {
  collection, 
  query,
  onSnapshot,
  doc,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Button } from "@mui/material";

interface Props {}

interface Todo {
  id: string;
  subject: string;
  completed: boolean;
}

const TodoDetails = ({}: Props) => {
  const [todo, setTodo] = useState<Todo>();
  const [editable, setEditable] = useState(false);
  const [subject, setSubject] = useState("");
  const [doneFetch, setDoneFetch] = useState(false);
  const [completed, setIsCompleted] = useState(false);
  const [undoAble, setUndoAble] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // One-time data fetches
    const getTodo = async () => {
      const docRef = doc(collection(db, "todos"), id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTodo({
          id: docSnap.id,
          subject: docSnap.data().subject as string,
          completed: docSnap.data().completed as boolean,
        });
      } else {
        console.log("No such document!");
      }
    };
    // Real time update
    const updateTodo = async () => {
      const docRef = doc(collection(db, 'todos'), id);
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setTodo({
            id: docSnapshot.id,
            subject: docSnapshot.data().subject as string,
            completed: docSnapshot.data().completed as boolean,
          });
        } else {
          console.log('No such document!');
        }
      });
      return () => unsubscribe();
    };

    updateTodo();
  }, [id]);

  const handleEdit = () => {
    if (todo) {
      setSubject(todo.subject);
      setIsCompleted(todo.completed);
      setDoneFetch(true);
      setEditable(true);
    }
  };
  
  const handleUndo = async (id: string) => {
    const subject = localStorage.getItem('subject');
    const completed = localStorage.getItem('completed') === "True"
    ? true : false;
    console.info("subject: " + subject);
    console.info("completed: " + completed);
    setUndoAble(false);
    await updateDoc(doc(db, "todos", id), { subject, completed });
  }

  const handleSave = async (id: string) => {
    setEditable(false);
    setUndoAble(true);
    if (todo) {
      localStorage.setItem('subject', todo.subject);
      localStorage.setItem('completed', todo.completed ? "True" : "False");
    }


    await updateDoc(doc(db, "todos", id), { subject, completed });
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <h1>Todo Details</h1>
      <label htmlFor="subject">Subject:</label>
      { editable?
        <input
        type="text"
        style={{ padding: "20px" }}
        id="subject"
        value={doneFetch ? subject : todo.subject}
        onChange={(e) => setSubject(e.target.value)}
        disabled={!editable}
      />
      :
      <input
        type="text"
        style={{ padding: "20px" }}
        id="subject"
        value={todo.subject}
        onChange={(e) => setSubject(e.target.value)}
        disabled={!editable}
      />
      }
      
      <br/>
      <label htmlFor="completed">
        Completed:
        {editable?
        <>
        <input
          type="checkbox"
          id="completed"
          checked={doneFetch ? completed : todo.completed}
          disabled={!editable}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        {completed ? "Yes" : "No"}
        </>
        :
        <>
        <input
          type="checkbox"
          id="completed"
          checked={todo.completed}
          disabled={!editable}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        {todo.completed ? "Yes" : "No"}
        </>
        
        }
        
      </label>
      <br/>
      {editable?
        <>
          <Button variant="contained"
            onClick={ () => handleSave(todo.id) }>
            Save</Button>
        </> 
        :
        <>
          <Button variant="contained"
          onClick={ handleEdit }>Edit</Button>
        </>
      }
      <br/>
      {
        undoAble ?
        <Button variant="contained"
        onClick={ () => handleUndo(todo.id) }>Undo Edit</Button>
        :
        <></>
      }
      

      <br/>

      <Button variant="contained"
      onClick={() => navigate(TODOS)}>Back to Todos</Button>
    </div>
  );
};

export default TodoDetails;
