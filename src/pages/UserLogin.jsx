import { Eye, EyeClosed, LockIcon, User2, User2Icon } from 'lucide-react'
import React, {  useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [passVisible,setPassVisible]=useState(false);
    const [userName,setUserName]=useState();
    const [password,setPassword]=useState();
    const updateUserName=(e)=>{
      setUserName(e.target.value);
    }
    const updatePassword=(e)=>{
      setPassword(e.target.value);
    }
    const lockPassword=()=>{
        setPassVisible(!passVisible);
    }
    const validateForm=async()=>{
       const userData={
        userName,
        password,
        role:"USER"
       }
       console.log(userData);
       
       const url=import.meta.env.VITE_VOTE_API_URL+"/auth/loginUser";
       const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
       }
       try{
        const response=await fetch(url,options);
        if(!response.ok){
          throw new Error(response.statusText);
        }
        const message=await response.json();
        localStorage.setItem("user",JSON.stringify(message.user_name));
        localStorage.setItem("token",message.token);
        toast.success("Login successfull");
       }catch(err){
        toast.error("Invalid credentials");
       }
    }
  return (
    <div className='w-screen h-screen bg-emerald-50 flex items-center justify-center'>
      <Toaster position="top-right" reverseOrder={false} />
      <div className='w-120 md:w-300 h-150 flex flex-row items-center justify-center bg-white shadow-lg rounded-xl'>
        <div className='w-1/2 h-full hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500 rounded-s-xl'>
            <h1 className='text-white text-3xl font-extrabold'>Welcome back</h1>
            <p className="text-lg md:text-xl text-white text-center max-w-xl">
              Create live polls, gather instant feedback, and make smarter decisions — all in one beautiful, secure platform.
            </p>
        </div>
        <div className='w-[400px] md:w-1/2 h-full flex flex-col items-center justify-evenly rounded-e-xl p-6'>
            <h1 className='text-3xl font-bold'>User Login</h1>
            <div className='w-[400px] flex flex-row items-center justify-center gap-4 bg-gray-100 rounded-lg p-2'>
              <User2 className='text-green-500' size={50}/>
              <input value={userName} onChange={updateUserName} type="text" className='bg-transparent p-2 w-200 outline-none focus:ring-0' placeholder='Username'/>
            </div>
            <div className='w-[400px] flex flex-row items-center justify-center gap-4 bg-gray-100 rounded-lg p-2'>
              <LockIcon className='text-green-500' size={50}/>
              <input 
              value={password}
              onChange={updatePassword}
              type={
                passVisible ? "text" : "password"
              } 
              className='bg-transparent p-2 w-200 outline-none focus:ring-0' placeholder='Password'/>
              {
                passVisible ? 
                <Eye className='text-green-500 cursor-pointer' size={50} onClick={lockPassword}/>:
                <EyeClosed className='text-green-500 cursor-pointer' size={50} onClick={lockPassword}/>
              }
            </div>
            <button className='bg-green-500 text-white p-5 rounded-lg w-[400px] cursor-pointer' onClick={validateForm}>Login</button>
            <p className='text-sm text-gray-500'>Don't have an account? <Link to="/user/register" className='text-green-500'>Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
