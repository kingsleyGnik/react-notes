import { useEffect, useState } from 'react';
import { BrowserRouter as Router, json, Route, Routes } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Write from './components/write/Write';
import Notes from './components/notes/Notes';
import './App.css';
import "./"
import Archive from './components/homepage/Archive';

function App() {
  const [user, setUser] = useState({})
  const [seachStr, setSearchStr] = useState('ddd')
  const handleSeachStr = (str) => {
    setSearchStr(str)
  }

  useEffect(()=>{
    var user = JSON.parse(localStorage.getItem("user"))
    setUser(user)
  }, [])


  return (
    <Router>
      <Navbar userData ={user} handleSeachStr = {handleSeachStr} seachStr={seachStr}></Navbar>
      <Routes>
        <Route path="/" element={user ? <Notes  searchStr={seachStr} /> : <Register ></Register>} />
        <Route path="/notes" element={user ? <Notes  searchStr={seachStr} /> : <Register ></Register>} />
        <Route path="/register" element={user ? <Register /> : <Register />} />
        <Route path="/login" element={user ? <Login /> : <Login />} />
        <Route path="/archive" element={user ? <Archive /> : <Archive />} />
        <Route path="/write/:noteId" element={user ? <Write /> : <Write />} />
      </Routes>
    </Router>
  );
}

export default App;
