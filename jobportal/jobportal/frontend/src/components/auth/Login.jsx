import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      // Prepare form data in URL-encoded format
      const formData = new URLSearchParams();
      formData.append('username', input.username);
      formData.append('password', input.password);

      const res = await axios.post(`${AUTH_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      });

      if (res.data.access_token) {
        // Set both user and token in Redux store
        dispatch(setUser({
          ...res.data.user,
          token: res.data.access_token
        }));
        navigate("/");
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.detail || "Login failed. Please check your credentials.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.username}
              name="username"
              onChange={changeEventHandler}
              placeholder="jobportal@gmail.com"
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">Login</Button>
          )}

          <span className='text-sm'>
            Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
