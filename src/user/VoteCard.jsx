import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const VoteCard = ({ poll, updatePolls }) => {
  const [selected, setSelected] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [updatedPoll, setUpdatedPoll] = useState(poll);
  const userId = parseInt(localStorage.getItem("id"));

  useEffect(() => {
    const fetchVotedPolls = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_VOTE_API_URL}/api/getVotedPolls`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);
        
        const hasVoted = data.some(
          (vote) => vote.user_id === userId && vote.question === poll.question
        );

        if (hasVoted) setShowResults(true);
      } catch (error) {
        console.error("Error fetching voted polls:", error);
      }
    };

    if (poll?.poll_id && userId) fetchVotedPolls();
  }, [poll?.poll_id, userId]);

  const votePoll = async () => {
    if (!selected) {
      toast.error("Please select an option.");
      return;
    }

    const vote = {
      userModel: { user_id: userId },
      poll: { poll_id: poll.poll_id },
      options: { option_id: selected },
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_VOTE_API_URL}/api/votePoll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vote),
      });

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      toast.success(data.message || "Vote submitted!");
      setUpdatedPoll(data.updatedPoll || poll);
      setShowResults(true);
      updatePolls();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const totalVotes = updatedPoll.optionList.reduce((acc, option) => acc + option.noOfVoters, 0);

  return (
    <div className="w-[90%] md:w-72 h-90 md:h-[400px] bg-white rounded-lg shadow-lg p-4 flex flex-col justify-start gap-2">
      <Toaster position="top-right" />
      <h2 className="text-lg font-bold text-center mb-4">{updatedPoll?.question}</h2>
      <div className="flex flex-col gap-3">
        {updatedPoll?.optionList.map((option) => {
          const percentage = totalVotes > 0 ? (option.noOfVoters / totalVotes) * 100 : 0;
          return (
            <div key={option.option_id} className="flex flex-col gap-1">
              <label
                className={`flex items-center gap-2 border border-gray-200 p-2 rounded-lg transition ${
                  !showResults && 'hover:bg-gray-100 cursor-pointer'
                }`}
              >
                <input
                  type="radio"
                  name={`poll-${poll.poll_id}`}
                  value={option.option_id}
                  onChange={(e) => setSelected(Number(e.target.value))}
                  disabled={showResults}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-green-600 checked:bg-green-500 transition-all"
                />
                <span>{option.name}</span>
              </label>
              {showResults && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-500 ease-in-out"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{percentage.toFixed(1)}%</span>
                </>
              )}
            </div>
          );
        })}
      </div>
      {!showResults && (
        <button
          onClick={votePoll}
          className="w-full p-2 mt-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:opacity-90 transition"
        >
          Vote
        </button>
      )}
    </div>
  );
};

export default VoteCard;
