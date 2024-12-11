import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Hi() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/verify-token', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          const username = data.u_name; // Access the 'sub' field (or the field you store the username in)
          setMessage(`Hi ${data.u_name}!`);
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return <div>{message || 'Loading...'}</div>;
}

export default Hi;
