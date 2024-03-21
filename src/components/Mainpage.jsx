import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Header from './Header';
import Code from './Code';

import Editer from './Editer';
const Mainpage = () => 
{
    return (
        
        <>
          <Header/>
          <Editer/>
        </>
    )
}
export default Mainpage;