import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar';
import { LogOut, TrendingUp, Users, Vote, BarChart3 } from 'lucide-react';
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
    <div className="w-screen h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white flex flex-col">
      <NavBar />
      <div className="p-6 overflow-y-auto">
        {/* Header Section with Animation */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600 font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-emerald-600 text-lg opacity-80">
            Monitor your platform's performance and engagement
          </p>
        </div>

        {/* Stats Cards with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 hover:border-emerald-200 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-emerald-200 transition-shadow duration-300">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-emerald-600 font-medium uppercase tracking-wide">Total Polls</p>
                <p className="text-3xl font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300">
                  {polls.length}
                </p>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-green-200 transition-shadow duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium uppercase tracking-wide">Total Votes</p>
                <p className="text-3xl font-bold text-green-700 group-hover:text-green-800 transition-colors duration-300">
                  {votes.length}
                </p>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 hover:border-emerald-200 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl shadow-lg group-hover:shadow-emerald-200 transition-shadow duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-emerald-600 font-medium uppercase tracking-wide">Total Users</p>
                <p className="text-3xl font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300">
                  {users.length}
                </p>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        </div>

        {/* Chart Section with Enhanced Styling */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-emerald-100 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg mr-3">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
              Voting Overview
            </h2>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#10b98150" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#047857', fontSize: 12 }}
                  axisLine={{ stroke: '#10b981' }}
                />
                <YAxis 
                  tick={{ fill: '#047857', fontSize: 12 }}
                  axisLine={{ stroke: '#10b981' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #10b981',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="voters" 
                  stroke="url(#gradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#047857' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Polls Section with Enhanced List */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg mr-3">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
              Recent Polls
            </h2>
          </div>
          <div className="space-y-3">
            {polls.slice(0, 5).map((poll, index) => (
              <div 
                key={poll.poll_id} 
                className="group p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors duration-300 text-lg">
                      {poll.question}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                      poll.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {poll.status}
                    </span>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {polls.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Vote className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="text-gray-500 text-lg">No polls available yet</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;