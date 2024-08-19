import { Link, Navigate } from "react-router-dom"
import GenderCheckbox from "./GenderCheckbox"
import { useEffect, useState } from "react"
import useSignUp from "../../hooks/useSignUp.js"
import getGoogleOauthURL from "../../hooks/getGoogleUrl.js"
import { useAuthContext } from "../../context/AuthContext.jsx"
import useGoogle from "../../hooks/useGoogle.js"

const SignUp = () => {
  const {google} = useGoogle()
  const {authUser} = useAuthContext()
  useEffect(() => {
	  google()
	  .then(()=>{
		if(authUser) {
			<Navigate to='/' replace={true}/>
		}
	  })
	}, [])

  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const {signup,loading} = useSignUp()
  const handleCheckboxChange = (gender)=>{
      setInputs({...inputs,gender})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    await signup(inputs)
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
                     <div className="mb-8 text-3xl text-white flex "><img className="h-10 w-10" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" /> <a href={getGoogleOauthURL()}>Login with Google</a> </div>
       <div className="my-4">
      <div className="h-full w-full  rounded-md bg-clip-padding backdrop-filter 
      backdrop-blur-sm bg-opacity-10 border border-blue-300">
       
          <h1 className="text-3xl font-semibold text-center text-black">
            SignUp
            <span className="text-cyan-600"> Counter app</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className=" justify-between ml-7">
            <label className="label p-2 ">
              <span className="text-base label-text text-gray-500">Full Name</span>
            </label>
            <input type="text" placeholder="Enter Your Name" className="input input-bordered w-full max-w-xs bg-slate-200" value={inputs.fullName}
              onChange={(e) => setInputs({...inputs,fullName: e.target.value })} />
          </div>
          <div className=" justify-between ml-7">
            <label className="label p-2 ">
              <span className="text-base label-text text-gray-500">Username</span>
            </label>
            <input type="text" placeholder="Enter Username" className="input input-bordered w-full max-w-xs bg-slate-200" value={inputs.username}
              onChange={(e) => setInputs({...inputs,username: e.target.value })} />
          </div>
          <div className="ml-7">
            <label className="label p-2 ">
              <span className="text-base label-text text-gray-500">Password</span>
            </label>
            <input type="text" placeholder="Enter Password" className="input input-bordered w-full max-w-xs bg-slate-200" value={inputs.password}
            onChange={(e)=>setInputs({...inputs,password : e.target.value})}/>
          </div>
          <div className="ml-7">
            <label className="label p-2 ">
              <span className="text-base label-text text-gray-500">Confirm Password</span>
            </label>
            <input type="text" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs bg-slate-200" value={inputs.confirmPassword}
            onChange={(e)=>setInputs({...inputs,confirmPassword : e.target.value})}/>
          </div>

         
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

          <Link to={"/login"} className="  ml-7 text-sm hover:underline text-gray-500 hover:text-cyan-600 mt-3 inline-block">Already have an account?</Link>
          <div>
            <button className="btn w-5/6 btn-sm mt-3 ml-7 bg-cyan-600 hover:bg-cyan-600 border-none text-gray-700 mb-6"
            disabled={loading}>{loading? (<span className="loading loading-spinner"></span>) : 'Sign Up'}</button>
          </div>


        </form>

      </div>
    </div>
  )
}

export default SignUp