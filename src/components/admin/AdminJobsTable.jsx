import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import { setSearchJobByText } from '@/redux/jobSlice';
import AdminUsersTable from './AdminUsersTable';
import ReportsAnalytics from './ReportsAnalytics';

const AdminDashboard = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <h1 className='text-2xl font-bold mb-5'>Admin Dashboard</h1>
        
        <div className='grid grid-cols-3 gap-4'>
          <Button onClick={() => navigate('/admin/users')}>Manage Users</Button>
          <Button onClick={() => navigate('/admin/jobs')}>Manage Jobs</Button>
          <Button onClick={() => navigate('/admin/reports')}>View Reports</Button>
        </div>

        <div className='flex items-center justify-between my-5'>
          <Input
            className='w-fit'
            placeholder='Filter jobs by name, role'
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate('/admin/jobs/create')}>New Job</Button>
        </div>

        <AdminJobsTable />
        <AdminUsersTable />
        <ReportsAnalytics />
      </div>
    </div>
  );
};

export default AdminDashboard;
