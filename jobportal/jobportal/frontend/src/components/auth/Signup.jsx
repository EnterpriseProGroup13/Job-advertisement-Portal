import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone_number: "",
    country: "",
    city: "",
    password: "",
    role: "customer",
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Full list of countries (or a sample list if needed)
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
    "Cape Verde", "Central African Republic", "Chad", "Chile", "China",
    "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
    "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
    "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
    "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!input.phone_number || input.phone_number.trim() === "") {
      toast.error("Phone number cannot be empty.", {
        style: { backgroundColor: "#dc2626", color: "#ffffff" },
      });
      return; // Prevent further processing if the field is empty
    }
    
    
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: { 'Content-Type': "application/json" },
      });
      if (res.data.success) {
        navigate("/login");
        toast.success("Registration successful! Please login.", {
          style: { backgroundColor: "#dc2626", color: "#ffffff" }
        });
      } else {
        toast.error("Registration failed. Please try again.1", {
          style: { backgroundColor: "#dc2626", color: "#ffffff" }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.detail || "Registration failed. Please try again.2",
        { style: { backgroundColor: "#dc2626", color: "#ffffff" } }
      );
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
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          <div className="flex gap-4 my-2">
            <div className="w-1/2">
              <Label>First Name</Label>
              <Input
                type="text"
                value={input.firstName}
                name="firstName"
                onChange={changeEventHandler}
                placeholder="First Name"
                required
              />
            </div>
            <div className="w-1/2">
              <Label>Surname</Label>
              <Input
                type="text"
                value={input.surname}
                name="surname"
                onChange={changeEventHandler}
                placeholder="Surname"
                required
              />
            </div>
          </div>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="jobportal@gmail.com"
              required
            />
          </div>

          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phone_number}
              name="phone_number"
              onChange={changeEventHandler}
              placeholder="1234567890"
            />
          </div>

          <div className='my-2'>
            <Label>Country</Label>
            <select
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div className='my-2'>
            <Label>City</Label>
            <Input
              type="text"
              value={input.city}
              name="city"
              onChange={changeEventHandler}
              placeholder="City"
              required
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="***********"
              required
            />
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">Sign Up</Button>
          )}

          <span className='text-sm'>
            Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
