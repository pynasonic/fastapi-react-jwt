import React, { useEffect } from 'react';
import { useNavigate, Link  } from 'react-router-dom';

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
        console.log(token)
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div>
      <p>This is a protected page. Only visible to authenticated users.</p>
      <Link to="/Hi">Go to Hi</Link>
    </div>
  );
}

export default ProtectedPage;
