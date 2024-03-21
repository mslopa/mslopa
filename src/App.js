import logo from './logo.svg';
import React from 'react';
import './App.css';
import Mainpage from './components/Mainpage';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Setting from './components/pop/Setting';
import Whiteboard  from './components/Whiteboard';
import Axios from "axios";
import JoinRoom from './components/JoinRoom';


function App() {
  return (
   
   <div>

        
           <Router>
           <Routes>
           <Route path="/" element={<Mainpage/>} />
            <Route path = "/Whiteboard" element={<Whiteboard />}/>
            <Route path = "/JoinRoom" element={<JoinRoom />}/>
           </Routes>
           </Router>
    </div>
  );
}

export default App;
