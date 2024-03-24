
//const bodyP = require("body-parser")
//app.use(bodyP.json())


//const http = require('http');
//const server = http.createServer(app);

//app.get("/", (req,res) => {

   //  res.sendFile("");
//});

//app.use(express.urlencoded({extended:true}));
//app.use(express.json());

//app.post("/data" , (req,res) => {
    
      // const responseData = req.body;
       // res.send (responseData);
//});

//if(code === undefined)
//{
 //   return res.status(400).json({success:false,error:"Empty code body"})
//}

const express = require('express');
const http = require('http');

const cors = require("cors");
const socketIo = require('socket.io');


const app = express();

app.use(cors())

const server = http.createServer(app);
const io = socketIo(server, {
      
      cors: {
         
        origin: "*",
        methods: ["GET", "POST"]

      }
})

app.get('/', function(req,res) {

  res.send('Hello from the server')
})

const socketID_to_Users_Map = {}
const roomID_to_Code_Map = {}

async function getUsersinRoom(roomid, io) {

  const socketList = await io.in(roomId).allSockets()
  const userlist = []
  socketList.forEach(each => {
      (each in socketID_to_Users_Map) && userlist.push
      (socketID_to_Users_Map[each].username)

  });

  return userlist
}

async function updateUserslistAndCodeMap(io,socket, roomId){

  socket.in(roomId).emit("member left", {username: socketID_to_Users_Map
  [socket.id]})

  delete socketID_to_Users_Map[socket.id]

  const userlist = await getUsersinRoom(roomId,io)

  socket.in(roomId).emit("updating client list", {userlist})

  userlist.length === 0 && delete roomID_to_Code_Map
}

io.on('connection',async function(socket) 
{
  socket.on("when a user joins", async ({username, roomId}) => {
    console.log(username,roomId)
    socketID_to_Users_Map[socket.id] = {username}
    socket.join(roomId)

    const userlist = await getUsersinRoom(roomId, io)


    socket.in(roomId).emit("updating client list", {userlist})

    io.to(socket.id).emit("updating client list ", {userslist})
  })
})

socket.on("update language" , function({roomId,languageUsed})
{
  console.log("language:",languageUsed)
  if (roomId in roomID_to_Code_Map) {

      roomID_to_Code_Map[roomId]['languageUsed'] = languageUsed
  }
  else {

    roomID_to_Code_Map[roomId] = {languageUsed}
  }

})
socket.on("update code", function({roomId,code}){
   
     if (roomId in roomID_to_Code_Map){

         roomID_to_Code_Map[roomId]['code'] = code
     }
     else {

        roomID_to_Code_Map[roomId] = {code}
     }

})

socket.on("syncing the language" , function() {
    
  if (roomId in roomID_to_Code_Map) {


    socket.in(roomId).emit("on language change ", { languageUsed: roomID_to_Code_Map[roomId].languageUsed })
    
  }

  
})

socket.on("syncing the code", function({roomId})
{
      if (roomId in roomID_to_Code_Map) {

          socket.in(roomId).emit("on code change", { code:
            roomID_to_Code_Map[roomId].code})
          }  

          })

 socket.on("leave room", ({ roomId }) => {
            socket.leave(roomId)
            updateUserslistAndCodeMap(io, socket, roomId)
          })
     
          
 socket.on("disconnecting", function(reason){
        socket.rooms.forEach(eachRoom => {
            
          if (eachRoom in roomID_to_Code_Map) {

              updateUserslistAndCodeMap(io,socket,eachRoom)
          }
        })

            
})


socket.on("disconnect", function(){

  console.log("A user disconnected")
})

const PORT = process.env.PORT || 3000


io.listen(PORT , function(){

       console.log(`listening on port:${PORT}`)
})