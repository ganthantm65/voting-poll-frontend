import React, { useEffect, useState } from 'react';

const VoteHistory = ({ toast }) => {
  const [voteHistory, setVoteHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const url = `${import.meta.env.VITE_VOTE_API_URL}/api/getVotedPolls`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Failed to fetch vote history');
      const data = await response.json();
      setVoteHistory(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-6xl h-[450px] md:h-[90vh] mx-auto bg-white flex flex-col items-start shadow-lg rounded-lg p-4 overflow-hidden'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-4'>
        Vote History
      </h1>

      {loading ? (
        <div className='text-gray-500 text-center w-full'>Loading vote history...</div>
      ) : voteHistory.length > 0 ? (
        <>
          <div className='block lg:hidden w-full space-y-3 overflow-y-auto max-h-[75vh] pr-1'>
            {voteHistory.map((vote, index) => (
              <div
                key={index}
                className='bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200'
              >
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div>
                    <span className='font-semibold text-emerald-600'>Vote ID:</span>
                    <p className='text-gray-700'>{vote.vote_id}</p>
                  </div>
                  <div>
                    <span className='font-semibold text-emerald-600'>Voter:</span>
                    <p className='text-gray-700'>{vote.user_name}</p>
                  </div>
                  <div className='col-span-2'>
                    <span className='font-semibold text-emerald-600'>Poll Title:</span>
                    <p className='text-gray-700 break-words'>{vote.question}</p>
                  </div>
                  <div className='col-span-2'>
                    <span className='font-semibold text-emerald-600'>Option Voted:</span>
                    <p className='text-gray-700'>{vote.option_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View (Table) */}
          <div className='hidden lg:block w-full overflow-y-auto max-h-[75vh]'>
            <table className='w-full text-left rounded-lg'>
              <thead className='bg-emerald-500 text-white sticky top-0 z-10'>
                <tr>
                  <th className='p-3 text-sm'>Vote ID</th>
                  <th className='p-3 text-sm'>Voter Name</th>
                  <th className='p-3 text-sm'>Poll Title</th>
                  <th className='p-3 text-sm'>Option Voted</th>
                </tr>
              </thead>
              <tbody className='text-gray-700 text-sm'>
                {voteHistory.map((vote, index) => (
                  <tr
                    key={index}
                    className='border-b hover:bg-gray-100 transition-colors duration-200'
                  >
                    <td className='p-3'>{vote.vote_id}</td>
                    <td className='p-3'>{vote.user_name}</td>
                    <td className='p-3 break-words max-w-sm'>{vote.question}</td>
                    <td className='p-3'>{vote.option_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className='text-center text-gray-500 w-full'>No vote history found.</div>
      )}
    </div>
  );
};

export default VoteHistory;
