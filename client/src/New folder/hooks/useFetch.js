import { useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (googleResponse) => {
    try {
      setLoading(true);
  
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: googleResponse.credential }),
      };
  
      // Send the POST request to your server
      const serverResponse = await fetch(url, requestOptions);
      const data = await serverResponse.json();
  
      if (data?.user) {
        // Store user data and redirect
        localStorage.setItem("userId", data.user.userId); // Store the userId in localStorage

        window.location.replace("/"); // Redirect to the desired page
        console.log("User Data:", data.user);
      } else {
        throw new Error(data?.message || "User not found");
      }
    } catch (error) {
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  
  return { loading, error, handleGoogle };
};

export default useFetch;
