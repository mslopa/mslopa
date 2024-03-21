import React,{useState} from 'react';
import {Box, styled} from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Header from './Header';
import AceEditor from "react-ace";
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import '../App.css';
//import socketIOClient from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import {generateColor} from "../utlis";
import {Toaster, toast} from 'react-hot-toast'

const Heading = styled(Box)`

     background: #1d1e22;
     display: 'flex' ;
     padding : 9px 12px;

`;

const Headers = styled(Box)`
    
     display: flex;
     background: #060606;
     color : #AAAEBC;
     justify-content : space-between;
     font-weight : 700;

     `;
const io = require('socket.io')();

io.on('connection', (socket) => {
     console.log('A user connected');})

const  Editer = () => 
{   
     const navigate = useNavigate()
     const {roomId} = useParams()
     const [code, setCode] = useState('');
     const [output, setOutput] = useState('');
     
     const languageAvailable = ["java"

    , "python", "cpp"]
     
     const codeKeyBindingsAvailable = ["default", "emacs", "vim"]
     //const handleSubmit = async() => {
     
     const [language, setLanguage] = useState(() => "javascript")
     const [codeKeyBinding, setCodeKeyBinding] = useState(()=> undefined) 
     const [fetchedUsers,setFetcherdUsers] = useState(()=>["sam"])
     const [fetchedCode, setFetchedCode] = useState
          
     function onCodeChange(newVal) {

          setFetchedCode(newValue)
          socket.emit("update code", {roomId, code: newValue})
          socket.emit("syncing code", {roomId})
     }
     

     function handleLanguageChange(e) {
              
           setLanguage(e.target.value)
           socket.emit("update language ", {roomId, languageUsed:e.target.value})
           socket.emit("syncing the language",{roomId})
     }
     
     function handleCodeKeyBindingChange(e){
          set(e.target.value === "default"? undefined: e.target.value)
     }

     function handleLeave(e){


     }
     

     function generateUserColor(User) {

          let hash =0;
          for (let strIndex = 0; strIndex < user.length; strIndex++)
          {
                 hash = user.charCodeAt(StrIndex) + ((hash << 5) - hash)
          }
          let color = '#';
          for (let index=0 ; index < 3 ; index++)
          {
               let value = (hash >> (index * 8)) & 0xff;
               color += value.toString(16).padStart(2,'0')
          }
     }
     //const payload = {

                  //   language : "python",
                 //    code
              // };
     
     //const {data} = await  axios.post("https://localhost:3000/run", payload)

      // console.log(code)

          //}
     //const runCode = () => {
         // try {
            // Create a new function from the user's code
          //  const func = new Function(code);
            
            // Execute the function
          //  const result = func();
      
            // Set the output to the result of the function
          //  setOutput(result.toString());
         // } catch (error) {
            // If there's an error, set the output to the error message
        //    setOutput(error.toString());
       //   }
      //  };
      useEffect(()=> {

          socket.on("updating client list", ({userlist}) => {
               setFetcherdUsers(userlist)
          })

          socket.on("on language change", ({languageUsed}) =>{

               setLanguage(languageUsed)
          })
          socket.on("on code change", ({code}) =>{
              
               setFetchedCode(code)
          })

          socket.on("new member joined",({username}) => {

               toast(`${username} joined`)
            })

          socket.on("member left", ({username}) => {
                
               toast(`${username} left`)
            })
      },[socket])

   return (
           <Box>
                <Headers>
                <Heading>
                <Box component="span"
                     style= {{

                        background: 'red',
                        height : 20,
                        width : 20,
                        display : 'flex',
                        placeContent : 'center',
                        borderRadius: 5,
                        marginRight: 5,
                        paddingBottom : 2

                     }}
                ></Box>
                   </Heading>
                </Headers>
                <AceEditor
                       className="roomCodeEditor"
                       theme="monokai"
                       keyboardHandler={codeKeyBinding}
                       mode= {language}
                       name="CollabEditor"
                       width="auto"
                       height="auto"
                       fontsize={15}
                       value={fetchedCode}
                       showPrintMargin={true}
                       showGutter={true}
                       tabsize={2}
                       editerProps={{

                         $blockScrolling: true
                       }        }


                       // Adjust width as needed
                  />
                <Toaster/>
                            
                 <button>Run Code</button>
                 <div>
                       <h3>Output:</h3>
                       <pre>{output}</pre> {/* Display the output */}
                </div>
            </Box> 
                 
   )
}
               
export default Editer;