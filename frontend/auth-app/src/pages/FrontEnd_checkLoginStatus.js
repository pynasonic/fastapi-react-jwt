import React, { useEffect, useState } from 'react';
import { useNavigate,  } from 'react-router-dom';
import { checkLoginStatus } from './auth'; // Import the authentication utility

function Hi() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem('token');
      console.log(token);

      const { status, data } = await checkLoginStatus(token);

      if (status) {
        const username = data.u_name;  // Access the username or any other data
        const groupid  = data.u_primary_group_id
        setMessage(
            <>
              Hi {username} , {groupid} ! <a href="/allusers" onClick={fetchAllUsers}>All Users List</a>
            </>
          );
      } else {
        navigate('/login');  // If token is invalid or expired, redirect to login
      }
    };

    checkStatus();
  }, [navigate]);


  const fetchAllUsers = (e) => {
    e.preventDefault(); // Prevent default link behavior

    fetch('http://localhost:8000/allusers')
      .then(res => res.json())
      .then(data => setUsers(data))  // Save the users in the state
      .catch(err => console.error('Error fetching users:', err));
  };

  return (
    <div>
      {message}
      <div>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}| |  {user.email}|  {user.primary_group_id}|  {user.note} | {user.created_at}
                </li>  
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Hi;
