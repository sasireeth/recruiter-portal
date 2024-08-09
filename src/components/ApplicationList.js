import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ApplicationStatusUpdate from './ApplicationStatusUpdate';

const ApplicationList = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch applications from the server
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

  useEffect(() => {
    fetchApplications();
  }, []);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  
  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? app.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  
  const handleSendMessage = (applicationId) => {
    navigate(`/messages/${applicationId}`);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Applications</h2>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Search by candidate name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full"
        />
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full"
        >
          <option value="">Filter by status</option>
          <option value="new">New</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="interview scheduled">Interview Scheduled</option>
        </select>
      </div>

      <Link 
        to="/bulk-update"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 inline-block"
      >
        Go to Bulk Status Update
      </Link>
      <ul className="space-y-4">
        {filteredApplications.map((app) => (
          <li key={app._id} className="bg-white p-4 shadow rounded-md flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">{app.candidateName}</p>
              <p className="text-gray-600">{app.jobTitle}</p>
              <p className={`text-sm ${app.status === 'new' ? 'text-blue-500' : app.status === 'shortlisted' ? 'text-green-500' : app.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                {app.status}
              </p>
            </div>
            <div className="flex space-x-2">
              <ApplicationStatusUpdate applicationId={app._id} refreshApplications={fetchApplications} />
              <button
                onClick={() => handleSendMessage(app._id)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
