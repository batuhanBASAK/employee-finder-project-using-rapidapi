import { useState } from 'react';
import { useAuth } from "../utils/AuthContext";
import UserNavbar from "../components/UserNavbar";
import axios from 'axios';

export default function User() {
  const { user, token } = useAuth(); // Get token from context

  const [keywords, setKeywords] = useState('');
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 👈 loading state

  const handleSearch = async () => {
    setError('');
    setFilteredPeople([]);
    setLoading(true); // 👈 start loading

    if (!keywords) {
      setError('Keywords are required.');
      setLoading(false); // 👈 stop loading if validation fails
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/search-people',
        { keywords },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.filteredPeople) {
        setFilteredPeople(response.data.filteredPeople);
      } else {
        setError('No filtered people found.');
      }
    } catch (err) {
      console.error('Error during search:', err);
      if (err.response) {
        setError(err.response.data.message || 'An error occurred during the search.');
      } else {
        setError('Network error occurred.');
      }
    } finally {
      setLoading(false); // 👈 always stop loading at the end
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
          disabled={loading} // 👈 disable while loading
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {filteredPeople.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-red-700">{filteredPeople.length} People Found</h2>
          <ul>
            {filteredPeople.map((person, index) => (
              <li key={index} className="mt-2">
                {person.profilePicture && (
                  <img src={person.profilePicture} alt="profile" className="w-24 h-24 object-cover mb-2" />
                )}
                <p><strong>{person.firstName} {person.lastName}</strong></p>
                <p>Username: {person.username}</p>
                <p>Headline: {person.headline}</p>
                <p>Location: {person.city}, {person.country}</p>
                <p><strong>Summary:</strong></p>
                <p>{person.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
