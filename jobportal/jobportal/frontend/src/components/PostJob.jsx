import React, { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
  // Updated state: removed category
  const [input, setInput] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    location_country: "",
    location_city: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector(store => store.auth);

  // Sample list of countries
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

    if (!token) {
      toast.error("You must be logged in to post a job");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      // Prepare job data: converting budget and formatting deadline
      const jobData = {
        ...input,
        budget: parseFloat(input.budget),
        deadline: new Date(input.deadline).toISOString()
      };

      const res = await axios.post(JOB_API_END_POINT, jobData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 201) {
        toast.success("Job posted successfully!");
        navigate("/browse");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-start w-full my-10">
        <form onSubmit={submitHandler} className="w-full max-w-4xl p-6 bg-white border border-gray-200 shadow-xl rounded-md">
          <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
          <div className="space-y-6">
            {/* Title */}
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="my-2 w-full p-3 border rounded-md"
                required
              />
            </div>
            {/* Description */}
            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                rows="4"
                className="my-2 w-full p-3 border rounded-md"
                required
              />
            </div>
            {/* Budget */}
            <div>
              <Label>Budget (£)</Label>
              <Input
                type="number"
                name="budget"
                value={input.budget}
                onChange={changeEventHandler}
                className="my-2 w-full p-3 border rounded-md"
                min="0"
                required
              />
            </div>
            {/* Deadline */}
            <div>
              <Label>Deadline</Label>
              <Input
                type="datetime-local"
                name="deadline"
                value={input.deadline}
                onChange={changeEventHandler}
                className="my-2 w-full p-3 border rounded-md"
                required
              />
            </div>
            {/* Location - Country */}
            <div>
              <Label>Country</Label>
              <select
                name="location_country"
                value={input.location_country}
                onChange={changeEventHandler}
                className="w-full p-3 border rounded-md"
                required
              >
                <option value="">Select a Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
            {/* Location - City */}
            <div>
              <Label>City</Label>
              <Input
                type="text"
                name="location_city"
                value={input.location_city}
                onChange={changeEventHandler}
                className="my-2 w-full p-3 border rounded-md"
                required
              />
            </div>
            {/* Submit Button */}
            <div>
              {loading ? (
                <Button className="w-full p-4" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full p-4">Post Job</Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
