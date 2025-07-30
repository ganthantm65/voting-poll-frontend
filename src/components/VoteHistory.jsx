import React, { useEffect, useState } from 'react'

const VoteHistory = ({toast}) => {
    const [voteHistory,setVoteHistory]=useState([]);
    
    useEffect(()=>{
        fetchHistory();
    },[])
    
    const fetchHistory=async()=>{
        const url =`${import.meta.env.VITE_VOTE_API_URL}/api/getVotedPolls`;
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
            console.log(data);
            setVoteHistory(data);
            console.log(voteHistory);
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    useEffect(()=>{
        console.log(voteHistory);
    },[voteHistory])
    
    return (
        <div className='w-full lg:w-[75%] min-h-[45vh] lg:min-h-[90vh] bg-white flex flex-col items-start justify-start shadow-lg rounded-lg p-3 sm:p-4 lg:p-6'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mb-4 lg:mb-6'>Vote History</h1>
            
            <div className='block lg:hidden w-full h-full overflow-y-auto space-y-3'>
                {
                    voteHistory.length > 0 ? (
                        voteHistory.map((vote, index) => (
                            <div key={index} className='bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200'>
                                <div className='grid grid-cols-2 gap-2 text-sm sm:text-base'>
                                    <div>
                                        <span className='font-semibold text-emerald-600'>Vote ID:</span>
                                        <p className='text-gray-700 mt-1'>{vote.vote_id}</p>
                                    </div>
                                    <div>
                                        <span className='font-semibold text-emerald-600'>Voter:</span>
                                        <p className='text-gray-700 mt-1'>{vote.user_name}</p>
                                    </div>
                                    <div className='col-span-2'>
                                        <span className='font-semibold text-emerald-600'>Poll Title:</span>
                                        <p className='text-gray-700 mt-1 break-words'>{vote.question}</p>
                                    </div>
                                    <div className='col-span-2'>
                                        <span className='font-semibold text-emerald-600'>Option Voted:</span>
                                        <p className='text-gray-700 mt-1'>{vote.option_name}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center text-gray-500 p-8'>
                            <p className='text-lg'>No vote history found.</p>
                        </div>
                    )
                }
            </div>
            
            <div className='hidden lg:block w-full h-full overflow-hidden'>
                <div className='overflow-x-auto overflow-y-auto max-h-full'>
                    <table className='w-full table-auto rounded-lg'>
                        <thead className='bg-emerald-500 text-white text-lg sticky top-0'>
                            <tr>
                                <th className='p-3 text-left'>Vote ID</th>
                                <th className='p-3 text-left'>Voter's Name</th>
                                <th className='p-3 text-left'>Poll Title</th>
                                <th className='p-3 text-left'>Option Voted</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700 text-lg'>
                            {
                                voteHistory.length > 0 ? (
                                    voteHistory.map((vote, index) => (
                                        <tr key={index} className='hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200'>
                                            <td className='p-4'>{vote.vote_id}</td>
                                            <td className='p-4'>{vote.user_name}</td>
                                            <td className='p-4 max-w-xs break-words'>{vote.question}</td>
                                            <td className='p-4'>{vote.option_name}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className='text-center text-gray-500 p-8'>
                                            <p className='text-lg'>No vote history found.</p>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default VoteHistory