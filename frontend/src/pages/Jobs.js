import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../services/api';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [jobType, setJobType] = useState('');
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    jobService.getAll().then(res => {
      setJobs(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = jobType ? jobs.filter(j => j.jobType === jobType) : jobs;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Job Listings</h1>
          {user?.role === 'vendor' && (
            <button
              onClick={() => window.location.assign('/jobs/create')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition text-sm"
            >
              + Post a Job
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button onClick={() => setJobType('')} className={`px-4 py-2 rounded-lg font-semibold transition ${!jobType ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}>
            All
          </button>
          {['full-time', 'part-time', 'contract', 'freelance'].map(type => (
            <button key={type} onClick={() => setJobType(type)} className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${jobType === type ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}>
              {type}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filtered.map(job => (
            <Link key={job._id} to={`/jobs/${job._id}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-purple-600">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">{job.jobType}</span>
                </div>
                <p className="text-gray-600 mb-4">{job.description.substring(0, 150)}...</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">
                    ${job.salary?.min} - ${job.salary?.max}
                  </span>
                  <span className="text-gray-500 text-sm">{job.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
