import { useEffect, useState } from "react";
import { db } from "../services/config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  isCompleted: boolean;
}

const TodoDetails = ({}: Props) => {
  const [todo, setTodo] = useState<Todo>();
  const [editable, setEditable] = useState(false);
  const [subject, setSubject] = useState("");
  const [doneFetch, setDoneFetch] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
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
          isCompleted: docSnap.data().completed as boolean,
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
            isCompleted: docSnapshot.data().completed as boolean,
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
      setIsCompleted(todo.isCompleted);
      setDoneFetch(true);
      setEditable(true);
    }
  };
  
  const handleUndo = async (id: string) => {
    const subject = localStorage.getItem('subject');
    const isCompleted = localStorage.getItem('isCompleted') === "True"
    ? true : false;
    console.info("subject: " + subject);
    console.info("isCompleted: " + isCompleted);
    setUndoAble(false);
    await updateDoc(doc(db, "todos", id), { subject, isCompleted });
  }

  const handleSave = async (id: string) => {
    setEditable(false);
    setUndoAble(true);
    if (todo) {
      localStorage.setItem('subject', todo.subject);
      localStorage.setItem('isCompleted', todo.isCompleted ? "True" : "False");
    }


    await updateDoc(doc(db, "todos", id), { subject, isCompleted });
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
          checked={doneFetch ? isCompleted : todo.isCompleted}
          disabled={!editable}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        {isCompleted ? "Yes" : "No"}
        </>
        :
        <>
        <input
          type="checkbox"
          id="completed"
          checked={todo.isCompleted}
          disabled={!editable}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        {todo.isCompleted ? "Yes" : "No"}
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
      onClick={() => navigate("/todos")}>Back to Todos</Button>
    </div>
  );
};

export default TodoDetails;
