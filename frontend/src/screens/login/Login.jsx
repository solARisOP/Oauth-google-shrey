import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import useLogin from "../../hooks/useLogin"
import getGoogleOauthURL from "../../hooks/getGoogleUrl"
import { useAuthContext } from "../../context/AuthContext"
import useGoogle from "../../hooks/useGoogle"
// import useGoogle from "../../hooks/useGoogle"


const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const { login, loading } = useLogin()
	const { authUser } = useAuthContext()
	const {google} = useGoogle()
	// const {google} = useGoogle()

	useEffect(() => {
	  google()
	  .then(()=>{
		console.log(authUser);
		if(authUser) {
			<Navigate to='/' replace={true}/>
		}
	  })
	}, [])
	

	console.log(authUser);



	const handleSubmit = async (e) => {
		e.preventDefault()
		await login(username, password)
	}
	//   const handleGoogle = async(e)=>{
	//     e.preventDefault()
	//  await getGoogleOauthURL()
	//     // await google()


	//   }
	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="mb-8 text-3xl text-white flex"><img className="h-10" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" /> <a href={getGoogleOauthURL()}>Login with Google</a> </div>
			<div className="h-full w-full  rounded-md bg-clip-padding backdrop-filter 
      backdrop-blur-sm bg-opacity-10 border border-blue-300">


				<div className="my-4">
					<h1 className="text-3xl font-semibold text-center text-black">
						Login
						<span className="text-cyan-600"> Counter app</span>
					</h1>
				</div>

				<form onSubmit={handleSubmit}>
					<div className=" justify-between ml-7">
						<label className="label p-2 ">
							<span className="text-base label-text text-gray-500">Username</span>
						</label>
						<input type="text" placeholder="Enter Username" className="input input-bordered w-full max-w-xs bg-slate-200"
							value={username}
							onChange={(e) => { setUsername(e.target.value) }} />
					</div>
					<div className="ml-7">
						<label className="label p-2 ">
							<span className="text-base label-text text-gray-500">Password</span>
						</label>
						<input type="text" placeholder="Enter Password" className="input input-bordered w-full max-w-xs bg-slate-200"
							value={password}
							onChange={(e) => { setPassword(e.target.value) }} />
					</div>
					<Link to={"/signup"} className="  ml-7 text-sm hover:underline text-gray-500 hover:text-cyan-600 mt-3 inline-block">{"Don't"} have an account?</Link>

					<div>
						<button className="btn w-5/6 btn-sm mt-3 ml-7 bg-cyan-600 hover:bg-cyan-600 border-none text-gray-700 mb-6"
							disabled={loading}>{loading ? (<span className="loading loading-spinner"></span>) : 'Login'}</button>
					</div>
				</form>

			</div>
		</div>
	)
}

export default Login