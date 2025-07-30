import { BarChart3, CheckCircle, Cross, Delete, Menu, Shield, UserCheck, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [menuVisible,setMenuVisible]=useState(false);
    const toggleMenu=()=>{
        setMenuVisible(!menuVisible);
    }
    const features=[
        {icons:<CheckCircle className="text-green-600" size={40}/>,title:"Real-Time Polls",description:"Create and manage live polls with instant results."},
        {icons:<Shield className="text-green-600" size={40}/>,title:"Secure Voting",description:"Ensure the integrity of your polls with end-to-end encryption."},
        {icons:<UserCheck className="text-green-600" size={40}/>,title:"User-Friendly Interface",description:"Intuitive design for easy navigation and participation."},
        {icons:<BarChart3 className="text-green-600" size={40}/>,title:"Analytics Dashboard",description:"Get detailed insights and analytics on poll results."},
    ]
    const navigate=useNavigate();
  return (
    <div className="w-screen min-h-screen flex flex-col justify-between bg-[#F0FDF4] font-sans gap-30">
      <nav className="w-full py-4 bg-white shadow-md flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-green-600" />
          <h2 className="text-green-600 text-2xl font-bold">Vote Pulse</h2>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <p className="text-lg text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer"><a href="">Home</a></p>
          <p className="text-lg text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer"><a href="">About</a></p>
          <p className="text-lg text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer"><a href="#feature">Features</a></p>
        </div>
        <button
        onClick={()=>navigate("/login/navigator")}
        className="hidden md:block bg-gradient-to-r from-green-400 to-emerald-600 px-5 py-2 rounded-lg text-white font-medium hover:from-green-500 hover:to-emerald-700 transition duration-200">
          Login
        </button>
        {
            menuVisible ? (
                <X className="md:hidden text-green-600 cursor-pointer" size={30} onClick={toggleMenu}/>
            ):(
                <Menu className="md:hidden text-green-600 cursor-pointer" size={30} onClick={toggleMenu} />
            )
        }
        {
            menuVisible ? (
            <div className="fixed top-16 z-20 right-6 bg-white shadow-lg rounded-lg p-4 w-48 flex flex-col items-start">
                <p className="text-xl text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2"><a href="">Home</a></p>
                <p className="text-xl text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2"><a href="">About</a></p>
                <p className="text-xl text-gray-700 hover:text-green-500 transition duration-200 cursor-pointer py-2"><a href="#feature">Features</a></p>
                <button
                  onClick={()=>navigate("/login/navigator")}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-600 px-5 py-2 rounded-lg text-white font-medium hover:from-green-500 hover:to-emerald-700 transition duration-200">
                  Login
                </button>
            </div>):null
        }
      </nav>

      <section className="w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 gap-8">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center md:text-left leading-tight">
            Empower Every Voice with <span className="text-emerald-600">VotePulse</span>
          </h1>
          <p className="text-lg md:text-xl text-green-900 text-center md:text-left max-w-xl">
            Create live polls, gather instant feedback, and make smarter decisions — all in one beautiful, secure platform.
          </p>
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold hover:from-green-500 hover:to-emerald-700 transition duration-200">
            Get Started
          </button>
        </div>

        <div className="w-full h-full hidden md:flex flex-col items-start  md:w-1/2 bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Which is the most used OS?</h2>

          <div className="mb-4 w-full">
            <p className="text-green-600 font-medium">Windows</p>
            <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
              <div className="bg-green-400 h-full w-[75%] rounded-full"></div>
            </div>
          </div>

          <div className="mb-4 w-full">
            <p className="text-green-600 font-medium">Linux</p>
            <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
              <div className="bg-green-400 h-full w-[50%] rounded-full"></div>
            </div>
          </div>

          <div className="mb-4 w-full">
            <p className="text-green-600 font-medium">Mac</p>
            <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
              <div className="bg-green-400 h-full w-[30%] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    
      <section id="feature" className="w-full h-auto py-10 flex flex-col md:flex-row flex-wrap items-start justify-between gap-2 px-6 md:px-20">
        {
            features.map((feature,index)=>{
                return(
                    <div key={index} className="w-100 md:w-80 h-55 flex flex-col max-w-7xl mx-auto px-6 py-4 bg-white shadow-md rounded-lg mb-6 flex items-start gap-3">
                        {feature.icons}
                        <h1 className="text-green-800 text-2xl font-extrabold">{feature.title}</h1>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                )
            })
        }
      </section>

      <footer className="w-full bg-gray-900 py-10 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold">Vote Pulse</h2>
            <p className="text-gray-400 mt-1">© 2025 Vote Pulse. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <button className="text-gray-400 hover:text-white transition">Privacy</button>
            <button className="text-gray-400 hover:text-white transition">Terms</button>
            <button className="text-gray-400 hover:text-white transition">Cookies</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
