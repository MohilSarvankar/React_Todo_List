import './App.css';
import Header from './MyComponents/Header';
import { Footer } from './MyComponents/Footer';
import { Todos } from './MyComponents/Todos';
import React, { useState, useEffect } from 'react';
import { AddTodo } from './MyComponents/AddTodo';
import { About } from './MyComponents/About';
import RandomTodo from './MyComponents/RandomTodo';
import Error from './MyComponents/Error';
import Alert from './MyComponents/Alert';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignUp from './MyComponents/SignUp';
import Login from './MyComponents/Login';

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"))
  }

  let myStyle = {
    minHeight: "70vh"
  }

  const [logState, setLogState] = useState(false);

  const logger = (msg) => {
    if(logState){
      console.log(msg);
    }
  }

  const addTodo = (title, desc) => {
    logger("I am adding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 1;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    logger(myTodo);
  }

  const onDelete = (todo) => {
    logger("This is to be deleted",todo);
    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [auth, setAuth] = useState(false);

  const [alert, setAlert] = useState(null);

  const showAlert = (msg,type) => {
    setAlert({
      msg: msg,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <BrowserRouter>
        <Header title={"My TODOs List"} searchbar={false} auth={auth} setAuth={setAuth} logState={logState} setLogState={setLogState}/>
        <Alert alert={alert}/>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login"/>} />
          <Route exact path="/login" element={<Login myStyle={myStyle} setAuth={setAuth} showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<SignUp myStyle={myStyle} showAlert={showAlert}/>} />
          <Route exact path="/home" element={<AddTodo addTodo={addTodo} myStyle={myStyle} showAlert={showAlert}/>} />
          <Route exact path="/todos/*" element={<Todos todos={todos} myStyle={myStyle} onDelete={onDelete} />} />
          <Route exact path="/randomTodo" element={<RandomTodo todos={todos} myStyle={myStyle} onDelete={onDelete} />} />
          <Route exact path="/about" element={<About myStyle={myStyle} />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
