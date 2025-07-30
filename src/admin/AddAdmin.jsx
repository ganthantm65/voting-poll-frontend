import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import toast from 'react-hot-toast';

const AddAdmin = () => {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const updateName=(e)=>{
    setAdminName(e.target.value);
  }
  const updateEmail=(e)=>{
    setAdminEmail(e.target.value);
  }
  const updatePassword=(e)=>{
    setAdminPassword(e.target.value);
  }
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const admin={
      userName: adminName,
      e_mail:adminEmail,
      password: adminPassword,
      role:'ADMIN'
    }
    const url = `${import.meta.env.VITE_VOTE_API_URL}/auth/registerAdmin`;
    const options={
      method:'POST',
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify(admin)
    }
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to add admin');
      }
      const data = await response.json();
      toast.success(data.message)
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-start gap-10 bg-emerald-50'>
      <NavBar/>
      <div className='w-3/4 lg:w-1/2 h-[60vh] lg:min-h-[50vh] bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mb-6'>Add New Admin</h1>
        <form className='w-full flex flex-col items-start justify-start gap-4'>
            <input value={adminName} onChange={updateName} type='text' placeholder='Admin Name' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' />
            <input value={adminEmail} onChange={updateEmail} type='email' placeholder='Admin Email' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' />
            <input value={adminPassword} onChange={updatePassword} type='password' placeholder='Password' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' />
            <button onClick={handleSubmit} type='submit' className='w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-2 rounded-lg hover:bg-gradient-to-r from-green-500 to-emerald-600 transition-colors duration-300'>
                <span>Add Admin</span>
            </button>
        </form>
      </div>
    </div>
  )
}

export default AddAdmin
