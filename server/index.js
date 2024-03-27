
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
const express= require("express");
const http = require('http');
const app = express();
const cors = require("cors");
const socketIo = require("socket.io");

const bodyP = require("body-parser");
const server = http.createServer(app);

const io = socketIo(server);
  
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('executeCode', (code) => {
    // Execute the code (simplified example using child_process.exec)
    exec(code, (error, stdout, stderr) => {
      if (error) {
        socket.emit('output', stderr);
      } else {
        socket.emit('output', stdout);
      }
    });
  });
})

app.use(bodyP.json())

app.use("/", function (req,res) {

     res.sendFile(" ")
})

app.get("/api",(req,res) => {
       
      res.send({message: "This is from server"})
})
app.listen(3000,() => {

      console.log("server is running");
})
/*async function getUsersinRoom(roomid, io) {

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
*/