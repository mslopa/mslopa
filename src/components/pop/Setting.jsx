import React from 'react'
import { Button, Dialog, DialogActions, FormControl, Stack, TextField } from "@mui/material"
import './setting.css'
import Settings from '@mui/icons-material/Settings'
const Setting = () => 
{
    return(
           
     <div class="container">
     <div class="card">
       <h2>Login</h2>
       <form>
         <input type="text" id="username" name="username" placeholder="Language" required></input>
         <input type="password" id="password" name="password" placeholder="Theme" required></input>
         <input type="text" id="username" name="username" placeholder="style_of_alphabets" required></input>
         <input type="password" id="password" name="password" placeholder="Theme" required></input>
         <div class="drop_down"></div>
         <button type="submit">Apply</button>
       </form>
     </div>
   </div>

    )

}
export default Setting