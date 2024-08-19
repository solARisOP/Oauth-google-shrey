import {  useEffect, useState } from "react"
import useLogout from "../../hooks/useLogout";
 import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
// import useGoogle from "../../hooks/useGoogle";

const Home = () => {
  const [count, setCount] = useState(0)
  const { logout, loading } = useLogout()
   const {authUser} = useAuthContext()
  // const {google} = useGoogle()

  useEffect(() => {
    console.log('here we are')
    if(!authUser){
     < Navigate to = '/login'/>
    }
    }, [authUser]);

      // ignore this
  const handleCount = async () => {
    setCount(count + 1)
    const res = await fetch(`/api/counter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count })
    })
    console.log(res)
  }
  return (
    <div className="w-3/5 flex sm:h-[450px] md:h-[700px] rounded-md bg-clip-padding backdrop-filter 
      backdrop-blur-sm bg-opacity-10 border border-blue-300">
      <h1>{count}</h1>

      <button onClick={handleCount}>Click me</button>

      <div className="mt-auto">
        {!loading ? <button className="w-6 h-6 text-gray-500 cursor-pointer" onClick={logout} /> : <span className="loading loading-spinner"></span>}
      </div>

    </div>
  )
}
// 2/4 w

export default Home