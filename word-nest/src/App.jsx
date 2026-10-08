import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth.js'
import {login,logout} from "./store/authSlice.js"

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData){
        dispatch(login({userData}))
      }else{
         dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading? (
    <div className=''></div>
  ):(null)
}

export default App
