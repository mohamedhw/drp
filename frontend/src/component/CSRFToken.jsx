import { useState, useEffect } from "react";
import axios from "axios";

const CSRFToken = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [csrftoken, setCsrftoken] = useState('');

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    const existingToken = getCookie('csrftoken');
    if (existingToken) {
      // Use the existing token without making a network request
      setCsrftoken(existingToken);
      return;
    }
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/csrfcookie/`);
        if (response.status === 200) {
          const csrfToken = getCookie('csrftoken');
          setCsrftoken(csrfToken);
        } else {
          console.error(`Failed to fetch CSRF token. Status: ${response.status}`);
        }
      } catch (err) {
        console.error('Error fetching CSRF token:', err);
      }
    };
  
    fetchData();
  }, [apiUrl]);

  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
  );
};

export default CSRFToken;