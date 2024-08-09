import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ApplicationStatusUpdate = ({ applicationId, refreshApplications }) => {
  const [status, setStatus] = useState('');
    console.log(applicationId);
  const handleStatusChange = async () => {
    try {
      await axios.put(`http://localhost:9000/api/applications/${applicationId}/status`, { status }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Status updated successfully');
      refreshApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <label className="block mb-4">
        <span className="text-gray-700">Select Status:</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Status</option>
          <option value="new">New</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="interview scheduled">Interview Scheduled</option>
        </select>
      </label>
      <button
        onClick={handleStatusChange}
        className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Update Status
      </button>
    </div>
  );
};

export default ApplicationStatusUpdate;
