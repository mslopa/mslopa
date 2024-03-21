import {useLocation , useNavigate, useParams} from "react-router-dom"
import {io} from "socket.io-client"


function addPropsToReactElement(element, props) {

    if (React.isValidElement(element)) {

        return React.cloneElement(element)
    }
    return element 
}

function addPropsToChildren(children, props) {

    if(!Array.isArray(children)) {

        return addPropsToReactElement(children, props)
    }
}


export default function SocketWrapper({}) {

    const socket = io.connect("https://localhost:3000")

        
     const location = useLocation()
     const {roomId} = useParams()
     const navigate = useNavigate()

     useEffect(() => {

        function kickStrangerOut() {

                 navigate("/",{replace:true})
                 toast.error("Not allowed")
           


        }
        location.state?.username ? socket.emit("when a user joins", 
        {roomId,username:location.state.username}) : 
        kickStrangerOut()
     } , [location.state , socket, roomId, navigate])


    return location.state?.username? <div> {addPropsToChildren 
        (children,{socket} )}</div>: (

        <div>Not allowed .Please use the form to Join a room </div>
    )
}