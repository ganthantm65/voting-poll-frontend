import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, User2 } from 'lucide-react';

const LoginNavigator = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-emerald-50">
      <div className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-emerald-600">Select Login Type</h1>

        <div className="flex gap-10">
          <Link
            to="/user/login"
            className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-md transition-transform duration-200 hover:scale-105"
          >
            <User2 size={40} />
            <span className="mt-2 font-semibold">User Login</span>
          </Link>

          <Link
            to="/admin/login"
            className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-md transition-transform duration-200 hover:scale-105"
          >
            <ShieldCheck size={40} />
            <span className="mt-2 font-semibold">Admin Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginNavigator;
