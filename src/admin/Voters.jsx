import React from 'react'
import NavBar from '../components/NavBar'
import VotersList from '../components/VotersList'
import toast, { Toaster } from 'react-hot-toast'
import VoteHistory from '../components/VoteHistory'

const Voters = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-between bg-emerald-50'>
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar/>
      <div className='w-full h-full flex flex-col lg:flex-row items-center justify-center gap-3 p-2 lg:p-3'>
        <VotersList toast={toast}/>
        <VoteHistory toast={toast}/>
      </div>
    </div>
  )
}

export default Voters