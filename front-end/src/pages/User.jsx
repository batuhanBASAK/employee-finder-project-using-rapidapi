import { useState } from 'react';
import { useAuth } from "../utils/AuthContext";
import UserNavbar from "../components/UserNavbar";
import axios from 'axios';

export default function User() {
  const { user, token } = useAuth(); // Get token from context

  const [keywords, setKeywords] = useState('');
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    // Clear any previous errors or results
    setError('');
    setFilteredPeople([]);

    if (!keywords) {
      setError('Keywords are required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/search-people',
        { keywords },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Use token from context
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if the response contains filtered people
      if (response.data && response.data.filteredPeople) {
        setFilteredPeople(response.data.filteredPeople);
      } else {
        setError('No filtered people found.');
      }
    } catch (err) {
      console.error('Error during search:', err);
      if (err.response) {
        // Handle error response from the server
        setError(err.response.data.message || 'An error occurred during the search.');
      } else {
        // Handle network errors or issues
        setError('Network error occurred.');
      }
    }
  };

  return (
    <>
      <UserNavbar />
      <h1 className="text-2xl font-bold">User Home Page</h1>
      {user?.email && (
        <p className="mt-4 text-lg">Welcome, <span className="font-semibold">{user.email}</span>!</p>
      )}

      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="border p-4 mr-2"
        />
        <button
          onClick={handleSearch}
          className="p-4 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Search
        </button>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {filteredPeople.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-red-700">People Found</h2>
          <ul>
            {filteredPeople.map((person, index) => (
              <li key={index} className="mt-2">
                <p><strong>{person.firstName} {person.lastName}</strong></p>
                <p>Username: {person.username}</p>
                <p>Headline: {person.headline}</p>
                <p>Location: {person.city}, {person.country}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
