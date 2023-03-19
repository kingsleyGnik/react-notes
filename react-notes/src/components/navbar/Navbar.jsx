import React, { useState } from 'react'
import "./navbar.css"
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



export default function Navbar({ userData, handleSeachStr }) {
  const [user, setUser] = useState(userData)
  const [dropDownExpand, setDropDownExpand] = useState(false)
  const [str, setStr] = useState('')

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const handleLogout = (e) => {
    e.preventDefault()
    setUser(null)
    localStorage.removeItem("user")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">
            REACT-NOTE
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/archive">
                  ARCHIVE
                </Link>
              </li>
              {user ? (<li className="nav-item" onClick={(e) => handleLogout(e)}>
                <Link className="nav-link" to="/login">
                  LOGOUT
                </Link>
              </li>) : (<li className="nav-item" onClick={(e) => handleLogout(e)}>
                <Link className="nav-link" to="/login">
                  LOGIN
                </Link>
              </li>)}
              
            </ul>

            {/* <div>
                <Box sx={{ minWidth: 10 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div> */}
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" defaultValue={str} value={str} onChange={(e) => { setStr(e.target.value); handleSeachStr(e.target.value) }} />
              <button className="btn btn-outline-success" type="submit" onClick={(e) => {
                e.preventDefault();
                console.log("str value", str);
                handleSeachStr(str)
              }}>Search</button>
            </form>
          </div>
        </div>
      </nav></>


  )
}

