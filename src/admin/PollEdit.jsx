import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const PollEdit = () => {
    const locate=useLocation();
    const poll=locate.state.poll;
    const [question,setQuestion]=useState(poll.question)
    const [status,setStatus]=useState(poll.status)
    const [optionList,setOptionList]=useState(poll.optionList)
    const updateQuestion=(e)=>{
        setQuestion(e.target.value);
    }
    const updateStatus=(e)=>{
        setStatus(e.target.value);
    }
    const updateOption=(index,e)=>{
        const updateOptions=[...optionList];
        updateOptions[index].name=e.target.value;
        setOptionList(updateOptions);
    }
    const changeStatus=async()=>{
        const updatedPoll={
            poll_id:poll?.poll_id,
            status
        }
        const url=`${import.meta.env.VITE_VOTE_API_URL}/api/updateStatus`;
        const requestHeader={
            method:"PUT",
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
                'Content-Type':"application/json"
            },
            body:JSON.stringify(updatedPoll)
        }
        try{
            const response=await fetch(url,requestHeader);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data=await response.text();
            console.log(data);
            toast.success("Status Changes successfully!");
            setStatus(status);
        }catch(err){
            toast.error(err.message);
        }
    }
    const updatePoll=async (e)=>{
        e.preventDefault()
        const updatedPoll={
            poll_id:poll.poll_id,
            question,
            optionList:optionList.map((option)=>{return ({name:option.name,noOfVotes:option.noOfVotes})}),
            status,
            user:{
                user_id:Number(localStorage.getItem('id')),
            }
        }
        
        const url=`${import.meta.env.VITE_VOTE_API_URL}/api/updatePoll`;
        const requestHeader={
            method:"PUT",
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
                'Content-Type':"application/json"
            },
            body:JSON.stringify(updatedPoll)
        }
        try{
            const response=await fetch(url,requestHeader);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data=await response.text();
            console.log(data);
            toast.success("Poll updated successfully!");
            setQuestion("");
            setStatus("active");
        }catch(err){
            toast.error(err.message);
        }
    }
  return (
    <div className='w-screen min-h-screen bg-emerald-50 flex flex-col items-center justify-start gap-10'>
        <Toaster position='top-right' reverseOrder={false}/>
        <NavBar/>
        <div className='w-[90%] md:w-[75%] bg-white rounded-lg shadow-lg p-6'>
            <h1 className='text-2xl font-bold text-emerald-600 mb-4'>Change Status</h1>
            <div className='w-full flex flex-row items-center justify-center gap-2'>
                <select
                    value={status}
                    onChange={updateStatus}
                    className='p-2 border border-gray-300 rounded-lg w-3/4'
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button onClick={changeStatus} className='w-1/3 bg-emerald-600 text-white p-2 rounded-lg cursor-pointer text-center'>Change status</button>
            </div>
            <hr className='text-green-600 mt-4 mb-3'/>
            <h1 className='text-2xl font-bold text-emerald-600 mb-4'>Edit Poll</h1>
            <form className='flex flex-col items-start justify-evenly'>
                <label className='w-full flex flex-col mb-4'>
                    <span className='text-gray-700' >
                        Poll Question
                    </span>
                    <input
                        type='text'
                        value={question}
                        onChange={updateQuestion}
                        className='mt-2 p-2 border border-gray-300 rounded-lg w-full'
                        />
                </label>
                {
                    optionList.map((option,index)=>{
                        return (
                            <label key={index} className='w-full flex flex-col mb-4'>
                                <span className='text-gray-700'>
                                    Option {index+1}    
                                </span>
                                <input
                                    type='text'
                                    value={option.name}
                                    onChange={(e)=>updateOption(index,e)}
                                    className='mt-2 p-2 border border-gray-300 rounded-lg w-full'
                                />
                            </label>

                        )
                    })
                }
                <input type='submit' onClick={updatePoll} value="Save" className='w-full bg-emerald-600 text-white p-2 rounded-lg cursor-pointer text-center'/>
            </form>
        </div>
    </div>
  )
}

export default PollEdit
