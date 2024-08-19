import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import Login from './screens/login/Login'
import Home from './screens/home/Home'
import SignUp from './screens/signup/SignUp'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from "./context/AuthContext"
import useGoogle from './hooks/useGoogle'

function App() {
 const {authUser} = useAuthContext()
 const {google} = useGoogle() 
  return (
    <>
    <div className='p-4 flex justify-center items-center h-screen'>
        
     <Routes>
     <Route path='/signup' element={authUser ? <Navigate to={'/'} replace={true} /> : <SignUp/>}/>
     <Route path='/login' element={authUser ? <Navigate to ={'/'} replace={true} /> : <Login/>}/>
     <Route path='/' element={authUser ? <Home /> : <Navigate to ='/login' replace={true} />}/>
     </Routes>
      <Toaster/>
    </div>
    </>
  )
}

export default App
