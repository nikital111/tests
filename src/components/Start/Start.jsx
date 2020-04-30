import React from 'react';
import { NavLink } from "react-router-dom";
import './Start.css';

function Start() {
  return (
   <div className='start'>
     <NavLink exact to="/create">
       <button>
         Press to start!
       </button>
       </NavLink>
    </div>
  );
}

export default Start;
