import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User2, Search } from 'lucide-react';

const VotersList = ({ toast }) => {
  const [voters, setVoters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    fetchVoters();
  }, []);

  const fetchVoters = async () => {
    const url = `${import.meta.env.VITE_VOTE_API_URL}/auth/getUsers`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Failed to fetch voters');
      const data = await response.json();
      setVoters(data);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const filteredVoters = voters.filter((v) => {
    const name = v.name?.toLowerCase() || '';
    const email = v.e_mail?.toLowerCase() || '';
    return name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  return (
    <div className='w-full lg:w-1/4 h-[350px] md:h-[90vh] bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4'>
      <h1 className='text-2xl lg:text-4xl font-bold text-green-700'>User's List</h1>

      <div className='relative w-full'>
        <input
          type='text'
          placeholder='Search by name or email'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400'
        />
        <Search className='absolute right-3 top-2.5 text-gray-400' size={18} />
      </div>

      {loading ? (
        <p className='text-gray-500'>Loading users...</p>
      ) : filteredVoters.length > 0 ? (
        <div className='flex-1 overflow-y-auto space-y-3 pr-1'>
          {filteredVoters.map((voter, index) => (
            <div
              key={index}
              className='bg-gray-100 p-3 rounded-lg flex flex-col text-center hover:shadow-md transition-shadow duration-300'
            >
              <h2 className='text-lg font-medium'>{voter.name || 'Unknown Name'}</h2>
              <p className='text-gray-600 text-sm'>{voter.role || 'N/A'}</p>
              <p className='text-gray-600 text-sm break-all'>{voter.e_mail || 'No Email'}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-gray-500 text-center flex-1 overflow-y-auto'>No voters found.</div>
      )}

      <button
        onClick={() => Navigate('/admin/add')}
        className='w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-2 rounded-lg hover:from-green-500 hover:to-emerald-600 transition-colors duration-300 mt-auto'
      >
        <span>Add Admin</span>
        <User2 className='inline ml-2' size={20} />
      </button>
    </div>
  );
};

export default VotersList;
