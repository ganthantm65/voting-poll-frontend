import { BarChart3, LogOut, Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const [menuVisible,setMenuVisible]=useState(false);
    const toggleMenu=()=>{
        setMenuVisible(!menuVisible);
    }
    const isPathActive=(path)=>{
        return location.pathname === path;
    }
  return (
    <nav className="w-full h-15 bg-white shadow-xl flex items-center justify-between lg:justify-around px-6 py-4">
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
          <button 
            onClick={() => navigate("/admin/dashboard")} 
            className={`
              text-gray-700 
              cursor-pointer 
              hover:text-green-600 
              transition duration-200 
              ${isPathActive('/admin/dashboard') ? 'text-green-600 border-b-4 border-green-600' : ''}
            `}
          >
            Dashboard
          </button>
          <button 
          onClick={()=>navigate("/admin/polls")} 
          className={`
              text-gray-700 
              cursor-pointer 
              hover:text-green-600 
              transition duration-200 
              ${isPathActive('/admin/polls') ? 'text-green-600 border-b-4 border-green-600' : ''}
            `}>
            Polls
          </button>
          <button 
          onClick={()=>navigate("/admin/voters")}
          className={`
              text-gray-700 
              cursor-pointer 
              hover:text-green-600 
              transition duration-200 
              ${isPathActive('/admin/voters') ? 'text-green-600 border-b-4 border-green-600 transition duration-200' : ''}
            `}>
            Voters
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
          <div className="absolute top-12 z-20 right-1 bg-white shadow-lg w-screen p-6 flex flex-col items-start">
            <p className="text-md text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2">
              <a onClick={()=>navigate("/admin/dashboard")}>Dashboard</a>
            </p>
            <p className="text-md text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2">
              <a onClick={()=>navigate("/admin/polls")}>Polls</a>
            </p>
            <p className="text-md text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2">
              <a onClick={()=>navigate("/admin/voters")}>Voters</a>
            </p>
            <button
              onClick={() => navigate('/login/navigator')}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-600 px-5 py-2 rounded-lg text-white font-medium hover:from-green-500 hover:to-emerald-700 transition duration-200"
            >
              Logout <LogOut className="inline mr-2" size={20} />
            </button>
          </div>
        )}
      </nav>
  )
}

export default NavBar
