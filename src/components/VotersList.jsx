import { User2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const VotersList = ({toast}) => {
    const [voters,setVoters]=useState([]);
    const Navigate=useNavigate();
    useEffect(()=>{
        fetchVoters();
    },[])
    
    const fetchVoters=async()=>{
        const url =`${import.meta.env.VITE_VOTE_API_URL}/auth/getUsers`;
        const options={
            method:'GET',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
                'Content-Type':'application/json'
            }
        }
        try {
            const response=await fetch(url,options);
            if (!response.ok) {
                throw new Error('Failed to fetch voters');
            }
            const data=await response.json();
            setVoters(data);
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    return (
        <div className='w-full lg:w-1/4 min-h-[45vh] lg:min-h-[90vh] flex flex-col items-start justify-start gap-6 lg:gap-10 bg-white shadow-lg rounded-lg p-3 sm:p-4 lg:p-6'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700'>Voter's List</h1>
            <div className='w-full h-full flex flex-col items-start justify-start overflow-y-auto'>
                {
                    voters.length>0 ? (
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-0'>
                            {voters.map((voter,index)=>{
                                return (
                                    <div key={index} className='w-full p-3 sm:p-4 my-1 lg:my-2 bg-gray-100 rounded-lg flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-300'>
                                        <h2 className='text-lg sm:text-xl font-medium text-center'>{voter.name}</h2>
                                        <p className='text-gray-600 text-sm sm:text-base text-center mt-1'>{voter.role}</p>
                                        <p className='text-gray-600 text-sm sm:text-base text-center break-all'>{voter.e_mail}</p>
                                    </div>
                                )
                            })}
                        </div>
                    ):(
                        <div className='w-full text-center p-8'>
                            <p className='text-gray-500 text-base sm:text-lg'>
                                No voters found.
                            </p>
                        </div>
                    )
                }
            </div>
            <button onClick={()=>Navigate('/admin/add')} className='w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-2 rounded-lg hover:bg-gradient-to-r from-green-500 to-emerald-600 transition-colors duration-300' >
                <span>Add admin</span>
                <User2 className='inline ml-2' size={20} />
            </button>
        </div>
    )
}
export default VotersList