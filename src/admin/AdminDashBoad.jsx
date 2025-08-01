import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar';
import { LogOut } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const [polls, setPolls] = useState([]);
  const [votes, setVotes] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchDetails = useCallback(async (endpoint, method) => {
    const url = `${import.meta.env.VITE_VOTE_API_URL}${endpoint}`;
    const requestHeader = {
      method: method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(url, requestHeader);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    const [pollsData, votesData, usersData] = await Promise.all([
      fetchDetails('/api/getAllPolls', 'GET'),
      fetchDetails('/api/getVotedPolls', 'GET'),
      fetchDetails('/auth/getUsers', 'GET')
    ]);
    if (pollsData) setPolls(pollsData);
    if (votesData) setVotes(votesData);
    if (usersData) setUsers(usersData);
  }, [fetchDetails]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const chartData = polls.flatMap(poll =>
    poll.optionList.map(option => ({
      name: option.name,
      voters: option.noOfVoters,
      question: poll.question
    }))
  );

  return (
    <div className="w-screen h-screen bg-emerald-50 flex flex-col">
      <NavBar />
      <div className="p-6 overflow-y-auto">
        <h1 className="text-3xl text-emerald-700 font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-emerald-500">
            <h2 className="text-lg font-semibold">Total Polls</h2>
            <p className="text-3xl font-bold text-emerald-600">{polls.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-emerald-500">
            <h2 className="text-lg font-semibold">Total Votes</h2>
            <p className="text-3xl font-bold text-emerald-600">{votes.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-emerald-500">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold text-emerald-600">{users.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-emerald-700">Voting Overview (Line)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="voters" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-emerald-700">Recent Polls</h2>
          <ul className="divide-y divide-gray-200">
            {polls.slice(0, 5).map((poll) => (
              <li key={poll.poll_id} className="py-2">
                <span className="font-medium text-gray-800">{poll.question}</span>
                <span className="ml-4 text-sm text-gray-500">Status: {poll.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;