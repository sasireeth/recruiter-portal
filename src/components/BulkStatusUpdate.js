import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BulkStatusUpdate = () => {
  const [applications, setApplications] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/applications', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async () => {
    console.log(selectedIds);
    try {
        const token = localStorage.getItem('token');
         
      await axios.put('http://localhost:9000/api/applications/bulk-update', {
        ids: selectedIds,
        status
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      alert('Status updated successfully');
      navigate('/applications');
    } catch (error) {
        console.log(error)
        alert(error.response?.data?.error );
    }
  };

  const handleSelectChange = (e) => {
    const { value, checked } = e.target;
    setSelectedIds(prev =>
      checked ? [...prev, value] : prev.filter(id => id !== value)
    );
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Bulk Update Status</h2>
      <label className="block mb-4">
        <span className="text-gray-700">Select Status:</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select...</option>
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
      <ul className="mt-4">
        {applications.map((app) => (
          <li key={app._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={app._id}
              onChange={handleSelectChange}
              className="mr-2"
            />
            <span className="text-gray-700">{app.candidateName} - {app.jobTitle}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BulkStatusUpdate;
