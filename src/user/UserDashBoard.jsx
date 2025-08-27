import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import toast from "react-hot-toast";
import VoteCard from "./VoteCard";

const UserDashBoard = () => {
  const user = localStorage.getItem("user") || "User";
  const [polls, setPolls] = useState([]);

  const updatePolls = async () => {
    const url = `${import.meta.env.VITE_VOTE_API_URL}/api/getAllPolls`;
    const requestHeaders = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, requestHeaders);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data);

      setPolls(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    updatePolls();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <TopBar />

      {/* Welcome Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
          Welcome{" "}
          <span className="bg-gradient-to-br from-green-500 to-emerald-400 text-transparent bg-clip-text font-extrabold">
            {user}
          </span>
        </h1>

        <span className="mt-6 w-fit px-6 py-2 rounded-2xl text-sm sm:text-base font-medium bg-emerald-100 border border-emerald-400 shadow-sm">
          🌟 Live Voting Poll
        </span>
      </div>

      {/* Polls Section */}
      <div className="w-full flex flex-col items-center justify-center px-4 py-8 bg-white shadow-inner rounded-t-3xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-green-600 mb-6">
          Active Polls
        </h1>

        <div className="w-full max-w-6xl flex flex-wrap gap-6 justify-center">
          {polls.filter((poll) => poll.status === "active").length > 0 ? (
            polls
              .filter((poll) => poll.status === "active")
              .map((poll, index) => (
                <VoteCard
                  key={poll.poll_id}
                  poll={poll}
                  updatePolls={updatePolls}
                  polls={polls}
                  index={index}
                />
              ))
          ) : (
            <p className="text-lg text-gray-500 italic">
              No polls are active right now
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
