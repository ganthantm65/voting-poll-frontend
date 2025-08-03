import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import toast from 'react-hot-toast';
import VoteCard from './VoteCard';

const UserDashBoard = () => {
  const user = localStorage.getItem('user') || 'User';
  const [polls, setPolls] = useState([]);

  const updatePolls = async () => {
    const url = `${import.meta.env.VITE_VOTE_API_URL}/api/getAllPolls`;
    const requestHeaders = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(url, requestHeaders);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data);
      
      setPolls(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    updatePolls();
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-emerald-50">
      <TopBar />
      <div className="h-[500px] md:max-h-[450px] flex-grow flex flex-col items-center justify-center gap-10 mt-10 ml-5">
        <h1 className="text-6xl text-center">
          Welcome{' '}
          <span className="bg-gradient-to-br from-green-500 to-emerald-400 text-transparent bg-clip-text font-bold">
            {user}
          </span>
        </h1>
        <span className='w-80 h-10 rounded-xl flex item-center justify-center bg-emerald-100 border border-emerald-400 p-2'>
          Live Voting Poll
        </span>
      </div>

      <div className="w-full h-[500px] md:max-h-[450px] flex flex-col items-center justify-center">
        <h1 className="text-2xl text-green-600 mb-4">Active Polls</h1>
        <div className="w-full flex flex-row items-center justify-center flex-wrap gap-4">
          {polls.filter(poll => poll.status === 'active').length > 0 ? (
            polls
              .filter(poll => poll.status === 'active')
              .map((poll, index) => (
                <VoteCard key={poll.poll_id} poll={poll} updatePolls={updatePolls} polls={polls} index={index} />
              ))
          ) : (
            <p className="text-md">No polls are active</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
