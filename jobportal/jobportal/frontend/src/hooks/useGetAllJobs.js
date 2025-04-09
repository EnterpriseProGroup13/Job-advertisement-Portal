import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setJobs } from '@/redux/jobSlice';

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/jobs')
      .then(res => {
        dispatch(setJobs(res.data));
      })
      .catch(err => console.error("Error fetching jobs:", err));
  }, [dispatch]);
};

export default useGetAllJobs;
