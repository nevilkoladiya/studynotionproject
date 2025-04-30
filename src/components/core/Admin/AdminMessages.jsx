import React, { useEffect, useState } from "react";
import {
  getAllPendingMessagesAPI,
  getAllRepondedMessagesAPI,
  respondToMessageAPI,
} from "../../../services/operations/contactUsAPI";
import { useSelector } from "react-redux";
import { dateAndTime } from "../../../utils/dateAndTime";

const AdminMessages = () => {
  const { token } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchMessages();
  }, [activeTab]);

  const fetchMessages = async () => {
    setLoading(true);
    let data;
    if (activeTab === "pending") {
      data = await getAllPendingMessagesAPI(token);
    } else {
      data = await getAllRepondedMessagesAPI(token);
    }
    setMessages(data);
    setLoading(false);
  };

  const handleResponseChange = (messageId, value) => {
    setResponses((prev) => ({
      ...prev,
      [messageId]: value,
    }));
  };

  const handleSendResponse = async (messageId) => {
    const responseText = responses[messageId];
    if (!responseText) {
      alert("Please write a response before sending.");
      return;
    }

    try {
      const success = await respondToMessageAPI(messageId, responseText, token);
      if (success) {
        setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
        const updatedResponses = { ...responses };
        delete updatedResponses[messageId];
        setResponses(updatedResponses);
      }
    } catch (error) {
      console.error("Failed to send response:", error);
    }
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 py-8 px-4">
      {/* Navbar Tabs */}
      <div className="flex justify-center gap-4 mb-6 border-b border-richblack-600">
        <button
          className={`relative px-4 py-2 font-semibold transition-all ${
            activeTab === "pending"
              ? "text-yellow-400 after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[3px] after:bg-yellow-400"
              : "text-richblack-300"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Messages
        </button>
        <button
          className={`relative px-4 py-2 font-semibold transition-all ${
            activeTab === "responded"
              ? "text-yellow-400 after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[3px] after:bg-yellow-400"
              : "text-richblack-300"
          }`}
          onClick={() => setActiveTab("responded")}
        >
          Responded Messages
        </button>
      </div>

      {/* Messages List */}
      <div className="w-11/12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-richblack-5 capitalize mb-6">
          {activeTab} Messages
        </h2>

        {loading ? (
          <p className="text-richblack-300">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-richblack-300">No {activeTab} messages.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {messages.map((message) => (
              <div
                key={message._id}
                className="border border-richblack-600 p-6 rounded-md bg-richblack-800 shadow-md"
              >
                <h3 className="text-xl font-semibold mb-1">
                  {message.firstname} {message.lastname}
                </h3>
                <p className="text-richblack-300 text-sm">{message.email}</p>
                <p className="text-richblack-300 text-sm">{message.phoneNo}</p>
                <p className="text-richblack-400 text-xs mb-2">
                  {dateAndTime(message.createdAt)}
                </p>

                <p className="mb-4">
                  <span className="font-semibold text-richblack-5">Question:</span>{" "}
                  {message.message}
                </p>

                {activeTab === "pending" ? (
                  <>
                    <textarea
                      className="w-full p-2 rounded-md bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-400 mb-3"
                      placeholder="Write your response here..."
                      value={responses[message._id] || ""}
                      onChange={(e) => handleResponseChange(message._id, e.target.value)}
                      rows={4}
                    />
                    <button
                      onClick={() => handleSendResponse(message._id)}
                      className="bg-yellow-400 text-richblack-900 font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition-all"
                    >
                      Send Response
                    </button>
                  </>
                ) : (
                  <div>
                    <p className="font-semibold text-richblack-5 mb-2">Admin's Response:</p>
                    <p className="text-richblack-200">{message.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
