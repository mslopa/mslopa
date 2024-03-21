import React, { useState } from 'react';
import ToolBar  from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import {IconButton, Typography,  styled} from '@mui/material';
import makeStyles from '@emotion/styled';
import Groups2Icon from '@mui/icons-material/Groups2';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import './JoinRoom';

import './css/header.css';


const Container = styled(AppBar)`

      background: #9900cc;
      height: 9vh;
`
const useStyles = makeStyles((theme) => ({

        title: {

              display: 'flex',
             justifyContent: 'flex-end',
              padding: '10px'              

        },
}));


const  Header = () =>
{
  const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

function handleFormSubmit (e) {
  // Add your form submission logic here
  e.preventDefault();
};
    // const logo = ""; /*<img src = {logo}   alt=""/>  */

const classes = useStyles();
  return (
       <Container>
        <ToolBar className="toolbar">
         <div className= "icon">
          <Link to= "/JoinRoom">
          <IconButton>
           <Groups2Icon />
           
          </IconButton>
          </Link>
          <IconButton>
            <ContentPasteIcon/>
          </IconButton>
          <IconButton>
             <ChatIcon/>
          </IconButton>
          <IconButton>
             <SettingsIcon variant="outlined" onClick={handleClickOpen}/>
          </IconButton>
          <Dialog 
          open={open} 
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}>
        <DialogTitle>Setting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Your form components go here */}
            {/* Example: */}
            <label>Language</label>
            <select className='languageField' id="language">
                 <option>Python</option>
                 <option>Cpp</option>
                 <option>Java</option>
            </select>
            <br></br>
            <label>Mode</label>
            <select>
                 <option>black</option>
                 <option>White</option>
            </select>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit">Apply</Button>
        </DialogActions>
      </Dialog>
      </div>
        </ToolBar> 
        </Container>
  )
}

export default Header;