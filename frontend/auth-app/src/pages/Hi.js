import React, { useState } from 'react';

function Hi() {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = (e) => {
    e.preventDefault(); // Prevent default link behavior

    fetch('http://localhost:8000/samegid', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token to backend
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        return res.json();
      })
      .then((data) => setUsers(data)) // Save the users in the state
      .catch((err) => console.error('Error fetching users:', err));
  };

  return (
    <div>
      <a href="/allusers" onClick={fetchAllUsers}>All Users List</a>
      <div>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} | {user.email} | {user.primary_group_id} | {user.note} | {user.created_at}
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
