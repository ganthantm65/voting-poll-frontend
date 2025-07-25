import { BarChart3, LogOut, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminDashBoad = () => {
    const navigate=useNavigate();
    const [menuVisible,setMenuVisible]=useState(false);
    const toggleMenu=()=>{
        setMenuVisible(!menuVisible);
    }
  return (
    <div className='w-screen h-screen bg-emerald-50 flex flex-col items-center justify-between'>
      <nav className="w-full h-15 bg-white shadow-xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-green-600" />
          <h2 className="text-green-600 text-2xl font-bold">Vote Pulse</h2>
        </div>

        {menuVisible ? (
          <X
            className="md:hidden block text-green-600 cursor-pointer"
            onClick={toggleMenu}
            size={30}
          />
        ) : (
          <Menu
            className="md:hidden block text-green-600 cursor-pointer"
            onClick={toggleMenu}
            size={30}
          />
        )}

        <div className="md:flex hidden flex-row justify-center items-center gap-3">
          <button className="text-gray-700 cursor-pointer hover:text-green-600 transition duration-200">
            Dashboard
          </button>
          <button className="text-gray-700 cursor-pointer hover:text-green-600 transition duration-200">
            Polls
          </button>
          <button className="text-gray-700 cursor-pointer hover:text-green-600 transition duration-200">
            Users
          </button>
          <button className="text-gray-700 cursor-pointer hover:text-green-600 transition duration-200">
            Profile
          </button>
        </div>

        <LogOut
          className="hidden md:block text-green-600 cursor-pointer"
          size={30}
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
        />

        {menuVisible && (
          <div className="fixed top-16 z-20 right-6 bg-white shadow-lg rounded-lg p-4 w-48 flex flex-col items-start">
            <p className="text-xl text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2">
              <a href="#">Dashboard</a>
            </p>
            <p className="text-xl text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2">
              <a href="#">Polls</a>
            </p>
            <p className="text-xl text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2">
              <a href="#">Users</a>
            </p>
            <p className="text-xl text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2">
              <a href="#">Profile</a>
            </p>
            <button
              onClick={() => navigate('/login/navigator')}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-600 px-5 py-2 rounded-lg text-white font-medium hover:from-green-500 hover:to-emerald-700 transition duration-200"
            >
              Login
            </button>
          </div>
        )}
      </nav>
      <div className="w-full h-full flex items-center justify-center">

      </div>
    </div>
  )
}

export default AdminDashBoad
