import { BarChart3, LogOut, Menu, X } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate=useNavigate();

  return (
    <nav className="w-full h-15 bg-white shadow-xl flex flex-row items-center justify-between lg:justify-around px-6 py-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-green-600" />
          <h2 className="text-green-600 text-2xl font-bold">Vote Pulse</h2>
        </div>

        <LogOut
          className="text-green-600 cursor-pointer"
          size={30}
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
        />
      </nav>
  )
}

export default TopBar
