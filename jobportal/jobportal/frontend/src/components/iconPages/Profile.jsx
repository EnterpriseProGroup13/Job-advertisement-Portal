import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateProfileDialog from '../UpdateProfileDialog';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // fetch user info from token
    const token = localStorage.getItem('token');
    axios.get('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.firstName} {user.surname}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Location: {user.location?.city}, {user.location?.country}</p>
      {/* etc. */}
      <button onClick={() => setShowDialog(true)}>Update Profile</button>

      {showDialog && (
        <UpdateProfileDialog user={user} onClose={() => setShowDialog(false)} />
      )}
    </div>
  );
};

export default Profile;
