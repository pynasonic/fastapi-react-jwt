export const checkLoginStatus = async (token) => {
    if (!token) {
      return { status: false };
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
        return { status: true, data };  // Return the payload data
      } else {
        return { status: false };
      }
    } catch (error) {
      return { status: false };
    }
  };
  