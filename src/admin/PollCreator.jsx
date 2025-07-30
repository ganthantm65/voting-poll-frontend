import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import toast, { ToastBar, Toaster } from 'react-hot-toast';

const PollCreator = () => {
    const [no,setNo]=useState(2);
    const [options,setOptions]=useState([]);
    const [question,setQuestion]=useState("");
    const [status,setStatus]=useState("active");
    const updateQuestion=(e)=>{
        setQuestion(e.target.value);    
    }
    const updateStatus=(e)=>{
        setStatus(e.target.value)
    }
    const createPoll=async (e)=>{
        e.preventDefault();
        const url = `${import.meta.env.VITE_VOTE_API_URL}/api/addPoll`;
        const optionList = options.map((option)=>{
            return{
                name: option,
                noOfVotes:0
            }
        })
        const poll={
            question,
            optionList,
            status,
            user:{
                user_id:Number(localStorage.getItem('id')),
            }
        }
        console.log(poll);
        
        const requestHeader={
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(poll)
        }
        try {
            const response =await fetch(url,requestHeader);
            if (!response.ok){
                throw new Error(response.statusText);
            }
            toast.success("Poll created successfully!");
            setQuestion("");
            setOptions([]);
            setNo(2);
            setStatus("active");
        } catch (error) {
            toast.error(error.message);          
        }
    }
  return (
    <div className='w-screen min-h-screen bg-emerald-50 flex flex-col items-center justify-start gap-10'>
        <Toaster position="top-right" reverseOrder={false} />
        <NavBar/>
        <div className='w-full flex flex-col items-center justify-center gap-6 px-6 py-6'>
            <h1 className='text-2xl font-bold text-emerald-600'>Create New Poll</h1>
            <form className='w-[90%] md:w-300 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4'>
                <label className='text-sm font-medium text-gray-700'>Poll Question</label>
                <input
                type='text'
                value={question}
                onChange={updateQuestion}
                placeholder='Eg. What is the famous food in India?'
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400'
                />
                <label className='text-sm font-medium text-gray-700'>No of Options(Maximum three)</label>
                <input type='number' value={no} onChange={(e)=>setNo(e.target.value)} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:right-0'/>
                {
                    no<=3 && no>1 ?Array.from({ length:no},(_,index)=>(
                        <div key={index} className='flex flex-col gap-2'>
                            <label>
                                Option {index+1}
                                <input type='text' placeholder='Eg.Pizza' className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:right-0' onChange={(e)=>{
                                    const newOptions = [...options];    
                                    newOptions[index] = e.target.value;
                                    setOptions(newOptions); 
                                }}/>
                            </label>
                        </div>
                    )):null
                }
                <label onClick={updateStatus} className='text-sm font-medium text-gray-700'>Status</label>
                <select value={status} onChange={(e)=>setStatus(e.target.value)} className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:right-0'>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <submit onClick={createPoll} className='w-full bg-emerald-600 text-white p-2 rounded-lg text-center cursor-pointer hover:bg-emerald-700 transition duration-200'>
                    Create Poll 
                </submit>
            </form>
        </div>
    </div>
  )
}

export default PollCreator
