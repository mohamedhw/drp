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

    const fetchData = async () => {
      try {
        // Make a GET request to the CSRF endpoint to obtain the token
        const response = await axios.get(`${apiUrl}/csrfcookie/`);
        if (response.status === 200) {
          const csrfToken = getCookie('csrftoken');
          setCsrftoken(csrfToken);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
  );
};

export default CSRFToken;