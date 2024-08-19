
import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"


const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const {setAuthUser} = useAuthContext()
   
  const signup = async ({fullName,username,password,confirmPassword,gender})=>{
   const success= handleInputErrors({fullName,username,password,confirmPassword,gender})
   if(!success){return}

    setLoading(true)
   try{
    const res =await fetch('/api/auth/signup',{  //sending request with all the inputs in body in json
      method : 'POST',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify({fullName, username, password, confirmPassword, gender})
    })

    const data = await res.json() //response from the server
    if(data.error){
      throw new Error(data.error)
    }
    // local storage user data for state management
    localStorage.getItem('chat-user',JSON.stringify(data))
    // context
    setAuthUser(data)

   }catch(error){
      toast.error(error.message)
   }finally{
    setLoading(false)
   }
  }
  return {signup,loading}
}

export default useSignUp

const handleInputErrors =({fullName, username, password, confirmPassword, gender})=>{
    if(!fullName ||!username || !password|| !confirmPassword || !gender){
        toast.error("Please fill all the fields")
        return  false
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match")
        return false
    }
    
if(password.length < 6){
  toast.error("Password must be at 6 characters")
  return false
}

return true;
}