import { Eye, EyeClosed, LockIcon, Mail, User2, User2Icon } from 'lucide-react'
import React, {  useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'

const SignUp= () => {
    const [passVisible,setPassVisible]=useState(false);
    const [userName,setUserName]=useState();
    const [password,setPassword]=useState();
    const [e_mail,setEmail]=useState();

    const updateUserName=(e)=>{
      setUserName(e.target.value);
    }
    const updatePassword=(e)=>{
      setPassword(e.target.value);
    }
    const lockPassword=()=>{
        setPassVisible(!passVisible);
    }
    const updateEmail=(e)=>{
        setEmail(e.target.value);
    }
    const validateForm=async()=>{
       const userData={
        userName,
        password,
        e_mail,
        role:"USER"
       }
       console.log(userData);
       
       const url=import.meta.env.VITE_VOTE_API_URL+"/auth/registerUser";
       const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
       }
       try{
        const response=await fetch(url,options);
        if(!response.ok && response.status===200){
          throw new Error(response.statusText);
        }
        const message=await response.json();
        toast.success(message.message);
       }catch(err){
        toast.error(err.message);
       }
    }
  return (
    <div className='w-screen h-screen bg-emerald-50 flex items-center justify-center'>
      <Toaster position="top-right" reverseOrder={false} />
      <div className='w-120 md:w-300 h-150 flex flex-row items-center justify-center bg-white shadow-lg rounded-xl'>
        <div className='w-1/2 h-full hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500 rounded-s-xl'>
            <h1 className='text-white text-3xl font-extrabold'>Welcome to vote puls</h1>
            <p className="text-lg md:text-xl text-white text-center max-w-xl">
              Create live polls, gather instant feedback, and make smarter decisions — all in one beautiful, secure platform.
            </p>
        </div>
        <div className='w-[400px] md:w-1/2 h-full flex flex-col items-center justify-evenly rounded-e-xl p-6'>
            <h1 className='text-3xl font-bold'>Sign Up</h1>
            <div className='w-[400px] flex flex-row items-center justify-center gap-4 bg-gray-100 rounded-lg p-2'>
              <User2 className='text-green-500' size={50}/>
              <input value={userName} onChange={updateUserName} type="text" className='bg-transparent p-2 w-200 outline-none focus:ring-0' placeholder='Username'/>
            </div>
            <div className='w-[400px] flex flex-row items-center justify-center gap-4 bg-gray-100 rounded-lg p-2'>
              <Mail className='text-green-500' size={50}/>
              <input value={e_mail} onChange={updateEmail} type="text" className='bg-transparent p-2 w-200 outline-none focus:ring-0' placeholder='E-Mail'/>
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
            <button className='bg-emerald-500 text-white p-5 rounded-lg w-[400px] cursor-pointer' onClick={validateForm}>Sign Up</button>
            <p className='text-sm text-gray-500'>Already have an account? <Link to="/user/login" className='text-green-500'>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
