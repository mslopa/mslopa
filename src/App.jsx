import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

import JoinRoom from './components/JoinRoom'
import MainPage from "./components/Mainpage"
import SocketWrapper from "./components/SocketWrapper"

const router = createBrowserRouter([

    {
        path: "/",
        element:<JoinRoom/>
    },
    {
        path: "/Mainpage/:roomId",
        element:<SocketWrapper><Mainpage/></SocketWrapper>
    }

])
function App() {
  return (
    <RouterProvider router={router}/>
  )
}
import { createBrowserRouter } from 'react-router-dom'
import Mainpage from './components/Mainpage'

export default App