import { PlusCircle } from 'lucide-react';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import PollCard from '../components/PollCard';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminPolls = () => {
    const [polls, setPolls] = useState([]);
    const navigate = useNavigate();
    const fetchPolls = async () => {
            const url = `${import.meta.env.VITE_VOTE_API_URL}/api/getPolls?user_id=${localStorage.getItem('id')}`;
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            };
            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(response.statusText);
                const data = await response.json();
                setPolls(data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            }
        };
    useEffect(() => {
        fetchPolls();
    }, []);
    
    return (
        <div className='w-screen min-h-screen bg-emerald-50 flex flex-col'>
            <NavBar />
            <div className="w-full flex flex-col items-center gap-6 px-6 py-6">
                <div className='w-full flex justify-end'>
                    <button onClick={
                        ()=>navigate("/admin/polls/create")
                    } className='flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:opacity-90 transition-all rounded-lg shadow-md'>
                        <PlusCircle className="w-5 h-5" /> Add Poll
                    </button>
                </div>

                <div className='w-full grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {polls.length > 0 ? (
                        polls.map((poll, index) => (
                            <PollCard key={index} poll={poll} fetchPolls={fetchPolls} toast={toast}/>
                        ))
                    ) : (
                        <div className='col-span-full text-center text-gray-500'>
                            No polls available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPolls;
