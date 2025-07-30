import React from 'react';
import { Edit, Trash } from 'lucide-react';
import  { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PollCard = ({ poll,fetchPolls,toast }) => {
    const navigate = useNavigate();
    const statusColor = poll?.status === "active" ? "bg-green-500" : "bg-red-500";
    const statusText = poll?.status.charAt(0).toUpperCase() + poll?.status.slice(1);
    const totalVotes = poll?.optionList?.reduce((sum, opt) => sum + opt.noOfVoters, 0) || 0;
    const deletePoll=async(id)=>{
        const url = `${import.meta.env.VITE_VOTE_API_URL}/api/deletePoll/${id}`;
        const requestHeader={
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        }
        try {
            const response =await fetch(url,requestHeader);
            if (!response.ok){
                throw new Error(response.statusText);
            }
            toast.success("Poll deleted successfully!");
            fetchPolls();
        } catch (error) {
            toast.error(error.message);          
        }
    }
    return (
        <div className='bg-white rounded-2xl shadow-lg p-5 flex flex-col items-start justify-around gap-4 hover:shadow-xl transition-all duration-300'>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='flex flex-row w-full items-center justify-between items-center'>
                <h2 className='text-lg font-semibold text-emerald-600'>{poll?.question}</h2>
                <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${statusColor}`}>
                    {statusText}
                </span>
            </div>

            <div className='flex flex-col gap-3 w-full'>
                {poll?.optionList?.map((option, index) => {
                    const percentage = totalVotes > 0
                        ? ((option.noOfVoters / totalVotes) * 100).toFixed(1)
                        : 0;

                    return (
                        <div key={index} className='flex flex-col gap-1'>
                            <span className='text-sm font-medium text-gray-700'>
                                {option.name} - {option.noOfVoters} vote{option.noOfVoters !== 1 ? 's' : ''}
                            </span>
                            <div className='w-full h-3 bg-gray-200 shadow-lg rounded-full overflow-hidden'>
                                <div
                                    className='h-full bg-emerald-500 transition-all duration-300'
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>


            <div className='flex flex-row w-full justify-center items-center gap-2 mt-4'>
                <button onClick={()=>deletePoll(poll?.poll_id)} className='w-1/2 md:w-42 h-10 bg-red-500 rounded-lg cursor-pointer px-1 flex flex-row items-center justify-center gap-2'>
                  <span className='text-xl text-white'>Delete</span> 
                  <Trash className='text-white' size={20}/>
                </button>
                <button 
                onClick={()=>navigate('/admin/polls/edit',{state:{poll}})}
                className='w-1/2 md:w-42 h-10 bg-emerald-600 rounded-lg cursor-pointer px-1 flex flex-row items-center justify-center gap-2'>
                  <span className='text-xl text-white'>Edit</span> 
                  <Edit className='text-white' size={20}/>
                </button>
            </div>
        </div>
    );
};

export default PollCard;
